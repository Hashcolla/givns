import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import Bio from "./Bio";

export type TitleWithBioProps = {
  bio?: string;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

const TitleWithBio = ({ title, bio, className }: TitleWithBioProps) => {
  return (
    <div className={cn("mt-3 mb-2", className)}>
      <h2>{title}</h2>
      {bio && <Bio>{bio}</Bio>}
    </div>
  );
};

export default TitleWithBio;
