"use client";

import { Plus, X } from "lucide-react";

import Image from "next/image";
import React, { ChangeEvent, SetStateAction, useRef } from "react";

type ImagesUploadProps = {
  setFiles: React.Dispatch<SetStateAction<File[]>>;
  multiple?: boolean;
  files: File[];
};

const ImagesUpload = ({ setFiles, multiple, files }: ImagesUploadProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setFiles([]);
      return;
    }

    console.log(e.target.files);
    const images = Array.from(e.target.files);
    setFiles([...(files ?? []), ...images]);
    e.target.value = ""; // Reset the input value to allow re-uploading the same file
  };

  const handleDelete = (index: number) => () => {
    if (!files) return;

    setFiles((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <div className="border-input/70 mt-10 flex h-[230px] w-full cursor-pointer space-x-2 rounded-3xl border">
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        hidden
        multiple={multiple || true}
        onChange={handleImageSubmit}
      />
      {files.length > 0 ? (
        <div className="flex w-full flex-wrap gap-3 overflow-y-auto p-4">
          {files
            .map((file) => URL.createObjectURL(file))
            .map((src, index) => (
              <div className="group relative" key={index}>
                <Image
                  src={src}
                  alt={src}
                  className="object-fit h-[100px] w-full max-w-[110px] rounded-2xl"
                  width={0}
                  height={0}
                />
                <div
                  onClick={handleDelete(index)}
                  className="bg-secondary absolute -top-1 -right-1 hidden rounded-full group-hover:block"
                >
                  <X className="text-surface/70" size={20} />
                </div>
              </div>
            ))}
          {multiple && (
            <div
              onClick={() => imageRef.current?.click()}
              className="bg-input/40 hover:bg-input/30 flex size-[100px] items-center justify-center rounded-xl"
            >
              <Plus className="text-secondary" size={30} />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => imageRef.current?.click()}
          className="flex h-full w-full flex-col items-center justify-center"
        >
          <i className="fi fi-rr-picture text-input text-4xl"></i>
          <h2 className="text-surface/80 -mt-1">Upload things here</h2>
          <span className="text-secondary text-center text-xs">
            Accepted file types: JPG, PNG, PDF. Max file <br />
            size: 5MB. Up to 3 files allowed.
          </span>
        </div>
      )}
    </div>
  );
};

export default ImagesUpload;
