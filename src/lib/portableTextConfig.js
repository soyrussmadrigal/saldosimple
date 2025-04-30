import { PortableText } from "@portabletext/react";

// Función para generar ID's de encabezado amigables (slug)
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

export const portableTextComponents = {
  // Encabezados, párrafos, citas, etc.
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-black mb-6">{children}</h1>
    ),
    h2: ({ children }) => {
      const text = children
        .map((child) =>
          typeof child === "string" ? child : child?.props?.children?.[0] || ""
        )
        .join(" ");
      const id = slugify(text);
      return (
        <h2 id={id} className="text-2xl font-bold text-black mb-6">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = children
        .map((child) =>
          typeof child === "string" ? child : child?.props?.children?.[0] || ""
        )
        .join(" ");
      const id = slugify(text);
      return (
        <h3 id={id} className="text-xl font-bold text-black mb-6 pl-4">
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="text-[rgb(90,91,96)] text-base leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-xl text-gray-600 italic border-l-4 border-gray-300 pl-4 mb-6">
        {children}
      </blockquote>
    ),
  },

  // Listas (bullets y numeradas)
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 text-[rgb(90,91,96)] leading-relaxed mb-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 text-[rgb(90,91,96)] leading-relaxed mb-6">
        {children}
      </ol>
    ),
  },

  // Enlaces
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600 hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },

  // Bloques personalizados (como el CTA)
  types: {
    ctaBox: ({ value }) => (
      <div
        // Estilo principal de la caja CTA (tipo NerdWallet)
        className="border-t-4 rounded-md px-6 py-4 my-6 text-sm"
        style={{
          backgroundColor: value.backgroundColor || "#FFF8E1",
          borderColor: "rgb(13, 81, 82)", // borde verde oscuro estilo NerdWallet
        }}
      >
        <div className="flex items-start gap-3">
          {/* Emoji opcional al lado izquierdo */}
          <span className="text-2xl leading-none">{value.emoji || "💡"}</span>

          {/* Contenido de la caja */}
          <div>
            {/* Título del CTA */}
            <p className="font-semibold text-black mb-2">{value.title}</p>

            {/* Texto enriquecido, imágenes y botones */}
            <PortableText
              value={value.body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-gray-800 leading-relaxed mb-3">
                      {children}
                    </p>
                  ),
                },
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      {children}
                    </a>
                  ),
                },
                types: {
                  // Imágenes dentro del CTA
                  image: ({ value }) => (
                    <img
                      src={value.asset?.url}
                      alt={value.alt || ""}
                      className="my-4 rounded-md max-w-full"
                    />
                  ),
                  // Botón CTA dentro del bloque
                  ctaButton: ({ value }) => (
                    <a
                      href={value.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block px-4 py-2 rounded font-semibold text-sm mt-4 ${
                        value.style === "secondary"
                          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {value.label}
                    </a>
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
    ),
  },
};
