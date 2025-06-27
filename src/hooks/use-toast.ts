import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export const useToast = () => {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    // Simple console implementation for now
    console.log(`Toast: ${title} - ${description} (${variant})`)
    
    // You can replace this with a proper toast library like react-hot-toast later
    if (typeof window !== "undefined") {
      if (variant === "destructive") {
        alert(`Error: ${title}\n${description}`)
      } else {
        alert(`${title}\n${description}`)
      }
    }
  }

  return { toast }
}