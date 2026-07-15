import { ToolsPageBackground } from "@/components/tools/ToolsPageBackground"
import { ToolsHeader } from "@/components/tools/ToolsHeader"
import { ToolsContent } from "@/components/tools/ToolsContent"
import Footer from "@/components/layout/footer"
import db from "@/lib/prisma"

const PAGE_SIZE = 9

type SearchParams = Promise<{
    category?: string
    page?: string
    q?: string
}>

export default async function Tools({ searchParams }: { searchParams: SearchParams }) {
    const { category, page, q } = await searchParams

    const parsedPage = parseInt(page ?? "1", 10)
    const currentPage = Math.max(1, Number.isNaN(parsedPage) ? 1 : parsedPage)
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
                    ...(activeSlug ? [] : [{ category: { name: { contains: searchQuery, mode: "insensitive" as const } } }]),
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

    return (
        <div className="min-h-screen bg-background relative">
            {/* Full-page grid background */}
            <ToolsPageBackground />

            {/* Search + tagline hero section */}
            <ToolsHeader />

            {/* Tools listing — sidebar + grid + pagination */}
            <ToolsContent
                categories={categories}
                tools={tools}
                activeSlug={activeSlug}
                searchQuery={searchQuery}
                totalCount={totalCount}
                currentPage={safePage}
                totalPages={totalPages}
            />

            <Footer />
        </div>
    )
}