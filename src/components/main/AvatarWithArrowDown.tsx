import Image from "next/image";
import React from "react";
import avatar from "@/assets/images/Avatar.png";

const AvatarWithArrowDown = () => {
  return (
    <div className="hover:bg-input flex cursor-pointer items-center justify-center space-x-1 rounded-full p-1">
      <Image alt="avatar" src={avatar} width={35} />
      <i className="fi fi-br-angle-small-down"></i>
    </div>
  );
};

export default AvatarWithArrowDown;
