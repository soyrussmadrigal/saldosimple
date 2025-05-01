// app/herramientas/page.jsx

import Link from "next/link";
import { Calculator, PiggyBank, PercentCircle } from "lucide-react";
import PlaxLayout from "@/layouts/PlaxLayout";
import { PageBanner } from "@/components/sections/Banner";

const tools = [
  {
    title: "Calculadora de IVA",
    description: "Calcula el IVA de forma rápida y precisa.",
    href: "/herramientas/calculadora-iva",
    icon: Calculator,
  },
  {
    title: "Calculadora de Ahorro",
    description: "Proyecta cuánto podés ahorrar a lo largo del tiempo.",
    href: "/herramientas/calculadora-ahorro",
    icon: PiggyBank,
  },
  {
    title: "Simulador de Interés",
    description: "Simula intereses simples y compuestos fácilmente.",
    href: "/herramientas/simulador-interes",
    icon: PercentCircle,
  },
];

export const metadata = {
  title: "Herramientas Financieras | SaldoSimple",
  description: "Explorá nuestras herramientas para calcular IVA, ahorrar y tomar mejores decisiones financieras.",
};

export default function HerramientasPage() {
  return (
    <PlaxLayout>
      <PageBanner
        pageName="Herramientas"
        title="Calculadoras y simuladores financieros"
      />

      <div className="py-16 px-4 sm:px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white hover:border-blue-400"
            >
              <div className="flex items-center gap-4 mb-4">
                <tool.icon className="w-6 h-6 text-blue-700 group-hover:scale-110 transition" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {tool.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PlaxLayout>
  );
}
