"use client";

import { motion } from "framer-motion";

// Inline interests - intentionally not a data file
const interests = ["music", "systems", "UI", "fashion", "writing", "experiments"];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const wordVariants = {
    hidden: {
        opacity: 0,
        y: 10,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export function InterestsSection() {
    return (
        <section className="py-16">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {interests.map((interest, index) => (
                        <motion.span
                            key={interest}
                            className="text-lg md:text-xl font-mono text-black/40 dark:text-white/40 tracking-wide"
                            variants={wordVariants}
                        >
                            {interest}
                            {index < interests.length - 1 && (
                                <span className="ml-4 text-black/20 dark:text-white/20">·</span>
                            )}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
