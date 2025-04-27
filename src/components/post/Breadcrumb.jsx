"use client";

import Link from "next/link";

export default function Breadcrumb({ categoria, titulo }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mt-4 mb-6">
      <ol className="list-reset flex">
        <li>
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <Link href={`/articulos/${categoria}`} className="hover:underline capitalize">
            {categoria}
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li className="text-gray-400 truncate">
          {titulo}
        </li>
      </ol>
    </nav>
  );
}
