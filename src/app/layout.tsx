import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Priyatam | Software Engineer & Full-Stack Developer Portfolio",
  description: "Explore the modern interactive developer portfolio of Priyatam, featuring advanced web engineering, interactive 3D visualizations, and premium animated interfaces.",
  keywords: ["Priyatam", "Portfolio", "Software Engineer", "Full-Stack Developer", "Next.js", "Three.js", "React Three Fiber", "Framer Motion", "Bangalore"],
  authors: [{ name: "Priyatam" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
