import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query.provider";
import Header from "@/components/Header";

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
    default: "MBL Mailer",
    template: "%s | MBL Mailer",
  },
  description: "MBL Mailer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col max-w-screen-lg mx-auto p-8 gap-6 font-[family-name:var(--font-geist-sans)]">
          <ReactQueryProvider>
            <Header />
            {children}
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
