"use client";

import Image from "next/image";
import React, {
  FormEvent,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import pfp from "@/assets/images/Avatar.png";
import { Command, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/Button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPost } from "@/actions/postActions";
import { toast } from "sonner";
import { usePopUpModal } from "../popup-modal/PopupModal";
import ImagesUpload from "./ImagesUpload";
import { uploadPostImages } from "@/actions/postClientActions";

const CreatePostModal = () => {
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
    icon: string;
  } | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [showImages, setShowImages] = useState(false);

  const { close } = usePopUpModal();

  const [isLoading, startTransition] = useTransition();

  const handlePostSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const { error: postError, data: postData } = await createPost(formData);

      //post errors
      if (postError) {
        for (const err of postError) {
          toast.error(err.message, { id: "post-upload" });
        }
        return;
      }

      //uploading images
      if (files.length > 0) {
        toast.loading("Photos are uploading, please wait...", {
          id: "post-upload",
        });

        const { error: uploadError } = await uploadPostImages(
          files,
          postData.id,
        );

        if (uploadError) {
          toast.error("Error uploading images: " + uploadError);
          return;
        }
      }
      toast.success("Post created successfully!", { id: "post-upload" });
      close();
    });
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-surface text-2xl">Create a post</h2>

      <form onSubmit={handlePostSubmit} className="mt-4">
        <div className="mt-5 flex items-start gap-4">
          <Image alt={"pfp"} src={pfp} width={30} />
          <textarea
            name="content"
            className="placeholder:text-secondary h-30 w-full text-lg font-light outline-0"
            placeholder="Yoo what's good?"
          />
        </div>
        {showImages && <ImagesUpload setFiles={setFiles} files={files} />}
        <div className="border-input text-secondary mt-7 flex items-center space-x-3 border-t pt-4">
          <i
            onClick={() =>
              setShowImages((prev) => {
                if (prev === true) {
                  setFiles([]);
                }
                return !prev;
              })
            }
            className="hover:text-surface fi fi-sr-picture cursor-pointer"
          ></i>
          <i className="hover:text-surface fi fi-sr-marker cursor-pointer"></i>
          <i className="hover:text-surface fi fi-sr-square-poll-vertical cursor-pointer"></i>
          <i className="hover:text-surface fi fi-sr-calendar-lines cursor-pointer"></i>
          <i className="hover:text-surface fi fi-sr-laugh cursor-pointer"></i>
          <SelectVisibility selected={selected} setSelected={setSelected} />
          <Button className="bg-white px-4 py-3 font-semibold">
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

type SelectVisibilityProps = {
  selected: any;
  setSelected: React.Dispatch<SetStateAction<any>>;
};

const SelectVisibility = ({ selected, setSelected }: SelectVisibilityProps) => {
  const values = [
    {
      label: "Anyone",
      value: "anyone",
      icon: "fi fi-sr-earth-americas",
    },
    {
      label: "Community",
      value: "community",
      icon: "fi fi-sr-users-alt",
    },
    {
      label: "Private",
      value: "private",
      icon: "fi fi-sr-at",
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="text-primary/80 hover:text-primary flex w-[150px] justify-end gap-1 px-0 font-light"
            variant={"text"}
          >
            <i className={`${selected?.icon} mt-1`}></i>
            {selected ? selected.label : "Who can see this post?"}
            <i className="fi fi-br-angle-small-down text-foreground/50 mt-1"></i>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0">
          <Command>
            <CommandList>
              {values?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  <i className={item.icon}></i>
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected?.label === item.label
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreatePostModal;
