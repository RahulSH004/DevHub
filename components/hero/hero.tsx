import Link from "next/link";
import { Button } from "../ui/button";
import HeroImage from "./heroImage";


export function Hero() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <HeroImage />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
                <div className="max-w-3xl space-y-6">
                    <span className="text-sm font-medium uppercase tracking-widest text-white/70">
                        Built for people who ship
                    </span>

                    <h1 className="font-sans text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.1]">
                        Discover the tools developers actually use.
                    </h1>

                    <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg sm:leading-8 px-4 mx-auto">
                        A curated directory of frameworks, APIs, and dev tools tagged,
                        categorized, and vetted by real builders. No ads, no noise.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" className="w-full sm:w-auto" asChild>
                            <Link href="/tools">Browse Tools</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                            <Link href="/submit">Submit a Tool</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}