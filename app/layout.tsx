import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Rebuilding blog...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} flex flex-col items-center min-h-screen`}
      >
        <header className="flex items-center h-14">
          <h1>Blog</h1>
        </header>
        <main className="flex-grow container">{children}</main>
        <footer>© 2019</footer>
      </body>
    </html>
  );
}
