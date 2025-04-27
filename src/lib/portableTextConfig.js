export const portableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mil-mb-60 mil-up">{children}</h1>
    ),
    h2: ({ children }) => {
      const text = children
        .map(child => (typeof child === 'string' ? child : child?.props?.children))
        .join(' ')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, ''); // Elimina caracteres raros
      return (
        <h2 id={text} className="mil-mb-60 mil-up">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="mil-mb-60 mil-up">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mil-text-m mil-soft mil-mb-30 mil-up">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mil-text-xl mil-mb-30 mil-up">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-5 mil-soft mil-mb-30">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-5 mil-soft mil-mb-30">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-500 hover:text-blue-700"
      >
        {children}
      </a>
    ),
  },
};
