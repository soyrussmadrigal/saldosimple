"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Copy } from "lucide-react";
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
  const [visibleRows, setVisibleRows] = useState(10);
  const tableRef = useRef(null);

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
    calculateLoan(); // opcional: recalcular al cambiar país
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
    setVisibleRows(10);
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, term, termUnit, interestRate]);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 10);
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
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

  const exportToPDF = async () => {
    const doc = new jsPDF();

    // Convertir logo a base64
    const getImageBase64 = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          // Simular opacidad (dibujar con transparencia)
          ctx.globalAlpha = 0.05;
          ctx.drawImage(img, 0, 0);

          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = () => reject("Error al cargar el logo.");
      });

    try {
      const logoBase64 = await getImageBase64("/img/logo.png");

      // Marca de agua con el logo
      doc.addImage(logoBase64, "PNG", 25, 90, 160, 40, undefined, "FAST");
    } catch (e) {
      console.warn("Logo no cargado para PDF:", e);
    }

    // Título
    doc.setFontSize(14);
    doc.setTextColor(33);
    doc.text("Tabla de Amortización Mensual", 14, 20);

    // Contenido tabla
    const tableData = amortization.map((row) => [
      row.month,
      `${currency.symbol}${row.principal.toFixed(2)}`,
      `${currency.symbol}${row.interest.toFixed(2)}`,
      `${currency.symbol}${row.balance.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 28,
      head: [["Mes", "Capital", "Interés", "Saldo"]],
      body: tableData,
    });

    doc.save("tabla_amortizacion.pdf");
  };

  const chartData = {
    labels: amortization.map((item) => `Mes ${item.month}`),
    datasets: [
      {
        label: "Capital",
        data: amortization.map((item) => parseFloat(item.principal.toFixed(2))),
        backgroundColor: "#0f766e",
      },
      {
        label: "Interés",
        data: amortization.map((item) => parseFloat(item.interest.toFixed(2))),
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

  return (
    <Card className="w-full max-w-6xl mx-auto mt-16 px-2 sm:px-8 py-8 shadow-xl rounded-3xl bg-white border border-gray-200">
      <CardContent>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-teal-900">
          <Calculator size={28} /> Calculadora de Préstamo Personal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Monto del préstamo</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div>
            <Label>Plazo</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value)}
                className="border rounded px-2 text-sm"
              >
                <option value="years">Años</option>
                <option value="months">Meses</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Interés (%)</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div>
            <Label>País / Moneda</Label>
            <CurrencySelector
              currency={currency}
              setCurrency={handleSelectCountry}
            />
          </div>
        </div>

        {monthlyPayment && (
          <div className="my-4 flex items-center gap-4 flex-wrap">
            <div className="text-lg font-semibold">
              Cuota mensual: {currency.symbol}
              {monthlyPayment}
            </div>
            <Button variant="secondary" size="sm" onClick={copyPayment}>
              <Copy size={16} className="mr-2" />
              Copiar cuota
            </Button>
          </div>
        )}

        <div className="mt-8">
          <Bar data={chartData} />
          {totalPayment && totalInterest && (
            <div className="mt-6 bg-blue-50 text-gray-700 text-center p-6 rounded-xl text-base sm:text-lg font-medium shadow-sm">
              En {term} {termUnit === "years" ? "años" : "meses"}, pagarás un
              total de{" "}
              <span className="font-semibold">
                {currency.symbol}
                {parseFloat(totalPayment).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>{" "}
              incluyendo{" "}
              <span className="font-semibold">
                {currency.symbol}
                {parseFloat(totalInterest).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>{" "}
              en intereses por un préstamo de{" "}
              <span className="font-semibold">
                {currency.symbol}
                {parseFloat(loanAmount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
              .
            </div>
          )}
        </div>

        {/* Tabla con marca de agua */}
        <div className="relative overflow-x-auto mt-10" ref={tableRef}>
          {/* Marca de agua visual */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span
              className="text-4xl font-bold text-gray-300"
              style={{
                transform: "rotate(-30deg)",
                opacity: 0.1,
                userSelect: "none",
              }}
            >
              SaldoSimple.com
            </span>
          </div>

          {/* Tabla */}
          <div className="relative z-10">
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
            <table className="min-w-full text-sm border border-gray-200 bg-white">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Mes</th>
                  <th className="px-4 py-2">Capital</th>
                  <th className="px-4 py-2">Interés</th>
                  <th className="px-4 py-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {amortization.slice(0, visibleRows).map((item, idx) => (
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

            {/* Ver más o fin de tabla */}
            {visibleRows < amortization.length ? (
              <div className="flex justify-center mt-4">
                <Button onClick={handleShowMore}>Ver más</Button>
              </div>
            ) : (
              amortization.length > 0 && (
                <div className="text-center mt-4 text-sm text-gray-500">
                  Fin de tabla
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
