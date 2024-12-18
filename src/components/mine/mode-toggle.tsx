"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <Button variant="outline" size="icon" className="w-8 h-8 ml-2" onClick={toggleTheme}>
            {theme === "light" ? (
                <Sun className="h-2 w-2 shrink-0 opacity-50" />
            ) : (
                <Moon className="h-2 w-2 shrink-0 opacity-50" />
            )}
            <span className="sr-only">Mudar Tema</span>
        </Button>
    )
}
