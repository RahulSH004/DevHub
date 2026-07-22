"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "./Logo";
import { ThemeToggle } from "./Toggletheme";
import { LoginButton, UserDropdown } from "./loginbutton";
import { authClient } from "@/app/lib/auth-client";

import {
    Navbar as ResizableNavbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarButton,
} from "@/components/ui/resizable_navbar";

const NAV_LINKS = [
    { name: "Home", link: "/" },
    { name: "Tools", link: "/tools" },
    { name: "Create", link: "/create" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Hide navbar on auth pages and admin pages
    if (
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up") ||
        pathname.startsWith("/admin")
    ) {
        return null;
    }

    return (
        <ResizableNavbar>
                {/* ── Desktop ── */}
                <NavBody>
                    <Link href="/" className="relative z-20">
                        <Logo />
                    </Link>

                    <NavItems items={NAV_LINKS} />

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {isPending ? (
                            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                        ) : session?.user ? (
                            <UserDropdown user={session.user} />
                        ) : (
                            <NavbarButton
                                as={Link}
                                href="/sign-in"
                                variant="dark"
                            >
                                Sign In
                            </NavbarButton>
                        )}
                    </div>
                </NavBody>

                {/* ── Mobile ── */}
                <MobileNav>
                    <MobileNavHeader>
                        <Link href="/" className="relative z-20">
                            <Logo />
                        </Link>

                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <MobileNavToggle
                                isOpen={mobileOpen}
                                onClick={() => setMobileOpen(!mobileOpen)}
                            />
                        </div>
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                    >
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.link}
                                href={item.link}
                                onClick={() => setMobileOpen(false)}
                                className="w-full text-neutral-600 dark:text-neutral-300"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex w-full items-center gap-3 pt-2">
                            {isPending ? (
                                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                            ) : session?.user ? (
                                <UserDropdown user={session.user} />
                            ) : (
                                <NavbarButton
                                    as={Link}
                                    href="/sign-in"
                                    variant="dark"
                                    className="w-full"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Sign In
                                </NavbarButton>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
        </ResizableNavbar>
    );
}