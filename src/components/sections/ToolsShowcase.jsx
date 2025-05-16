"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTools } from "@/lib/queries/toolPage";

const ToolsShowcase = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getAllTools()
      .then(setTools)
      .catch((err) => console.error("❌ Error al cargar herramientas:", err));
  }, []);

  if (!tools.length) return null;

  // Mostrar solo las primeras 6
  const toolsToShow = tools.slice(0, 6);

  return (
    <section className="bg-[#e6f4ef] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-[#ffffff] rounded-3xl shadow-2xl p-12">
          {/* Título superior */}
          <h2 className="text-4xl font-extrabold text-green-900 text-center mb-4">
            Dejá que SaldoSimple haga el trabajo por usted
          </h2>

          <div className="text-center mb-10">
            <p className="text-lg text-green-900 font-semibold">
              Agregamos herramientas financieras gratuitas basas en AI
            </p>
            <p className="text-green-700 mt-2">
              ¿Qué tipo de herramienta estás buscando?
            </p>
          </div>

          {/* Grid de herramientas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-6">
            {tools
              .slice(0, 6) // siempre máximo 6
              .map((tool, index) => (
                <Link
                  key={tool._id}
                  href={`/herramientas/${tool.slug}`}
                  className={`
          ${index >= 3 ? "hidden sm:block" : ""}
          bg-white hover:bg-green-100 text-green-800 font-semibold text-center 
          rounded-xl py-4 px-6 shadow-sm border border-green-100 hover:shadow-md transition
        `}
                >
                  {tool.title}
                </Link>
              ))}
          </div>

          {/* Botón "Ver todas" */}
          {tools.length > 6 && (
            <div className="flex justify-center">
              <Link
                href="/herramientas"
                className="bg-green-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-900 transition text-center w-full max-w-xs"
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
