import { getAllTools } from "@/lib/queries/toolPage";
import * as HeroIcons from "@heroicons/react/24/outline"; // Importa todos los íconos de Heroicons
import PlaxLayout from "@/layouts/PlaxLayout";
import { PageBanner } from "@/components/sections/Banner";
import Link from "next/link";

export const metadata = {
  title: "Herramientas Financieras | SaldoSimple",
  description:
    "Explorá nuestras herramientas para calcular IVA, ahorrar y tomar mejores decisiones financieras.",
  alternates: {
    canonical: "https://www.saldosimple.com/herramientas",
  },
};

export default async function HerramientasPage() {
  const tools = await getAllTools();

  return (
    <PlaxLayout>
      <PageBanner
        pageName="Herramientas"
        title="Herramientas"
      />

      <section className="bg-white py-16 px-4 sm:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const iconKey = `${tool.icon
              ?.charAt(0)
              .toUpperCase()}${tool.icon?.slice(1)}Icon`;
            const Icon = HeroIcons[iconKey] || HeroIcons.CalculatorIcon;

            return (
              <Link
                key={tool.slug}
                href={`/herramientas/${tool.slug}`}
                className="group block p-6 bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-400 rounded-2xl shadow transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </PlaxLayout>
  );
}
