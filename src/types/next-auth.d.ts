import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      username: string
      image?: string | null
    }
  }

  interface User {
    id: string
    email: string
    username: string
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string
  }
}