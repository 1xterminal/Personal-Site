"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "@/app/components/ui/NavLink";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between py-8 md:py-12 z-40">
            {/* Logo/Name - visible on mobile */}
            <div className="md:hidden">
                <span className="text-sm font-mono text-black dark:text-white">GK</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 ml-auto">
                <NavLink href="#things">THINGS</NavLink>
                <NavLink href="#about">ABOUT</NavLink>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                <motion.span
                    className="w-6 h-0.5 bg-black dark:bg-white block"
                    animate={{
                        rotate: isMenuOpen ? 45 : 0,
                        y: isMenuOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-black dark:bg-white block"
                    animate={{
                        opacity: isMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-black dark:bg-white block"
                    animate={{
                        rotate: isMenuOpen ? -45 : 0,
                        y: isMenuOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-white dark:bg-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.98 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Close button */}
                        <button
                            className="absolute top-8 right-6 w-8 h-8 flex items-center justify-center z-50"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <span className="text-2xl text-black dark:text-white">×</span>
                        </button>

                        {/* Menu Content */}
                        <motion.nav
                            className="relative z-10 flex flex-col items-center justify-center h-full gap-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <a
                                href="#things"
                                className="text-4xl font-bold text-black dark:text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                THINGS
                            </a>
                            <a
                                href="#about"
                                className="text-4xl font-bold text-black dark:text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ABOUT
                            </a>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
