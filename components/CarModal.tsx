"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/data";
import { formatCurrency, formatNumber, calcMonthlyPayment } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Gauge,
  Settings2,
  Fuel,
  Calendar,
  Palette,
  Car as CarIcon,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Calculator,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarModal({ car, onClose }: CarModalProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showBuyersGuide, setShowBuyersGuide] = useState(false);
  const [downPayment, setDownPayment] = useState(3000);
  const [rate, setRate] = useState(9.9);
  const [term, setTerm] = useState(60);

  if (!car) return null;

  const monthly = calcMonthlyPayment(car.price, downPayment, rate, term);
  const totalInterest = monthly * term - (car.price - downPayment);
  const waMsg = encodeURIComponent(
    `¡Hola! Me interesa el ${car.year} ${car.make} ${car.model} (${car.trim}) a ${formatCurrency(car.price)}. VIN: ${car.vin}`
  );

  return (
    <Dialog open={!!car} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* LEFT: Images */}
          <div className="bg-navy-950">
            <div className="relative h-64 md:h-80">
              <Image
                src={car.images[imgIdx] ?? car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => Math.max(0, i - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setImgIdx((i) => Math.min(car.images.length - 1, i + 1))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {car.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          i === imgIdx ? "bg-brand-green w-4" : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Price + VIN */}
            <div className="p-4 text-white">
              <div className="text-3xl font-extrabold text-brand-green mb-1">
                {formatCurrency(car.price)}
              </div>
              <div className="text-sm text-gray-400">
                VIN: <span className="font-mono text-xs">{car.vin}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 flex flex-col gap-2">
              <a
                href={`https://wa.me/19195550100?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2.5 font-semibold text-sm hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp – Preguntar
              </a>
              <a
                href="tel:+19195550100"
                className="flex items-center justify-center gap-2 bg-navy-800 text-white rounded-xl py-2.5 font-semibold text-sm hover:bg-navy-700 transition-colors border border-white/10"
              >
                <Phone className="h-4 w-4" />
                Llamar (919) 555-0100
              </a>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="p-5 overflow-y-auto max-h-[80vh] flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-xl text-navy-900">
                {car.year} {car.make} {car.model}
              </DialogTitle>
              <p className="text-sm text-gray-500 font-medium">{car.trim}</p>
            </DialogHeader>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Gauge, label: "Millas", value: `${formatNumber(car.mileage)} mi` },
                { icon: Settings2, label: "Trans.", value: car.transmission },
                { icon: Fuel, label: "Combustible", value: car.fuelType },
                { icon: Calendar, label: "Año", value: car.year },
                { icon: Palette, label: "Color", value: car.color },
                { icon: CarIcon, label: "Tipo", value: car.type },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-navy-700 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">{label}</div>
                    <div className="text-sm font-bold text-navy-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-navy-900 mb-1.5 text-sm">Descripción</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-navy-900 mb-1.5 text-sm">Equipamiento</h4>
              <ul className="grid grid-cols-1 gap-1">
                {car.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment calculator */}
            <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-4 w-4 text-navy-700" />
                <h4 className="font-semibold text-navy-900 text-sm">Calculadora de Pago</h4>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Enganche $</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full border rounded-lg px-2 py-1.5 text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    min={0}
                    step={500}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tasa % anual</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full border rounded-lg px-2 py-1.5 text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    min={0}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Plazo (meses)</label>
                  <select
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full border rounded-lg px-2 py-1.5 text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                  >
                    {[24, 36, 48, 60, 72].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">Pago mensual est.</div>
                  <div className="text-2xl font-extrabold text-navy-900">
                    {formatCurrency(monthly)}/mes
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>Préstamo: {formatCurrency(car.price - downPayment)}</div>
                  <div>Total interés: {formatCurrency(totalInterest)}</div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">
                * Estimado. Sujeto a aprobación de crédito. No incluye HUT 3% NC.
              </p>
            </div>

            {/* Buyers Guide FTC */}
            <div>
              <button
                onClick={() => setShowBuyersGuide(!showBuyersGuide)}
                className="flex items-center gap-2 text-sm text-navy-700 font-semibold hover:text-brand-green transition-colors"
              >
                <FileText className="h-4 w-4" />
                {showBuyersGuide ? "Ocultar" : "Ver"} Buyers Guide FTC
                <Info className="h-3.5 w-3.5 text-gray-400" />
              </button>

              {showBuyersGuide && (
                <div className="mt-3 border-2 border-navy-900 rounded-xl p-4 text-xs space-y-2">
                  <div className="text-center font-bold text-navy-900 text-sm border-b border-navy-200 pb-2">
                    BUYERS GUIDE — GUÍA DEL COMPRADOR
                    <div className="text-xs font-normal text-gray-500 mt-0.5">
                      (FTC – Federal Trade Commission)
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="font-bold">Vehículo</div>
                      <div>{car.year} {car.make} {car.model} {car.trim}</div>
                      <div className="mt-1 font-bold">VIN</div>
                      <div className="font-mono">{car.vin}</div>
                    </div>
                    <div>
                      <div className="font-bold">Precio</div>
                      <div className="text-lg font-extrabold text-navy-900">
                        {formatCurrency(car.price)}
                      </div>
                      <div className="mt-1 font-bold">Millas</div>
                      <div>{formatNumber(car.mileage)} mi</div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2 font-semibold text-yellow-900">
                    ⚠ AS IS — SIN GARANTÍA DEL DISTRIBUIDOR
                  </div>
                  <div className="text-gray-600 space-y-1">
                    <p>
                      <strong>El distribuidor no asume responsabilidad por reparaciones</strong> después de la venta. Si usted desea garantía, puede adquirir un contrato de servicio (garantía extendida).
                    </p>
                    <p>
                      Se recomienda que <strong>haga inspeccionar el vehículo por un mecánico independiente</strong> antes de comprarlo.
                    </p>
                  </div>
                  <div className="text-gray-500 border-t pt-2">
                    <div className="font-semibold text-gray-700">Peak Auto Gallery</div>
                    <div>1234 Independence Blvd, Charlotte, NC 28209</div>
                    <div>Tel: (919) 555-0100</div>
                  </div>
                </div>
              )}
            </div>

            <Button variant="primary" size="lg" className="w-full" asChild>
              <Link href="/proceso-compra">
                ¿Listo para comprar? — Ver proceso NC →
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
