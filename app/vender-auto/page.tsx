"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  Car,
  CheckCircle2,
  Clock,
  Banknote,
  FileText,
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  AlertCircle,
  Calculator,
  ChevronRight,
} from "lucide-react";

interface FormData {
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  transmission: string;
  color: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const INIT: FormData = {
  make: "", model: "", year: "", mileage: "", condition: "",
  transmission: "", color: "", name: "", phone: "", email: "", notes: "",
};

const CONDITIONS = [
  { value: "excellent", label: "Excelente", desc: "Sin golpes, todo funcionando" },
  { value: "good", label: "Bueno", desc: "Golpes menores, funciona bien" },
  { value: "fair", label: "Regular", desc: "Necesita algunas reparaciones" },
  { value: "poor", label: "Deficiente", desc: "Daños significativos" },
];

const conditionFactor: Record<string, number> = {
  excellent: 0.88, good: 0.82, fair: 0.75, poor: 0.67,
};

function estimateMarket(year: number, mileage: number): number {
  const base = 25000;
  const agePenalty = (2026 - year) * 1200;
  const mileagePenalty = mileage * 0.04;
  return Math.max(4000, base - agePenalty - mileagePenalty);
}

export default function VenderAutoPage() {
  const [form, setForm] = useState<FormData>(INIT);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  // Quote calculation
  const yearNum = Number(form.year);
  const mileNum = Number(form.mileage);
  const marketEstimate = yearNum && mileNum ? estimateMarket(yearNum, mileNum) : 0;
  const offerLow = marketEstimate * (conditionFactor[form.condition] ?? 0.82) * 0.93;
  const offerHigh = marketEstimate * (conditionFactor[form.condition] ?? 0.82);

  const step1Ready = form.make && form.model && form.year && form.mileage && form.condition;
  const step2Ready = form.name && form.phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-brand-green" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 mb-3">
            ¡Solicitud Enviada!
          </h1>
          <p className="text-gray-600 mb-2">
            Gracias <strong>{form.name}</strong>, recibimos la información de tu{" "}
            <strong>{form.year} {form.make} {form.model}</strong>.
          </p>
          <p className="text-gray-500 mb-6 text-sm">
            Nelson te contactará en menos de 2 horas para confirmar la oferta final y coordinar la inspección del vehículo.
          </p>
          {offerLow > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="text-sm text-green-700 font-semibold mb-1">
                Oferta estimada preliminar:
              </div>
              <div className="text-3xl font-extrabold text-navy-900">
                {formatCurrency(offerLow)} – {formatCurrency(offerHigh)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                * Sujeto a inspección física del vehículo
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/19195550100?text=${encodeURIComponent(`Hola Nelson, acabo de enviar mi solicitud para vender mi ${form.year} ${form.make} ${form.model}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 font-semibold hover:bg-[#1da851] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Confirmar por WhatsApp
            </a>
            <a
              href="tel:+19195550100"
              className="flex items-center justify-center gap-2 bg-navy-900 text-white rounded-xl py-3 font-semibold hover:bg-navy-800 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Llamar ahora
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-navy-950 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DollarSign className="h-12 w-12 text-brand-green mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">
            Vende tu Auto — Oferta en Minutos
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Completamos el proceso de compra de tu vehículo de manera rápida, justa y sin presiones. ¡Pagamos efectivo!
          </p>
        </div>
      </div>

      {/* Benefits bar */}
      <div className="bg-brand-green text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm font-semibold">
          {[
            [Clock, "Respuesta en 2 hrs"],
            [Banknote, "Pago en efectivo"],
            [FileText, "Manejamos el papeleo"],
            [Star, "Sin comisiones"],
          ].map(([Icon, text], i) => (
            <div key={i} className="flex items-center justify-center gap-1.5">
              {/* @ts-ignore */}
              <Icon className="h-4 w-4" />
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        s <= step
                          ? "bg-brand-green text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
                    </div>
                    <span className={`text-sm font-medium ${s <= step ? "text-navy-900" : "text-gray-400"}`}>
                      {s === 1 ? "Tu Vehículo" : s === 2 ? "Tus Datos" : "Confirmar"}
                    </span>
                  </div>
                  {s < 3 && <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Step 1: Vehicle info */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
                    <Car className="h-5 w-5 text-brand-green" />
                    Información del Vehículo
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">Marca *</Label>
                      <select
                        value={form.make}
                        onChange={set("make")}
                        required
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                      >
                        <option value="">Seleccionar</option>
                        {["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Jeep", "Hyundai", "Kia", "Dodge", "RAM", "GMC", "Subaru", "Mazda", "Volkswagen", "BMW", "Mercedes", "Audi", "Otro"].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Modelo *</Label>
                      <Input value={form.model} onChange={set("model")} placeholder="ej. Camry" required />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Año *</Label>
                      <Input
                        type="number"
                        value={form.year}
                        onChange={set("year")}
                        placeholder="ej. 2019"
                        min={1990}
                        max={2026}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Millas *</Label>
                      <Input
                        type="number"
                        value={form.mileage}
                        onChange={set("mileage")}
                        placeholder="ej. 65000"
                        min={0}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Transmisión</Label>
                      <select
                        value={form.transmission}
                        onChange={set("transmission")}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Automática">Automática</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Color</Label>
                      <Input value={form.color} onChange={set("color")} placeholder="ej. Blanco" />
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="mt-4">
                    <Label className="mb-2 block">Condición del vehículo *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {CONDITIONS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, condition: c.value }))}
                          className={`text-left rounded-xl border-2 p-3 transition-all ${
                            form.condition === c.value
                              ? "border-brand-green bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="font-semibold text-sm text-navy-900">{c.label}</div>
                          <div className="text-xs text-gray-500">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    disabled={!step1Ready}
                    onClick={() => setStep(2)}
                  >
                    Continuar — Ver estimado
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Step 2: Contact */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-brand-green" />
                    Tus Datos de Contacto
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="mb-1.5 block">Nombre completo *</Label>
                      <Input value={form.name} onChange={set("name")} placeholder="Tu nombre" required />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Teléfono *</Label>
                      <Input value={form.phone} onChange={set("phone")} placeholder="(919) 555-0000" required type="tel" />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Email</Label>
                      <Input value={form.email} onChange={set("email")} placeholder="tu@email.com" type="email" />
                    </div>
                    <div className="col-span-2">
                      <Label className="mb-1.5 block">Notas adicionales</Label>
                      <textarea
                        value={form.notes}
                        onChange={set("notes")}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 min-h-[80px] resize-none"
                        placeholder="¿Tiene accidente reportado? ¿Estado del motor? ¿Documentos al día?..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      ← Atrás
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="flex-2"
                      disabled={!step2Ready}
                      onClick={() => setStep(3)}
                    >
                      Revisar solicitud →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-green" />
                    Confirmar Solicitud
                  </h2>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-gray-500">Vehículo:</span> <strong>{form.year} {form.make} {form.model}</strong></div>
                      <div><span className="text-gray-500">Millas:</span> <strong>{Number(form.mileage).toLocaleString()}</strong></div>
                      <div><span className="text-gray-500">Transmisión:</span> <strong>{form.transmission || "No especificada"}</strong></div>
                      <div><span className="text-gray-500">Condición:</span> <strong className="capitalize">{CONDITIONS.find(c => c.value === form.condition)?.label}</strong></div>
                      <div><span className="text-gray-500">Color:</span> <strong>{form.color || "No especificado"}</strong></div>
                    </div>
                    <hr />
                    <div><span className="text-gray-500">Nombre:</span> <strong>{form.name}</strong></div>
                    <div><span className="text-gray-500">Teléfono:</span> <strong>{form.phone}</strong></div>
                    {form.email && <div><span className="text-gray-500">Email:</span> <strong>{form.email}</strong></div>}
                    {form.notes && <div><span className="text-gray-500">Notas:</span> {form.notes}</div>}
                  </div>

                  <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3 mb-4 text-xs text-blue-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Al enviar, autorizas a Peak Auto Gallery a contactarte para discutir la oferta final. La oferta mostrada es un estimado preliminar sujeto a inspección física del vehículo.
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      ← Editar
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="flex-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Enviar Solicitud
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Instant Quote */}
            {offerLow > 0 && (
              <div className="bg-navy-950 text-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-5 w-5 text-brand-green" />
                  <h3 className="font-bold">Estimado Instantáneo</h3>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {form.year} {form.make} {form.model} &bull;{" "}
                  {Number(form.mileage).toLocaleString()} mi
                </div>
                <div className="text-sm text-gray-300 mb-1">Valor de mercado est.</div>
                <div className="text-xl font-bold text-gray-200 mb-3">
                  {formatCurrency(marketEstimate)}
                </div>
                <div className="text-sm text-gray-300 mb-1">🎯 Oferta preliminar</div>
                <div className="text-3xl font-extrabold text-brand-green">
                  {formatCurrency(offerLow)}
                </div>
                <div className="text-lg text-brand-green-light">
                  – {formatCurrency(offerHigh)}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  * Sujeto a inspección física. La oferta final puede variar según el estado real del vehículo.
                </p>
              </div>
            )}

            {/* Why sell with us */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-4">¿Por qué vendernos?</h3>
              <ul className="space-y-3">
                {[
                  ["💰", "Pagamos el mejor precio del área"],
                  ["⚡", "Efectivo en 24-48 horas"],
                  ["📋", "Manejamos el título y papeleo DMV"],
                  ["🤝", "Sin presión ni comisiones"],
                  ["🔍", "Inspección profesional gratuita"],
                ].map(([emoji, text]) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-gray-700">
                    <span>{emoji}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact quick */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-3">¿Prefieres llamar?</h3>
              <div className="space-y-2">
                <a
                  href="tel:+19195550100"
                  className="flex items-center gap-2 bg-navy-900 text-white rounded-xl py-3 px-4 font-semibold text-sm hover:bg-navy-800 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (919) 555-0100
                </a>
                <a
                  href="https://wa.me/19195550100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white rounded-xl py-3 px-4 font-semibold text-sm hover:bg-[#1da851] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
