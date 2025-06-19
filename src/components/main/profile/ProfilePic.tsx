"use client";

import Image from "next/image";
import pfp from "@/assets/images/Avatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePopUpModal } from "@/components/popup-modal/PopupModal";
import ProfilePicUpdateModal from "./ProfilePicUpdateModal";

const ProfilePic = () => {
  const { renderModal } = usePopUpModal();

  const handlePfpSubmit = () => {
    renderModal(<ProfilePicUpdateModal />);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="ring-background group relative mt-[-75px] size-[150px] cursor-pointer overflow-hidden rounded-full ring-3">
            <Image
              src={pfp}
              alt="pfp-pic"
              className="peer w-[150px] rounded-full object-cover"
              height={0}
            />
            <div className="absolute inset-0 hidden h-full w-full items-center justify-center bg-black/20 group-hover:flex">
              <i className="fi fi-sr-camera text-xl text-white"></i>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -top-15">
          <DropdownMenuItem onClick={handlePfpSubmit}>
            Edit pic
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePfpSubmit}>
            view pic
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfilePic;
