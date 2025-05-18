"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CurrencySelector from "@/components/tools/CurrencySelector";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const currencies = [
  { code: "USD", label: "Dólar (USD)", symbol: "$", flag: "us" },
  { code: "CRC", label: "Colón (CRC)", symbol: "₡", flag: "cr" },
  { code: "MXN", label: "Peso Mexicano (MXN)", symbol: "$", flag: "mx" },
  { code: "COP", label: "Peso Colombiano (COP)", symbol: "$", flag: "co" },
  { code: "PEN", label: "Sol Peruano (PEN)", symbol: "S/", flag: "pe" },
  { code: "ARS", label: "Peso Argentino (ARS)", symbol: "$", flag: "ar" },
  { code: "EUR", label: "Euro (EUR)", symbol: "€", flag: "es" },
];

export default function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(7);
  const [contribution, setContribution] = useState(100);
  const [compoundFreq, setCompoundFreq] = useState("monthly");
  const [contributionFreq, setContributionFreq] = useState("monthly");
  const [currency, setCurrency] = useState(currencies[0]);
  const [showChart, setShowChart] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const isInvalidYears = isNaN(years) || Number(years) < 1;
  const isInvalidRate = isNaN(rate) || Number(rate) < 0 || Number(rate) > 100;
  const isInvalidDeposit = isNaN(initialDeposit) || Number(initialDeposit) < 0;
  const isInvalidContribution = isNaN(contribution) || Number(contribution) < 0;
  const isValid =
    !isInvalidYears && !isInvalidRate && !isInvalidDeposit && !isInvalidContribution;

  const getCompoundings = (freq) => (freq === "monthly" ? 12 : 1);

  const calculateData = () => {
    if (!isValid) return [];
    const result = [];
    const isMonthly = contributionFreq === "monthly";
    const n = getCompoundings(compoundFreq);
    const contribN = getCompoundings(contributionFreq);
    let balance = parseFloat(initialDeposit);
    let totalPrincipal = balance;
    const r = parseFloat(rate) / 100;

    for (let i = 1; i <= years; i++) {
      for (let j = 0; j < n; j++) {
        balance += (balance * r) / n;
        if ((j + 1) % Math.floor(n / contribN) === 0) {
          balance += parseFloat(contribution);
          totalPrincipal += parseFloat(contribution);
        }
        if (isMonthly) {
          const monthIndex = (i - 1) * 12 + j + 1;
          const date = new Date();
          date.setMonth(date.getMonth() + monthIndex);
          result.push({
            label: date.toLocaleDateString("es-CR", {
              year: "numeric",
              month: "short",
            }),
            balance,
            principal: totalPrincipal,
            interest: balance - totalPrincipal,
          });
        }
      }
      if (!isMonthly) {
        result.push({
          label: `${new Date().getFullYear() + i}`,
          balance,
          principal: totalPrincipal,
          interest: balance - totalPrincipal,
        });
      }
    }
    return result;
  };

  const data = calculateData();
  const last = data.length > 0 ? data[data.length - 1] : null;
  const displayedData = showAll ? data : data.slice(0, 10);

  const exportToCSV = () => {
    const headers = ["Fecha", "Balance acumulado", "Total aportado", "Interés ganado"];
    const rows = data.map((row) => [
      row.label,
      row.balance.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "proyeccion_interes_compuesto.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-4 md:px-10 py-16">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-2xl mx-auto space-y-4 mb-12">
        <div className="text-xl font-semibold text-gray-800 mb-4">
          Detalles de inversión
        </div>
        <div className="mb-3 -mt-2">
          <CurrencySelector currency={currency} setCurrency={setCurrency} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block">Depósito inicial</Label>
            <Input
              type="number"
              min={0}
              value={initialDeposit}
              className={isInvalidDeposit ? "border-red-500" : ""}
              onChange={(e) => setInitialDeposit(e.target.value)}
            />
            {isInvalidDeposit && <p className="text-sm text-red-500 mt-1">No puede ser negativo.</p>}
          </div>
          <div>
            <Label className="mb-1 block">Años de crecimiento</Label>
            <Input
              type="number"
              min={1}
              value={years}
              className={isInvalidYears ? "border-red-500" : ""}
              onChange={(e) => setYears(e.target.value)}
            />
            {isInvalidYears && <p className="text-sm text-red-500 mt-1">Mínimo 1 año requerido.</p>}
          </div>
          <div>
            <Label className="mb-1 block">Tasa de retorno (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={rate}
              className={isInvalidRate ? "border-red-500" : ""}
              onChange={(e) => setRate(e.target.value)}
            />
            {isInvalidRate && <p className="text-sm text-red-500 mt-1">Debe estar entre 0 y 100.</p>}
          </div>
          <div>
            <Label className="mb-1 block">Contribución periódica</Label>
            <Input
              type="number"
              min={0}
              value={contribution}
              className={isInvalidContribution ? "border-red-500" : ""}
              onChange={(e) => setContribution(e.target.value)}
            />
            {isInvalidContribution && <p className="text-sm text-red-500 mt-1">No puede ser negativo.</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div>
            <Label className="mb-1 block">Capitalización</Label>
            <select
              className="w-full h-11 rounded-md border border-gray-300"
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(e.target.value)}
            >
              <option value="monthly">Mensual</option>
              <option value="annually">Anual</option>
            </select>
          </div>
          <div className="col-span-2">
            <Label className="mb-1 block">Frecuencia de contribución</Label>
            <div className="flex gap-2">
              <Button
                variant={contributionFreq === "monthly" ? "default" : "outline"}
                onClick={() => setContributionFreq("monthly")}
              >
                Mensual
              </Button>
              <Button
                variant={contributionFreq === "annually" ? "default" : "outline"}
                onClick={() => setContributionFreq("annually")}
              >
                Anual
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isValid && last && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-gray-700 mb-1">Balance estimado</h2>
            <p className="text-4xl font-bold text-green-700">
              {currency.symbol}
              {last.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Con un depósito de {currency.symbol}{parseFloat(initialDeposit).toLocaleString()}, contribuciones {contributionFreq === "monthly" ? "mensuales" : "anuales"} de {currency.symbol}{parseFloat(contribution).toLocaleString()} durante {years} años.
            </p>
          </div>
          <div className="mb-6 flex justify-end">
            <Button variant="outline" onClick={() => setShowChart(!showChart)}>
              {showChart ? "Ocultar gráfico" : "Mostrar gráfico"}
            </Button>
          </div>
          {showChart && (
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis tickFormatter={(val) => `${currency.symbol}${(val / 1000).toFixed(1)}k`} />
                  <Tooltip formatter={(val) => `${currency.symbol}${val.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="principal" stroke="#2563eb" fill="#bfdbfe" name="Total aportado" />
                  <Area type="monotone" dataKey="interest" stroke="#16a34a" fill="url(#balanceGradient)" name="Interés ganado" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {isValid && data.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Proyección {contributionFreq === "monthly" ? "mensual" : "anual"}
            </h3>
            <Button onClick={exportToCSV} size="sm" variant="outline">
              Exportar CSV
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Balance acumulado</th>
                  <th className="px-4 py-3">Total aportado</th>
                  <th className="px-4 py-3">Interés ganado</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 whitespace-nowrap">{row.label}</td>
                    <td className="px-4 py-2">{currency.symbol}{row.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-2">{currency.symbol}{row.principal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-2">{currency.symbol}{row.interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!showAll && (
            <div className="text-center mt-6">
              <Button onClick={() => setShowAll(true)}>Ver más</Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
