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
      <body>
        <main className="bg-neutral-950 w-screen h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
