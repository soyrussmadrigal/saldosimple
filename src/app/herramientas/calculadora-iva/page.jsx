import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";
import ToolsList from "@/components/tools/ToolsList";
import SEOJsonLd from "@/components/seo/SEOJsonLd";

export const metadata = {
  title: "Calculadora de IVA en Costa Rica - Herramienta Online | SaldoSimple",
  description:
    "Calcula fácilmente el IVA en Costa Rica con nuestra herramienta gratuita. Ingresa el monto sin impuesto y obtén el total con IVA en segundos.",
  alternates: {
    canonical: "https://www.saldosimple.com/herramientas/calculadora-iva",
  },
};

export default function CalculadoraIVAPage() {
  return (
    <>
      <SEOJsonLd
        schemas={{
          softwareApplication: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Calculadora de IVA en Costa Rica",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            url: "https://www.saldosimple.com/herramientas/calculadora-iva",
            description:
              "Calculadora en línea para obtener el monto con IVA a partir del monto neto. Herramienta gratuita y rápida para Costa Rica.",
            publisher: {
              "@type": "Organization",
              name: "SaldoSimple",
              url: "https://www.saldosimple.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.saldosimple.com/logo.png",
              },
            },
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "CRC",
            },
          },
        }}
      />

      <PlaxLayout>
        {/* Encabezado */}
        <section className="text-center py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
              style={{ color: "rgb(13, 81, 82)" }}
            >
              Calculadora de IVA en Costa Rica
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Calcula rápidamente el IVA aplicable según el monto sin impuesto.
            </p>
          </div>
        </section>

        {/* Calculadora */}
        <div className="mil-blog-list mil-p-0-160">
          <div className="container max-w-xl mx-auto">
            <IVACalculator
              defaultIVA={13}
              currency="CRC"
              locale="es-CR"
              title="Calculadora de IVA"
            />
          </div>
        </div>

        {/* Contenido SEO */}
        <section className="mt-10 px-6 pb-24 max-w-3xl mx-auto text-[rgb(90,91,96)] text-base leading-relaxed">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            ¿Qué es el IVA y cómo se calcula en Costa Rica?
          </h2>
          <p className="mb-4">
            El Impuesto al Valor Agregado (IVA) en Costa Rica es un tributo que
            se aplica al consumo de bienes y servicios. Actualmente, la tasa
            general es del 13%, aunque algunos productos y servicios pueden
            tener tasas diferenciadas o estar exentos.
          </p>
          <p className="mb-4">
            Para calcular el IVA, simplemente se multiplica el monto neto por el
            porcentaje correspondiente. Por ejemplo, si compras un artículo por
            ₠10,000, el IVA sería ₠1,300 y el total a pagar ₠11,300.
          </p>
          <p>
            Esta calculadora te permite automatizar ese proceso y obtener
            resultados precisos al instante, ya sea que seas un consumidor,
            comerciante o profesional independiente.
          </p>
        </section>

        {/* Otras herramientas */}
        <div className="mt-0">
          <ToolsList />
        </div>
      </PlaxLayout>
    </>
  );
}
