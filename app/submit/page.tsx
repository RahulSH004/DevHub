import prisma from "@/lib/prisma"
import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ToolForm } from "@/components/forms/tool-form"
import { submitTool } from "@/app/actions/submit-tool"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Submit a Tool",
  description: "Submit a developer tool to the DevHub directory for review.",
}

export default async function SubmitPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in?callbackURL=/submit")

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,var(--color-primary)/5,transparent)] pointer-events-none" />

      <div className="relative max-w-xl mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Submit a Tool
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add a developer tool to the directory. It will be reviewed before going live.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
          <ToolForm
            categories={categories}
            onSubmit={submitTool}
            successMessage="Submitted for review"
            successDescription="We'll take a look and publish it once approved."
          />
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-muted-foreground/50 mt-6">
          All submissions are reviewed by our team before going live.
        </p>
      </div>
    </div>
  )
}
