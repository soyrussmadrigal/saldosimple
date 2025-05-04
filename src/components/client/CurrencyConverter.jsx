"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CurrencySelector from "@/components/tools/CurrencySelector";
import { Card, CardContent } from "@/components/ui/card";

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
  {
    code: "USD",
    label: "Estados Unidos",
    locale: "en-US",
    symbol: "$",
    flag: "us",
  },
  { code: "EUR", label: "España", locale: "es-ES", symbol: "€", flag: "es" },
];

const CurrencyConverter = () => {
  const appId = process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY;

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(
    currencyOptions.find((c) => c.code === "USD")
  );
  const [to, setTo] = useState(currencyOptions.find((c) => c.code === "MXN"));
  const [converted, setConverted] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const match = currencyOptions.find(
          (opt) => opt.flag === data.country_code.toLowerCase()
        );
        if (match && !from) setFrom(match);
      } catch {
        if (!from) setFrom(currencyOptions.find((c) => c.code === "MXN"));
      }
    };
    detectCountry();
  }, []);

  useEffect(() => {
    if (!from || !to) return;

    const fetchConversion = async () => {
      const res = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${appId}&base=${from.code}`
      );
      const data = await res.json();
      const rate = data.rates?.[to.code] || 0;
      setConverted((amount * rate).toFixed(4));
    };

    fetchConversion();
  }, [amount, from, to]);

  useEffect(() => {
    if (!from || !to) return;
    const fetchHistory = async () => {
      setLoading(true);
      const today = new Date();
      const dates = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        return d.toISOString().split("T")[0];
      }).reverse();

      const results = await Promise.all(
        dates.map(async (date) => {
          const res = await fetch(
            `https://openexchangerates.org/api/historical/${date}.json?app_id=${appId}&base=${from.code}`
          );
          const data = await res.json();
          return {
            date,
            rate: parseFloat(data.rates?.[to.code] || 0),
          };
        })
      );

      setChartData(results);
      setLoading(false);
    };

    fetchHistory();
  }, [from, to]);

  if (!from) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-2xl rounded-3xl border border-gray-200">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-green-900 mb-6">
              Convertidor de Divisas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-3 rounded w-full"
              />

              <CurrencySelector currency={from} setCurrency={setFrom} />

              <CurrencySelector currency={to} setCurrency={setTo} />
            </div>

            {converted && (
              <p className="text-center text-xl text-green-800 font-medium mb-6">
                {amount} {from.code} = {converted} {to.code}
              </p>
            )}

            <div className="h-64">
              {loading ? (
                <p className="text-center text-sm text-gray-500">
                  Cargando gráfico...
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis
                      domain={["auto", "auto"]}
                      tickFormatter={(value) => value.toFixed(4)}
                    />
                    <Tooltip
                      formatter={(value) => `${value.toFixed(4)} ${to.code}`}
                      labelFormatter={(label) => `Fecha: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#eb755b"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CurrencyConverter;
