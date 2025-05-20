"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import GaugeChart from "react-gauge-chart";

const currencyOptions = [
  { code: "CRC", label: "Colones", locale: "es-CR", symbol: "₡" },
  { code: "USD", label: "Dólares", locale: "en-US", symbol: "$" },
];

export default function AguinaldoCalculatorCR() {
  const [salary, setSalary] = useState(0);
  const [durationType, setDurationType] = useState("dias"); // "dias" o "meses"
  const [duration, setDuration] = useState(360);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [aguinaldo, setAguinaldo] = useState(0);

  const handleCalculate = () => {
    const normalizedDays = durationType === "meses" ? duration * 30 : duration;
    const totalSalary = salary * (normalizedDays / 30);
    const result = totalSalary / 12;
    setAguinaldo(result);
  };

  const maxAguinaldo = salary * 2; // escala del odómetro

  return (
    <Card className="w-full max-w-3xl mx-auto mt-16 px-4 sm:px-8 py-8 shadow-xl rounded-3xl bg-white border border-gray-200">
      <CardContent>
        <div className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-6">
          <Calculator className="w-6 h-6" />
          Calculadora de Aguinaldo
        </div>

        <Label className="text-sm text-gray-600 block">Moneda</Label>
        <div className="flex gap-4 my-4">
          {currencyOptions.map((option) => (
            <Button
              key={option.code}
              variant={currency.code === option.code ? "default" : "outline"}
              onClick={() => setCurrency(option)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <Label htmlFor="salary" className="text-sm text-gray-600 block">
          Salario mensual promedio
        </Label>
        <Input
          id="salary"
          type="number"
          placeholder="Ej. 500000"
          value={salary}
          onChange={(e) => setSalary(parseFloat(e.target.value))}
          className="w-full rounded-lg h-11 mb-6"
        />

        <Label className="text-sm text-gray-600 block">Tipo de duración</Label>
        <div className="flex gap-4 mb-4">
          <Button
            variant={durationType === "dias" ? "default" : "outline"}
            onClick={() => setDurationType("dias")}
          >
            Días
          </Button>
          <Button
            variant={durationType === "meses" ? "default" : "outline"}
            onClick={() => setDurationType("meses")}
          >
            Meses
          </Button>
        </div>

        <Label htmlFor="duration" className="text-sm text-gray-600 block">
          Cantidad de {durationType}
        </Label>
        <Input
          id="duration"
          type="number"
          placeholder={durationType === "dias" ? "Ej. 330" : "Ej. 11"}
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full rounded-lg h-11 mb-6"
        />

        <Button onClick={handleCalculate} className="w-full mb-8">
          Calcular Aguinaldo
        </Button>

        {aguinaldo > 0 && (
          <div className="text-center">
            <div className="text-xl font-bold text-teal-900 mb-4">
              Aguinaldo estimado: {currency.symbol}
              {aguinaldo.toLocaleString(currency.locale, {
                minimumFractionDigits: 2,
              })}
            </div>

            <div className="flex justify-center">
              <GaugeChart
                id="gauge-chart-aguinaldo"
                nrOfLevels={20}
                percent={Math.min(aguinaldo / maxAguinaldo, 1)}
                textColor="#034d5a"
                needleColor="#034d5a"
                colors={["#a4ced4", "#034d5a"]}
                arcWidth={0.3}
              />

              <div className="mt-6 text-sm text-gray-700 leading-relaxed">
                Trabajaste {duration}{" "}
                {durationType === "dias" ? "días" : "meses"} y tu salario
                promedio fue de {currency.symbol}
                {salary.toLocaleString(currency.locale, {
                  minimumFractionDigits: 2,
                })}
                . Te corresponde un aguinaldo aproximado de{" "}
                <span className="font-semibold text-[#034d5a]">
                  {currency.symbol}
                  {aguinaldo.toLocaleString(currency.locale, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                .
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
