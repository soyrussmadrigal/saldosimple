import Link from "next/link";
import { Calculator, PiggyBank, PercentCircle } from "lucide-react";

const tools = [
  {
    name: "Calculadora de IVA",
    description: "Calculá el IVA de forma rápida y precisa.",
    href: "/herramientas/calculadora-iva",
    icon: <Calculator className="text-[#0d5152] text-3xl transition-transform group-hover:scale-110" />,
  },
  {
    name: "Calculadora de Ahorro",
    description: "Proyectá cuánto podés ahorrar a lo largo del tiempo.",
    href: "/herramientas/calculadora-ahorro",
    icon: <PiggyBank className="text-[#0d5152] text-3xl transition-transform group-hover:scale-110" />,
  },
  {
    name: "Simulador de Interés",
    description: "Simulá intereses simples y compuestos fácilmente.",
    href: "/herramientas/simulador-interes",
    icon: <PercentCircle className="text-[#0d5152] text-3xl transition-transform group-hover:scale-110" />,
  },
];

export default function ToolList() {
  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-[#0d5152]">Otras Herramientas</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="rounded-xl border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              {tool.icon}
              <h3 className="font-semibold text-lg text-[#0d5152] group-hover:underline">
                {tool.name}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
