"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b border-blue-500 px-4 py-4 cursor-pointer transition-all ${
              openIndex === index ? "bg-transparent" : "bg-transparent"
            } ${index === faqs.length - 1 ? "rounded-br-2xl" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black">
                {faq.question}
              </h3>
              <div className="ml-4">
                {openIndex === index ? (
                  <Minus size={18} strokeWidth={2.5} />
                ) : (
                  <Plus size={18} strokeWidth={2.5} />
                )}
              </div>
            </div>
            {openIndex === index && (
              <div className="mt-2 px-4 text-gray-600 break-words overflow-hidden">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
