import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AskButton, Cursor, Footer, Intro, Nav } from "@/components/chrome";

export const metadata: Metadata = {
  title: { default: "Lumen — Cinematic prompts for immersive websites", template: "%s — Lumen" },
  description: "A library of copy-paste AI prompts for immersive websites: templates, 3D scenes, gradients, sections and animated backgrounds.",
  openGraph: { title: "Lumen — Cinematic sites, made easy", description: "Copy a prompt, paste it into your AI, and launch a site that doesn’t look AI-made.", type: "website" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#060606", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono&family=Archivo+Black&display=swap" />
      </head>
      <body>
        <Providers>
          <Intro />
          <Cursor />
          <Nav />
          <main>{children}</main>
          <Footer />
          <AskButton />
        </Providers>
      </body>
    </html>
  );
}
