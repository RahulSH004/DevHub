import { cn } from "@/lib/utils"

export default function HeroImage() {
    return (
        <>
            <div
                className={cn(
                    "absolute inset-0",
                    "[bg-size:40px_40px]",
                    "[bg-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[bg-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            {/* Radial fade — dissolves grid edges */}
            <div className="pointer-events-none absolute inset-0 bg-white [mask:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        </>
    )
}