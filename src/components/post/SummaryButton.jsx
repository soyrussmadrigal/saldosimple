"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";

export default function SummaryButton({ content }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
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

      {summary && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-sm leading-relaxed shadow-sm">
          {summary}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
