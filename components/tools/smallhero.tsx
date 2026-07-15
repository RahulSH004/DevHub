import { Suspense } from "react"
import Image from "next/image"
import smallhero from "@/public/smallhero1.png"
import Link from "next/link"
import { Button } from "../ui/button"
import { SearchBox } from "./searchbox"
import { ArrowRight } from "lucide-react"

export default function Smallhero() {
    return (
        <section className="relative w-full h-[380px] overflow-hidden">
            <Image
                alt="smallhero"
                src={smallhero}
                fill
                className="object-cover object-center"
                priority
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
                <div className="max-w-2xl w-full space-y-5">
                    {/* SearchBox uses useSearchParams — needs Suspense boundary */}
                    <div className="flex justify-center">
                        <Suspense
                            fallback={
                                <div className="max-w-md w-full h-12 rounded-xl bg-white/30 backdrop-blur-sm animate-pulse shadow-lg" />
                            }
                        >
                            <SearchBox />
                        </Suspense>
                    </div>

                    <span className="text-sm font-medium uppercase tracking-widest text-stone-800">
                        Explore 1k+ handpicked tools used by developers
                        and teams building the future
                    </span>

                    <div className="flex sm:flex-row sm:justify-center mt-8">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto shadow-sm hover:shadow-md transition-all duration-300" asChild>
                            <Link href="/create">Submit a Tool <ArrowRight /> </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}