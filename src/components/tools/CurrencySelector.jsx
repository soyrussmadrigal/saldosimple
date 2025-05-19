"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const currencyOptions = [
  { code: "CRC", label: "Costa Rica", locale: "es-CR", symbol: "₡", flag: "cr" },
  { code: "MXN", label: "México", locale: "es-MX", symbol: "$", flag: "mx" },
  { code: "COP", label: "Colombia", locale: "es-CO", symbol: "$", flag: "co" },
  { code: "ARS", label: "Argentina", locale: "es-AR", symbol: "$", flag: "ar" },
  { code: "PEN", label: "Perú", locale: "es-PE", symbol: "S/", flag: "pe" },
  { code: "CLP", label: "Chile", locale: "es-CL", symbol: "$", flag: "cl" },
  { code: "USD", label: "Estados Unidos", locale: "en-US", symbol: "$", flag: "us" },
  { code: "PAB", label: "Panamá", locale: "es-PA", symbol: "B/.", flag: "pa" },
  { code: "EUR", label: "España", locale: "es-ES", symbol: "€", flag: "es" },
];

export default function CurrencySelector({ currency, setCurrency }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setCurrency(option);
    setOpen(false);
  };

  if (!currency?.code) {
    return (
      <Button variant="outline" className="w-full h-11 rounded-md text-gray-400 text-sm">
        Selecciona una moneda
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-11 justify-start text-left rounded-md">
          <div className="flex items-center gap-3">
            <Image
              src={`/flags/${currency.flag}.svg`}
              alt={currency.label}
              width={24}
              height={16}
              className="object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="text-sm font-medium">
              {currency.label} ({currency.symbol})
            </span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Selecciona tu moneda</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {currencyOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => handleSelect(option)}
              className="flex flex-col items-center text-sm p-3 border rounded-lg hover:bg-gray-50 transition"
            >
              <Image
                src={`/flags/${option.flag}.svg`}
                alt={option.label}
                width={36}
                height={24}
                className="mb-2"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="font-medium">{option.label}</span>
              <span className="text-gray-500 text-xs">{option.symbol}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
