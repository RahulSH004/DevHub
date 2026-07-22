"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"

interface AdminShellProps {
  children: React.ReactNode
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
  pendingCount?: number
}

export function AdminShell({ children, user, pendingCount = 0 }: AdminShellProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-background font-sans antialiased text-foreground">
          <AdminSidebar user={user} pendingCount={pendingCount} />
          <SidebarInset className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
            <AdminHeader />
            <main className="flex-1 px-4 py-6 md:px-8 lg:px-10 max-w-7xl w-full mx-auto space-y-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
