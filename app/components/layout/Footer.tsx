"use client";

import Link from "next/link";
import { FadeIn } from "@/app/components/animations/FadeIn";
import { Magnetic } from "@/app/components/animations/Magnetic";

interface SocialLinkProps {
    href: string;
    children: React.ReactNode;
}

function SocialLink({ href, children }: SocialLinkProps) {
    return (
        <Magnetic strength={0.2}>
            <Link
                href={href}
                className="text-sm font-mono text-black dark:text-white hover:underline underline-offset-4 transition-all flex items-center gap-2 group"
            >
                <span className="w-2 h-2 rounded-full bg-black dark:bg-white group-hover:scale-150 transition-transform"></span>
                {children}
            </Link>
        </Magnetic>
    );
}

export function Footer() {
    return (
        <FadeIn>
            <footer className="py-12 border-t border-black/10 dark:border-white/20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex flex-col gap-2">
                    <h4 className="text-black dark:text-white font-bold text-lg mb-2">
                        Let&apos;s build something.
                    </h4>
                    <div className="flex flex-col gap-1 items-start">
                        <Magnetic strength={0.15}>
                            <Link
                                href="mailto:hello@example.com"
                                className="text-sm font-mono text-black dark:text-white hover:underline transition-all decoration-1 underline-offset-4"
                            >
                                hello@example.com
                            </Link>
                        </Magnetic>
                    </div>
                </div>

                <div className="flex gap-8">
                    <SocialLink href="#">GitHub</SocialLink>
                    <SocialLink href="#">LinkedIn</SocialLink>
                    <SocialLink href="https://medium.com/@your-handle">Medium</SocialLink>
                    <SocialLink href="#">Twitter / X</SocialLink>
                </div>

                <div className="md:hidden pt-8 text-xs font-mono text-black dark:text-zinc-400">
                    © {new Date().getFullYear()}
                </div>
            </footer>
        </FadeIn>
    );
}
