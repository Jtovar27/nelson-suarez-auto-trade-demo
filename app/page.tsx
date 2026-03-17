"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FEATURED_CARS, TESTIMONIALS, Car } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CarCard from "@/components/CarCard";
import CarModal from "@/components/CarModal";
import { Button } from "@/components/ui/button";
import {
  Search,
  Shield,
  Star,
  ArrowRight,
  Phone,
  Clock,
  DollarSign,
  FileCheck,
  ChevronDown,
  MessageCircle,
  BadgeCheck,
  TrendingDown,
  Car as CarIcon,
} from "lucide-react";

const MAKES_QUICK = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Jeep", "Hyundai", "Kia"];
const MAX_PRICES = ["Todos", "$15,000", "$20,000", "$25,000", "$30,000", "$35,000+"];

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchMake, setSearchMake] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  return (
    <>
      {/* ═══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative min-h-[90vh] bg-navy-950 flex items-center overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 opacity-95" />

        {/* Green accent shape */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-green/5 clip-path-diagonal hidden xl:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-1.5 mb-6">
              <BadgeCheck className="h-4 w-4 text-brand-green" />
              <span className="text-brand-green text-sm font-semibold">
                Licenciado NCDMV • Servicio en Español
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Encuentra tu{" "}
              <span className="text-brand-green">auto perfecto</span>
              <br />
              en North Carolina
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
              Concesionario hispano licenciado en Charlotte, NC. Precios transparentes, proceso simple y financiamiento disponible para todos.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: "10+", label: "Autos disponibles" },
                { value: "3%", label: "HUT NC oficial" },
                { value: "100%", label: "Transparente" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-extrabold text-brand-green">{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/inventario">
                  Ver Inventario Completo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <Link href="/vender-auto">
                  <DollarSign className="h-5 w-5" />
                  Vender mi Auto
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — Quick Search */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-xl mb-5">
              <Search className="inline h-5 w-5 text-brand-green mr-2" />
              Buscar rápido
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block font-medium">
                  Marca
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MAKES_QUICK.map((make) => (
                    <button
                      key={make}
                      onClick={() => setSearchMake(searchMake === make ? "" : make)}
                      className={`rounded-lg py-2 text-xs font-semibold transition-all ${
                        searchMake === make
                          ? "bg-brand-green text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {make}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block font-medium">
                  Precio máximo
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MAX_PRICES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setSearchPrice(searchPrice === p ? "" : p)}
                      className={`rounded-lg py-2 text-xs font-semibold transition-all ${
                        searchPrice === p
                          ? "bg-brand-green text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                asChild
              >
                <Link
                  href={`/inventario?make=${searchMake}&maxPrice=${searchPrice}`}
                >
                  <Search className="h-5 w-5" />
                  Buscar ahora
                </Link>
              </Button>
            </div>

            {/* Quick contact */}
            <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-2">
              <a
                href="tel:+19195550100"
                className="flex-1 flex items-center justify-center gap-2 bg-navy-800 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-navy-700 transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-green" />
                (919) 555-0100
              </a>
              <a
                href="https://wa.me/19195550100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ═════════════════════════ WHY US ═════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-navy-900 mb-3">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              En Nelson Suarez Auto Trade somos más que un concesionario — somos tu aliado en la compra de tu próximo vehículo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BadgeCheck,
                color: "text-brand-green",
                bg: "bg-green-50",
                title: "Licenciado NCDMV",
                desc: "Operamos con licencia oficial del Departamento de Vehículos de Motor de NC. Protegido por ley.",
              },
              {
                icon: Shield,
                color: "text-blue-600",
                bg: "bg-blue-50",
                title: "Buyers Guide FTC",
                desc: "Cada vehículo incluye la Guía del Comprador requerida por la FTC con toda la información relevante.",
              },
              {
                icon: TrendingDown,
                color: "text-purple-600",
                bg: "bg-purple-50",
                title: "Precios Sin Juegos",
                desc: "Sin precios inflados para negociar. El precio que ves es el precio real, transparente y justo.",
              },
              {
                icon: FileCheck,
                color: "text-orange-500",
                bg: "bg-orange-50",
                title: "Proceso NC Completo",
                desc: "Te guiamos en todos los formularios NCDMV: MVR-1, MVR-180, MVR-181 y el HUT del 3%.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`${bg} rounded-xl p-3 w-fit mb-4`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════ FEATURED CARS ═════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-navy-900 mb-2">
                Vehículos Destacados
              </h2>
              <p className="text-gray-500">
                Selección especial de nuestro inventario — calidad garantizada
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/inventario">
                Ver todos ({10})
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_CARS.map((car) => (
              <CarCard key={car.id} car={car} onClick={setSelectedCar} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════ SELL YOUR CAR CTA ═════════════════════════ */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DollarSign className="h-12 w-12 text-brand-green mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            ¿Quieres vender tu auto?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Obten una cotización instantánea en menos de 2 minutos. Pagamos en efectivo, proceso rápido y sin complicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="xl" asChild>
              <Link href="/vender-auto">
                Cotizar mi Auto Ahora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-white" size="xl" asChild>
              <a href="tel:+19195550100">
                <Phone className="h-5 w-5" />
                Llamar directamente
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ═════════════════════════ TESTIMONIALS ═════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-navy-900 mb-3">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-gray-500">La satisfacción de nuestra comunidad es nuestra mejor carta de presentación</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="bg-navy-900 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.city} — {t.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════ MAP + HOURS ═════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-72 bg-gray-200 relative">
              <iframe
                title="Ubicación Nelson Suarez Auto Trade"
                src="https://maps.google.com/maps?q=Charlotte+NC&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-navy-900/90 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                  📍 1234 Independence Blvd, Charlotte NC
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-3xl font-extrabold text-navy-900 mb-6">
                Visítanos hoy
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-brand-green mt-0.5" />
                  <div>
                    <div className="font-semibold text-navy-900">Horario</div>
                    <div className="text-gray-600 text-sm mt-1 space-y-0.5">
                      <div>Lun–Vie: 9:00am – 7:00pm</div>
                      <div>Sábado: 9:00am – 5:00pm</div>
                      <div>Domingo: 11:00am – 4:00pm</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CarIcon className="h-5 w-5 text-brand-green mt-0.5" />
                  <div>
                    <div className="font-semibold text-navy-900">Dirección</div>
                    <div className="text-gray-600 text-sm mt-1">
                      1234 Independence Blvd<br />
                      Charlotte, NC 28209
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/inventario">
                    Ver Inventario
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contacto">Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Modal */}
      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </>
  );
}
