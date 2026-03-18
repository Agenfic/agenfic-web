import type { Metadata } from "next";
import "./globals.css";

const THEME_STORAGE_KEY = "agenfic-home-theme";

const themeInitializationScript = `(() => {
  const root = document.documentElement;
  const getPreferredTheme = () => {
    try {
      const storedTheme = window.localStorage.getItem("${THEME_STORAGE_KEY}");
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    } catch {}

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const theme = getPreferredTheme();
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`;

export const metadata: Metadata = {
  title: "Agenfic",
  description: "Agenfic style hero in Next.js",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
