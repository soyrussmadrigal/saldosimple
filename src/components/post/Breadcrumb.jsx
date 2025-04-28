"use client";

import Link from "next/link";

export default function Breadcrumb({ categoria, titulo }) {
  const maxLength = 40; // Máximo 40 caracteres para el título
  const shortTitle = titulo.length > maxLength ? `${titulo.slice(0, maxLength)}...` : titulo;

  return (
    <nav className="text-sm text-gray-500 my-4" aria-label="Breadcrumb">
      <ol className="list-none flex flex-wrap items-center gap-1">
        {/* Inicio */}
        <li className="flex items-center">
          <Link 
            href="/" 
            className="hover:text-black transition-colors"
          >
            Inicio
          </Link>
          <BreadcrumbSeparator />
        </li>

        {/* Artículos */}
        <li className="flex items-center">
          <Link 
            href="/articulos" 
            className="hover:text-black transition-colors"
          >
            Artículos
          </Link>
          <BreadcrumbSeparator />
        </li>

        {/* Categoría */}
        <li className="flex items-center capitalize">
          <Link 
            href={`/articulos/${categoria}`} 
            className="hover:text-black transition-colors"
          >
            {categoria}
          </Link>
          <BreadcrumbSeparator />
        </li>

        {/* Post actual truncado */}
        <li className="flex items-center text-gray-700 truncate">
          <span className="font-medium">{shortTitle}</span>
        </li>
      </ol>
    </nav>
  );
}

// ✅ Separador como subcomponente (lo hace más limpio)
function BreadcrumbSeparator() {
  return (
    <svg
      className="w-3 h-3 mx-2 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
