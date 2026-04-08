"use client";

import React, { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const phone = "19195550100";
  const message = encodeURIComponent(
    "¡Hola Nelson! Estoy interesado en un vehículo de su inventario. ¿Me puede ayudar?"
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-100 animate-fade-in-up">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#25D366] rounded-full p-1.5">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Peak Auto Gallery</div>
                <div className="text-xs text-green-600">● En línea</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 mb-3">
            <p className="text-sm text-gray-700">
              ¡Hola! 👋 ¿En qué vehículo estás interesado? Escríbeme y te ayudo de inmediato.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2.5 font-semibold text-sm hover:bg-[#1da851] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
            <a
              href="tel:+19195550100"
              className="flex items-center justify-center gap-2 bg-navy-900 text-white rounded-xl py-2.5 font-semibold text-sm hover:bg-navy-800 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Llamar ahora
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#25D366] text-white rounded-full p-4 shadow-2xl hover:bg-[#1da851] transition-all hover:scale-110 flex items-center gap-2"
        aria-label="WhatsApp"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <span className="text-sm font-semibold pr-1 hidden sm:block">WhatsApp</span>
          </>
        )}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span className="absolute bottom-0 right-0 h-14 w-14 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
