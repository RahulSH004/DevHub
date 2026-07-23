"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import { ToolSchema } from "@/lib/validators/tool"

export async function submitTool(input: unknown) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("You must be signed in to submit a tool")

  const parsed = ToolSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors }
  }

  const tool = await prisma.tool.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      url: parsed.data.url,
      logoUrl: parsed.data.logoUrl || null,
      status: "PENDING",
      category: { connect: { id: parsed.data.categoryId } },
      submittedBy: { connect: { id: session.user.id } },
      tags: {
        connectOrCreate: parsed.data.tags.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  })

  return { success: true as const, toolId: tool.id }
}
