import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";

const notoSans = Noto_Sans({ weight: ["400", "900"], subsets: ["latin"] });

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
    <html lang="ko" className="h-full">
      <body className={`${notoSans.className} flex flex-col h-full bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen w-full max-w-[1028px] mx-auto">
          <header className="flex items-center h-14 justify-center">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="h-14 flex items-center justify-center">
            © 2019
          </footer>
        </div>
      </body>
    </html>
  );
}
