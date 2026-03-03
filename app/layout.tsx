import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ancritheon",
  description: "Ancritheon style hero in Next.js"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
