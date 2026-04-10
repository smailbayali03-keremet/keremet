import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auzhan_ktl.Designer",
  description: "Auzhan_ktl.Designer — мектеп автоматизация жүйесі",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-[#FAFAF8]">{children}</body>
    </html>
  );
}
