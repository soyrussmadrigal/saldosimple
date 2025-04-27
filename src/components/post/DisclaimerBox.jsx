"use client";

import { Info } from "lucide-react";

export default function DisclaimerBox() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-black-50 rounded-md p-2 mt-16 mb-8">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-gray-400 mt-1" />
        <p className="text-sm text-gray-600 leading-relaxed">
          SaldoSimple podría recibir compensaciones de nuestros socios. Sin
          embargo, nuestras opiniones son propias. Consulta nuestra{" "}
          <a href="#" className="text-blue-600 hover:underline">
            lista de socios
          </a>{" "}
          y{" "}
          <a href="#" className="text-blue-600 hover:underline">
            cómo generamos ingresos
          </a>
          .
        </p>
      </div>
    </div>
  );
}
