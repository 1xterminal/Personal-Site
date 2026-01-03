"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for cursor movement
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const moveCursor = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        },
        [cursorX, cursorY, isVisible]
    );

    useEffect(() => {
        // Hide on touch devices
        if ("ontouchstart" in window) return;

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseenter", () => setIsVisible(true));
        window.addEventListener("mouseleave", () => setIsVisible(false));
        window.addEventListener("mousedown", () => setIsClicking(true));
        window.addEventListener("mouseup", () => setIsClicking(false));

        // Track hoverable elements
        const addHoverListeners = () => {
            const hoverables = document.querySelectorAll(
                "a, button, [role='button'], input, textarea, select, .hoverable"
            );
            hoverables.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        addHoverListeners();

        // Observer for dynamic content
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
        };
    }, [moveCursor]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="rounded-full bg-white"
                    animate={{
                        width: isHovering ? 48 : isClicking ? 8 : 12,
                        height: isHovering ? 48 : isClicking ? 8 : 12,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </motion.div>
        </>
    );
}
