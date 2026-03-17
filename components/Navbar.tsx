"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/inventario", label: "Inventario" },
  { href: "/vender-auto", label: "Vender mi Auto" },
  { href: "/proceso-compra", label: "Proceso de Compra" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-navy-950 shadow-xl"
          : "bg-navy-950/95 backdrop-blur-sm"
      )}
    >
      {/* Top bar */}
      <div className="bg-brand-green text-white text-xs py-1 px-4 text-center font-medium hidden sm:block">
        Concesionario Licenciado NCDMV • Servicio en Español • Charlotte &amp; Área Tri-Cities NC
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-brand-green rounded-lg p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">
                Nelson Suarez
              </div>
              <div className="text-brand-green text-xs font-semibold tracking-wide">
                AUTO TRADE
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-green"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+19195550100" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
              <Phone className="h-4 w-4 text-brand-green" />
              (919) 555-0100
            </a>
            <Button variant="primary" size="sm" asChild>
              <Link href="/inventario">Ver Inventario</Link>
            </Button>
          </div>

          {/* Mobile menu btn */}
          <button
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy-950 border-t border-white/10 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-green bg-white/5"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="tel:+19195550100"
                className="flex items-center gap-2 text-gray-300 px-4 py-2 text-sm"
              >
                <Phone className="h-4 w-4 text-brand-green" />
                (919) 555-0100
              </a>
              <Button variant="primary" asChild>
                <Link href="/inventario" onClick={() => setOpen(false)}>
                  Ver Inventario
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
