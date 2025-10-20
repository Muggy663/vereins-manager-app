import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vereins-Manager - Digitales Schießbuch",
  description: "Digitales Schießbuch für moderne Schützenvereine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}