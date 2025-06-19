"use client";

import { useTheme } from "next-themes";
import {Button} from "../components/ui/Button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? "dark" : "light"}
    </Button>
  );
}
