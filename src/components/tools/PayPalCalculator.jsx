"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencySelector from "@/components/tools/CurrencySelector";
import { Bar } from "react-chartjs-2";
import { toast } from "sonner";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const paypalFees = {
  default: { percentage: 5.4, fixed: 0.3 },
  cr: { percentage: 5.4, fixed: 0.3 },
  mx: { percentage: 3.95, fixed: 4.0 },
  us: { percentage: 2.9, fixed: 0.3 },
};

const currencyOptions = [
  { code: "CRC", label: "Costa Rica", locale: "es-CR", symbol: "₡", flag: "cr" },
  { code: "MXN", label: "México", locale: "es-MX", symbol: "$", flag: "mx" },
  { code: "USD", label: "USA", locale: "en-US", symbol: "$", flag: "us" },
];

export default function PayPalCalculator() {
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState(currencyOptions.find(opt => opt.flag === "mx"));
  const [calculationType, setCalculationType] = useState("receive");
  const [customPercentage, setCustomPercentage] = useState(null);
  const [result, setResult] = useState({ fee: 0, net: 0, gross: 0 });

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json?token=ccb7b44cb83fb2");
        const data = await res.json();
        const countryCode = data?.country?.toLowerCase();
        const match = currencyOptions.find((opt) => opt.flag === countryCode);
        setCurrency(match || currencyOptions.find(opt => opt.flag === "mx"));
      } catch (err) {
        console.error("Geo detection failed");
        setCurrency(currencyOptions.find(opt => opt.flag === "mx"));
      }
    };
    detectCountry();
  }, []);

  useEffect(() => {
    const feeData = paypalFees[currency.flag] || paypalFees.default;
    const pct = (customPercentage !== null ? customPercentage : feeData.percentage) / 100;
    const fixed = feeData.fixed;

    if (calculationType === "receive") {
      const fee = amount * pct + fixed;
      const net = amount - fee;
      setResult({ fee, net, gross: amount });
    } else {
      const gross = (amount + fixed) / (1 - pct);
      const fee = gross - amount;
      setResult({ fee, net: amount, gross });
    }
  }, [amount, currency, calculationType, customPercentage]);

  const copyToClipboard = () => {
    toast.success("Resultado copiado al portapapeles");
    navigator.clipboard.writeText(
      `Debes cobrar ${currency.symbol}${result.gross.toFixed(2)} para recibir ${currency.symbol}${result.net.toFixed(2)}`
    );
  };

  const exportToCSV = () => {
    const ws = utils.json_to_sheet([
      {
        Monto: amount,
        "Comisión": result.fee.toFixed(2),
        "Total a recibir": result.net.toFixed(2),
        "Total a cobrar": result.gross.toFixed(2),
      },
    ]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "PayPal");
    writeFile(wb, "paypal_calculadora.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Resumen de cálculo PayPal", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [["Monto", "Comisión", "A recibir", "A cobrar"]],
      body: [[
        `${currency.symbol}${amount}`,
        `${currency.symbol}${result.fee.toFixed(2)}`,
        `${currency.symbol}${result.net.toFixed(2)}`,
        `${currency.symbol}${result.gross.toFixed(2)}`,
      ]],
    });
    doc.save("paypal_calculadora.pdf");
  };

  const chartData = {
    labels: ["Comisión", "Neto recibido"],
    datasets: [
      {
        label: "Distribución del monto",
        data: [result.fee, result.net],
        backgroundColor: ["#f87171", "#34d399"],
      },
    ],
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-16 px-4 sm:px-8 py-8 shadow-xl rounded-3xl bg-white border border-gray-200">
      <CardContent>
        <div className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-6">
          <Calculator className="w-6 h-6" />
          Calculadora de Comisiones PayPal
        </div>

        <Label className="text-sm text-gray-600 mt-0 block">Selecciona tu país</Label>
        <div className="mt-2 mb-4">
          <CurrencySelector currency={currency} setCurrency={setCurrency} />
        </div>

        <Label className="block text-sm text-gray-600 mt-4 mb-2">Tipo de cálculo</Label>
        <div className="flex gap-4 mb-4">
          <Button variant={calculationType === "receive" ? "default" : "outline"} onClick={() => setCalculationType("receive")}>Quiero recibir</Button>
          <Button variant={calculationType === "send" ? "default" : "outline"} onClick={() => setCalculationType("send")}>Quiero enviar</Button>
        </div>

        <Label htmlFor="amount" className="block text-sm text-gray-600 mt-4 mb-2">
          Monto ({calculationType === "receive" ? "a recibir" : "neto deseado"})
        </Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full h-11"
        />

        <Label htmlFor="percentage" className="block text-sm text-gray-600 mt-6 mb-2">
          Porcentaje de comisión personalizada (opcional)
        </Label>
        <Input
          id="percentage"
          type="number"
          step="0.1"
          placeholder="Ej. 5.4"
          value={customPercentage ?? ""}
          onChange={(e) =>
            setCustomPercentage(e.target.value === "" ? null : parseFloat(e.target.value))
          }
          className="w-full h-11"
        />

        <div className="text-sm text-gray-700 space-y-1 mt-6">
          <p>Comisión estimada: {currency.symbol}{result.fee.toFixed(2)}</p>
          <p>Total a recibir: <strong>{currency.symbol}{result.net.toFixed(2)}</strong></p>
          <p>Total a cobrar: <strong>{currency.symbol}{result.gross.toFixed(2)}</strong></p>
        </div>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
          <Button onClick={exportToCSV} variant="outline" className="text-sm">
            <FileText className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
          <Button onClick={exportToPDF} variant="outline" className="text-sm">
            <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </Button>
          <Button variant="link" onClick={copyToClipboard} className="text-xs p-0 h-auto">
            Copiar resumen
          </Button>
        </div>

        <div className="mt-10">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </CardContent>
    </Card>
  );
}
