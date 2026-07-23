"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Clock,
  Wrench,
  FolderTree,
  Users,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Plus,
} from "lucide-react"

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
  pendingCount?: number
}

export function AdminSidebar({ user, pendingCount = 0, ...props }: AdminSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: "Pending Review",
      href: "/admin#pending",
      icon: Clock,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeVariant: "destructive" as const,
    },
    {
      title: "All Tools",
      href: "/admin#tools",
      icon: Wrench,
      badge: null,
    },
    {
      title: "Categories",
      href: "/admin#categories",
      icon: FolderTree,
      badge: null,
    },
  ]

  const userInitials = (user?.name || user?.email || "AD")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60 bg-sidebar" {...props}>
      <SidebarHeader className="border-b border-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent/50 transition-colors">
              <Link href="/admin">
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight">DevHub Admin</span>
                  <span className="truncate text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="size-3 text-amber-500 fill-amber-500" />
                    Management Portal
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="group/btn relative font-medium transition-all active:scale-[0.98]"
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        <Icon className="size-4.5 text-muted-foreground group-hover/btn:text-foreground group-data-[active=true]/btn:text-primary transition-colors" />
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge !== null && (
                          <Badge
                            variant={item.badgeVariant || "secondary"}
                            className="ml-auto h-5 px-1.5 min-w-[20px] justify-center text-[10px] font-bold tracking-tight rounded-full tabular-nums"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3 mx-3" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Actions
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/tools/create"}
                  tooltip="Add New Tool"
                  className="group/btn relative font-medium transition-all active:scale-[0.98]"
                >
                  <Link href="/admin/tools/create" className="flex items-center gap-3">
                    <Plus className="size-4.5 text-muted-foreground group-hover/btn:text-foreground group-data-[active=true]/btn:text-primary transition-colors" />
                    <span className="flex-1 truncate">Add New Tool</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3 mx-3" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Quick Links
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Return to Main Website" className="active:scale-[0.98]">
                  <Link href="/" className="flex items-center gap-3">
                    <ArrowLeft className="size-4 text-muted-foreground" />
                    <span className="flex-1 truncate">Back to DevHub</span>
                    <ExternalLink className="size-3 text-muted-foreground opacity-60" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-accent/40 border border-border/40">
              <Avatar className="size-8 border border-border/50 shadow-xs">
                {user?.image && <AvatarImage src={user.image} alt={user.name || "User"} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                <span className="truncate font-medium text-foreground">{user?.name || "Admin User"}</span>
                <span className="truncate text-[11px] text-muted-foreground">{user?.email || "admin@devhub.com"}</span>
              </div>
              <Badge variant="outline" className="px-1.5 py-0 text-[9px] uppercase font-bold text-amber-500 border-amber-500/30 bg-amber-500/10">
                Admin
              </Badge>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
