import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HUTCalculatorInline from "@/components/HUTCalculatorInline";
import {
  FileText,
  CheckCircle2,
  DollarSign,
  Car,
  Shield,
  ExternalLink,
  AlertCircle,
  ArrowRight,
  ClipboardList,
  BadgeCheck,
  Receipt,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Proceso de Compra en North Carolina",
  description:
    "Guía paso a paso del proceso legal NCDMV para comprar un auto usado en NC. Formularios MVR-1, MVR-180, MVR-181 y cálculo del HUT 3%.",
};

const STEPS = [
  {
    number: "01",
    icon: Car,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Elige tu Vehículo",
    desc: "Explora nuestro inventario y selecciona el auto que mejor se adapte a tu presupuesto y necesidades. Puedes solicitar una prueba de manejo.",
    items: [
      "Revisa el Buyers Guide FTC incluido con cada auto",
      "Solicita el historial completo del vehículo",
      "Realiza una prueba de manejo",
      "Pide inspección por mecánico de tu confianza (recomendado)",
    ],
  },
  {
    number: "02",
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Negocia el Precio",
    desc: "Negociamos de manera transparente. El precio incluye el vehículo. Los impuestos y tarifas del DMV se calculan aparte.",
    items: [
      "Precio de venta acordado por escrito",
      "HUT (Highway Use Tax) = 3% del precio de venta",
      "Si haces trade-in: HUT = 3% × (precio − valor del trade-in)",
      "Tarifas de título y registro NC: aprox. $50–$100",
    ],
  },
  {
    number: "03",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
    title: "Formularios NCDMV",
    desc: "Carolina del Norte requiere documentos específicos para la transferencia de título. Nosotros te guiamos en cada paso.",
    items: [
      "MVR-1: Solicitud de Título e Información de Registro",
      "MVR-180: Divulgación del Odómetro (para autos < 10 años)",
      "MVR-181: Poder notarial del vehículo (si aplica)",
      "Título actual firmado por el vendedor en la línea correcta",
    ],
  },
  {
    number: "04",
    icon: Receipt,
    color: "text-orange-500",
    bg: "bg-orange-50",
    title: "Pago del HUT (3%)",
    desc: "El Highway Use Tax de NC (3%) se paga al registrar el vehículo en el DMV. NO es un impuesto de ventas.",
    items: [
      "Se paga en cualquier oficina del NCDMV",
      "Tasa: 3% del precio de compra",
      "Con trade-in: 3% × (precio − valor trade-in)",
      "Sin tope máximo desde 2014",
    ],
  },
  {
    number: "05",
    icon: Shield,
    color: "text-red-600",
    bg: "bg-red-50",
    title: "Seguro Obligatorio + Placa",
    desc: "NC requiere seguro de auto activo ANTES de registrar el vehículo. Asegúrate de tener tu póliza lista.",
    items: [
      "Seguro mínimo: $30,000 / $60,000 / $25,000",
      "Puedes mantener tus placas actuales (transferir)",
      "Nuevas placas: visitar la oficina del DMV",
      "Renovación anual junto con impuesto de propiedad",
    ],
  },
  {
    number: "06",
    icon: BadgeCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
    title: "Registro Completado",
    desc: "Una vez pagado el HUT y presentados los documentos, recibirás el nuevo título a tu nombre y las placas del vehículo.",
    items: [
      "El nuevo título llega por correo en 2–4 semanas",
      "Recibirás talón de registro temporal",
      "Guarda todos los documentos de compra",
      "¡Felicidades, el auto es tuyo!",
    ],
  },
];

const FORMS = [
  {
    code: "MVR-1",
    name: "Solicitud de Título e Información de Registro",
    desc: "Formulario principal para transferir el título del vehículo a tu nombre en NC.",
    url: "https://www.ncdot.gov/dmv/offices-services/Pages/forms.aspx",
    required: true,
  },
  {
    code: "MVR-180",
    name: "Declaración Federal de Odómetro",
    desc: "Requerida en vehículos de menos de 10 años. Certifica el millaje real al momento de la venta.",
    url: "https://www.ncdot.gov/dmv/offices-services/Pages/forms.aspx",
    required: true,
  },
  {
    code: "MVR-181",
    name: "Poder Notarial del Vehículo",
    desc: "Permite que otra persona actúe en tu nombre en transacciones del DMV cuando sea necesario.",
    url: "https://www.ncdot.gov/dmv/offices-services/Pages/forms.aspx",
    required: false,
  },
  {
    code: "HUT 3%",
    name: "Highway Use Tax de NC",
    desc: "El impuesto de uso de carretera es del 3% del precio de compra menos el valor del trade-in.",
    url: "https://www.ncdor.gov/taxes-forms/motor-vehicle-lease-and-subscription-tax",
    required: true,
  },
];

export default function ProcesodeCompraPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-navy-950 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ClipboardList className="h-12 w-12 text-brand-green mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">
            Proceso de Compra en North Carolina
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Guía paso a paso del proceso legal y oficial del NCDMV para comprar
            un auto usado en Carolina del Norte. Formularios, impuestos y requisitos.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-2">
            <BadgeCheck className="h-4 w-4 text-brand-green" />
            <span className="text-brand-green text-sm font-semibold">
              Información oficial NCDMV — Actualizada 2024
            </span>
          </div>
        </div>
      </div>

      {/* HUT Alert */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-900 mb-1">
              ⚠ Importante: NC usa HUT, NO impuesto de ventas
            </div>
            <p className="text-amber-800 text-sm leading-relaxed">
              Carolina del Norte <strong>NO cobra impuesto de ventas</strong> en vehículos.
              En cambio, cobra el <strong>Highway Use Tax (HUT) del 3%</strong> que se paga
              directamente al DMV al registrar el vehículo, NO al concesionario.
              Si haces un <strong>trade-in</strong>, el valor del auto entregado se descuenta
              del precio de compra antes de calcular el 3%.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold text-navy-900 mb-8 text-center">
          Los 6 Pasos del Proceso
        </h2>
        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="flex items-start gap-5 p-6">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`${step.bg} rounded-xl p-3`}>
                      <Icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <div className="text-4xl font-extrabold text-gray-100 mt-1 leading-none">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {step.desc}
                    </p>
                    <ul className="space-y-1.5">
                      {step.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forms */}
      <div className="bg-navy-950 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white mb-3 text-center">
            Formularios NCDMV Requeridos
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Haz clic en cada formulario para descargarlo del sitio oficial del NCDMV
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {FORMS.map((form) => (
              <a
                key={form.code}
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group block"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-brand-green text-white text-xs font-bold rounded-lg px-2 py-0.5">
                        {form.code}
                      </span>
                      {form.required && (
                        <span className="bg-red-500/20 text-red-300 text-xs font-semibold rounded-lg px-2 py-0.5">
                          Requerido
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {form.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {form.desc}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-brand-green flex-shrink-0 mt-1 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HUT Calculator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-2 text-center">
            Calculadora HUT de North Carolina
          </h2>
          <p className="text-gray-500 text-center text-sm mb-8">
            Calcula tu Highway Use Tax al instante — Tasa oficial: 3%
          </p>
          <HUTCalculatorInline />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-green py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">
            ¿Listo para comenzar?
          </h2>
          <p className="text-green-100 mb-6">
            En Peak Auto Gallery te guiamos en cada paso del proceso.
            ¡Contáctanos hoy!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" size="lg" asChild>
              <Link href="/inventario">
                Ver Inventario
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-white" size="lg" asChild>
              <a href="tel:+19195550100">
                <Phone className="h-5 w-5" />
                Llamar: (919) 555-0100
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
