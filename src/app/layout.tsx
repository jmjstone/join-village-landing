import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import your new components
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Assuming you create a Footer too

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Join Village",
  description: "Find your community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header /> {/* <-- Add the Header here */}
        <main className="flex-grow">{children}</main>
        <Footer /> {/* <-- Add the Footer here */}
      </body>
    </html>
  );
}
