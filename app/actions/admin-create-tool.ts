"use server"

import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/lib/auth"
import { ToolSchema } from "@/lib/validators/tool"
import { revalidatePath } from "next/cache"

export async function adminCreateTool(input: unknown) {
  const session = await requireAdmin()

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
      status: "APPROVED",
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

  revalidatePath("/tools")
  return { success: true as const, toolId: tool.id }
}
