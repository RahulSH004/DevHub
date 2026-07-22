"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/Toggletheme"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Search, Sparkles, Activity } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur-md px-4 lg:px-6 transition-all">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground active:scale-[0.96]" />
        <Separator orientation="vertical" className="h-4 bg-border/60" />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-xs text-muted-foreground hover:text-foreground">
                DevHub
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                Admin Dashboard
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <Activity className="size-3.5 animate-pulse" />
          <span>System Healthy</span>
        </div>

        <ThemeToggle />

        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs font-medium shadow-xs hover:border-primary/50 transition-all active:scale-[0.96]"
        >
          <Link href="/" target="_blank">
            <span>Live App</span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
