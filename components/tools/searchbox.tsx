"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useState, useTransition } from "react"
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export function SearchBox() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Controlled value initialized from URL so it stays in sync on back/forward
    const [value, setValue] = useState(searchParams.get("q") ?? "")

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const q = e.target.value
            setValue(q)

            // Debounce via useTransition (low-priority update)
            startTransition(() => {
                const params = new URLSearchParams(searchParams.toString())
                // Reset pagination when search changes
                params.delete("page")
                if (q.trim()) {
                    params.set("q", q.trim())
                } else {
                    params.delete("q")
                }
                router.push(`${pathname}?${params.toString()}`)
            })
        },
        [pathname, router, searchParams]
    )

    return (
        <InputGroup className={`max-w-md mb-4 shadow-lg shadow-black/20 dark:shadow-white/20 transition-opacity ${isPending ? "opacity-70" : "opacity-100"}`}>
            <InputGroupInput
                placeholder="Search tools, categories or products"
                value={value}
                onChange={handleChange}
                aria-label="Search tools"
            />
            <InputGroupAddon>
                <Search aria-hidden />
            </InputGroupAddon>
        </InputGroup>
    )
}
