"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CONTACT_OPTIONS = [
  {
    icon: Phone,
    label: "Llamar",
    value: "(919) 555-0100",
    href: "tel:+19195550100",
    color: "text-blue-600",
    bg: "bg-blue-50",
    btn: "Llamar ahora",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+1 (919) 555-0100",
    href: "https://wa.me/19195550100?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n",
    color: "text-green-600",
    bg: "bg-green-50",
    btn: "Escribir por WhatsApp",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@nelsonsuarezautotrade.com",
    href: "mailto:info@nelsonsuarezautotrade.com",
    color: "text-purple-600",
    bg: "bg-purple-50",
    btn: "Enviar Email",
  },
];

const HOURS = [
  { day: "Lunes – Viernes", hours: "9:00am – 7:00pm" },
  { day: "Sábado", hours: "9:00am – 5:00pm" },
  { day: "Domingo", hours: "11:00am – 4:00pm" },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-navy-950 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="h-12 w-12 text-brand-green mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">Contáctanos</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos en Charlotte, NC.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Contact Options + Map */}
          <div className="space-y-5">
            {/* Quick contact */}
            {CONTACT_OPTIONS.map(({ icon: Icon, label, value, href, color, bg, btn }) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`${bg} rounded-xl p-3`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">{label}</div>
                    <div className="font-bold text-navy-900 text-sm">{value}</div>
                  </div>
                </div>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-navy-900 text-white text-xs font-semibold rounded-xl px-3 py-2 hover:bg-navy-800 transition-colors whitespace-nowrap"
                >
                  {btn}
                </a>
              </div>
            ))}

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-orange-50 rounded-xl p-3">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Dirección</div>
                  <div className="font-bold text-navy-900">1234 Independence Blvd</div>
                  <div className="text-sm text-gray-600">Charlotte, NC 28209</div>
                </div>
              </div>
              {/* Map */}
              <div className="rounded-xl overflow-hidden h-48">
                <iframe
                  title="Mapa Peak Auto Gallery"
                  src="https://maps.google.com/maps?q=Independence+Blvd+Charlotte+NC&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-brand-green" />
                <h3 className="font-bold text-navy-900">Horario de Atención</h3>
              </div>
              <div className="space-y-2">
                {HOURS.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{day}</span>
                    <span className="font-semibold text-navy-900">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-navy-900 mb-3">Síguenos</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook", color: "bg-blue-600" },
                  { icon: Instagram, label: "Instagram", color: "bg-pink-500" },
                ].map(({ icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href="#"
                    className={`${color} text-white rounded-xl p-3 flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-opacity`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-12">
                <div className="bg-green-100 rounded-full p-5">
                  <CheckCircle2 className="h-12 w-12 text-brand-green" />
                </div>
                <h2 className="text-2xl font-extrabold text-navy-900">
                  ¡Mensaje Enviado!
                </h2>
                <p className="text-gray-500 max-w-xs">
                  Gracias <strong>{form.name}</strong>. Te contactaremos pronto al número o email proporcionado.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <a
                    href="https://wa.me/19195550100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 font-semibold hover:bg-[#1da851] transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Confirmar por WhatsApp
                  </a>
                  <button
                    onClick={() => setSent(false)}
                    className="text-sm text-gray-500 hover:text-navy-900 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-navy-900 mb-5">
                  Envíanos un Mensaje
                </h2>
                <form onSubmit={handle} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="mb-1.5 block">Nombre completo *</Label>
                      <Input
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Teléfono</Label>
                      <Input
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="(919) 555-0000"
                        type="tel"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Email *</Label>
                      <Input
                        value={form.email}
                        onChange={set("email")}
                        placeholder="tu@email.com"
                        type="email"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="mb-1.5 block">Asunto</Label>
                      <select
                        value={form.subject}
                        onChange={set("subject")}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                      >
                        <option value="">Seleccionar asunto</option>
                        <option>Interesado en comprar un auto</option>
                        <option>Quiero vender mi auto</option>
                        <option>Información sobre financiamiento</option>
                        <option>Pregunta sobre el proceso NC/DMV</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label className="mb-1.5 block">Mensaje *</Label>
                      <textarea
                        value={form.message}
                        onChange={set("message")}
                        required
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 min-h-[120px] resize-none"
                        placeholder="¿En qué podemos ayudarte? ¿Qué tipo de vehículo buscas?..."
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    <Send className="h-5 w-5" />
                    Enviar Mensaje
                  </Button>
                  <p className="text-xs text-gray-400 text-center">
                    También puedes contactarnos directamente por WhatsApp para respuesta inmediata.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
