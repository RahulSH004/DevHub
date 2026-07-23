import prisma from "@/lib/prisma"
import { ToolForm } from "@/components/forms/tool-form"
import { adminCreateTool } from "@/app/actions/admin-create-tool"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Add New Tool",
  description: "Create a new developer tool directly in the DevHub directory.",
}

export default async function AdminNewToolPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <Plus className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Add New Tool
            </h1>
            <p className="text-xs text-muted-foreground">
              This tool will be published immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl">
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
          <ToolForm
            categories={categories}
            onSubmit={adminCreateTool}
            successMessage="Tool added"
            successDescription="It's now visible in the directory."
          />
        </div>
      </div>
    </div>
  )
}
