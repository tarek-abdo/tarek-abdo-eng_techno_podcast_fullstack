import type { Metadata, Viewport } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Podcastr, PodcastWave – Listen, Learn, and Grow",
    template: "%s | Podcastr",
  },
  description: "A modern podcast app to browse and play episodes with a rich player.",
  openGraph: {
    type: "website",
    title: "Podcastr",
    description: "Browse and play podcasts with a delightful listening experience.",
    siteName: "Podcastr",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PodcastWave Website Preview",
      },
    ],
  },
  icons: {
    icon: "/Flat.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcastr",
    description: "Browse and play podcasts with a delightful listening experience.",
  },
  alternates: {
    canonical: "/",
  },
};

// ✅ Move viewport here (Next.js 15 requirement)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lexend.variable} font-sans`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
