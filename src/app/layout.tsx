import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth/context";
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}