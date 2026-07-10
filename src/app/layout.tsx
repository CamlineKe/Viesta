import type { Metadata } from "next";
import { Nunito_Sans, Open_Sans } from "next/font/google";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { siteContent } from "@/data/site";
import { FloatingWhatsAppButton } from "@/components/layout/FloatingWhatsAppButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";

import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteContent.seo.defaultTitle,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.seo.defaultDescription,
  metadataBase: new URL(siteContent.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${openSans.variable}`}>
      <body>
        <ToastProvider>
          <CartProvider>
            <TopBar />
            <Header />
            {children}
            <FloatingWhatsAppButton />
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
