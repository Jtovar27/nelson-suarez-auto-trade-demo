"use client";

import React, { useState } from "react";

export default function HUTCalculatorInline() {
  const [price, setPrice] = useState(20000);
  const [tradeIn, setTradeIn] = useState(0);
  const taxable = Math.max(0, price - tradeIn);
  const hut = taxable * 0.03;
  const total = price + hut;

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
            Precio de compra ($)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border-2 rounded-xl px-4 py-3 text-lg font-bold text-navy-900 focus:outline-none focus:border-navy-600"
            min={0}
            step={500}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
            Valor del trade-in ($) — opcional
          </label>
          <input
            type="number"
            value={tradeIn}
            onChange={(e) => setTradeIn(Number(e.target.value))}
            className="w-full border-2 rounded-xl px-4 py-3 text-lg font-bold text-navy-900 focus:outline-none focus:border-navy-600"
            min={0}
            step={500}
          />
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
          <strong>Regla NC:</strong> Si das tu auto en trade-in, el valor se resta del precio de compra antes de calcular el 3% HUT. ¡Pagas menos impuesto!
        </div>
      </div>

      <div className="bg-navy-950 rounded-2xl p-6 text-white flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400 text-sm">Precio de compra</span>
            <span className="font-bold">${price.toLocaleString()}</span>
          </div>
          {tradeIn > 0 && (
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-gray-400 text-sm">− Trade-in</span>
              <span className="font-bold text-green-400">−${tradeIn.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400 text-sm">Monto gravable</span>
            <span className="font-bold">${taxable.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400 text-sm">HUT 3% NC</span>
            <span className="font-bold text-yellow-300">
              ${hut.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white font-bold">Total estimado</span>
            <span className="text-2xl font-extrabold text-brand-green">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * El HUT se paga directamente al NCDMV, no al dealer. No incluye tarifas de título y placa (~$50–$100).
        </p>
      </div>
    </div>
  );
}
