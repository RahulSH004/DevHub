import { z } from "zod"

export const ToolSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  url: z.string().url(),
  logoUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please select a category"),
  tags: z.array(z.string().trim().min(1)).min(1, "Add at least one tag"),
})

export type ToolInput = z.infer<typeof ToolSchema>
