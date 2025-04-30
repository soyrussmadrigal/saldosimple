// utils/slugify.js (puedes moverlo a un archivo separado si prefieres reutilizar)
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
          typeof child === "string"
            ? child
            : child?.props?.children?.[0] || ""
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
          typeof child === "string"
            ? child
            : child?.props?.children?.[0] || ""
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
};
