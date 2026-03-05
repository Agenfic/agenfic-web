import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agenfic",
  description: "Agenfic style hero in Next.js"
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
