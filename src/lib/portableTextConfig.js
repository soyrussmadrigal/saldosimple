import { PortableText } from "@portabletext/react";
import Image from "next/image";

// Slugify para encabezados
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

export const portableTextComponents = {
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
    ctaBox: ({ value }) => (
      <div
        className="border-t-4 rounded-md px-6 py-4 my-6 text-sm"
        style={{
          backgroundColor: value.backgroundColor || "#FFF8E1",
          borderColor: "rgb(13, 81, 82)",
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none">{value.emoji || "💡"}</span>
          <div>
            <p className="font-semibold text-black mb-2">{value.title}</p>
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
                  image: ({ value }) => (
                    <div className="my-4">
                      <Image
                        src={value.asset?.url}
                        alt={value.alt || "Imagen"}
                        width={800}
                        height={500}
                        className="rounded-md w-full h-auto"
                      />
                    </div>
                  ),
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
