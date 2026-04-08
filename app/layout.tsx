import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Peak Auto Gallery",
    default: "Peak Auto Gallery — Autos Usados en Carolina del Norte",
  },
  description:
    "Concesionario de autos usados licenciado NCDMV en Charlotte, NC. Servicio en español. Precios transparentes, financiamiento disponible. Honda, Toyota, Ford, Chevrolet y más.",
  keywords: [
    "autos usados Carolina del Norte",
    "carros usados Charlotte NC",
    "concesionario hispano NC",
    "used cars Charlotte NC",
    "Peak Auto Gallery",
  ],
  openGraph: {
    title: "Peak Auto Gallery — Autos Usados NC",
    description: "Concesionario licenciado NCDMV. Servicio en español. Charlotte, NC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16 sm:pt-20 min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
