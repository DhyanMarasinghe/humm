"use client"

import { useState } from "react"
import { Search, Plus, Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import AuthDialog from "./auth-dialog"

export default function Navbar() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleAuthClick = (mode: "login" | "register") => {
    setAuthMode(mode)
    setIsAuthDialogOpen(true)
  }

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      handleAuthClick("login")
    } else {
      console.log("Create post clicked")
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center">
              <Image
                src="/icon.png"
                alt="Humm Logo"
                width={40}
                height={40}
                quality={100}
                className="rounded-lg"
              />
            </div>
            <span className="text-3xl text-red-500 dark:text-white" 
                  style={{ 
                    fontFamily: '"Arial Black", "Helvetica Bold", "Impact", "Franklin Gothic Heavy", "Trebuchet MS Bold", sans-serif',
                    fontWeight: '900',
                    letterSpacing: '-0.025em'
                  }}>
              Humm
            </span>
          </div>
          <div className="flex-1 flex justify-end pr-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search communities and posts..."
                className="pl-9 w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button 
              onClick={handleCreatePost} 
              variant="ghost"
              className="rounded-full px-3 py-2 border border-border hover:bg-transparent hover:border-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="text-sm">Create</span>
            </Button>

            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">username</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          user@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>My Communities</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => handleAuthClick("login")} className="px-4">
                  Log In
                </Button>
                <Button onClick={() => handleAuthClick("register")} className="px-4">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}