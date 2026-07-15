import Image from "next/image";
import hero from "@/public/hero3.png"

export default function HeroImage(){
    return(
        <Image 
            alt="hero background"
            src={hero}
            fill
            className="object-cover object-center"
            priority
        />
    )
}