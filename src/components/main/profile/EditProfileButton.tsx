"use client";

import { usePopUpModal } from "@/components/popup-modal/PopupModal";
import { Button } from "@/components/ui/Button";
import React from "react";
import EditProfileModal from "./EditProfileModal";

const EditProfileButton = () => {
  const { renderModal } = usePopUpModal();

  const handleClick = () => {
    renderModal(<EditProfileModal />);
  };

  return <Button onClick={handleClick}>Edit profile</Button>;
};

export default EditProfileButton;
