"use server"

import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/lib/auth"
import { revalidatePath } from "next/cache"

export async function moderateTool(toolId: string, decision: "APPROVED" | "REJECTED") {
  await requireAdmin()

  await prisma.tool.update({
    where: { id: toolId },
    data: { status: decision },
  })

  revalidatePath("/tools")
  revalidatePath("/admin")
}
