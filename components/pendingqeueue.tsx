import prisma from "@/lib/prisma"
import { PendingToolRow } from "./pendingtoolrow"

export async function PendingQueue() {
  const pendingTools = await prisma.tool.findMany({
    where: { status: "PENDING" },
    include: {
      category: true,
      submittedBy: true,
    },
    orderBy: { createdAt: "asc" },
  })

  if (pendingTools.length === 0) {
    return (
      <div className="px-4 py-12 text-center text-muted-foreground lg:px-6">
        No tools pending review — you are all caught up.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 px-4 lg:px-6">
      {pendingTools.map((tool) => (
        <PendingToolRow key={tool.id} tool={tool} />
      ))}
    </div>
  )
}