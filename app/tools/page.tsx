import { Suspense } from "react"
import Smallhero from "@/components/tools/smallhero"
import { ToolCard } from "@/components/tools/ToolCard"
import { CategorySidebar } from "@/components/tools/container/CategorySidebar"
import { PaginationControls } from "@/components/tools/container/PaginationControls"
import db from "@/lib/prisma"
import Footer from "@/components/layout/footer"

const PAGE_SIZE = 9

type SearchParams = Promise<{
    category?: string
    page?: string
    q?: string
}>

export default async function Tools({ searchParams }: { searchParams: SearchParams }) {
    // Next.js 16: always await searchParams
    const { category, page, q } = await searchParams

    const currentPage = Math.max(1, parseInt(page ?? "1", 10))
    const activeSlug = category ?? null
    const searchQuery = q?.trim() ?? ""

    // Fetch categories with approved tool counts
    const categories = await db.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: {
                    tools: { where: { status: "APPROVED" } },
                },
            },
        },
    })

    // Build the where clause for tools
    const where = {
        status: "APPROVED" as const,
        ...(activeSlug ? { category: { slug: activeSlug } } : {}),
        ...(searchQuery
            ? {
                OR: [
                    { name: { contains: searchQuery, mode: "insensitive" as const } },
                    { description: { contains: searchQuery, mode: "insensitive" as const } },
                    // Also match on category name (e.g. "devops" → "DevOps & Infrastructure")
                    { category: { name: { contains: searchQuery, mode: "insensitive" as const } } },
                    // Also match on tags (e.g. "containers", "typescript")
                    { tags: { some: { name: { contains: searchQuery, mode: "insensitive" as const } } } },
                ],
            }
            : {}),
    }

    // Total count for pagination
    const totalCount = await db.tool.count({ where })
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
    const safePage = Math.min(currentPage, totalPages)

    // Fetch the current page of tools
    const tools = await db.tool.findMany({
        where,
        include: {
            category: { select: { name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (safePage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    })

    const isFiltered = !!activeSlug || !!searchQuery

    return (
        <div className="min-h-screen bg-background">
            <Smallhero />

            <div className="container mx-auto px-4 py-10 max-w-7xl">
                {/* Outer container — matches the sketch */}
                <div className="border border-border rounded-[2rem] p-5 md:p-7 bg-card/30 shadow-sm">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pl-1">
                        <h1 className="text-2xl font-bold tracking-tight">Tools</h1>
                        <div className="border border-border/60 rounded-full px-4 py-1 text-sm font-semibold bg-background shadow-sm tabular-nums">
                            {totalCount.toLocaleString()}
                        </div>
                        {isFiltered && (
                            <span className="text-sm text-muted-foreground ml-1">
                                {searchQuery ? `results for "${searchQuery}"` : `in ${categories.find(c => c.slug === activeSlug)?.name ?? activeSlug}`}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 lg:gap-6">

                        {/* LEFT — Categories sidebar */}
                        <aside className="w-full md:w-56 shrink-0">
                            <div className="border border-border/60 rounded-2xl p-4 bg-background/50 shadow-sm md:sticky md:top-24">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5 px-1">
                                    Categories
                                </p>
                                {/*
                                  Suspense boundary required: CategorySidebar calls useSearchParams()
                                  which requires a client boundary.
                                */}
                                <Suspense fallback={<CategorySidebarSkeleton count={categories.length + 1} />}>
                                    <CategorySidebar
                                        categories={categories}
                                        activeSlug={activeSlug}
                                    />
                                </Suspense>
                            </div>
                        </aside>

                        {/* RIGHT — Tools grid */}
                        <main className="flex-1 min-w-0">
                            <div className="border border-border/60 rounded-2xl p-5 md:p-6 bg-background/50 shadow-sm min-h-[500px] flex flex-col">

                                {tools.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 flex-1">
                                            {tools.map((tool) => (
                                                <ToolCard
                                                    key={tool.id}
                                                    id={tool.id}
                                                    name={tool.name}
                                                    category={tool.category.name}
                                                    logoUrl={tool.logoUrl}
                                                />
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        <Suspense fallback={null}>
                                            <PaginationControls
                                                currentPage={safePage}
                                                totalPages={totalPages}
                                            />
                                        </Suspense>
                                    </>
                                ) : (
                                    /* Empty state */
                                    <div className="flex-1 flex flex-col items-center justify-center py-24 text-center gap-2">
                                        <div className="text-5xl" aria-hidden>🔍</div>
                                        <p className="text-base font-semibold text-foreground">
                                            {searchQuery ? `No results for "${searchQuery}"` : "No tools in this category"}
                                        </p>
                                        <p className="text-sm text-muted-foreground max-w-xs">
                                            {searchQuery
                                                ? "Try a different keyword, or clear the search."
                                                : "No approved tools here yet — check back soon."}
                                        </p>
                                    </div>
                                )}

                            </div>
                        </main>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

// Static skeleton (no Math.random — avoids hydration mismatch)
function CategorySidebarSkeleton({ count }: { count: number }) {
    // Fixed widths to avoid hydration mismatch from Math.random()
    const widths = ["w-full", "w-4/5", "w-3/4", "w-full", "w-5/6", "w-4/5", "w-3/4", "w-full", "w-5/6"]
    return (
        <div className="flex flex-col gap-1.5" aria-hidden>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`h-9 rounded-xl bg-muted/60 animate-pulse ${widths[i % widths.length]}`}
                />
            ))}
        </div>
    )
}