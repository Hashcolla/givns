"use client";

import React, { useState, useTransition } from "react";
import ImagesUpload from "../ImagesUpload";
import { Button } from "@/components/ui/Button";
import { updateImageInDB, uploadImageToBucket } from "@/actions/clientActions";
import { toast } from "sonner";
import { usePopUpModal } from "@/components/popup-modal/PopupModal";

const ProfilePicUpdateModal = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { close } = usePopUpModal();
  const [isLoading, startTransition] = useTransition();

  const onSubmit = () => {
    if (files) {
      const file = files[0];

      startTransition(async () => {
        const { error, data } = await uploadImageToBucket(file, "pfp");

        if (error) {
          console.error("Error uploading image:", error);
          return;
        }

        if (data) {
          const { error: dbError } = await updateImageInDB(
            data,
            "users",
            "pfp",
          );

          if (dbError) {
            toast.error(dbError, { id: "pfp" });
            return;
          }
          close();
          toast.success("Profile picture updated successfully", { id: "pfp" });
          setFiles([]);
        }
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Upload Image</h1>
      <ImagesUpload setFiles={setFiles} files={files} multiple={false} />
      <div className="mt-5 flex justify-end">
        <Button disabled={isLoading} onClick={onSubmit}>
          {isLoading ? "Updating..." : "Update Pfp"}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicUpdateModal;
