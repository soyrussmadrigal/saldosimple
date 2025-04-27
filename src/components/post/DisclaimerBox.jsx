"use client";

import { Info } from "lucide-react"; // 👈 Usamos un ícono bonito de lucide-react (o puedes cambiarlo)

export default function DisclaimerBox() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-md p-6 my-8 animate-fadeIn">
      <div className="flex items-start gap-4">
        {/* Icono */}
        <div className="flex-shrink-0">
          <Info className="h-6 w-6 text-blue-600" />
        </div>
        {/* Texto */}
        <p className="text-sm text-blue-800 leading-relaxed">
          SaldoSimple podría recibir compensaciones de nuestros socios. Sin
          embargo, nuestras opiniones son propias. Consulta nuestra{" "}
          <a href="#" className="text-blue-700 underline hover:text-blue-800">
            lista de socios
          </a>{" "}
          y{" "}
          <a href="#" className="text-blue-700 underline hover:text-blue-800">
            cómo generamos ingresos
          </a>
          .
        </p>
      </div>
    </div>
  );
}
