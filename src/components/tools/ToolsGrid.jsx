"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, PiggyBank, PercentCircle } from "lucide-react";

// Map de íconos disponibles
const iconMap = {
  Calculator,
  PiggyBank,
  PercentCircle,
};

export default function ToolsGrid({ tools }) {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool, index) => {
        const Icon = iconMap[tool.icon] || Calculator;

        return (
          <motion.div
            key={tool.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Link
              href={tool.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg hover:border-blue-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 transition">
                  <Icon className="w-6 h-6 text-blue-700 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {tool.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
