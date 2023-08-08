import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commit Blocks",
  description: "Visualize your GitHub contributions as blocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <main className="bg-background w-screen h-screen flex items-center justify-center relative">
          {children}
        </main>
      </body>
    </html>
  );
}
