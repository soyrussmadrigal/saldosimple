"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export default function FactCheckBox({ publishedAt, content, author, editor }) {
  // Calcula minutos estimados de lectura
  const readingTime = useMemo(() => {
    if (!content) return 1;
    const plainText = content
      ?.map((block) =>
        block._type === "block"
          ? block.children.map((child) => child.text).join(" ")
          : ""
      )
      .join(" ");
    const wordCount = plainText.trim().split(/\s+/).length;
    return Math.max(1, Math.round(wordCount / 200));
  }, [content]);

  // Dropdown control
  const [showMore, setShowMore] = useState(false);

  if (!publishedAt) return null;

  // Formatea la fecha
  const formattedDate = new Date(publishedAt).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="bg-gray-50 p-6 rounded-lg flex flex-col gap-4 shadow-sm mb-8">
      {/* Fecha y Fact Checked */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-500">
        <div>
          Publicado el {formattedDate} · {readingTime} min de lectura
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
            Fact Checked
          </span>
        </div>
      </div>

      {/* Autor y Editor */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Autor principal */}
        {author && (
          <div className="flex items-center gap-3">
            {author.image && (
              <Image
                src={author.image}
                alt={author.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
            <div className="text-sm">
              <div className="font-semibold">Escrito por {author.name}</div>
              <div className="text-gray-500 text-xs">Autor principal</div>
            </div>
          </div>
        )}

        {/* Editor (opcional) */}
        {editor && (
          <div className="flex items-center gap-3">
            {editor.image && (
              <Image
                src={editor.image}
                alt={editor.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
            <div className="text-sm">
              <div className="font-semibold">Editado por {editor.name}</div>
              <div className="text-gray-500 text-xs">Editor de contenido</div>
            </div>
          </div>
        )}

        {/* +1 más (opcional futuro) */}
        {showMore && (
          <div
            className="text-blue-600 text-sm cursor-pointer ml-auto"
            onClick={() => setShowMore(false)}
          >
            Ver menos ▲
          </div>
        )}
      </div>

      {/* Botón para ver más (cuando haya más autores) */}
      {!showMore && (
        <div
          className="text-blue-600 text-sm cursor-pointer ml-auto"
          onClick={() => setShowMore(true)}
        >
          +1 más
        </div>
      )}
    </div>
  );
}
