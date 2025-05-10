import { Calculator, PiggyBank, PercentCircle } from "lucide-react";
import PlaxLayout from "@/layouts/PlaxLayout";
import { PageBanner } from "@/components/sections/Banner";
import Link from "next/link";

const tools = [
  {
    title: "Calculadora de IVA",
    description: "Calculá el impuesto sobre el valor agregado de forma rápida y precisa.",
    href: "/herramientas/calculadora-iva",
    icon: Calculator,
  },
  {
    title: "Calculadora de Ahorro",
    description: "Proyectá tus ahorros a lo largo del tiempo y alcanzá tus metas financieras.",
    href: "/herramientas/calculadora-ahorro",
    icon: PiggyBank,
  },
  {
    title: "Simulador de Interés",
    description: "Calculá intereses simples o compuestos para tus inversiones o préstamos.",
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

      <section className="bg-white py-16 px-4 sm:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block p-6 bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-400 rounded-2xl shadow transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
                  <tool.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {tool.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PlaxLayout>
  );
}
