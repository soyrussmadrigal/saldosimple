"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, LineChart as ChartIcon } from "lucide-react";
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

export default function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(20000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(0);
  const [contribution, setContribution] = useState(100);
  const [compoundFreq, setCompoundFreq] = useState("monthly");
  const [contributionFreq, setContributionFreq] = useState("monthly");
  const [showChart, setShowChart] = useState(true);

  const getCompoundings = (freq) => (freq === "monthly" ? 12 : 1);

  const calculateData = () => {
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
  const last = data[data.length - 1];

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 items-start">
        {/* Formulario */}
        <div className="bg-neutral-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-2">
            <Calculator className="w-5 h-5" />
            Detalles de inversión
          </div>

          <div className="space-y-4 text-[15px] leading-relaxed">
            <div>
              <Label className="mb-1 block">Depósito inicial</Label>
              <Input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1 block">Años de crecimiento</Label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1 block">Tasa de retorno (%)</Label>
              <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1 block">Frecuencia de capitalización</Label>
              <select
                className="w-full h-11 rounded-md border border-gray-300"
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(e.target.value)}
              >
                <option value="monthly">Mensual</option>
                <option value="annually">Anual</option>
              </select>
            </div>
            <div>
              <Label className="mb-1 block">Monto de contribución</Label>
              <Input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} />
            </div>
            <div>
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

        {/* Resultados */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-2">Balance estimado</h2>
            <p className="text-4xl font-bold text-green-700">
              ${last.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Con un depósito de ${initialDeposit.toLocaleString()}, contribuciones {contributionFreq === "monthly" ? "mensuales" : "anuales"} de ${contribution.toLocaleString()} durante {years} años.
            </p>
          </div>

          {/* Toggle gráfico */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowChart(!showChart)}>
              <ChartIcon className="w-4 h-4 mr-2" />
              {showChart ? "Ocultar gráfico" : "Mostrar gráfico"}
            </Button>
          </div>

          {/* Gráfico */}
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
                  <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`} />
                  <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="principal" stroke="#2563eb" fill="#bfdbfe" name="Total principal" />
                  <Area type="monotone" dataKey="interest" stroke="#16a34a" fill="url(#balanceGradient)" name="Interés ganado" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tabla dinámica */}
          <div className="overflow-x-auto mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Proyección {contributionFreq === "monthly" ? "mensual" : "anual"}</h3>
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
                {data.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 whitespace-nowrap">{row.label}</td>
                    <td className="px-4 py-2">${row.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-2">${row.principal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-2">${row.interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
