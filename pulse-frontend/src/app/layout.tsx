import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import Providers from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PulsePing",
    default: "PulsePing",
  },
  description:
    "PulsePing is a tool that helps you ping your servers and get notified when they are down.",
  openGraph: {
    title: "PulsePing",
    description:
      "PulsePing is a tool that helps you ping your servers and get notified when they are down.",
    type: "website",
    url: "https://pulseping.avikmukherjee.me",
    siteName: "PulsePing",
    locale: "en_US",
    countryName: "India",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.ico",
  },
  twitter: {
    title: "PulsePing",
    card: "summary_large_image",
    site: "@avikm744",
    creator: "@avikm744",
    description:
      "PulsePing is a tool that helps you ping your servers and get notified when they are down.",
    images: ["/og-image.png"],
  },
  category: "technology",
  applicationName: "PulsePing",
  authors: [{ name: "Avik Mukherjee", url: "https://avikmukherjee.me" }],
  creator: "Avik Mukherjee",
  publisher: "Avik Mukherjee",
  alternates: {
    canonical: "https://pulseping.avikmukherjee.me",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          data-domain="pulseping.avikmukherjee.me"
          src="https://webtracker.avikmukherjee.me/tracking-script.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} px-2 md:px-0 bg-background text-foreground`}
      >
        <Providers>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
