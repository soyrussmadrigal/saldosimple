'use client';

import { useMemo } from "react";
import Image from "next/image";

export default function FactCheckBox({ publishedAt, content, author, editor }) {
  if (!publishedAt) return null;

  // Formatear fecha de publicación
  const formattedDate = new Date(publishedAt).toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Calcular tiempo de lectura
  const readingTime = useMemo(() => {
    if (!content) return 1;
    const plainText = content
      ?.map((block) => (block._type === "block" ? block.children.map((child) => child.text).join(" ") : ""))
      .join(" ");
    const wordCount = plainText.trim().split(/\s+/).length;
    return Math.max(1, Math.round(wordCount / 200));
  }, [content]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-6 mb-10">

      {/* Publicado + Fact Checked Badge */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-600">
        <div>
          Publicado el {formattedDate} · {readingTime} min de lectura
        </div>
        <span className="mt-2 md:mt-0 inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
          Fact Checked
        </span>
      </div>

      {/* Autor y Editor */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        {/* Autor */}
        {author?.name && (
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={author.image || "/default-avatar.png"}
                alt={`Autor: ${author.name}`}
                fill
                className="rounded-full object-cover border border-gray-300"
              />
            </div>
            <div className="text-sm leading-tight">
              <div className="font-semibold">{author.name}</div>
              <div className="text-gray-500 text-xs">Escritor(a)</div>
            </div>
          </div>
        )}

        {/* Editor */}
        {editor?.name && (
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={editor.image || "/default-editor.png"}
                alt={`Editor: ${editor.name}`}
                fill
                className="rounded-full object-cover border border-gray-300"
              />
            </div>
            <div className="text-sm leading-tight">
              <div className="font-semibold">{editor.name}</div>
              <div className="text-gray-500 text-xs">Editor de contenido</div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
