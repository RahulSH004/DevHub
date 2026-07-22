"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3 } from "lucide-react"

interface ToolSubmissionPoint {
  date: string
  submissions: number
  approved: number
}

interface CategoryPoint {
  name: string
  count: number
}

interface AdminAnalyticsChartProps {
  submissionData?: ToolSubmissionPoint[]
  categoryDistribution?: CategoryPoint[]
}

const defaultChartData: ToolSubmissionPoint[] = [
  { date: "2026-07-16", submissions: 3, approved: 2 },
  { date: "2026-07-17", submissions: 5, approved: 4 },
  { date: "2026-07-18", submissions: 2, approved: 2 },
  { date: "2026-07-19", submissions: 8, approved: 6 },
  { date: "2026-07-20", submissions: 6, approved: 5 },
  { date: "2026-07-21", submissions: 11, approved: 9 },
  { date: "2026-07-22", submissions: 7, approved: 6 },
]

const chartConfig = {
  submissions: {
    label: "Submissions",
    color: "hsl(var(--primary))",
  },
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-2, 142 71% 45%))",
  },
} satisfies ChartConfig

export function AdminAnalyticsChart({
  submissionData = defaultChartData,
  categoryDistribution = [],
}: AdminAnalyticsChartProps) {
  const [timeRange, setTimeRange] = React.useState("7d")

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 border border-border/60 bg-card/60 backdrop-blur-xs">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="size-4 text-primary" />
              Submission & Review Velocity
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Tracking tool submission trends and approval throughput
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="7d" className="text-xs">Last 7 Days</SelectItem>
              <SelectItem value="30d" className="text-xs">Last 30 Days</SelectItem>
              <SelectItem value="90d" className="text-xs">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
            <AreaChart data={submissionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillSubmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-submissions)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-submissions)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="fillApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-approved)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-approved)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(val) => {
                  const d = new Date(val)
                  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }}
                className="text-xs text-muted-foreground"
              />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} className="text-xs text-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Area
                dataKey="submissions"
                type="monotone"
                fill="url(#fillSubmissions)"
                stroke="var(--color-submissions)"
                strokeWidth={2}
              />
              <Area
                dataKey="approved"
                type="monotone"
                fill="url(#fillApproved)"
                stroke="var(--color-approved)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border border-border/60 bg-card/60 backdrop-blur-xs flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>Categories Breakdown</span>
            <Badge variant="outline" className="text-[10px] font-medium">
              {categoryDistribution.length} Categories
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Distribution of tools across active categories
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-3 pt-1">
          {categoryDistribution.length === 0 ? (
            <div className="flex h-full min-h-[180px] items-center justify-center text-xs text-muted-foreground">
              No category data available
            </div>
          ) : (
            categoryDistribution.slice(0, 5).map((cat, idx) => {
              const maxCount = Math.max(...categoryDistribution.map((c) => c.count), 1)
              const percentage = Math.round((cat.count / maxCount) * 100)

              return (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium truncate max-w-[150px]">{cat.name}</span>
                    <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
                      {cat.count} {cat.count === 1 ? "tool" : "tools"}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 8)}%` }}
                    />
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
