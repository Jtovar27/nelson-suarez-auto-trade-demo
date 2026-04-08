import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Heart,
  Users,
  Trophy,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Shield,
  Handshake,
  TrendingUp,
  Car,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la historia y valores de Peak Auto Gallery, concesionario hispano licenciado NCDMV en Charlotte, NC.",
};

const VALUES = [
  {
    icon: Shield,
    title: "Transparencia Total",
    desc: "Nunca inflamos precios para negociar. Lo que ves es lo que pagas. Todos los cargos explicados antes de firmar.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Handshake,
    title: "Honestidad Ante Todo",
    desc: "Revelamos cualquier defecto conocido del vehículo. Nuestra reputación vale más que cualquier venta.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Heart,
    title: "Comunidad Primero",
    desc: "Somos parte de la comunidad hispana de NC. Entendemos tus necesidades y te servimos en tu idioma.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: TrendingUp,
    title: "Precios Justos",
    desc: "Ofrecemos el mejor precio del mercado ya sea que compres o vendas. Sin trucos ni letra pequeña.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const TIMELINE = [
  { year: "2015", event: "Peak Auto Gallery abre el negocio con 5 vehículos en Charlotte, NC." },
  { year: "2017", event: "Obtiene la licencia oficial de concesionario del NCDMV." },
  { year: "2019", event: "Expande el inventario a 20+ vehículos. Primer empleado a tiempo completo." },
  { year: "2021", event: "Reconocido por la comunidad hispana de Charlotte como negocio de confianza." },
  { year: "2023", event: "Lanza proceso digital de cotización instantánea para compra de autos." },
  { year: "2024", event: "Supera 500 clientes satisfechos en el área Tri-Cities de NC." },
];

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-navy-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-1.5 mb-6">
            <BadgeCheck className="h-4 w-4 text-brand-green" />
            <span className="text-brand-green text-sm font-semibold">
              Desde 2015 sirviendo a NC
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">
            Sobre Peak Auto Gallery
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Somos un concesionario de autos usados hispano licenciado por el NCDMV, ubicado en Charlotte, NC. Nuestra misión es hacer accesible la compra de un auto confiable para toda la comunidad.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-900 mb-5">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Peak Auto Gallery llegó a Carolina del Norte con un sueño: construir un negocio honesto que sirviera a la comunidad hispana de la misma manera que a él le hubiera gustado ser tratado cuando buscó su primer auto en los Estados Unidos.
              </p>
              <p>
                Lo que comenzó con 5 vehículos en el garaje de su casa en 2015, creció hasta convertirse en un concesionario licenciado por el NCDMV, con más de 500 clientes satisfechos en el área Tri-Cities de North Carolina.
              </p>
              <p>
                <strong className="text-navy-900">Nuestra diferencia es simple:</strong> somos vecinos sirviendo a vecinos. Conocemos el proceso del DMV, entendemos el estrés de comprar un auto, y nos comprometemos a hacerlo fácil, transparente y justo.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Trophy, value: "500+", label: "Clientes satisfechos" },
              { icon: Car, value: "9+ años", label: "En el negocio" },
              { icon: Star, value: "4.9/5", label: "Calificación promedio" },
              { icon: BadgeCheck, value: "NCDMV", label: "Licencia oficial" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
              >
                <div className="bg-navy-50 rounded-xl p-3">
                  <Icon className="h-6 w-6 text-navy-700" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-navy-900">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-navy-900 mb-3 text-center">
            Nuestros Valores
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
            Los principios que guían cada transacción y cada interacción con nuestros clientes
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`${bg} rounded-xl p-3 w-fit mb-4`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-3xl font-extrabold text-navy-900 mb-10 text-center">
          Nuestra Trayectoria
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {TIMELINE.map(({ year, event }) => (
              <div key={year} className="flex gap-6 pl-10 relative">
                <div className="absolute left-0 top-1.5 w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold z-10">
                  {year.slice(2)}
                </div>
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                  <div className="font-bold text-brand-green text-sm mb-0.5">{year}</div>
                  <div className="text-gray-700 text-sm">{event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-navy-950 text-white py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-5 text-4xl font-extrabold">
            NS
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Peak Auto Gallery</h2>
          <div className="text-brand-green font-semibold mb-4">
            Propietario &amp; Dealer Principal — Charlotte, NC
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            &ldquo;Cada cliente merece un trato justo, honesto y transparente. Cuando alguien confía en nosotros para comprar o vender su vehículo, nos convertimos en responsables de que esa transacción sea perfecta.&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
              <MapPin className="h-4 w-4 text-brand-green" />
              Charlotte, NC
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
              <BadgeCheck className="h-4 w-4 text-brand-green" />
              Licencia NCDMV
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-brand-green" />
              Servicio en Español
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-3">
            ¿Listo para conocernos?
          </h2>
          <p className="text-gray-500 mb-6">
            Visítanos en Charlotte, llámanos o escríbenos por WhatsApp. Estamos aquí para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
  );
}
