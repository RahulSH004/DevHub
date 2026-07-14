"use client"
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./Toggletheme";
import { LoginButton, UserDropdown } from "./loginbutton";
import { authClient } from "@/app/lib/auth-client";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/create", label: "Create" },
] as const

export default function Navbar() {
    const pathname = usePathname()
    const { data: session, isPending } = authClient.useSession();
    
    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
        return null;
    }

    return (
        <nav aria-label="Main navigation" className={cn(
            "z-50 w-full transition-all",
            pathname === "/" 
                ? "absolute top-0 bg-transparent border-none" 
                : "sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}>
            <div className="max-w-7xl mx-auto px-6 mt-2">
                <div className="grid grid-cols-3 h-14 items-center">
                    <div className="justify-self-start">
                        <Logo />
                    </div>
                    <div className="flex items-center justify-center gap-8">
                        {NAV_LINKS.map(({ href, label }) => {
                            const isActive =
                                href === "/" ? pathname === "/" : pathname.startsWith(href)

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-amber-100 dark:hover:text-stone-100",
                                        isActive ? "text-white dark:text-shadow-amber-100" : "text-white dark:text-shadow-amber-100/60"
                                    )}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </div>
                    <div className="flex items-center justify-self-end gap-3">
                        <ThemeToggle />
                        {isPending ? (
                        <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
                        ) : session?.user ? (
                        <UserDropdown user={session.user} />
                        ) : (
                        <LoginButton />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}