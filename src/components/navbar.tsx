"use client"

import { useState } from "react"
import { Search, Plus, Bell, Moon, Sun, MessageCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
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
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession()
  
  const isLoggedIn = !!session
  const isLoading = status === "loading"

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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="w-full max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center flex-shrink-0" style={{ minWidth: '120px' }}>
            <div className="flex h-10 w-10 items-center justify-center mr-4">
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
          
          <div className="flex-1 flex justify-center mx-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search communities and posts..."
                className="pl-9 w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center flex-shrink-0 gap-3" style={{ minWidth: '200px' }}>
            {isLoggedIn ? (
              <>
                {/* Chat Button */}
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>

                {/* Create Post */}
                <Button 
                  onClick={handleCreatePost} 
                  variant="ghost"
                  className="rounded-full px-3 py-2 border border-border hover:bg-transparent hover:border-primary"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="text-sm">Create</span>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || undefined} alt="@user" />
                        <AvatarFallback>
                          {session.user?.username?.charAt(0)?.toUpperCase() || 
                           session.user?.email?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.username || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleTheme}>
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Theme Toggle for non-logged in users */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Create Post (will show login) */}
                <Button 
                  onClick={handleCreatePost} 
                  variant="ghost"
                  className="rounded-full px-3 py-2 border border-border hover:bg-transparent hover:border-primary"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="text-sm">Create</span>
                </Button>

                {/* Login/Register buttons */}
                <Button variant="ghost" onClick={() => handleAuthClick("login")} className="px-4" disabled={isLoading}>
                  Log In
                </Button>
                <Button onClick={() => handleAuthClick("register")} className="px-4" disabled={isLoading}>
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