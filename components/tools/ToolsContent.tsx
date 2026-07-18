import { Suspense } from "react"
import { ToolCard } from "@/components/tools/ToolCard"
import { CategorySidebar } from "@/components/tools/container/CategorySidebar"
import { PaginationControls } from "@/components/tools/container/PaginationControls"

type Category = {
    id: string
    name: string
    slug: string
    _count: { tools: number }
}

type Tool = {
    id: string
    slug: string | null
    name: string
    logoUrl: string | null
    category: { name: string; slug: string }
}

type ToolsContentProps = {
    categories: Category[]
    tools: Tool[]
    activeSlug: string | null
    searchQuery: string
    totalCount: number
    currentPage: number
    totalPages: number
}


export function ToolsContent({
    categories,
    tools,
    activeSlug,
    searchQuery,
    totalCount,
    currentPage,
    totalPages,
}: ToolsContentProps) {
    const isFiltered = !!activeSlug || !!searchQuery

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl relative z-10">
            {/* Outer container — matches the sketch */}
            <div
                className="rounded-[2rem] p-5 md:p-7 shadow-sm"
                style={{
                    border: "1px solid transparent",
                    background:
                        "linear-gradient(hsl(var(--card) / 0.3) 0%, hsl(var(--card) / 0.3) 100%) padding-box, linear-gradient(to bottom, hsl(var(--border)) 0%, transparent 70%) border-box",
                }}
            >

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

                    <aside className="w-full md:w-56 shrink-0">
                        <div className="border border-border/60 rounded-2xl p-4 bg-background/50 shadow-sm md:sticky md:top-24">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5 px-1">
                                Categories
                            </p>

                            <Suspense fallback={<CategorySidebarSkeleton count={categories.length + 1} />}>
                                <CategorySidebar
                                    categories={categories}
                                    activeSlug={activeSlug}
                                />
                            </Suspense>
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div className="p-5 md:p-6 min-h-[500px] flex flex-col">

                            {tools.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {tools.map((tool) => (
                                            <ToolCard
                                                key={tool.id}
                                                slug={tool.slug || tool.id}
                                                name={tool.name}
                                                category={tool.category.name}
                                                logoUrl={tool.logoUrl}
                                            />
                                        ))}
                                    </div>

                                    <Suspense fallback={null}>
                                        <PaginationControls
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                        />
                                    </Suspense>
                                </>
                            ) : (
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
