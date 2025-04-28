"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FaqAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4 mt-16 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-black mb-6">
        Preguntas Frecuentes
      </h3>

      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleFaq(index)}
            className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
          >
            <span className="text-lg font-semibold text-black">{faq.question}</span>
            <span className="text-2xl text-gray-500">{openIndex === index ? '-' : '+'}</span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 overflow-hidden bg-white"
              >
                <div className="py-4 text-gray-600 break-words">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
