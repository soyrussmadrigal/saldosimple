"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SourcesBox({ sources = [] }) {
  const [open, setOpen] = useState(false); // 👈 Cerrado por defecto

  if (!sources.length) return null;

  return (
    <div className="mt-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
      >
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        Fuentes utilizadas en este artículo
      </button>

      {open && (
        <ul className="mt-4 space-y-2 pl-6 border-l border-gray-200">
          {sources.map((src, i) => (
            <li key={i} className="text-sm text-gray-600 leading-snug">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-700"
              >
                {src.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
