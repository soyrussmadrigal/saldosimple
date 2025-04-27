"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const h2Elements = Array.from(document.querySelectorAll("h2"));
      const headingData = h2Elements.map((h2) => ({
        id: h2.id,
        text: h2.innerText,
      }));
      setHeadings(headingData);
    }, 300); // Esperamos 300ms para que PortableText cargue

    return () => clearTimeout(timer);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 hidden lg:block ml-8 w-60">
      <h3 className="text-gray-700 font-semibold mb-4">En este artículo</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="hover:text-blue-600 transition-colors">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
