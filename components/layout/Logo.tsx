import Image from "next/image";
import logo from "@/public/logo.png"

export default function Logo(){
    return(
        <Image 
            alt="Logo"
            src={logo}
            className="w-20 h-auto"
            priority
        />
    )
}