import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-[#0a0a0a]">
            <div className="text-center max-w-md">
                {/* Large 404 */}
                <h1 className="text-[150px] md:text-[200px] font-black leading-none text-black/10 dark:text-white/10">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white -mt-8 mb-4">
                    Page not found
                </h2>
                <p className="text-base text-black/60 dark:text-white/60 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Back home link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                >
                    <span>←</span>
                    <span>Back home</span>
                </Link>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-8 text-xs font-mono text-black/30 dark:text-white/30">
                Lost? It happens.
            </div>
        </div>
    );
}
