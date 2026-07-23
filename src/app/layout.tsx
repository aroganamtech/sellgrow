import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollRestoration from "@/components/utils/ScrollRestoration";
import ScrollProgressIndicator from "@/components/utils/ScrollProgressIndicator";
import SmoothScroll from "@/components/utils/SmoothScroll";
import Script from "next/script";

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

// Next.js Metadata API - Handles Canonical URLs, OG Tags, Twitter Cards, and Verification tags
export const metadata: Metadata = {
  metadataBase: new URL("https://sellgrow.co"),
  title: {
    default: "SellGrow | The Intelligent Sell & Growth Platform",
    template: "%s | SellGrow"
  },
  description:
    "A single unified intelligence ecosystem that automates CRM, omnichannel communications, AI voice assistants, visual workflows, and online store catalogs.",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sellgrow.co",
    siteName: "SellGrow",
    title: "SellGrow | The Intelligent Sell & Growth Platform",
    description: "A single unified intelligence ecosystem that automates CRM, omnichannel communications, AI voice assistants, visual workflows, and online store catalogs.",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "SellGrow Platform Preview",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SellGrow | The Intelligent Sell & Growth Platform",
    description: "A single unified intelligence ecosystem that automates CRM, omnichannel communications, AI voice assistants, visual workflows, and online store catalogs.",
    images: ["/favicon.png"],
  },
  verification: {
    google: "google-site-verification-id-placeholder",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data Schema configurations (Organization, LocalBusiness, Service, Website)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sellgrow.co/#organization",
        "name": "SellGrow",
        "url": "https://sellgrow.co",
        "logo": "https://sellgrow.co/logos/logo.png",
        "sameAs": [
          "https://twitter.com/sellgrow",
          "https://linkedin.com/company/sellgrow"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://sellgrow.co/#localbusiness",
        "name": "SellGrow Headquarters",
        "image": "https://sellgrow.co/favicon.png",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Grand Tower, 4th Floor",
          "addressLocality": "Chennai",
          "addressRegion": "TN",
          "postalCode": "600001",
          "addressCountry": "IN"
        },
        "telephone": "+919876543210"
      },
      {
        "@type": "Service",
        "name": "AI Voice Assistants & CRM Automation",
        "provider": {
          "@type": "Organization",
          "name": "SellGrow"
        },
        "description": "Unified intelligence ecosystem that automates CRM, omnichannel communications, AI voice assistants, and visual workflows."
      },
      {
        "@type": "WebSite",
        "@id": "https://sellgrow.co/#website",
        "url": "https://sellgrow.co",
        "name": "SellGrow",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://sellgrow.co/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`dark ${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Structured Data Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen grid-bg">
        {/* Google Analytics 4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SELLGROW4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SELLGROW4');
          `}
        </Script>

        {/* Microsoft Clarity Script */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sellgrow-clarity");
          `}
        </Script>

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
