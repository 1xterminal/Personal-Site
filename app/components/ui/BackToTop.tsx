"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollTo } = useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 500px
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        // Use Lenis scrollTo for proper smooth scroll
        scrollTo(0, { duration: 1.5 });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={handleClick}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Back to top"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
