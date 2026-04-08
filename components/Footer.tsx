import React from "react";
import Link from "next/link";
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-green rounded-lg p-2">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Peak Auto Gallery</div>
                <div className="text-brand-green text-xs font-semibold">AUTO TRADE</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Concesionario de autos usados licenciado por el NCDMV. Sirviendo a la comunidad hispana de Carolina del Norte con honestidad y transparencia.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-brand-green transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-brand-green transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-brand-green transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/inventario", "Inventario de Autos"],
                ["/vender-auto", "Vender mi Auto"],
                ["/proceso-compra", "Proceso de Compra NC"],
                ["/sobre-nosotros", "Sobre Nosotros"],
                ["/contacto", "Contacto"],
                ["/admin", "Portal Admin"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-brand-green transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                <span>1234 Independence Blvd<br />Charlotte, NC 28209</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-green flex-shrink-0" />
                <a href="tel:+19195550100" className="hover:text-brand-green">
                  (919) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-green flex-shrink-0" />
                <a href="mailto:info@nelsonsuarezautotrade.com" className="hover:text-brand-green text-xs">
                  info@nelsonsuarezautotrade.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                <div>
                  <div>Lun–Vie: 9am–7pm</div>
                  <div>Sáb: 9am–5pm</div>
                  <div>Dom: 11am–4pm</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal / NCDMV */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal &amp; Licencias
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-brand-green font-semibold mb-1">Licencia NCDMV</div>
                <div>#NC-DEALER-2024-XXXX</div>
                <div className="mt-1">Bonded &amp; Licensed Dealer</div>
                <div>Carolina del Norte</div>
              </div>
              <p>
                Todos los vehículos incluyen <strong className="text-white">Buyers Guide FTC</strong>.
                Precios sujetos a cambio sin previo aviso.
              </p>
              <p>
                Highway Use Tax 3% aplicado en el registro del NCDMV.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Peak Auto Gallery. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-brand-green">Política de Privacidad</Link>
            <Link href="#" className="hover:text-brand-green">Términos de Uso</Link>
            <Link href="#" className="hover:text-brand-green">FTC Buyer Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
