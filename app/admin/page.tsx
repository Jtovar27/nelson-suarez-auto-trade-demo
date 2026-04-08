"use client";

import React, { useState } from "react";
import { CARS, FAKE_LEADS } from "@/lib/data";
import {
  formatCurrency,
  formatNumber,
  calcHUT,
  calcMonthlyPayment,
  calcDealerOffer,
} from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  LogIn,
  LogOut,
  LayoutDashboard,
  Calculator,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Pencil,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Banknote,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "demo123") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos. (admin / demo123)");
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="bg-navy-900 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-brand-green" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900">Portal Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Peak Auto Gallery</p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <Label className="mb-1.5 block">Usuario</Label>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Contraseña</Label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3 text-sm">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            <LogIn className="h-5 w-5" />
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-5 bg-gray-50 rounded-xl p-3 text-xs text-gray-500 text-center">
          <div className="font-semibold text-gray-700 mb-1">Credenciales de demostración</div>
          <div>Usuario: <code className="bg-gray-200 px-1 rounded">admin</code></div>
          <div>Contraseña: <code className="bg-gray-200 px-1 rounded">demo123</code></div>
        </div>
      </div>
    </div>
  );
}

// ─── HUT + Trade-in Calculator ────────────────────────────────────────────────
function HUTCalc() {
  const [price, setPrice] = useState(22000);
  const [tradeIn, setTradeIn] = useState(0);
  const [cost, setCost] = useState(18000);
  const hut = calcHUT(price, tradeIn);
  const taxable = Math.max(0, price - tradeIn);
  const totalBuyer = price + hut;
  const profit = price - cost;
  const margin = price > 0 ? (profit / price) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-navy-900 text-lg mb-5 flex items-center gap-2">
        <Receipt className="h-5 w-5 text-brand-green" />
        Calculadora HUT 3% + Trade-in + Margen
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-1.5 block">Precio de venta ($)</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              step={500}
              min={0}
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Valor trade-in ($) — 0 si no aplica</Label>
            <Input
              type="number"
              value={tradeIn}
              onChange={(e) => setTradeIn(Number(e.target.value))}
              step={500}
              min={0}
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Costo de adquisición ($)</Label>
            <Input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              step={500}
              min={0}
            />
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
            <strong>Regla NC:</strong> HUT = 3% × (precio − trade-in). El HUT lo paga el comprador al DMV, NO al dealer.
          </div>
        </div>
        <div className="bg-navy-950 rounded-2xl p-5 text-white space-y-3">
          <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-3">Desglose</div>
          {[
            ["Precio de venta", formatCurrency(price), "text-white"],
            ["− Trade-in", tradeIn > 0 ? `−${formatCurrency(tradeIn)}` : "N/A", "text-green-400"],
            ["= Monto gravable HUT", formatCurrency(taxable), "text-gray-200"],
            ["HUT 3% (paga comprador)", formatCurrency(hut), "text-yellow-300"],
            ["Total que paga comprador", formatCurrency(totalBuyer), "text-white font-bold"],
          ].map(([label, value, cls]) => (
            <div key={label} className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-gray-400 text-sm">{label}</span>
              <span className={`text-sm font-semibold ${cls}`}>{value}</span>
            </div>
          ))}
          <div className="pt-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Tu ganancia bruta</span>
              <span className={`text-xl font-extrabold ${profit >= 0 ? "text-brand-green" : "text-red-400"}`}>
                {formatCurrency(profit)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Margen</span>
              <Badge
                variant={margin >= 15 ? "green" : "yellow"}
                className="text-sm"
              >
                {margin.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Calculator ───────────────────────────────────────────────────────
function PaymentCalc() {
  const [price, setPrice] = useState(22000);
  const [down, setDown] = useState(3000);
  const [rate, setRate] = useState(9.9);
  const [term, setTerm] = useState(60);

  const monthly = calcMonthlyPayment(price, down, rate, term);
  const principal = Math.max(0, price - down);
  const totalPaid = monthly * term;
  const totalInterest = totalPaid - principal;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-navy-900 text-lg mb-5 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-brand-green" />
        Calculadora de Pago Mensual
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: "Precio del vehículo ($)", val: price, set: setPrice, step: 500 },
            { label: "Enganche / Down payment ($)", val: down, set: setDown, step: 500 },
            { label: "Tasa de interés anual (%)", val: rate, set: setRate, step: 0.1 },
          ].map(({ label, val, set, step }) => (
            <div key={label}>
              <Label className="mb-1.5 block">{label}</Label>
              <Input
                type="number"
                value={val}
                onChange={(e) => set(Number(e.target.value))}
                step={step}
                min={0}
              />
            </div>
          ))}
          <div>
            <Label className="mb-1.5 block">Plazo (meses)</Label>
            <div className="flex gap-2">
              {[24, 36, 48, 60, 72].map((m) => (
                <button
                  key={m}
                  onClick={() => setTerm(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    term === m
                      ? "bg-brand-green text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-navy-950 rounded-2xl p-5 text-white flex flex-col justify-center gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Pago mensual estimado</div>
            <div className="text-5xl font-extrabold text-brand-green">
              {formatCurrency(monthly)}
            </div>
            <div className="text-gray-400 text-sm mt-1">/ mes por {term} meses</div>
          </div>
          <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
            {[
              ["Préstamo neto", formatCurrency(principal)],
              ["Total pagado", formatCurrency(totalPaid)],
              ["Total intereses", formatCurrency(totalInterest)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">
            * Estimado. Sujeto a aprobación de crédito. No incluye HUT 3% NC ni seguros.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Offer Calculator ─────────────────────────────────────────────────────────
function OfferCalc() {
  const [vin, setVin] = useState("");
  const [market, setMarket] = useState(20000);
  const [mileage, setMileage] = useState(60000);
  const [condition, setCondition] = useState<"excellent" | "good" | "fair" | "poor">("good");
  const [calculated, setCalculated] = useState(false);

  const offer = calcDealerOffer(market, mileage, condition);
  const margin = market > 0 ? ((market - offer) / market) * 100 : 0;

  const CONDITIONS = [
    { value: "excellent", label: "Excelente", color: "bg-green-100 text-green-700" },
    { value: "good", label: "Bueno", color: "bg-blue-100 text-blue-700" },
    { value: "fair", label: "Regular", color: "bg-yellow-100 text-yellow-700" },
    { value: "poor", label: "Deficiente", color: "bg-red-100 text-red-700" },
  ] as const;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-navy-900 text-lg mb-5 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-brand-green" />
        Calculadora de Oferta al Vendedor
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-1.5 block">VIN (opcional)</Label>
            <Input
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="1HGBH41JXMN109186"
              maxLength={17}
              className="font-mono uppercase"
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Valor de mercado / MMR ($)</Label>
            <Input
              type="number"
              value={market}
              onChange={(e) => setMarket(Number(e.target.value))}
              step={500}
              min={0}
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Millaje actual</Label>
            <Input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              step={1000}
              min={0}
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Condición del vehículo</Label>
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCondition(c.value)}
                  className={`rounded-xl border-2 py-2 text-sm font-semibold transition-all ${
                    condition === c.value
                      ? "border-navy-900 bg-navy-900 text-white"
                      : `border-transparent ${c.color} hover:opacity-80`
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setCalculated(true)}
          >
            <Calculator className="h-4 w-4" />
            Calcular Oferta
          </Button>
        </div>

        <div className="bg-navy-950 rounded-2xl p-5 text-white flex flex-col gap-4">
          {calculated ? (
            <>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Oferta recomendada al vendedor
                </div>
                <div className="text-4xl font-extrabold text-brand-green">
                  {formatCurrency(offer)}
                </div>
                {vin && (
                  <div className="text-xs text-gray-400 font-mono mt-1">
                    VIN: {vin}
                  </div>
                )}
              </div>
              <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                {[
                  ["Valor de mercado", formatCurrency(market)],
                  ["Oferta dealer", formatCurrency(offer)],
                  ["Espacio de negociación", formatCurrency(market - offer)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center border-t border-white/10 pt-2">
                  <span className="text-gray-400">Margen potencial</span>
                  <Badge
                    variant={margin >= 15 ? "green" : "yellow"}
                    className="text-sm"
                  >
                    {margin.toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-xs text-gray-400">
                La oferta se calcula como: Valor Mercado × Factor Condición × Factor Millas.
                Ajusta según historial del vehículo e inspección física.
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <TrendingUp className="h-12 w-12 opacity-30" />
              <p className="text-sm text-center">
                Ingresa los datos del vehículo y presiona &ldquo;Calcular Oferta&rdquo; para ver la recomendación
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const totalValue = CARS.reduce((s, c) => s + c.price, 0);
  const avgPrice = totalValue / CARS.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-950 text-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-brand-green" />
            <div>
              <div className="font-bold">Panel de Administración</div>
              <div className="text-xs text-gray-400">Peak Auto Gallery</div>
            </div>
          </div>
          <Button
            variant="outline-white"
            size="sm"
            onClick={() => setLoggedIn(false)}
          >
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Car, label: "Vehículos en Inventario", value: CARS.length, color: "text-blue-600", bg: "bg-blue-50" },
            { icon: DollarSign, label: "Valor Total Inventario", value: formatCurrency(totalValue), color: "text-green-600", bg: "bg-green-50" },
            { icon: TrendingUp, label: "Precio Promedio", value: formatCurrency(avgPrice), color: "text-purple-600", bg: "bg-purple-50" },
            { icon: Users, label: "Leads Pendientes", value: FAKE_LEADS.filter(l => l.status === "Nuevo").length, color: "text-orange-500", bg: "bg-orange-50" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className={`${bg} rounded-xl p-2 w-fit mb-2`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div className="text-xs text-gray-500 mb-0.5">{label}</div>
              <div className="font-extrabold text-navy-900 text-xl">{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inventario" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="bg-white border border-gray-100 shadow-sm h-auto p-1 w-full sm:w-auto gap-1">
              {[
                { value: "inventario", icon: Car, label: "Inventario" },
                { value: "oferta", icon: TrendingUp, label: "Calc. Oferta" },
                { value: "hut", icon: Receipt, label: "HUT + Margen" },
                { value: "pago", icon: Calculator, label: "Pago Mensual" },
                { value: "leads", icon: Users, label: "Leads" },
                { value: "documentos", icon: FileText, label: "Documentos" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center gap-1.5 data-[state=active]:bg-navy-900 data-[state=active]:text-white text-xs sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Inventario Tab */}
          <TabsContent value="inventario">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-navy-900">Inventario Actual</h3>
                <Button variant="primary" size="sm">
                  + Agregar Vehículo
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Vehículo</TableHead>
                    <TableHead>VIN</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Millas</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Días en Lote</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CARS.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell className="font-semibold text-navy-900">
                        {car.year} {car.make} {car.model}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-gray-500">
                        {car.vin.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>{formatNumber(car.mileage)}</TableCell>
                      <TableCell className="font-bold text-brand-green-dark">
                        {formatCurrency(car.price)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            car.status === "available"
                              ? "green"
                              : car.status === "pending"
                              ? "yellow"
                              : "secondary"
                          }
                        >
                          {car.status === "available" ? "Disponible" : car.status === "pending" ? "Pendiente" : "Vendido"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            car.daysOnLot <= 7
                              ? "text-green-600"
                              : car.daysOnLot <= 30
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {car.daysOnLot} días
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Oferta Tab */}
          <TabsContent value="oferta">
            <OfferCalc />
          </TabsContent>

          {/* HUT Tab */}
          <TabsContent value="hut">
            <HUTCalc />
          </TabsContent>

          {/* Pago Tab */}
          <TabsContent value="pago">
            <PaymentCalc />
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-navy-900">Leads Recibidos</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Clientes interesados en comprar o vender
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Interés</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Contactar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FAKE_LEADS.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-semibold text-navy-900">
                        {lead.name}
                      </TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {lead.email}
                      </TableCell>
                      <TableCell className="text-sm">{lead.interest}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {lead.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            lead.status === "Nuevo"
                              ? "green"
                              : lead.status === "Cita agendada" || lead.status === "Negociando"
                              ? "yellow"
                              : "blue"
                          }
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition-colors"
                          >
                            <span className="text-xs font-bold">W</span>
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center justify-center h-8 w-8 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors"
                          >
                            <span className="text-xs font-bold">📞</span>
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Documentos Tab */}
          <TabsContent value="documentos">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-navy-900 text-lg mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-green" />
                Generador de Documentos NCDMV
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "MVR-180 — Odómetro",
                    desc: "Genera el formulario de divulgación de millaje para la transacción actual.",
                    icon: "📄",
                    action: "Generar PDF MVR-180",
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                  },
                  {
                    title: "MVR-1 — Solicitud de Título",
                    desc: "Formulario de solicitud de título e información de registro del NCDMV.",
                    icon: "📋",
                    action: "Generar PDF MVR-1",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    title: "Buyers Guide FTC",
                    desc: "Genera la Guía del Comprador requerida por la FTC para incluir con el vehículo.",
                    icon: "🛡️",
                    action: "Generar Buyers Guide",
                    color: "text-green-600",
                    bg: "bg-green-50",
                  },
                  {
                    title: "Recibo de Compra-Venta",
                    desc: "Bill of Sale oficial para la transacción. Incluye precio, VIN y datos del comprador/vendedor.",
                    icon: "🧾",
                    action: "Generar Bill of Sale",
                    color: "text-orange-500",
                    bg: "bg-orange-50",
                  },
                  {
                    title: "MVR-181 — Poder Notarial",
                    desc: "Formulario de poder notarial para transacciones del DMV cuando el titular no puede estar presente.",
                    icon: "✍️",
                    action: "Generar PDF MVR-181",
                    color: "text-red-500",
                    bg: "bg-red-50",
                  },
                  {
                    title: "Hoja de Desembolso HUT",
                    desc: "Resumen del Highway Use Tax calculado para la transacción.",
                    icon: "💰",
                    action: "Generar Hoja HUT",
                    color: "text-teal-600",
                    bg: "bg-teal-50",
                  },
                ].map(({ title, desc, icon, action, color, bg }) => (
                  <div
                    key={title}
                    className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className={`${bg} rounded-xl p-2 w-fit mb-3`}>
                      <span className="text-xl">{icon}</span>
                    </div>
                    <h4 className={`font-bold text-sm mb-1 ${color}`}>{title}</h4>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">{desc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() =>
                        alert(
                          `✅ [DEMO] ${action} generado.\n\nEn la versión de producción, este botón generará el PDF real usando los datos de la transacción activa.`
                        )
                      }
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {action}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Modo demostración:</strong> Los botones de PDF muestran una confirmación simulada.
                  En producción, los documentos se generarían con los datos reales de cada transacción.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
