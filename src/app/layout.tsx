import type { Metadata } from "next";
import { Syne, Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["700", "800"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Priyatam | Creative Software Engineer Portfolio",
  description: "Explore the wobbly interactive cyberpunk developer portfolio of Priyatam, featuring high-end animations, interactive WebGL point clouds, and a custom mono-CLI console.",
  keywords: ["Priyatam", "Portfolio", "Software Engineer", "Full-Stack Developer", "Next.js", "Three.js", "React Three Fiber", "Framer Motion", "Bangalore"],
  authors: [{ name: "Priyatam" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://priyatam-ui.vercel.app/",
    title: "Priyatam | Creative Software Engineer",
    description: "Creative Software Engineer building interactive 3D web experiences.",
    siteName: "Priyatam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyatam | Creative Software Engineer",
    description: "Creative Software Engineer building interactive 3D web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${firaCode.variable} ${inter.variable} scanlines`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
