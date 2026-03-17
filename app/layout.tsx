import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Nelson Suarez Auto Trade",
    default: "Nelson Suarez Auto Trade — Autos Usados en Carolina del Norte",
  },
  description:
    "Concesionario de autos usados licenciado NCDMV en Charlotte, NC. Servicio en español. Precios transparentes, financiamiento disponible. Honda, Toyota, Ford, Chevrolet y más.",
  keywords: [
    "autos usados Carolina del Norte",
    "carros usados Charlotte NC",
    "concesionario hispano NC",
    "used cars Charlotte NC",
    "Nelson Suarez Auto Trade",
  ],
  openGraph: {
    title: "Nelson Suarez Auto Trade — Autos Usados NC",
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
