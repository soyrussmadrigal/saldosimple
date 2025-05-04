"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencySelector from "@/components/tools/CurrencySelector";
import { toast } from "sonner";
import "@/app/custom/animations.css";

const currencyOptions = [
  { code: "CRC", label: "Costa Rica", locale: "es-CR", symbol: "₡", flag: "cr" },
  { code: "MXN", label: "México", locale: "es-MX", symbol: "$", flag: "mx" },
  { code: "COP", label: "Colombia", locale: "es-CO", symbol: "$", flag: "co" },
  { code: "ARS", label: "Argentina", locale: "es-AR", symbol: "$", flag: "ar" },
  { code: "PEN", label: "Perú", locale: "es-PE", symbol: "S/", flag: "pe" },
  { code: "CLP", label: "Chile", locale: "es-CL", symbol: "$", flag: "cl" },
  { code: "USD", label: "Panamá / USA", locale: "en-US", symbol: "$", flag: "pa" },
  { code: "EUR", label: "España", locale: "es-ES", symbol: "€", flag: "es" },
];

const ivaPorPais = {
  cr: 13,
  mx: 16,
  co: 19,
  ar: 21,
  pe: 18,
  cl: 19,
  us: 0,
  pa: 7,
  es: 21,
};

export default function IVACalculator() {
  const [subtotal, setSubtotal] = useState("");
  const [ivaPercentage, setIvaPercentage] = useState("13");
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [ivaPaisSeleccionado, setIvaPaisSeleccionado] = useState(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json?token=ccb7b44cb83fb2");
        const data = await res.json();
        const countryCode = data?.country?.toUpperCase();
        const match = currencyOptions.find(opt => opt.flag === countryCode.toLowerCase());
        if (match) handleSelectCountry(match);
      } catch (err) {
        console.error("No se pudo detectar el país automáticamente.");
      }
    };

    detectCountry();
  }, []);

  const handleSelectCountry = (option) => {
    setCurrency(option);
    const iva = ivaPorPais[option.flag] ?? 0;
    setIvaPercentage(iva.toString());
    setIvaPaisSeleccionado(iva);
  };

  const subtotalValue = parseFloat(subtotal) || 0;
  const iva = (subtotalValue * parseFloat(ivaPercentage || 0)) / 100;
  const total = subtotalValue + iva;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(total.toFixed(2));
    toast.success(
      `Se copió ${currency.symbol}${total.toLocaleString(currency.locale, { minimumFractionDigits: 2 })} al portapapeles.`
    );
  };

  return (
    <Card className="w-full max-w-xl mx-auto mt-16 px-4 sm:px-8 py-8 shadow-xl rounded-3xl bg-white border border-gray-200">
      <CardContent>
        <div className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-6">
          <Calculator className="w-6 h-6" />
          Calculadora de IVA
        </div>

        <Label className="text-sm text-gray-600 mt-0 block">Selecciona tu país</Label>
        <div className="mt-2 mb-2">
          <CurrencySelector currency={currency} setCurrency={handleSelectCountry} />
        </div>

        {ivaPaisSeleccionado !== null && (
          <div className="mb-6">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full shadow-sm animate-fade-in">
              IVA {ivaPaisSeleccionado}%
            </span>
          </div>
        )}

        <Label htmlFor="subtotal" className="text-sm text-gray-600 mt-6 block">Monto sin IVA</Label>
        <Input
          id="subtotal"
          type="number"
          placeholder="Ej. 10000"
          value={subtotal}
          onChange={(e) => setSubtotal(e.target.value)}
          className="w-full rounded-lg h-11"
        />

        <Label htmlFor="iva" className="text-sm text-gray-600 mt-6 block">Porcentaje de IVA (%)</Label>
        <Input
          id="iva"
          type="number"
          value={ivaPercentage}
          onChange={(e) => setIvaPercentage(e.target.value)}
          className="w-full rounded-lg h-11"
        />

        <div className="text-sm text-gray-700 space-y-1 mt-6">
          <p>Subtotal: {currency.symbol}{subtotalValue.toLocaleString(currency.locale, { minimumFractionDigits: 2 })}</p>
          <p>IVA ({ivaPercentage}%): {currency.symbol}{iva.toLocaleString(currency.locale, { minimumFractionDigits: 2 })}</p>
          <p className="font-bold text-green-700 mt-2">Total con IVA: {currency.symbol}{total.toLocaleString(currency.locale, { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="link" onClick={copyToClipboard} className="text-xs p-0 h-auto">
            Copiar total
          </Button>
        </div>

        <div className="mt-6 bg-green-50 text-green-800 text-center p-6 rounded-xl text-2xl font-semibold shadow-md">
          Total con IVA: {currency.symbol}{total.toLocaleString(currency.locale, { minimumFractionDigits: 2 })}
        </div>
      </CardContent>
    </Card>
  );
}
