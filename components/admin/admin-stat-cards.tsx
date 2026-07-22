"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wrench,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FolderTree,
  AlertCircle,
} from "lucide-react"

interface AdminStatCardsProps {
  total: number
  pending: number
  approved: number
  rejected: number
  categoriesCount?: number
}

export function AdminStatCards({
  total,
  pending,
  approved,
  rejected,
  categoriesCount = 0,
}: AdminStatCardsProps) {
  const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0

  const stats = [
    {
      title: "Total Tools",
      value: total,
      description: `${categoriesCount} active categories`,
      icon: Wrench,
      badgeText: "Catalog",
      badgeVariant: "secondary" as const,
      accentColor: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
      borderColor: "hover:border-blue-500/30",
    },
    {
      title: "Pending Review",
      value: pending,
      description: pending > 0 ? "Requires admin action" : "All caught up!",
      icon: Clock,
      badgeText: pending > 0 ? `${pending} action needed` : "Clean queue",
      badgeVariant: (pending > 0 ? "destructive" : "outline") as const,
      accentColor: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-400/10",
      borderColor: "hover:border-amber-500/30",
      pulse: pending > 0,
    },
    {
      title: "Approved Tools",
      value: approved,
      description: `${approvalRate}% approval rate`,
      icon: CheckCircle2,
      badgeText: `${approvalRate}% Live`,
      badgeVariant: "default" as const,
      accentColor: "text-emerald-500 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 dark:bg-emerald-400/10",
      borderColor: "hover:border-emerald-500/30",
    },
    {
      title: "Rejected",
      value: rejected,
      description: "Not meeting requirements",
      icon: XCircle,
      badgeText: "Declined",
      badgeVariant: "outline" as const,
      accentColor: "text-rose-500 dark:text-rose-400",
      bgColor: "bg-rose-500/10 dark:bg-rose-400/10",
      borderColor: "hover:border-rose-500/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={`group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:shadow-md ${stat.borderColor}`}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </span>
                <div
                  className={`flex size-9 items-center justify-center rounded-xl ${stat.bgColor} ${stat.accentColor} transition-transform group-hover:scale-105`}
                >
                  <Icon className="size-4.5" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
                  {stat.value}
                </span>
                <Badge
                  variant={stat.badgeVariant}
                  className="px-2 py-0.5 text-[10px] font-semibold tracking-tight rounded-md flex items-center gap-1"
                >
                  {stat.pulse && (
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex size-1.5 rounded-full bg-rose-500"></span>
                    </span>
                  )}
                  {stat.badgeText}
                </Badge>
              </div>

              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
