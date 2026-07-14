import Image from "next/image";
import logoLight from "@/public/logo.png";
import logoDark from "@/public/logo1.png";

export default function Logo() {
    return (
        <div className="relative flex items-center">
            <Image 
                alt="DevHub Logo"
                src={logoLight}
                className="w-20 h-auto dark:hidden"
                priority
            />
            <Image 
                alt="DevHub Logo Dark"
                src={logoDark}
                className="w-20 h-auto hidden dark:block"
                priority
            />
        </div>
    );
}