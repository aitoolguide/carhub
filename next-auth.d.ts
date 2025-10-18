// next-auth-d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            profile?: any,
            role: string,
            roleId?: string,
            name?: string | null,
            email?: string | null,
            image?: string | null
        } & DefaultSession["user"]  // ✅ Fixed: Properly extend DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: string,
        profile?: any,
        role: string,
        roleId?: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        role?: string,
        profile?: any,
        roleId?: string,
    }
}