"use client";

import Link from "next/link";
import { Magnetic } from "@/app/components/animations/Magnetic";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
    return (
        <Magnetic strength={0.2}>
            <Link href={href} className="group relative">
                <span className="text-xs font-mono text-black dark:text-white transition-all duration-200">
                    {children}
                </span>
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black dark:bg-white group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
        </Magnetic>
    );
}
