"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { useDebouncedCallback } from "@tanstack/react-pacer"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export function SearchBox() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [value, setValue] = useState(searchParams.get("q") ?? "")

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("page")
        value.trim() ? params.set("q", value.trim()) : params.delete("q")
        router.replace(`${pathname}?${params}`)
    }, {
        wait: 500
    })

    return (
        <InputGroup className="max-w-md mb-4 w-full bg-white dark:bg-zinc-900 border border-border/60 shadow-sm transition-opacity">
            <InputGroupInput
                placeholder="Search tools, categories or products"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    handleSearch(e.target.value)
                }}
                aria-label="Search tools"
            />
            <InputGroupAddon>
                <Search aria-hidden />
            </InputGroupAddon>
        </InputGroup>
    )
}
