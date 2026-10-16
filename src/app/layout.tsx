import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "@/styles/globals.scss";
import "@/app/globals.css";

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
  title: {
    default: "Vastramay — Neo-Brutalist Fashion Collective",
    template: "%s | Vastramay",
  },
  description:
    "High-voltage men's and women's clothing engineered with bold aesthetics, uncompromised craft, and neo-brutalist edge.",
  keywords: ["fashion", "clothing", "menswear", "womenswear", "streetwear", "neo-brutalism", "vastramay"],
  authors: [{ name: "Vastramay Team" }],
  creator: "Vastramay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vastramay.local",
    siteName: "Vastramay",
    title: "Vastramay — Neo-Brutalist Fashion Collective",
    description:
      "High-voltage men's and women's clothing engineered with bold aesthetics, uncompromised craft, and neo-brutalist edge.",
  },
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${playfair.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--fg-base)] font-body selection:bg-[var(--color-pink)] selection:text-[var(--color-ink)]">
        <AppProviders>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

