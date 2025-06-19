"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/Button";
import { usePopUpModal } from "../popup-modal/PopupModal";
import CreatePostModal from "./CreatePostModal";

const CreatePostButton = () => {
  const { renderModal } = usePopUpModal();

  // useEffect(() => {
  //   renderModal(<CreatePostModal />);
  // }, []);

  const handleModal = () => {
    renderModal(<CreatePostModal />);
  };
  return (
    <Button
      onClick={handleModal}
      className="hidden h-[45px] w-full text-sm font-semibold xl:block"
    >
      Create a channel
    </Button>
  );
};

export default CreatePostButton;
