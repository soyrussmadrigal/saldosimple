// src/components/layout/Footer.jsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white py-10 text-sm text-gray-600">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="font-semibold text-gray-800">SaldoSimple</p>
          <p className="mt-1">Educación financiera clara y práctica.</p>
        </div>

        <div className="flex gap-6 flex-wrap">
          <Link href="/articulos" className="hover:underline">
            Artículos
          </Link>
          <Link href="/herramientas" className="hover:underline">
            Herramientas
          </Link>
          <Link href="/acerca" className="hover:underline">
            Acerca
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contacto
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} SaldoSimple. Todos los derechos reservados.
      </div>
    </footer>
  );
}
