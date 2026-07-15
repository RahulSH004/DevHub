import Link from "next/link"
import { ExternalLink } from "lucide-react"

import {
  Card,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type ToolCardProps = {
  id: string
  name: string
  category: string
  logoUrl?: string | null
}

export function ToolCard({ id, name, category, logoUrl }: ToolCardProps) {
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <Card className="flex items-center justify-between gap-4 px-4 py-3 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="w-11 h-11 rounded-lg shrink-0">
          <AvatarImage 
            src={logoUrl ?? undefined} 
            alt={name} 
            className="object-cover" 
          />
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <p className="text-xs text-muted-foreground truncate">{category}</p>
          
          <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0 text-orange-500">
            <Link href={`/tools/${id}`}>
              <span className="flex items-center gap-1">
                Try it <ExternalLink className="w-3 h-3" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}