"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { approveTool, rejectTool } from "@/app/actions/tool_action"

interface PendingToolRowProps {
  tool: {
    id: string
    name: string
    description: string
    category: { name: string } | null
    submittedBy: { name: string | null; email: string } | null
  }
}

export function PendingToolRow({ tool }: PendingToolRowProps) {
  const [isPending, startTransition] = useTransition()

  function handleApprove() {
    startTransition(async () => {
      await approveTool(tool.id)
      toast.success(`"${tool.name}" approved`)
    })
  }

  function handleReject() {
    startTransition(async () => {
      await rejectTool(tool.id)
      toast.success(`"${tool.name}" rejected`)
    })
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        <Avatar>
          <AvatarFallback>{tool.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{tool.name}</span>
            {tool.category && (
              <span className="text-xs text-muted-foreground">
                {tool.category.name}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {tool.description}
          </p>
          {tool.submittedBy && (
            <p className="text-xs text-muted-foreground">
              Submitted by {tool.submittedBy.name ?? tool.submittedBy.email}
            </p>
          )}
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            variant="default"
            disabled={isPending}
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}