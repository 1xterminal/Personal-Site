import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/app/components/providers/SmoothScrollProvider";
import { PreloaderProvider } from "@/app/components/providers/PreloaderProvider";
import { CustomCursor } from "@/app/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gian Kenar Javier",
  description: "I build things and collect ideas. Code, clothes, words, and experiments.",
  keywords: ["developer", "designer", "creative", "portfolio", "personal site"],
  authors: [{ name: "Gian Kenar Javier" }],
  creator: "Gian Kenar Javier",
  openGraph: {
    title: "Gian Kenar Javier",
    description: "I build things and collect ideas.",
    type: "website",
    locale: "en_US",
    siteName: "Gian Kenar Javier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gian Kenar Javier",
    description: "I build things and collect ideas.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://giankenar.com"), // Update with your actual domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preload LCP element */}
        <link
          rel="preload"
          href="/vinyl-transparent.png"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <CustomCursor />
          <PreloaderProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
