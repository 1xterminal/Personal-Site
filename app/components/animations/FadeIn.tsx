"use client";

import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { usePreloader } from "@/app/components/providers/PreloaderProvider";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.6,
    direction = "up",
    className = "",
}: FadeInProps) {
    const { isComplete } = usePreloader();
    const controls = useAnimation();

    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: {},
    };

    useEffect(() => {
        if (isComplete) {
            // Trigger animation after preloader completes
            controls.start({
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            });
        }
    }, [isComplete, controls, delay, duration]);

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction],
            }}
            animate={controls}
            className={className}
        >
            {children}
        </motion.div>
    );
}

