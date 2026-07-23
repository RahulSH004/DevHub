import Image from "next/image"

export default function HeroImage() {
    return (
        <>
            {/* Light theme hero illustration */}
            <Image
                src="/smallhero1.png"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center dark:hidden"
                priority
            />
            {/* Dark theme hero illustration */}
            <Image
                src="/drakhero.png"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center hidden dark:block"
                priority
            />
            {/* Bottom fade into page background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </>
    )
}