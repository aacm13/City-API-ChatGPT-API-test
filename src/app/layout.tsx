import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} container mx-auto`}>
        <nav className=" px-5 py-10">
          <Link href={"/"} className="text-lg hover:font-bold">
            Home
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
