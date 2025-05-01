"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PortableText } from "@portabletext/react";

export default function FAQsSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold mb-8">Preguntas Frecuentes</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`
                border-b border-r border-[#0a4f4a]
                pr-6 pt-5 ${isOpen ? "pb-5" : "pb-4"}
                rounded-br-[60px]
                hover:shadow-sm transition-all duration-300 cursor-pointer
              `}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-black">{faq.question}</h4>
                {isOpen ? (
                  <Minus size={20} strokeWidth={2.5} className="text-[#0a4f4a]" />
                ) : (
                  <Plus size={20} strokeWidth={2.5} className="text-[#0a4f4a]" />
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-sm text-[#0a4f4a] leading-relaxed">
                  {Array.isArray(faq.answer) ? (
                    <PortableText value={faq.answer} />
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
