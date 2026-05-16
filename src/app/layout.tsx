import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cabinet — A smart folder for you and your AI team",
    template: "%s — Cabinet"
  },
  description: "Cabinet is a local-first knowledge base and AI team workspace. One folder for your notes, files, and agents — markdown-backed, portable, and yours.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://runcabinet.com"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png"
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
