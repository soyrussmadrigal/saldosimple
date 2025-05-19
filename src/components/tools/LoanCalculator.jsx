// Código actualizado de LoanCalculator con corrección de sección Plazo

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencySelector from "@/components/tools/CurrencySelector";
import { Bar } from "react-chartjs-2";
import { toast } from "sonner";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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
    label: "Panamá / USA",
    locale: "en-US",
    symbol: "$",
    flag: "pa",
  },
  { code: "EUR", label: "España", locale: "es-ES", symbol: "€", flag: "es" },
];

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [term, setTerm] = useState(3);
  const [termUnit, setTermUnit] = useState("years");
  const [interestRate, setInterestRate] = useState(12);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [amortization, setAmortization] = useState([]);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json?token=ccb7b44cb83fb2");
        const data = await res.json();
        const countryCode = data?.country?.toUpperCase();
        const match = currencyOptions.find(
          (opt) => opt.flag === countryCode.toLowerCase()
        );
        if (match) handleSelectCountry(match);
      } catch (err) {
        console.error("No se pudo detectar el país automáticamente.");
      }
    };

    detectCountry();
  }, []);

  const handleSelectCountry = (option) => {
    setCurrency(option);
  };

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = termUnit === "years" ? parseInt(term * 12) : parseInt(term);

    if (!P || !r || !n) return;

    const M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const total = M * n;
    const interest = total - P;

    setMonthlyPayment(M.toFixed(2));
    setTotalPayment(total.toFixed(2));
    setTotalInterest(interest.toFixed(2));

    let balance = P;
    const schedule = [];

    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = M - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance < 0 ? 0 : balance,
      });
    }

    setAmortization(schedule);
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, term, termUnit, interestRate]);

  const chartData = {
    labels: amortization.map((item) => `Mes ${item.month}`),
    datasets: [
      {
        label: "Capital",
        data: amortization.map((item) => item.principal.toFixed(2)),
        backgroundColor: "#0f766e",
      },
      {
        label: "Interés",
        data: amortization.map((item) => item.interest.toFixed(2)),
        backgroundColor: "#facc15",
      },
    ],
  };

  const copyPayment = () => {
    navigator.clipboard.writeText(monthlyPayment);
    toast.success(
      `Se copió ${currency.symbol}${monthlyPayment} al portapapeles.`
    );
  };

  const exportToCSV = () => {
    const table = amortization.map((row) => ({
      Mes: row.month,
      Capital: row.principal.toFixed(2),
      Interés: row.interest.toFixed(2),
      "Saldo restante": row.balance.toFixed(2),
    }));

    const ws = utils.json_to_sheet(table);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Amortizacion");
    writeFile(wb, "tabla_amortizacion.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Tabla de Amortización Mensual", 14, 16);

    const tableData = amortization.map((row) => [
      row.month,
      `${currency.symbol}${row.principal.toFixed(2)}`,
      `${currency.symbol}${row.interest.toFixed(2)}`,
      `${currency.symbol}${row.balance.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["Mes", "Capital", "Interés", "Saldo"]],
      body: tableData,
    });

    doc.save("tabla_amortizacion.pdf");
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-16 px-2 sm:px-8 py-8 shadow-xl rounded-3xl bg-white border border-gray-200">
      <CardContent>
        <div className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-6">
          <Calculator className="w-6 h-6" />
          Calculadora de Préstamo Personal
        </div>

        <Label className="text-sm text-gray-600 mt-0 block">
          Selecciona tu país
        </Label>
        <div className="mt-2 mb-4">
          <CurrencySelector
            currency={currency}
            setCurrency={handleSelectCountry}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4">
            <Label>Monto del préstamo</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min={0}
            />
          </div>

          <div className="sm:col-span-5">
            <Label>Plazo</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                min={1}
                className="h-11"
              />
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value)}
                className="rounded-lg text-sm text-gray-700 h-11 px-2 bg-white border border-gray-300"
              >
                <option value="years">Años</option>
                <option value="months">Meses</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label>Interés (%)</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={0}
              step="0.01"
            />
          </div>
        </div>

        {monthlyPayment && (
          <div className="bg-green-50 text-green-800 text-center p-6 rounded-xl text-xl font-semibold shadow-md mt-6">
            Cuota mensual: {currency.symbol}
            {monthlyPayment}
            <Button
              variant="link"
              onClick={copyPayment}
              className="text-xs ml-4 p-0 h-auto"
            >
              Copiar
            </Button>
          </div>
        )}

        {monthlyPayment && (
          <div className="text-sm text-gray-700 mt-4 space-y-1">
            <p>
              Préstamo: {currency.symbol}
              {parseFloat(loanAmount).toLocaleString(currency.locale)}
            </p>
            <p>
              Total pagado: {currency.symbol}
              {totalPayment}
            </p>
            <p>
              Intereses totales: {currency.symbol}
              {totalInterest}
            </p>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Distribución de pagos</h3>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
              scales: { x: { ticks: { display: false } } },
            }}
          />
        </div>

        <div className="overflow-x-auto mt-8">
          <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
            <h3 className="text-lg font-medium">
              Tabla de amortización mensual
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                Exportar CSV
              </Button>
              <Button variant="outline" size="sm" onClick={exportToPDF}>
                Exportar PDF
              </Button>
            </div>
          </div>
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Mes</th>
                <th className="px-4 py-2">Capital</th>
                <th className="px-4 py-2">Interés</th>
                <th className="px-4 py-2">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {amortization.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{item.month}</td>
                  <td className="px-4 py-2">
                    {currency.symbol}
                    {item.principal.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    {currency.symbol}
                    {item.interest.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    {currency.symbol}
                    {item.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
