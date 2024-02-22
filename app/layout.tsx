import type { Metadata } from "next";
import "./globals.css";

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
      <body className="flex flex-col h-full">
        <div className="flex flex-col min-h-screen w-full max-w-[1028px] mx-auto">
          <header className="flex items-center h-14 justify-center">
            <h1>Blog</h1>
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
