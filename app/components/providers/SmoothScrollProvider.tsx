"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
    lenis: Lenis | null;
    scrollTo: (target: number | string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
    lenis: null,
    scrollTo: () => { },
});

export function useSmoothScroll() {
    return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({
    children,
}: {
    children: ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // RAF loop for Lenis
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    const scrollTo = (
        target: number | string | HTMLElement,
        options?: { offset?: number; duration?: number }
    ) => {
        lenisRef.current?.scrollTo(target, {
            offset: options?.offset ?? 0,
            duration: options?.duration ?? 1.2,
        });
    };

    return (
        <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
