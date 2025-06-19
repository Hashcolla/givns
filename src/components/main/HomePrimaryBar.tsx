"use client";

import { navLinks } from "@/lib/navLinks";
import { useLoadingState } from "@/stores/loadingStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import Bio from "../ui/Bio";
import CreatePostButton from "./CreatePostButton";

const HomePrimaryBar = () => {
  useEffect(() => {
    console.log("remounted");
  }, []);

  const [activeLink, setActiveLink] = useState(0);
  const setPageLoading = useLoadingState((state) => state.setLoading);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (link: string, index?: number) => {
    if (index !== undefined) {
      setActiveLink(index);
    }
    setPageLoading(true);
    startTransition(() => {
      router.push(link);
    });
  };

  useEffect(() => {
    if (!isPending) {
      setPageLoading(false);
    }
  }, [isPending]);

  return (
    <div className="flex h-full flex-col space-y-3 px-7 pt-10 pb-4">
      <NavLinks handleClick={handleClick} activeLink={activeLink} />
      <BottomLinks handleClick={handleClick} />
      <Bio className="hidden text-[10px] xl:block">
        Terms of services • Privacy Policy • Cokies © 2025 givns team
      </Bio>
    </div>
  );
};

type NavLinksProps = {
  activeLink: number;
  handleClick: (link: string, index?: number) => void;
};

const NavLinks = ({ activeLink, handleClick }: NavLinksProps) => {
  return (
    <div className="space-y-7">
      {navLinks.map((link, index) => (
        <button
          key={link.href}
          onClick={() => handleClick(link.href, index)}
          className="text-foreground flex cursor-pointer items-start gap-4"
        >
          <i
            className={`${activeLink === index ? link.selectedIcon : link.icon} text-lg`}
          ></i>
          <span className="hidden xl:block">{link.label}</span>
        </button>
      ))}
    </div>
  );
};

type BottomLinksProps = {
  handleClick: (link: string, index?: number) => void;
};

const BottomLinks = ({ handleClick }: BottomLinksProps) => {
  return (
    <div className="mt-auto space-y-6">
      <button
        onClick={() => handleClick("/community")}
        className="text-foreground flex cursor-pointer items-start gap-4 pl-2"
      >
        <i className={`fi fi-sr-people-group text-lg`}></i>
        <span className="hidden xl:block">Community</span>
      </button>
      <CreatePostButton />
    </div>
  );
};

export default HomePrimaryBar;
