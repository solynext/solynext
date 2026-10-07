import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicSiteFrame } from "@/components/layout/PublicSiteFrame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolyNext — Professional Software & Digital Technology Solutions",
  description:
    "SolyNext is a Pakistan-based software and technology company delivering custom software, web platforms, mobile apps, UI/UX design, and digital marketing for clients worldwide.",
  openGraph: {
    title: "SolyNext — Technology & Digital Solutions",
    description:
      "Engineering scalable web platforms, enterprise software, mobile apps, and conversion-focused digital marketing worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PublicSiteFrame>{children}</PublicSiteFrame>
      </body>
    </html>
  );
}

