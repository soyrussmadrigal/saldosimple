"use client";

import { Info } from "lucide-react";

export default function DisclaimerBox() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-md p-6 my-8">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600 leading-relaxed">
          SaldoSimple podría recibir compensaciones de nuestros socios. Sin embargo, nuestras opiniones son propias. Consulta nuestra{" "}
          <a href="#" className="text-blue-600 hover:underline">lista de socios</a> y{" "}
          <a href="#" className="text-blue-600 hover:underline">cómo generamos ingresos</a>.
        </p>
      </div>
    </div>
  );
}
