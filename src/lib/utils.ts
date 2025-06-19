import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFilePath(fileName: string, folder: string): string {
  const ext = fileName.split(".")[1];
  const filePath = `${folder}/${Date.now()}.${ext}`;
  return filePath;
}
