import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verein-im-Visier",
  description: "Die digitale Vereinsverwaltung mit dem Schießsport im Fokus.",
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