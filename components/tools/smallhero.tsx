import { Suspense } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { SearchBox } from "./searchbox"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Smallhero() {
    return (
        <section className="relative w-full h-[380px] overflow-hidden bg-white dark:bg-black">
            {/* Grid background */}
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            {/* Radial fade — makes edges dissolve into background */}
            <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                <div className="max-w-2xl w-full space-y-5">

                    {/* SearchBox uses useSearchParams — needs Suspense boundary */}
                    <div className="flex justify-center">
                        <Suspense
                            fallback={
                                <div className="max-w-md w-full h-12 rounded-xl bg-muted/40 animate-pulse" />
                            }
                        >
                            <SearchBox />
                        </Suspense>
                    </div>

                    <span className="block text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        Explore 1k+ handpicked tools used by developers &amp; teams building the future
                    </span>

                    <div className="flex justify-center">
                        <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-300" asChild>
                            <Link href="/create">Submit a Tool <ArrowRight /></Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}