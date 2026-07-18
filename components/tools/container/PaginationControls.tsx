"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
    currentPage: number
    totalPages: number
}

export function PaginationControls({ currentPage, totalPages }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const goToPage = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString())
            if (page === 1) {
                params.delete("page")
            } else {
                params.set("page", String(page))
            }
            router.push(`${pathname}?${params.toString()}`)
        },
        [pathname, router, searchParams]
    )

    if (totalPages <= 1) return null

    const hasPrev = currentPage > 1
    const hasNext = currentPage < totalPages


    const pages: (number | "...")[] = []
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
        pages.push(1)
        if (currentPage > 3) pages.push("...")
        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)
        for (let i = start; i <= end; i++) pages.push(i)
        if (currentPage < totalPages - 2) pages.push("...")
        pages.push(totalPages)
    }

    return (
        <nav
            className="flex items-center justify-center gap-2 pt-8"
            aria-label="Pagination"
        >
            <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-1 h-9 px-3"
                disabled={!hasPrev}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4" aria-hidden />
                Prev
            </Button>

            <div className="flex items-center gap-1">
                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground text-sm select-none">
                            …
                        </span>
                    ) : (
                        <Button
                            key={p}
                            variant={p === currentPage ? "default" : "ghost"}
                            size="sm"
                            className="rounded-xl h-9 w-9 p-0 tabular-nums"
                            onClick={() => goToPage(p as number)}
                            aria-label={`Page ${p}`}
                            aria-current={p === currentPage ? "page" : undefined}
                        >
                            {p}
                        </Button>
                    )
                )}
            </div>

            <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-1 h-9 px-3"
                disabled={!hasNext}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
            >
                Next
                <ChevronRight className="w-4 h-4" aria-hidden />
            </Button>
        </nav>
    )
}
