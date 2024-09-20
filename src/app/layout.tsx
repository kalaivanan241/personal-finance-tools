export const runtime = "edge";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayout from "./components/Layouts/AppLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Personal Finance Tools: Essential Personal Finance Tools: SIP, SWP, Loans & Calculators",
  description:
    "Explore essential personal finance tools including SIP, SWP, personal loan calculators, and mortgage loan solutions. Simplify your financial decisions today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
