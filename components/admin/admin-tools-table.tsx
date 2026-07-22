"use client"

import * as React from "react"
import { useTransition } from "react"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { approveTool, rejectTool, deleteTool } from "@/app/actions/tool_action"
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  ExternalLink,
  Trash2,
  Check,
  X,
  Filter,
  Wrench,
  Globe,
} from "lucide-react"

interface ToolItem {
  id: string
  name: string
  description: string
  url: string
  status: "PENDING" | "APPROVED" | "REJECTED" | string
  createdAt?: Date | string
  category: { name: string } | null
  submittedBy: { name: string | null; email: string } | null
}

interface CategoryItem {
  id: string
  name: string
}

interface AdminToolsTableProps {
  tools: ToolItem[]
  categories?: CategoryItem[]
}

export function AdminToolsTable({ tools, categories = [] }: AdminToolsTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusTab, setStatusTab] = React.useState("ALL")
  const [selectedCategory, setSelectedCategory] = React.useState("ALL")
  const [isPending, startTransition] = useTransition()

  // Filter tools
  const filteredTools = React.useMemo(() => {
    return tools.filter((tool) => {
      // Status filter
      if (statusTab !== "ALL" && tool.status !== statusTab) {
        return false
      }
      // Category filter
      if (selectedCategory !== "ALL" && tool.category?.name !== selectedCategory) {
        return false
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        const matchesName = tool.name.toLowerCase().includes(query)
        const matchesDesc = tool.description.toLowerCase().includes(query)
        const matchesCategory = tool.category?.name.toLowerCase().includes(query)
        return matchesName || matchesDesc || matchesCategory
      }
      return true
    })
  }, [tools, statusTab, selectedCategory, searchQuery])

  const pendingCount = tools.filter((t) => t.status === "PENDING").length
  const approvedCount = tools.filter((t) => t.status === "APPROVED").length
  const rejectedCount = tools.filter((t) => t.status === "REJECTED").length

  function handleApprove(tool: ToolItem) {
    startTransition(async () => {
      try {
        await approveTool(tool.id)
        toast.success(`Approved "${tool.name}"`)
      } catch (e) {
        toast.error("Failed to approve tool")
      }
    })
  }

  function handleReject(tool: ToolItem) {
    startTransition(async () => {
      try {
        await rejectTool(tool.id)
        toast.info(`Rejected "${tool.name}"`)
      } catch (e) {
        toast.error("Failed to reject tool")
      }
    })
  }

  function handleDelete(tool: ToolItem) {
    if (!confirm(`Are you sure you want to delete "${tool.name}"?`)) return

    startTransition(async () => {
      try {
        await deleteTool(tool.id)
        toast.success(`Deleted "${tool.name}"`)
      } catch (e) {
        toast.error("Failed to delete tool")
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={statusTab} onValueChange={setStatusTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto bg-muted/60 p-1">
            <TabsTrigger value="ALL" className="text-xs font-medium px-3">
              All <Badge variant="secondary" className="ml-1 px-1 py-0 text-[10px] tabular-nums">{tools.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="PENDING" className="text-xs font-medium px-3">
              Pending <Badge variant="destructive" className="ml-1 px-1 py-0 text-[10px] tabular-nums">{pendingCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="APPROVED" className="text-xs font-medium px-3">
              Approved <Badge variant="outline" className="ml-1 px-1 py-0 text-[10px] tabular-nums">{approvedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="REJECTED" className="text-xs font-medium px-3">
              Rejected <Badge variant="outline" className="ml-1 px-1 py-0 text-[10px] tabular-nums">{rejectedCount}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-xs bg-background/80"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-9 w-36 text-xs">
              <Filter className="size-3.5 mr-1 text-muted-foreground" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="ALL" className="text-xs">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name} className="text-xs">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[280px] text-xs font-semibold">Tool Name & URL</TableHead>
              <TableHead className="text-xs font-semibold">Category</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">Submitted By</TableHead>
              <TableHead className="w-[80px] text-right text-xs font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-xs text-muted-foreground">
                  No tools found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredTools.map((tool) => (
                <TableRow key={tool.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-foreground">{tool.name}</span>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                      <span className="text-[11px] text-muted-foreground line-clamp-1">
                        {tool.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {tool.category ? (
                      <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">
                        {tool.category.name}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={tool.status} />
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {tool.submittedBy?.name || tool.submittedBy?.email || "System"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="size-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 text-xs">
                        {tool.status !== "APPROVED" && (
                          <DropdownMenuItem onClick={() => handleApprove(tool)} className="text-emerald-600 gap-2 cursor-pointer">
                            <Check className="size-3.5" />
                            <span>Approve</span>
                          </DropdownMenuItem>
                        )}
                        {tool.status !== "REJECTED" && (
                          <DropdownMenuItem onClick={() => handleReject(tool)} className="text-amber-600 gap-2 cursor-pointer">
                            <X className="size-3.5" />
                            <span>Reject</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
                          <a href={tool.url} target="_blank" rel="noreferrer">
                            <Globe className="size-3.5" />
                            <span>Visit Website</span>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(tool)} className="text-rose-600 gap-2 cursor-pointer">
                          <Trash2 className="size-3.5" />
                          <span>Delete Tool</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
        <span>Showing {filteredTools.length} of {tools.length} tools</span>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "APPROVED") {
    return (
      <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-semibold gap-1 px-2 py-0.5">
        <CheckCircle2 className="size-3" />
        <span>Approved</span>
      </Badge>
    )
  }
  if (status === "PENDING") {
    return (
      <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-semibold gap-1 px-2 py-0.5">
        <Clock className="size-3" />
        <span>Pending</span>
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px] font-semibold gap-1 px-2 py-0.5">
      <XCircle className="size-3" />
      <span>Rejected</span>
    </Badge>
  )
}
