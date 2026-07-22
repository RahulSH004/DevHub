import prisma from "@/lib/prisma"
import { SectionCards } from "@/components/section-cards"
import { PendingQueue } from "@/components/pendingqeueue"

export default async function AdminDashboardPage() {
  const [total, pending, approved, rejected] = await Promise.all([
    prisma.tool.count(),
    prisma.tool.count({ where: { status: "PENDING" } }),
    prisma.tool.count({ where: { status: "APPROVED" } }),
    prisma.tool.count({ where: { status: "REJECTED" } }),
  ])

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      <SectionCards
        total={total}
        pending={pending}
        approved={approved}
        rejected={rejected}
      />

      <div className="px-4 lg:px-6">
        <h2 className="mb-3 text-lg font-semibold">Pending Review</h2>
        <PendingQueue />
      </div>
    </div>
  )
}