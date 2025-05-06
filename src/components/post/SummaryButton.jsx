"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";

// Recibe también el slug del artículo
export default function SummaryButton({ content, slug }) {
  const localStorageKey = `summary-${slug}`;
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Al montar el componente, revisa si ya hay resumen guardado
  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) setSummary(saved);
  }, [localStorageKey]);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Error al generar resumen");

      const data = await res.json();
      setSummary(data.summary);
      localStorage.setItem(localStorageKey, data.summary); // Guarda en localStorage
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Si NO hay resumen guardado, muestra el botón */}
      {!summary && (
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

      {/* Si ya existe el resumen, muéstralo con leyenda */}
      {summary && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-sm leading-relaxed shadow-sm">
          <p className="text-xs text-gray-500 mb-2 font-medium">Resumen generado con AI:</p>
          {summary}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
