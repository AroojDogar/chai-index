import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Chai Index — What a cup of chai costs around the world",
  description:
    "Compare everyday prices — chai, coffee, a meal, a bus ride — across 50 countries with live exchange rates, see how many minutes of work they cost, and find out what your salary is worth abroad.",
  authors: [{ name: "Arooj Dogar" }],
  openGraph: {
    title: "The Chai Index",
    description: "What a cup of chai costs in 50 countries — in your money and in minutes of work.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M7 12h18l-2.5 15a2 2 0 0 1-2 1.7h-9a2 2 0 0 1-2-1.7Z' fill='%23b85c38'/><ellipse cx='16' cy='12' rx='9' ry='2.4' fill='%238a4b24'/><path d='M10 8l4-3 3 2 5-4' stroke='%232b1a10' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5ecdc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..800,0..100,0..1;1,9..144,300..800,0..100,0..1&family=Instrument+Sans:wght@400..700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
