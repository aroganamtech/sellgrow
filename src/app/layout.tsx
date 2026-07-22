import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollRestoration from "@/components/utils/ScrollRestoration";
import ScrollProgressIndicator from "@/components/utils/ScrollProgressIndicator";
import SmoothScroll from "@/components/utils/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SellGrow | The Intelligent Sell & Growth Platform",
  description:
    "A single unified intelligence ecosystem that automates CRM, omnichannel communications, AI voice assistants, visual workflows, and online store catalogs.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen grid-bg">
        <ScrollRestoration />
        <ScrollProgressIndicator />
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
