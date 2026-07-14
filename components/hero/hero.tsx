import Link from "next/link";
import Navbar from "../layout/navbar";
import { Button } from "../ui/button";
import HeroImage from "./heroImage";


export function Hero() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <HeroImage />
            </div>
            {/* Subtle dark overlay to ensure the white text remains readable over the image */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Fade out to the page background at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
            
            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    Discover the tools developers actually use.
                </h1>

                <p className="text-lg text-white/80 mb-10 max-w-xl">
                    A curated directory of frameworks, APIs, and dev tools — tagged,
                    categorized, and vetted by real builders. No ads, no noise.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto" asChild>
                        <Link href="/tools">Browse Tools</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                        <Link href="/submit">Submit a Tool</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}