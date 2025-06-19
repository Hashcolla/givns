import {
  PopUpModalField,
  PopUpModalHeader,
  PopUpModalRoot,
  usePopUpModal,
} from "@/components/popup-modal/PopupModal";
import { Button } from "@/components/ui/Button";
import React, { useActionState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic";
import { updateProfileDetails } from "@/actions/serverActions";
import { toast } from "sonner";

const EditProfileModal = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { close } = usePopUpModal();
  const [formState, formAction, isLoading] = useActionState(
    updateProfileDetails,
    null,
  );

  const handleClick = () => {
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    if (formState) {
      if (formState.error) {
        toast.error("Error updating profile: ", {
          description: formState.error.join(", "),
          id: "profile-update",
        });
        return;
      }
      close();
      formRef.current?.reset();
      toast.success("Profile updated successfully!", { id: "profile-update" });
    }
  }, [formState]);

  return (
    <PopUpModalRoot
      header={
        <PopUpModalHeader
          title={"Edit Profile"}
          button={
            <Button disabled={isLoading} onClick={handleClick}>
              {isLoading ? "Editing..." : "Edit"}
            </Button>
          }
        />
      }
    >
      <div>
        <div className="bg-secondary/10 hover:bg-secondary/20 flex h-[200px] w-full cursor-pointer items-center justify-center rounded-sm">
          <i className="fi fi-sr-camera text-xl text-white"></i>
        </div>
        <div className="flex px-5">
          <ProfilePic />
        </div>
        <form
          ref={formRef}
          action={formAction}
          className="mt-5 flex flex-col gap-4"
        >
          <PopUpModalField name="edit-name" placeholder="Edit name" />
          <PopUpModalField name="edit-username" placeholder="Edit username" />
          <textarea
            name="edit-bio"
            className="placeholder:text-secondary bg-input/20 text-md h-30 w-full rounded-xl px-4 pt-2 font-light outline-0"
            placeholder="Edit bio..."
          />
        </form>
      </div>
    </PopUpModalRoot>
  );
};

export default EditProfileModal;
