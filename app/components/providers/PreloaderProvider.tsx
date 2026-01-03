"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderContextType {
    isComplete: boolean;
}

const PreloaderContext = createContext<PreloaderContextType>({ isComplete: false });

export function usePreloader() {
    return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Loading time for vinyl animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Mark as complete after exit animation finishes
    const handleExitComplete = () => {
        setIsComplete(true);
    };

    return (
        <PreloaderContext.Provider value={{ isComplete }}>
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                {isLoading && (
                    <motion.div
                        key="preloader"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.5,
                            transition: { duration: 0.8, ease: "easeIn" },
                        }}
                    >
                        {/* Spinning Vinyl */}
                        <motion.div
                            className="w-48 h-48 md:w-64 md:h-64 relative"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 4, // Slower, more relaxed spin
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <Image
                                src="/vinyl-transparent.png"
                                alt=""
                                width={256}
                                height={256}
                                priority
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </PreloaderContext.Provider>
    );
}
