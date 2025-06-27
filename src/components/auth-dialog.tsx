"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "register"
  onModeChange: (mode: "login" | "register") => void
}

export default function AuthDialog({ open, onOpenChange, mode, onModeChange }: AuthDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { email, password, username })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Welcome back to Humm" : "Join Humm"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" 
              ? "Sign in to your account to continue" 
              : "Create an account to get started"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {mode === "login" && (
              <div className="text-right">
                <Button variant="link" className="h-auto p-0 text-sm">
                  Forgot password?
                </Button>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full">
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => onModeChange("register")}
                >
                  Sign up
                </Button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => onModeChange("login")}
                >
                  Sign in
                </Button>
              </p>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our{" "}
            <Button variant="link" className="h-auto p-0 text-xs">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="h-auto p-0 text-xs">
              Privacy Policy
            </Button>
            .
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}