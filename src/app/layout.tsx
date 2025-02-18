import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casecobra",
  description: "Casecobra commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <SessionProvider>
          <NavBar />
          <main className=" flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
