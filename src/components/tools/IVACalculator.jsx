"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IVACalculatorCR() {
  const [subtotal, setSubtotal] = useState("");
  const [ivaPercentage, setIvaPercentage] = useState("13");

  const subtotalValue = parseFloat(subtotal) || 0;
  const iva = (subtotalValue * parseFloat(ivaPercentage || 0)) / 100;
  const total = subtotalValue + iva;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(total.toFixed(2));
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-md border border-gray-200">
      <CardContent className="py-8">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Calculator className="w-5 h-5" />
          Calculadora de IVA
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="subtotal">Monto sin IVA</Label>
            <Input
              id="subtotal"
              type="number"
              placeholder="Ej. 10000"
              value={subtotal}
              onChange={(e) => setSubtotal(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="iva">Porcentaje de IVA (%)</Label>
            <Input
              id="iva"
              type="number"
              value={ivaPercentage}
              onChange={(e) => setIvaPercentage(e.target.value)}
            />
          </div>

          <hr className="my-4" />

          <div className="text-sm text-gray-700">
            <p>Subtotal: ₡{subtotalValue.toLocaleString("es-CR", { minimumFractionDigits: 2 })}</p>
            <p>IVA ({ivaPercentage}%): ₡{iva.toLocaleString("es-CR", { minimumFractionDigits: 2 })}</p>
            <p className="font-bold text-green-800 mt-2">Total con IVA: ₡{total.toLocaleString("es-CR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex justify-end mt-2">
            <Button variant="link" onClick={copyToClipboard} className="text-xs p-0 h-auto">
              Copiar total al portapapeles
            </Button>
          </div>

          <div className="mt-6 bg-blue-50 text-blue-800 text-center p-4 rounded-md text-xl font-semibold">
            Total con IVA: ₡{total.toLocaleString("es-CR", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
