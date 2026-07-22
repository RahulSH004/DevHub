"use client"

import * as React from "react"
import { useTransition } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { approveTool, rejectTool } from "@/app/actions/tool_action"
import {
  Check,
  X,
  ExternalLink,
  Clock,
  Sparkles,
  UserCheck,
  ShieldAlert,
  Globe,
  Tag,
} from "lucide-react"

interface PendingTool {
  id: string
  name: string
  description: string
  url: string
  createdAt?: Date | string
  category: { name: string } | null
  submittedBy: { name: string | null; email: string; image?: string | null } | null
}

interface AdminPendingQueueProps {
  tools: PendingTool[]
}

export function AdminPendingQueue({ tools }: AdminPendingQueueProps) {
  if (tools.length === 0) {
    return (
      <Card className="border border-dashed border-border/70 bg-card/40 py-12 text-center">
        <CardContent className="flex flex-col items-center justify-center space-y-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <Sparkles className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Pending Review Queue Clean</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              All submitted tools have been processed. Great job keeping the DevHub directory updated!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {tools.map((tool) => (
        <PendingToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

function PendingToolCard({ tool }: { tool: PendingTool }) {
  const [isPending, startTransition] = useTransition()

  function handleApprove() {
    startTransition(async () => {
      try {
        await approveTool(tool.id)
        toast.success(`Approved "${tool.name}"`, {
          description: "Tool is now live in the public directory.",
        })
      } catch (err) {
        toast.error("Failed to approve tool")
      }
    })
  }

  function handleReject() {
    startTransition(async () => {
      try {
        await rejectTool(tool.id)
        toast.info(`Rejected "${tool.name}"`)
      } catch (err) {
        toast.error("Failed to reject tool")
      }
    })
  }

  const submitterName = tool.submittedBy?.name || tool.submittedBy?.email || "Anonymous"
  const submitterInitials = submitterName.slice(0, 2).toUpperCase()

  return (
    <Card className="group relative overflow-hidden border border-border/60 bg-card/70 backdrop-blur-xs transition-all hover:border-border hover:shadow-sm">
      <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base shadow-xs border border-primary/20">
            {tool.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-foreground text-sm tracking-tight truncate">
                {tool.name}
              </h4>
              {tool.category && (
                <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Tag className="size-2.5 text-muted-foreground" />
                  {tool.category.name}
                </Badge>
              )}
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 ml-1"
              >
                <Globe className="size-3" />
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{tool.url}</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {tool.description}
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground/80">
              <Avatar className="size-4">
                {tool.submittedBy?.image && <AvatarImage src={tool.submittedBy.image} />}
                <AvatarFallback className="text-[8px] bg-muted font-bold">{submitterInitials}</AvatarFallback>
              </Avatar>
              <span>Submitted by <strong className="font-medium text-foreground">{submitterName}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 justify-end">
          <Button
            size="sm"
            variant="default"
            disabled={isPending}
            onClick={handleApprove}
            className="h-9 px-3 text-xs font-semibold gap-1.5 shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-[0.96] transition-all"
          >
            <Check className="size-3.5" />
            <span>Approve</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={handleReject}
            className="h-9 px-3 text-xs font-semibold gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 border-rose-200 dark:border-rose-900/40 active:scale-[0.96] transition-all"
          >
            <X className="size-3.5" />
            <span>Reject</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
