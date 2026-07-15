import { cn } from "@/lib/utils"

/**
 * Full-page grid background for the tools page.
 * Renders as a fixed layer behind all content, with a radial fade
 * so the grid dissolves naturally toward the edges.
 */
export function ToolsPageBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
            {/* Grid lines */}
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            {/* Radial vignette — dissolves grid edges into the page background */}
            <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        </div>
    )
}
