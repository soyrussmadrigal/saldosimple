"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const currencyOptions = [
  {
    code: "CRC",
    label: "Costa Rica",
    locale: "es-CR",
    symbol: "₡",
    flag: "cr",
  },
  { code: "MXN", label: "México", locale: "es-MX", symbol: "$", flag: "mx" },
  { code: "COP", label: "Colombia", locale: "es-CO", symbol: "$", flag: "co" },
  { code: "ARS", label: "Argentina", locale: "es-AR", symbol: "$", flag: "ar" },
  { code: "PEN", label: "Perú", locale: "es-PE", symbol: "S/", flag: "pe" },
  { code: "CLP", label: "Chile", locale: "es-CL", symbol: "$", flag: "cl" },
  { code: "USD", label: "Panamá", locale: "es-PA", symbol: "$", flag: "pa" },
  {
    code: "USD",
    label: "Estados Unidos",
    locale: "en-US",
    symbol: "$",
    flag: "us",
  },
  { code: "EUR", label: "España", locale: "es-ES", symbol: "€", flag: "es" },
];

const ivaPorPais = {
  cr: 13,
  mx: 16,
  co: 19,
  ar: 21,
  pe: 18,
  cl: 19,
  pa: 7,
  us: 0,
  es: 21,
};

export default function CurrencySelector({
  currency,
  setCurrency,
  showIVA = false,
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setCurrency(option);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left h-11 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <Image
              src={`/flags/${currency.flag}.svg`}
              alt={currency.label}
              width={24}
              height={16}
              className="object-contain"
              priority
            />
            <span>
              {currency.label} ({currency.symbol})
            </span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">
          Selecciona tu país o moneda
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {currencyOptions.map((option) => (
            <button
              key={`${option.code}-${option.flag}`}
              onClick={() => handleSelect(option)}
              className="p-3 border rounded-xl hover:bg-gray-50 transition text-sm text-left flex flex-col items-center shadow-sm"
            >
              <Image
                src={`/flags/${option.flag}.svg`}
                alt={option.label}
                width={36}
                height={24}
                className="mb-2"
              />
              <span className="font-medium">{option.label}</span>
              <span className="text-muted-foreground text-xs">
                {option.symbol}
              </span>
              {showIVA && (
                <span className="text-gray-500 text-xs mt-1">
                  IVA {ivaPorPais[option.flag] ?? 0}%
                </span>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
