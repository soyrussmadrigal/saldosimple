"use client";

import { useState } from "react";
import client from "@/lib/sanityClient";
import { getToolPageData } from "@/lib/queries/toolPage";
import { PortableText } from "@portabletext/react";
import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import LoanCalculator from "@/components/tools/LoanCalculator";
import PayPalCalculator from "@/components/tools/PayPalCalculator";
import AguinaldoCalculatorCR from "@/components/tools/AguinaldoCalculatorCR";
import FAQsSection from "@/components/post/FAQsSection";
import ToolsList from "@/components/tools/ToolsList";
import SEOJsonLd from "@/components/seo/SEOJsonLd";
import Breadcrumb from "@/components/post/Breadcrumb";
import { AlertTriangle } from "lucide-react";

// 🧠 Mapa que relaciona el slug con el componente visual de la herramienta
const toolMap = {
  "calculadora-iva": IVACalculator,
  "calculadora-interes-compuesto": CompoundInterestCalculator,
  "calculadora-credito-personal": LoanCalculator,
  "calculadora-paypal": PayPalCalculator,
  "calculadora-de-aguinaldo-costa-rica": AguinaldoCalculatorCR,
};

export default async function ToolPage({ params }) {
  const data = await getToolPageData(params.slug);

  if (!data) {
    return <div className="text-center py-20">Contenido no encontrado</div>;
  }

  const ToolComponent = toolMap[params.slug];
  const titulo = data.title;
  const categoria = data.category?.slug?.current || null;

  const siteUrl = "https://www.saldosimple.com";
  const pageUrl = `${siteUrl}/herramientas/${params.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Herramientas",
        item: `${siteUrl}/herramientas`,
      },
      { "@type": "ListItem", position: 3, name: data.title, item: pageUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    headline: data.title,
    description:
      data.metaDescription || "Explora esta herramienta financiera gratuita.",
    datePublished: data._createdAt,
    author: { "@type": "Organization", name: "SaldoSimple" },
    publisher: {
      "@type": "Organization",
      name: "SaldoSimple",
      logo: { "@type": "ImageObject", url: `${siteUrl}/img/logo.png` },
    },
    image: {
      "@type": "ImageObject",
      url: data.coverImage || `${siteUrl}/img/og-default.jpg`,
    },
    articleBody: extractPlainText(data.content),
  };

  const faqSchema =
    data.faqs && data.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: extractPlainText(faq.answer),
            },
          })),
        }
      : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.title,
    operatingSystem: "All",
    applicationCategory: "FinancialApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: data.metaDescription || "Calculadora financiera gratuita.",
    url: pageUrl,
  };

  // ⚠️ Cartel para herramientas no publicadas
  const [showNotice, setShowNotice] = useState(true);

  return (
    <PlaxLayout>
      <SEOJsonLd
        schemas={{
          breadcrumb: breadcrumbSchema,
          article: articleSchema,
          software: softwareSchema,
          ...(faqSchema && { faq: faqSchema }),
        }}
      />

      {data.ocultarDelListado && showNotice && (
        <div className="relative bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm text-center py-3 px-4 mb-6 rounded-md max-w-4xl mx-auto flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-700" />
          <span>
            <strong>Advertencia:</strong> Estás viendo una herramienta que aún{" "}
            <strong>no ha sido publicada</strong>.
          </span>
          <button
            onClick={() => setShowNotice(false)}
            className="absolute right-3 top-2 text-yellow-600 hover:text-yellow-800 text-lg"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>
      )}

      <section className="text-center py-1 px-4 bg-white mt-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-teal-900">
            {titulo}
          </h1>
          <Breadcrumb
            tipo="herramientas"
            titulo={titulo}
            categoria={categoria}
          />
        </div>
      </section>

      {ToolComponent && (
        <div className="mil-blog-list mil-p-0-160 mb-16">
          <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-12">
            <ToolComponent />
          </div>
        </div>
      )}

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

// 🧰 Utilidad para extraer texto plano desde contenido Sanity
function extractPlainText(content) {
  if (!Array.isArray(content)) return "";
  return content
    .filter((block) => block._type === "block" && block.children)
    .map((block) => block.children.map((child) => child.text).join(""))
    .join(" ")
    .slice(0, 1000);
}
