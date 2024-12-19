"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-8 h-8 ml-2"
      onClick={toggleTheme}
    >
      {resolvedTheme === "light" ? (
        <Sun className="h-4 w-4 shrink-0 opacity-70" />
      ) : (
        <Moon className="h-4 w-4 shrink-0 opacity-70" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
