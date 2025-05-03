"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTools } from "@/lib/queries/toolPage";

const ToolsShowcase = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getAllTools().then((data) => {
      setTools(data);
    });
  }, []);

  if (!tools.length) return null;

  // Mostrar solo las primeras 6
  const toolsToShow = tools.slice(0, 6);

  return (
    <section className="bg-green-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-[#e6f4ef] rounded-3xl shadow-2xl p-12">
          {/* Título superior */}
          <h2 className="text-4xl font-extrabold text-green-900 text-center mb-4">
            Dejá que SaldoSimple haga el trabajo por vos
          </h2>

          <div className="text-center mb-10">
            <p className="text-lg text-green-900 font-semibold">
              Responde un par de preguntas, obtené resultados personalizados
            </p>
            <p className="text-green-700 mt-2">
              ¿Qué tipo de herramienta estás buscando?
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-10">
            {toolsToShow.map((tool) => (
              <Link
                key={tool._id}
                href={`/herramientas/${tool.slug}`}
                className="bg-white hover:bg-green-100 text-green-800 font-semibold text-center rounded-xl py-5 px-4 shadow-sm border border-green-200 hover:shadow-md transition"
              >
                {tool.title}
              </Link>
            ))}
          </div>

          {/* Botón Ver todas */}
          {tools.length > 6 && (
            <div className="text-center">
              <Link
                href="/herramientas"
                className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Ver todas las herramientas
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
