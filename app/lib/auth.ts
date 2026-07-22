import "dotenv/config"
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true, 
    },
    socialProviders: {
        google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                default: "USER"
            }
        }
    }
});

export async function requireAdmin(){
    const session  = await auth.api.getSession({
        headers: await headers()
    })
    if(!session || session.user.role !== "ADMIN"){
        notFound()
    }
    return session;
}