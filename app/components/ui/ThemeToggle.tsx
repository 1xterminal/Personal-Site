"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/components/providers/ThemeProvider";
import { Magnetic } from "@/app/components/animations/Magnetic";

export function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // Show placeholder during SSR to prevent hydration mismatch
    if (!mounted) {
        return (
            <div
                className="fixed top-6 left-6 md:top-8 md:left-8 w-10 h-10 z-50"
                aria-hidden="true"
            />
        );
    }

    return (
        <div className="fixed top-6 left-6 md:top-8 md:left-8 z-50">
            <Magnetic strength={0.3}>
                <motion.button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: theme === "dark" ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {theme === "light" ? (
                            // Moon icon for switching to dark
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-black dark:text-white"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            // Sun icon for switching to light
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-black dark:text-white"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </motion.div>
                </motion.button>
            </Magnetic>
        </div>
    );
}
