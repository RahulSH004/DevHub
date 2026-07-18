"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function VisitToolButton({ url }: { url: string }) {
  return (
    <Button asChild size="sm" className="gap-1.5">
      <a href={url} target="_blank" rel="noopener noreferrer">
        Visit Tool
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </Button>
  )
}