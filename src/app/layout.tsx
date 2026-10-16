import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "@/styles/globals.scss";
import "@/app/globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/layout/PageLoader";
import { AppProviders } from "@/components/providers/AppProviders";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF5C8A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Vastramay — Neo-Brutalist Fashion Collective",
    template: "%s | Vastramay",
  },
  description: siteConfig.description,
  keywords: [
    "fashion",
    "clothing",
    "menswear",
    "womenswear",
    "handloom",
    "kurtas",
    "nehru jackets",
    "neo-brutalism",
    "vastramay",
  ],
  authors: [{ name: "Vastramay Studio Team" }],
  creator: "Vastramay",
  publisher: "Vastramay",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Vastramay — Neo-Brutalist Fashion Collective",
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vastramay — Neo-Brutalist Fashion Collective",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vastramay — Neo-Brutalist Fashion Collective",
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "Vastramay",
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: "Vastramay",
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--fg-base)] font-body selection:bg-[var(--color-pink)] selection:text-[var(--color-ink)]">
        {/* Accessible Skip Link for Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:px-4 focus:py-2 focus:bg-brand-yellow focus:text-brand-ink focus:border-2 focus:border-brand-ink focus:shadow-neo font-display font-extrabold text-xs uppercase tracking-wider"
        >
          Skip to main content
        </a>

        <AppProviders>
          <PageLoader />
          <Header />
          <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
