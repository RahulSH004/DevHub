import { ToolCard } from "@/components/ToolCard";
import { prisma } from "@/app/lib/db";

export default async function ToolsPage() {
    const tools = await prisma.tool.findMany({
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {tools.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground">
          No tools found yet.
        </p>
      ) : (
        tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
      )}
    </div>
  );
}