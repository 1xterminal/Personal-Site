"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollBackgroundProps {
    children: React.ReactNode;
}

// Color palette from vinyl artwork
// --cocoa-brown: #171114 (darkest)
// --thunder: #382d31
// --livid-brown: #442131
// --eggplant: #694257
// --don-juan: #5e5156
// --strikemaster: #8b6078
// --hurricane: #8e8084
// --bouquet: #b796ae
// --lily: #c4aeb7
// --twilight: #e5d2d8 (lightest)

export function ScrollBackground({ children }: ScrollBackgroundProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Dark mode - using the vinyl palette
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [
            "#171114",     // Hero: cocoa-brown (pure dark)
            "#1a1318",     // Things: slight purple tint
            "#171114",     // Interests: back to neutral
            "#1c1517",     // About: slight warm shift
            "#171114",     // Footer: back to dark
        ]
    );

    // Light mode - using lighter tones from palette
    const backgroundColorLight = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [
            "#e5d2d8",     // Hero: twilight
            "#dccad2",     // Things: slightly warmer
            "#e5d2d8",     // Interests: back to twilight
            "#e8d8dc",     // About: slight pink tint
            "#e5d2d8",     // Footer: twilight
        ]
    );

    return (
        <div ref={ref} className="relative">
            {/* Dark mode background */}
            <motion.div
                className="fixed inset-0 -z-10 hidden dark:block"
                style={{ backgroundColor }}
            />
            {/* Light mode background */}
            <motion.div
                className="fixed inset-0 -z-10 dark:hidden"
                style={{ backgroundColor: backgroundColorLight }}
            />
            {children}
        </div>
    );
}
