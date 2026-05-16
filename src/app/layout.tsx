import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://docs.runcabinet.com";
const SITE_TITLE = "Cabinet — Your Knowledge Base, your AI Team";
const SITE_DESCRIPTION =
  "Cabinet is a local-first knowledge base and AI team workspace. One folder for your notes, files, and agents — markdown-backed, portable, and yours.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s — Cabinet"
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: "Cabinet Docs",
  authors: [{ name: "Cabinet", url: "https://runcabinet.com" }],
  keywords: [
    "Cabinet",
    "AI agents",
    "knowledge base",
    "local-first",
    "markdown",
    "Claude",
    "Codex",
    "BYOAI",
    "AI workspace",
    "open source"
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cabinet Docs",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet — Your Knowledge Base, your AI Team"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@HilaShmuel",
    creator: "@HilaShmuel",
    images: ["/og.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
