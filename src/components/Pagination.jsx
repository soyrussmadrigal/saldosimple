"use client";

import Link from "next/link";

const Pagination = ({ currentPage, totalPages }) => {
  // No mostrar nada si solo hay una página
  if (totalPages <= 1) return null;

  const getPageLink = (page) => {
    return page === 1 ? "/articulos" : `/articulos/pagina/${page}`;
  };

  return (
    <div className="mil-pagination mil-text-center mil-mt-30 mil-up">
      <ul className="mil-pagination-list">
        {/* Botón Anterior */}
        {currentPage > 1 && (
          <li>
            <Link href={getPageLink(currentPage - 1)} className="mil-btn mil-sm">
              « Anterior
            </Link>
          </li>
        )}

        {/* Números de página */}
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <Link
              href={getPageLink(i + 1)}
              className={`mil-btn mil-sm ${currentPage === i + 1 ? "mil-active" : ""}`}
            >
              {i + 1}
            </Link>
          </li>
        ))}

        {/* Botón Siguiente */}
        {currentPage < totalPages && (
          <li>
            <Link href={getPageLink(currentPage + 1)} className="mil-btn mil-sm">
              Siguiente »
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;