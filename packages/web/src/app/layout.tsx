import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DigiSoul — Secure Your Digital Legacy",
  description:
    "A blockchain-based digital inheritance platform. Store your assets, set nominees, and create smart wills to secure your digital legacy.",
  keywords: [
    "digital inheritance",
    "crypto will",
    "blockchain estate planning",
    "digital legacy",
    "smart contract will",
  ],
  openGraph: {
    title: "DigiSoul — Secure Your Digital Legacy",
    description:
      "Store your assets, set nominees, and create smart wills to secure your digital legacy.",
    url: "https://digisoul.app",
    siteName: "DigiSoul",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiSoul — Secure Your Digital Legacy",
    description:
      "Store your assets, set nominees, and create smart wills to secure your digital legacy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.variable + " font-sans antialiased"}>
        {children}
      </body>
    </html>
  );
}
