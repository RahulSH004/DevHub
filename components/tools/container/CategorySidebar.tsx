"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Category = {
    id: string
    name: string
    slug: string
    _count: { tools: number }
}

type Props = {
    categories: Category[]
    activeSlug: string | null
}

export function CategorySidebar({ categories, activeSlug }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const setCategory = useCallback(
        (slug: string | null) => {
            const params = new URLSearchParams(searchParams.toString())
            // Reset to page 1 when category changes
            params.delete("page")
            if (slug) {
                params.set("category", slug)
            } else {
                params.delete("category")
            }
            router.push(`${pathname}?${params.toString()}`)
        },
        [pathname, router, searchParams]
    )

    const isAll = !activeSlug

    return (
        <nav className="flex flex-col gap-1.5" aria-label="Tool categories">
            {/* All button */}
            <Button
                variant={isAll ? "default" : "ghost"}
                className={cn(
                    "justify-start w-full text-left font-medium rounded-xl transition-all duration-200 overflow-hidden",
                    !isAll && "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
                onClick={() => setCategory(null)}
                aria-current={isAll ? "page" : undefined}
            >
                <span className="flex-1 min-w-0 truncate text-left">All</span>
            </Button>

            {/* Category buttons */}
            {categories.map((cat) => {
                const isActive = activeSlug === cat.slug
                return (
                    <Button
                        key={cat.id}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                            "justify-start w-full text-left font-medium rounded-xl transition-all duration-200 overflow-hidden",
                            !isActive && "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                        )}
                        onClick={() => setCategory(cat.slug)}
                        aria-current={isActive ? "page" : undefined}
                    >
                        <span className="flex-1 min-w-0 truncate text-left">{cat.name}</span>
                        <span className={cn(
                            "shrink-0 text-xs tabular-nums rounded-full px-2 py-0.5",
                            isActive
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                        )}>
                            {cat._count.tools}
                        </span>
                    </Button>
                )
            })}
        </nav>
    )
}
