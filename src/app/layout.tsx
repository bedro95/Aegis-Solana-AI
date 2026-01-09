import type { Metadata } from "next";
import "./globals.css";
import { SolanaWalletProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "Aegis Solana AI",
  description: "Advanced AI on Solana Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased font-sans">
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}