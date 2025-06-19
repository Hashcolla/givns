"use client";

import LogoDark from "@/assets/images/logo/logo-dark.png";
import LogoLight from "@/assets/images/logo/logo-light.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ComponentProps } from "react";

type LogoProps = {
  size?: number;
} & ComponentProps<"img">;

const Logo = ({ size, src, width, height, ...imgProps }: LogoProps) => {
  const { theme } = useTheme();

  return (
    <Image
      alt="logo"
      src={theme === "light" ? LogoDark : LogoLight}
      width={size || 100}
      height={size || 100}
      {...imgProps}
    />
  );
};

export default Logo;
