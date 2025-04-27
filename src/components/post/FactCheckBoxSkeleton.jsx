'use client';

import { useMemo } from "react";
import Image from "next/image";
import * as Popover from '@radix-ui/react-popover';

export default function FactCheckBox({ publishedAt, content, author, editor }) {
  const readingTime = useMemo(() => {
    if (!content) return 1;
    const plainText = content
      ?.map((block) => (block._type === "block" ? block.children.map((child) => child.text).join(" ") : ""))
      .join(" ");
    const wordCount = plainText.trim().split(/\s+/).length;
    return Math.max(1, Math.round(wordCount / 200));
  }, [content]);

  if (!publishedAt) return null;

  const formattedDate = new Date(publishedAt).toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-6 mb-10">
      
      {/* Fecha y Fact Checked */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-600">
        <div>
          Publicado el {formattedDate} · {readingTime} min de lectura
        </div>

        {/* Popover directamente sobre Fact Checked */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <span className="mt-2 md:mt-0 inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full cursor-pointer">
              Fact Checked
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="p-4 bg-white rounded-md shadow-md border max-w-sm text-gray-700 text-sm z-50"
              side="top"
              sideOffset={8}
            >
              <p><strong>Proceso de Verificación:</strong> Todos los artículos son revisados por nuestro equipo editorial y validados con fuentes primarias confiables. Nuestro objetivo es brindar información precisa y transparente.</p>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

      </div>

      {/* Autor y Editor */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">

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