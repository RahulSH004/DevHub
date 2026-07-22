import prisma from "@/lib/prisma"
import { AdminStatCards } from "@/components/admin/admin-stat-cards"
import { AdminAnalyticsChart } from "@/components/admin/admin-analytics-chart"
import { AdminPendingQueue } from "@/components/admin/admin-pending-queue"
import { AdminToolsTable } from "@/components/admin/admin-tools-table"
import { AdminCategoriesTab } from "@/components/admin/admin-categories-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Wrench, FolderTree, LayoutDashboard, Sparkles } from "lucide-react"

export default async function AdminDashboardPage() {
  const [total, pending, approved, rejected, categoriesCount, pendingTools, allTools, categories] =
    await Promise.all([
      prisma.tool.count(),
      prisma.tool.count({ where: { status: "PENDING" } }),
      prisma.tool.count({ where: { status: "APPROVED" } }),
      prisma.tool.count({ where: { status: "REJECTED" } }),
      prisma.category.count(),
      prisma.tool.findMany({
        where: { status: "PENDING" },
        include: {
          category: true,
          submittedBy: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.tool.findMany({
        include: {
          category: true,
          submittedBy: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        include: {
          _count: {
            select: { tools: true },
          },
        },
        orderBy: { name: "asc" },
      }),
    ])

  // Category distribution for chart
  const categoryDistribution = categories.map((cat) => ({
    name: cat.name,
    count: cat._count.tools,
  }))

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl flex items-center gap-2">
            Admin Dashboard
            <Sparkles className="size-5 text-amber-500 fill-amber-500" />
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Overview of developer tools, pending review requests, and catalog analytics.
          </p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <AdminStatCards
        total={total}
        pending={pending}
        approved={approved}
        rejected={rejected}
        categoriesCount={categoriesCount}
      />

      {/* Main Tabs Navigation */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/70 p-1 border border-border/50">
          <TabsTrigger value="overview" className="text-xs font-semibold px-4 gap-2">
            <LayoutDashboard className="size-3.5" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs font-semibold px-4 gap-2">
            <Clock className="size-3.5" />
            <span>Pending Review ({pending})</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="text-xs font-semibold px-4 gap-2">
            <Wrench className="size-3.5" />
            <span>All Tools ({total})</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="text-xs font-semibold px-4 gap-2">
            <FolderTree className="size-3.5" />
            <span>Categories ({categoriesCount})</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-8">
          <AdminAnalyticsChart categoryDistribution={categoryDistribution} />

          <div id="pending" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Pending Review Queue</h2>
                <p className="text-xs text-muted-foreground">Tools waiting for admin verification before going live</p>
              </div>
            </div>
            <AdminPendingQueue tools={pendingTools} />
          </div>
        </TabsContent>

        {/* TAB 2: PENDING QUEUE */}
        <TabsContent value="pending" className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Pending Review Queue</h2>
            <p className="text-xs text-muted-foreground">Approve or reject developer tools submitted by the community</p>
          </div>
          <AdminPendingQueue tools={pendingTools} />
        </TabsContent>

        {/* TAB 3: ALL TOOLS */}
        <TabsContent value="tools" className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">All Tools Directory</h2>
            <p className="text-xs text-muted-foreground">Search, filter, and manage all tools in the DevHub database</p>
          </div>
          <AdminToolsTable tools={allTools} categories={categories} />
        </TabsContent>

        {/* TAB 4: CATEGORIES */}
        <TabsContent value="categories" className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Categories Management</h2>
            <p className="text-xs text-muted-foreground">Manage developer tool categories and add new tags</p>
          </div>
          <AdminCategoriesTab categories={categories} />
        </TabsContent>
      </Tabs>
    </div>
  )
}