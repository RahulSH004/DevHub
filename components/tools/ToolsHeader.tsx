import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBox } from "./searchbox"


export function ToolsHeader() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-28 pb-12 text-center">
            <div className="max-w-2xl w-full space-y-5 mt-20">

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
                    <Button
                        size="lg"
                        variant="outline"
                        className="shadow-sm hover:shadow-md transition-all duration-300"
                        asChild
                    >
                        <Link href="/create">Submit a Tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden /></Link>
                    </Button>
                </div>

            </div>
        </section>
    )
}
