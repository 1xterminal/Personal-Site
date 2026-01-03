"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FadeIn } from "@/app/components/animations/FadeIn";
import { useRef } from "react";

interface HighlightWordProps {
    children: string;
    delay?: number;
}

function HighlightWord({ children, delay = 0 }: HighlightWordProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

    return (
        <motion.span
            ref={ref}
            className="inline-block text-black dark:text-white font-semibold"
            initial={{ opacity: 0.4 }}
            animate={{
                opacity: isInView ? 1 : 0.4,
                scale: isInView ? 1 : 0.98,
            }}
            transition={{
                duration: 0.5,
                delay: isInView ? delay : 0,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.span>
    );
}

export function AboutSection() {
    return (
        <section id="about" className="py-24">
            <div className="max-w-[800px] mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/20 pb-6 mb-12">
                        <h2 className="text-sm font-mono text-black dark:text-white uppercase tracking-widest">
                            About
                        </h2>
                    </div>
                </FadeIn>

                <div className="flex flex-col gap-6">
                    {/* First paragraph with highlights */}
                    <motion.p
                        className="text-xl md:text-2xl text-black/60 dark:text-white/60 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        I make things. Sometimes it's{" "}
                        <HighlightWord delay={0}>code</HighlightWord>
                        , sometimes it's{" "}
                        <HighlightWord delay={0.1}>clothes</HighlightWord>
                        , sometimes it's just{" "}
                        <HighlightWord delay={0.2}>words</HighlightWord>
                        {" "}for no one in particular.
                    </motion.p>

                    {/* Second paragraph */}
                    <motion.p
                        className="text-base md:text-lg text-black/50 dark:text-white/50 leading-relaxed"
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        I care more about how something{" "}
                        <HighlightWord delay={0.3}>feels</HighlightWord>
                        {" "}than how it scales. Most of what I build is for myself first. If others find it useful, that's a bonus.
                    </motion.p>

                    {/* Third paragraph */}
                    <motion.p
                        className="text-base md:text-lg text-black/50 dark:text-white/50 leading-relaxed"
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        This site is a collection of things I've made and things I'm thinking about. It{" "}
                        <HighlightWord delay={0.4}>changes</HighlightWord>
                        {" "}when I change.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
