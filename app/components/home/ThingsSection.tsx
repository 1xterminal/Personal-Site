"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/app/components/animations/FadeIn";
import { things } from "@/app/lib/data/things";
import { useRef } from "react";

export function ThingsSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    return (
        <section id="things" className="py-24 relative" ref={ref}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Sticky header with transparent bg to inherit scroll background */}
                <div className="sticky top-20 z-10 backdrop-blur-sm -mx-6 px-6 md:-mx-12 md:px-12 pb-4">
                    <FadeIn>
                        <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/20 pb-6">
                            <h2 className="text-sm font-mono text-black dark:text-white uppercase tracking-widest">
                                Things
                            </h2>
                            <span className="text-xs font-mono text-black/40 dark:text-white/40">
                                {things.length} items
                            </span>
                        </div>
                    </FadeIn>
                </div>

                {/* Staggered parallax list of things */}
                <div className="flex flex-col gap-12 mt-8">
                    {things.map((thing, index) => {
                        return (
                            <ThingItem
                                key={thing.title}
                                thing={thing}
                                index={index}
                                scrollProgress={scrollYProgress}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface ThingItemProps {
    thing: { title: string; desc: string; link?: string };
    index: number;
    scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ThingItem({ thing, index, scrollProgress }: ThingItemProps) {
    // Staggered parallax - each item moves at slightly different rate
    const y = useTransform(
        scrollProgress,
        [0, 1],
        [50 + index * 10, -30 - index * 5]
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group"
        >
            <motion.div style={{ y }}>
                {thing.link ? (
                    <a
                        href={thing.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-4 border-b border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors"
                    >
                        <span className="text-xs font-mono text-black/30 dark:text-white/30 w-8">
                            0{index + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                            {thing.title}
                        </h3>
                        <span className="text-base text-black/50 dark:text-white/50 md:ml-auto">
                            {thing.desc}
                        </span>
                        <span className="text-xs font-mono text-black/30 dark:text-white/30 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                            ↗
                        </span>
                    </a>
                ) : (
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-4">
                        <span className="text-xs font-mono text-black/30 dark:text-white/30 w-8">
                            0{index + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                            {thing.title}
                        </h3>
                        <span className="text-base text-black/50 dark:text-white/50 md:ml-auto">
                            {thing.desc}
                        </span>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
