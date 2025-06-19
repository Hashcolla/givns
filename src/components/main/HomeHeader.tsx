import React from "react";
import Logo from "../ui/Logo";
import AvatarWithArrowDown from "./AvatarWithArrowDown";

const HomeHeader = () => {
  return (
    <div className="flex h-full w-full items-center">
      {/* Logo section  */}
      <div className="flex w-full justify-center md:w-fit md:justify-start md:pl-10 xl:w-[300px]">
        <Logo size={60} />
      </div>

      {/* search bar section  */}
      <div className="hidden flex-1 items-center justify-between px-10 md:flex lg:px-5">
        <h1 className="text-xl font-bold lg:text-2xl">Feeds</h1>
        <ul className="flex gap-2">
          <li className="font-semibold">All</li>
          <li className="font-light">Feeds</li>
        </ul>
      </div>

      {/* //icons section  */}
      <div className="hidden items-center justify-end space-x-6 pr-10 md:flex lg:w-[min(400px,30vw)]">
        <i className="fi fi-sr-bell text-surface text-lg"></i>
        <AvatarWithArrowDown />
      </div>
      <div></div>
    </div>
  );
};

export default HomeHeader;
