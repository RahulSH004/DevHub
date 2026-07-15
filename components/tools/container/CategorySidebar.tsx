"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
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

    const itemBase =
        "group flex items-center justify-between w-full rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-100 ease-out cursor-pointer select-none"

    const activeClass = "bg-foreground/[0.06] text-foreground font-medium"
    const inactiveClass = "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground font-normal"

    return (
        <nav className="flex flex-col gap-0.5" aria-label="Tool categories">

            {/* All */}
            <button
                type="button"
                className={cn(itemBase, isAll ? activeClass : inactiveClass)}
                onClick={() => setCategory(null)}
                aria-current={isAll ? "page" : undefined}
            >
                <span className="truncate min-w-0">All</span>
            </button>

            {/* Divider */}
            <div className="my-1 h-px bg-border/60 mx-1" role="separator" />

            {/* Category rows */}
            {categories.map((cat) => {
                const isActive = activeSlug === cat.slug
                return (
                    <button
                        key={cat.id}
                        type="button"
                        className={cn(itemBase, isActive ? activeClass : inactiveClass)}
                        onClick={() => setCategory(cat.slug)}
                        aria-current={isActive ? "page" : undefined}
                    >
                        <span className="truncate min-w-0 text-left">{cat.name}</span>
                        <span
                            className={cn(
                                "shrink-0 ml-2 tabular-nums text-xs transition-colors duration-100",
                                isActive ? "text-foreground/60" : "text-muted-foreground/50"
                            )}
                        >
                            {cat._count.tools}
                        </span>
                    </button>
                )
            })}
        </nav>
    )
}
