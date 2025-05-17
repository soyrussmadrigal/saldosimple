import client from "@/lib/sanityClient";
import { getToolPageData } from "@/lib/queries/toolPage";
import { PortableText } from "@portabletext/react";
import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import FAQsSection from "@/components/post/FAQsSection";
import ToolsList from "@/components/tools/ToolsList";
import SEOJsonLd from "@/components/seo/SEOJsonLd";

// Mapa de componentes
const toolMap = {
  "calculadora-iva": IVACalculator,
  "calculadora-interes-compuesto": CompoundInterestCalculator,
};

export async function generateMetadata({ params }) {
  const data = await getToolPageData(params.slug);

  if (!data) {
    return {
      title: "Herramienta no encontrada | SaldoSimple",
      description: "La herramienta solicitada no se encuentra disponible.",
    };
  }

  return {
    title: data.metaTitle || data.title,
    description:
      data.metaDescription || "Explora esta herramienta financiera gratuita.",
    alternates: {
      canonical:
        data.canonicalUrl ||
        `https://www.saldosimple.com/herramientas/${params.slug}`,
    },
  };
}

export default async function ToolPage({ params }) {
  const data = await getToolPageData(params.slug);
  if (!data)
    return <div className="text-center py-20">Contenido no encontrado</div>;

  const ToolComponent = toolMap[params.slug];

  return (
    <PlaxLayout>
      <section className="text-center py-20 px-4 bg-white mt-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-teal-900">
            {data.title}
          </h1>
        </div>
      </section>

      {/* Renderiza herramienta */}
      {ToolComponent && (
        <div
          className={`mx-auto mb-16 px-4 ${
            params.slug === "calculadora-interes-compuesto"
              ? "max-w-screen-2xl"
              : "max-w-xl"
          }`}
        >
          <ToolComponent />
        </div>
      )}

      {/* Contenido desde Sanity */}
      {data.content && (
        <section className="px-6 pb-2 max-w-3xl mx-auto text-gray-700 text-base leading-relaxed">
          <PortableText
            value={data.content}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-4">{children}</p>,
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mt-6 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold mt-5 mb-2">
                    {children}
                  </h3>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc list-inside my-4 pl-4 text-gray-800">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal list-inside my-4 pl-4 text-gray-800">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li className="mb-2">{children}</li>,
                number: ({ children }) => <li className="mb-2">{children}</li>,
              },
            }}
          />
        </section>
      )}

      {data.faqs?.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 mt-4">
          <FAQsSection faqs={data.faqs} />
        </div>
      )}

      <ToolsList />
    </PlaxLayout>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "toolPage"]{ "slug": slug.current }`
  );
  return slugs.map(({ slug }) => ({ slug }));
}
