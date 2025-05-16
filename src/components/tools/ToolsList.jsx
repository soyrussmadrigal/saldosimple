"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";

export default function ToolList({ currentSlug = null }) {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    async function fetchTools() {
      try {
        const res = await fetch("/api/tools");
        const data = await res.json();

        const filtered = data.filter(
          (tool) => tool.slug && tool.slug !== currentSlug && tool.href
        );

        setTools(filtered);
      } catch (err) {
        console.error("Error al cargar herramientas:", err);
      }
    }

    fetchTools();
  }, [currentSlug]);

  if (!tools.length) return null;

  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-[#0d5152]">Otras Herramientas</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tools.map((tool) => {
          const IconComponent =
            tool.icon && typeof Icons[tool.icon] === "function"
              ? Icons[tool.icon]
              : Icons.Wrench; // Fallback si no existe el ícono

          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="rounded-xl border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <IconComponent className="text-[#0d5152] text-3xl transition-transform group-hover:scale-110" />
                <h3 className="font-semibold text-lg text-[#0d5152] group-hover:underline">
                  {tool.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">{tool.shortDescription}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
