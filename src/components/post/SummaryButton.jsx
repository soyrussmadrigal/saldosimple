"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";

export default function SummaryButton({ content }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaryGenerated, setSummaryGenerated] = useState(false); // 👈 Nuevo estado

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Error al generar resumen");

      const data = await res.json();
      setSummary(data.summary);
      setSummaryGenerated(true); // 👈 Oculta el botón y muestra el aviso
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Botón oculto si ya hay resumen */}
      {!summaryGenerated && (
        <Button
          onClick={handleSummarize}
          disabled={loading}
          className="bg-[#1E293B] hover:bg-[#334155] text-white text-sm px-4 py-2 rounded-lg flex items-center transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Bot className="w-4 h-4 mr-2" stroke="white" />
              Resumen con AI
            </>
          )}
        </Button>
      )}

      {/* Mensaje si ya se generó */}
      {summaryGenerated && (
        <p className="text-xs text-gray-500 italic mb-2">
          Resumen generado con AI
        </p>
      )}

      {/* Contenido del resumen */}
      {summary && (
        <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-sm leading-relaxed shadow-sm">
          {summary}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
