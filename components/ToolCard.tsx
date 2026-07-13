import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tool, Category } from "@/generated/prisma/browser"; // confirm this path resolves — check tsconfig
import Link from "next/link";

type ToolWithCategory = Tool & { category: Category };

export function ToolCard({ tool }: { tool: ToolWithCategory }) {
  return (
    <Link href={`/tools/${tool.id}`+tool.name} className="block h-full">
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <Badge variant="secondary">{tool.category.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3">
          {tool.description}
        </CardDescription>
      </CardContent>
    </Card>
    </Link>
  );
}