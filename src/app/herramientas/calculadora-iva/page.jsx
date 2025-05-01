import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";
import ToolsList from "@/components/tools/ToolsList";
import SEOJsonLd from "@/components/seo/SEOJsonLd";

export const metadata = {
  title: "Calculadora de IVA para LATAM y España - Herramienta Online | SaldoSimple",
  description:
    "Calcula fácilmente el IVA en países de Latinoamérica y España con nuestra herramienta gratuita. Ingresa el monto sin impuesto y obtén el total con IVA en segundos.",
  alternates: {
    canonical: "https://www.saldosimple.com/herramientas/calculadora-iva",
  },
};

export default function CalculadoraIVAPage() {
  return (
    <>
      <SEOJsonLd
        schemas={{
          calculator: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de IVA LATAM",
            "applicationCategory": "Finanzas",
            "operatingSystem": "All",
            "url": "https://www.saldosimple.com/herramientas/calculadora-iva",
            "description":
              "Calculadora de IVA para países de Latinoamérica y España. Calcula fácilmente el impuesto agregado seleccionando moneda, país y porcentaje.",
            "inLanguage": "es",
            "dateModified": new Date().toISOString().split("T")[0],
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SaldoSimple",
              "url": "https://www.saldosimple.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.saldosimple.com/logo.png"
              }
            },
            "creator": {
              "@type": "Person",
              "name": "Rus Madrigal",
              "url": "https://rusmadrigal.com"
            },
            "isAccessibleForFree": true,
            "featureList": "Cálculo instantáneo, IVA editable, Selección de país, Moneda local, Copiar total al portapapeles"
          }
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
              Calculadora de IVA
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Calcula rápidamente el IVA aplicable según el monto sin impuesto para tu país.
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
            ¿Qué es el IVA y cómo se calcula?
          </h2>
          <p className="mb-4">
            El Impuesto al Valor Agregado (IVA) es un tributo que se aplica al consumo de bienes y servicios en la mayoría de países de habla hispana. 
            La tasa varía por país, siendo del 13% en Costa Rica, del 21% en España, entre otros.
          </p>
          <p className="mb-4">
            Para calcular el IVA, simplemente se multiplica el monto neto por el porcentaje correspondiente. 
            Esta herramienta te permite automatizar ese proceso y obtener resultados precisos al instante.
          </p>
          <p>
            Ya seas consumidor, comerciante o profesional independiente, esta calculadora está diseñada para simplificar tu gestión financiera.
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
