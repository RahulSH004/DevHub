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

  revalidatePath("/admin")
  revalidatePath("/tools")
}

export async function rejectTool(toolId: string) {
  await requireAdmin()

  await prisma.tool.update({
    where: { id: toolId },
    data: { status: "REJECTED" },
  })

  revalidatePath("/admin")
  revalidatePath("/tools")
}

export async function deleteTool(toolId: string) {
  await requireAdmin()

  await prisma.tool.delete({
    where: { id: toolId },
  })

  revalidatePath("/admin")
  revalidatePath("/tools")
}

export async function addCategory(name: string, slug: string) {
  await requireAdmin()

  const category = await prisma.category.create({
    data: {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    },
  })

  revalidatePath("/admin")
  revalidatePath("/tools")
  return category
}