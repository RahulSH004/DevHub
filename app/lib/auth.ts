import "dotenv/config"
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
                defaultValue: "USER",
                input: false,
            }
        }
    }
});

export async function requireAdmin() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // Not logged in → redirect to sign-in
    if (!session) {
        redirect("/sign-in")
    }

    // Logged in but not an admin → redirect to home
    if (session.user.role !== "ADMIN") {
        redirect("/")
    }

    return session;
}

export async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    })
}