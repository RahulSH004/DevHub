"use server"

import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/lib/auth"
import { revalidatePath } from "next/cache"

export async function approveTool(toolId: string) {
  await requireAdmin()

  await prisma.tool.update({
    where: { id: toolId },
    data: { status: "APPROVED" },
  })

  revalidatePath("/dashboard")
}

export async function rejectTool(toolId: string) {
  await requireAdmin()

  await prisma.tool.update({
    where: { id: toolId },
    data: { status: "REJECTED" },
  })

  revalidatePath("/dashboard")
}