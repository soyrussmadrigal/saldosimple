"use client";

import Link from "next/link";

export default function Breadcrumb({ tipo = "articulos", categoria, titulo }) {
  const maxLength = 40;
  const shortTitle = titulo.length > maxLength ? `${titulo.slice(0, maxLength)}...` : titulo;

  const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const basePath = `/${tipo}`;

  return (
    <nav className="text-sm text-gray-500 my-4" aria-label="Breadcrumb">
      <ol className="list-none flex flex-wrap items-center gap-1">
        {/* Inicio */}
        <li className="flex items-center">
          <Link href="/" className="hover:text-black transition-colors">
            Inicio
          </Link>
          <BreadcrumbSeparator />
        </li>

        {/* Tipo (Artículos / Herramientas) */}
        <li className="flex items-center">
          <Link href={basePath} className="hover:text-black transition-colors">
            {tipoCapitalizado}
          </Link>
          <BreadcrumbSeparator />
        </li>

        {/* Categoría (si aplica) */}
        {categoria && (
          <li className="flex items-center capitalize">
            <Link href={`${basePath}/${categoria}`} className="hover:text-black transition-colors">
              {categoria}
            </Link>
            <BreadcrumbSeparator />
          </li>
        )}

        {/* Título truncado */}
        <li className="flex items-center text-gray-700 truncate">
          <span className="font-medium">{shortTitle}</span>
        </li>
      </ol>
    </nav>
  );
}

function BreadcrumbSeparator() {
  return (
    <svg className="w-3 h-3 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
