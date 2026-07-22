import { requireAdmin } from "@/app/lib/auth"
import prisma from "@/lib/prisma"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAdmin()
  const pendingCount = await prisma.tool.count({
    where: { status: "PENDING" },
  })

  return (
    <AdminShell user={session.user} pendingCount={pendingCount}>
      {children}
    </AdminShell>
  )
}