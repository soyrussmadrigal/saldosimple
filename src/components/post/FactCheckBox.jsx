"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip"; // 👈 Agregamos Tooltip aquí

export default function FactCheckBox({ publishedAt, content, author, editor }) {
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!publishedAt) return null;

  const formattedDate = new Date(publishedAt).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isRecentlyPublished = (() => {
    if (!publishedAt) return false;
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffDays = (now - publishedDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  })();

  const badgeClasses = isRecentlyPublished
    ? "inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full"
    : "inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full";

  const tooltipText = isRecentlyPublished
    ? "Publicado recientemente y verificado"
    : "Artículo verificado";

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-6 mb-10">
      {/* Fecha + Fact Checked */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-600">
        <div>
          Publicado el {formattedDate} · {readingTime} min de lectura
        </div>

        <div className="flex flex-col items-center md:items-end">
          {/* Tooltip */}
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className={`mt-2 md:mt-0 ${badgeClasses} cursor-pointer`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fact Checked
                </span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-800 text-white px-3 py-2 rounded-md text-xs shadow-lg animate-fadeIn"
                  side="top"
                  sideOffset={8}
                >
                  {tooltipText}
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          {/* 📱 Mobile → Popover / 🖥️ Desktop → HoverCard */}
          {isMobile ? (
            <Popover.Root>
              <Popover.Trigger asChild>
                <span
                  className="text-xs text-blue-600 hover:underline mt-2 cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  ¿Cómo verificamos los hechos?
                </span>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="p-4 bg-white rounded-md shadow-md border max-w-sm text-gray-700 text-sm z-50 animate-fadeIn"
                  side="top"
                  sideOffset={8}
                >
                  <p>
                    <strong>Proceso de Verificación:</strong> Todos los artículos son revisados por nuestro equipo editorial y validados con fuentes primarias confiables. Nuestro objetivo es brindar información precisa y transparente.
                  </p>
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ) : (
            <HoverCard.Root openDelay={200}>
              <HoverCard.Trigger asChild>
                <span className="text-xs text-blue-600 hover:underline mt-2 cursor-pointer">
                  ¿Cómo verificamos los hechos?
                </span>
              </HoverCard.Trigger>
              <HoverCard.Content
                className="p-4 bg-white rounded-md shadow-md border max-w-sm text-gray-700 text-sm z-50 animate-fadeIn"
                side="top"
                sideOffset={8}
              >
                <p>
                  <strong>Proceso de Verificación:</strong> Todos los artículos son revisados por nuestro equipo editorial y validados con fuentes primarias confiables. Nuestro objetivo es brindar información precisa y transparente.
                </p>
                <HoverCard.Arrow className="fill-white" />
              </HoverCard.Content>
            </HoverCard.Root>
          )}
        </div>
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
