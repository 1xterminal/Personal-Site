"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { usePreloader } from "@/app/components/providers/PreloaderProvider";
import { useRef } from "react";

interface HeroSectionProps {
    name?: string;
    tagline?: string;
}

// Animation variants with proper typing
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const lineVariants: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

const fadeUpVariants: Variants = {
    hidden: {
        y: 30,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export function HeroSection({
    name = "Gian\nKenar",
    tagline = "I build things and collect ideas.",
}: HeroSectionProps) {
    const { isComplete } = usePreloader();
    const nameParts = name.split("\n");
    const ref = useRef<HTMLElement>(null);

    // Scroll-linked parallax and fade
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax: name moves slower (0.5x speed)
    const nameY = useTransform(scrollYProgress, [0, 1], [0, 150]);

    // Tagline moves at normal speed but with slight offset
    const taglineY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Fade and blur as you scroll away
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const blur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

    return (
        <main ref={ref} className="flex-grow flex flex-col pt-20 pb-24 md:pt-32 md:pb-40 relative">
            <motion.div
                className="flex flex-col gap-6 md:gap-8 max-w-5xl"
                variants={containerVariants}
                initial="hidden"
                animate={isComplete ? "visible" : "hidden"}
                style={{
                    opacity,
                    scale,
                    filter: blur.get() > 0 ? `blur(${blur.get()}px)` : "none",
                }}
            >
                {/* Animated Name with Parallax */}
                <motion.h1
                    className="text-8xl sm:text-9xl md:text-[140px] lg:text-[180px] font-black leading-[0.8] tracking-[-0.04em] uppercase break-words group"
                    style={{ y: nameY }}
                >
                    {nameParts.map((part, index) => (
                        <span key={index} className="overflow-hidden block">
                            <motion.span
                                className="block bg-clip-text transition-all duration-500 text-black dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#694257] group-hover:via-[#8b6078] group-hover:to-[#b796ae]"
                                variants={lineVariants}
                            >
                                {part}
                            </motion.span>
                        </span>
                    ))}
                </motion.h1>

                {/* Animated Tagline with Parallax */}
                <motion.p
                    className="text-xl md:text-2xl lg:text-3xl font-normal text-black/70 dark:text-white/70 max-w-2xl leading-tight mt-4"
                    variants={fadeUpVariants}
                    style={{ y: taglineY }}
                >
                    {tagline}
                </motion.p>
            </motion.div>
        </main>
    );
}
