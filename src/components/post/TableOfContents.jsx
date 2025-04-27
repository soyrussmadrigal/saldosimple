"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Capturamos los H2 después de que cargan
    const timer = setTimeout(() => {
      const h2Elements = Array.from(document.querySelectorAll("h2"));
      const headingData = h2Elements.map((h2) => ({
        id: h2.id,
        text: h2.innerText,
      }));
      setHeadings(headingData);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const h2Elements = Array.from(document.querySelectorAll("h2"));

      let currentId = "";
      for (let i = 0; i < h2Elements.length; i++) {
        const h2 = h2Elements[i];
        const { top } = h2.getBoundingClientRect();
        if (top <= 100) {
          currentId = h2.id;
        } else {
          break;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-32 bg-gray-50 rounded-lg shadow-md p-4 w-64">
      <h3 className="text-gray-800 font-semibold mb-4 text-base">En este artículo</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`transition-colors ${
                activeId === heading.id
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
