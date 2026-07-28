import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const display = Schibsted_Grotesk({
  variable: "--font-display-sg",
  subsets: ["latin"],
});

const ui = Inter({
  variable: "--font-ui-inter",
  subsets: ["latin"],
});

const label = Montserrat({
  variable: "--font-label-mont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHOWZ.AI Masterclass",
  description:
    "Vom Look zum fertigen Asset in Minuten. Live-Masterclass für Marketing-, E-Commerce- und Social-Teams von Fashion Brands. Mi, 29. Juli, 15:00–15:45 MESZ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${display.variable} ${ui.variable} ${label.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink font-ui">{children}</body>
    </html>
  );
}
