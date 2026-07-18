import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ToolCardProps = {
  slug: string
  name: string
  category: string
  logoUrl?: string | null
  description?: string | null
}

export function ToolCard({ slug, name, category, logoUrl, description }: ToolCardProps) {
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <Link
      href={`/tools/${slug}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-border/50 bg-background p-4 
        transition-all duration-150 ease-out
        hover:border-border hover:shadow-md hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Top row: logo + arrow */}
      <div className="flex items-start justify-between gap-2">
        <Avatar className="w-10 h-10 rounded-lg shrink-0">
          <AvatarImage
            src={logoUrl ?? undefined}
            alt={name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-lg bg-muted text-foreground font-semibold text-sm tracking-tight">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Arrow appears on hover */}
        <ArrowUpRight
          className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5 
            transition-all duration-150 ease-out
            group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>

      {/* Name + category */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <h3 className="font-semibold text-sm text-foreground truncate leading-snug">
          {name}
        </h3>
        <span className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wide truncate">
          {category}
        </span>
      </div>

      {/* Description — only if provided */}
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
    </Link>
  )
}