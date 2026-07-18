import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import VisitToolButton from "@/components/tools/toolid/VisitToolButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ToolsPageBackground } from "@/components/tools/ToolsPageBackground"
import Footer from "@/components/layout/footer"
import { ArrowLeft, Calendar, Tag, User, Layers } from "lucide-react"

const statusConfig: Record<string, { label: string; className: string }> = {
    APPROVED: {
        label: "Approved",
        className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
    },
    PENDING: {
        label: "Pending Review",
        className: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
    },
}

export default async function Toolinfo({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const toolInfo = await prisma.tool.findUnique({
        where: {
            slug: slug
        },
        include: {
            category: true,
            tags: true,
            submittedBy: true
        }
    })

    if (!toolInfo || toolInfo.status === "REJECTED") {
        return notFound()
    }

    const status = statusConfig[toolInfo.status] ?? statusConfig.PENDING
    const initials = toolInfo.name.slice(0, 2).toUpperCase()

    return (
        <div className="min-h-screen bg-background relative">
            <ToolsPageBackground />

            <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl relative z-10">

                {/* Back link */}
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Back to Tools
                </Link>

                <Card className="w-full">

                    <CardHeader className="pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                                <Avatar className="w-14 h-14 rounded-xl shrink-0 ring-1 ring-border shadow-sm">
                                    <AvatarImage
                                        src={toolInfo.logoUrl ?? undefined}
                                        alt={toolInfo.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="rounded-xl bg-muted text-foreground font-bold text-lg tracking-tight">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                        {toolInfo.name}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Layers className="w-3.5 h-3.5 text-muted-foreground/60" />
                                        <span className="text-sm text-muted-foreground">
                                            {toolInfo.category.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: status badge + visit button */}
                            <div className="flex items-center gap-2.5 shrink-0">
                                <Badge
                                    variant="outline"
                                    className={status.className}
                                >
                                    {status.label}
                                </Badge>
                                <VisitToolButton url={toolInfo.url} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="h-px bg-border" />
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                About
                            </h2>
                            <p className="text-sm leading-relaxed text-foreground/90">
                                {toolInfo.description}
                            </p>
                        </div>

                        {toolInfo.tags.length > 0 && (
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                                    <Tag className="w-3 h-3" />
                                    Tags
                                </h2>
                                <div className="flex flex-wrap gap-1.5">
                                    {toolInfo.tags.map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-px bg-border" />

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                            {toolInfo.submittedBy && (
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    <span>
                                        Submitted by{" "}
                                        <span className="font-medium text-foreground">
                                            {toolInfo.submittedBy.name}
                                        </span>
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                    Added{" "}
                                    <time
                                        dateTime={toolInfo.createdAt.toISOString()}
                                        className="font-medium text-foreground"
                                    >
                                        {toolInfo.createdAt.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </time>
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    )
}