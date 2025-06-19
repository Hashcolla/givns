import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export type BioProps = {} & PropsWithChildren & React.ComponentProps<"span">;

const Bio = ({ children, className }: BioProps) => {
  return (
    <span className={cn("text-sm text-secondary", className)}>{children}</span>
  );
};

export default Bio;
