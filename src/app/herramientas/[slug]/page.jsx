import client from "@/lib/sanityClient";
import { getToolPageData } from "@/lib/queries/toolPage";
import { PortableText } from "@portabletext/react";
import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";
import FAQsSection from "@/components/post/FAQsSection";
import ToolsList from "@/components/tools/ToolsList";
import SEOJsonLd from "@/components/seo/SEOJsonLd";

export default async function ToolPage({ params }) {
  const data = await getToolPageData(params.slug);

  if (!data)
    return <div className="text-center py-20">Contenido no encontrado</div>;

  return (
    <>
      <SEOJsonLd
        schemas={{
          calculator: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: data.title,
            applicationCategory: "Finanzas",
            operatingSystem: "All",
            url: `https://www.saldosimple.com/herramientas/${params.slug}`,
            description:
              "Herramienta financiera gratuita para cálculos rápidos. Contenido y preguntas frecuentes dinámicas desde Sanity.",
            inLanguage: "es",
            dateModified: new Date().toISOString().split("T")[0],
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "USD",
            },
            publisher: {
              "@type": "Organization",
              name: "SaldoSimple",
              url: "https://www.saldosimple.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.saldosimple.com/logo.png",
              },
            },
            creator: {
              "@type": "Person",
              name: "Rus Madrigal",
              url: "https://rusmadrigal.com",
            },
            isAccessibleForFree: true,
          },
          ...(data.faqs?.length > 0
            ? {
                faq: {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: data.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: Array.isArray(faq.answer)
                        ? faq.answer
                            .map((block) =>
                              block.children
                                ?.map((child) => child.text)
                                .join("")
                            )
                            .join("\n")
                        : faq.answer,
                    },
                  })),
                },
              }
            : {}),
        }}
      />
      <PlaxLayout>
        <section className="text-center py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-teal-900">
              {data.title}
            </h1>
          </div>
        </section>

        {/* Renderiza herramientas específicas */}
        {params.slug === "calculadora-iva" && (
          <div className="container max-w-xl mx-auto mb-16">
            <IVACalculator />
          </div>
        )}

        {/* Contenido dinámico desde Sanity */}

        {data.content && (
          <section className="px-6 pb-20 max-w-3xl mx-auto text-gray-700 text-base leading-relaxed">
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
              }}
            />
          </section>
        )}

        {/* FAQs dinámicas */}
        {data.faqs?.length > 0 && (
          <div className="max-w-3xl mx-auto px-6 mt-12">
            <FAQsSection faqs={data.faqs} />
          </div>
        )}

        <ToolsList />
      </PlaxLayout>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "toolPage"]{ "slug": slug.current }`
  );
  return slugs.map(({ slug }) => ({ slug }));
}
