import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";
import ToolsList from "@/components/tools/ToolsList";

export default function CalculadoraIVAPage() {
  return (
    <PlaxLayout>
      {/* Encabezado */}
      <section className="text-center py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ color: "rgb(13, 81, 82)" }}
          >
            Calculadora IVA Costa Rica
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
            title="Calculadora IVA"
          />
        </div>
      </div>

      {/* Contenido SEO */}
      <section className="mt-2 px-6 pb-24 max-w-3xl mx-auto text-[rgb(90,91,96)] text-base leading-relaxed">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          ¿Qué es el IVA y cómo se calcula en Costa Rica?
        </h2>
        <p className="mb-4">
          El Impuesto al Valor Agregado (IVA) en Costa Rica es un tributo que se
          aplica al consumo de bienes y servicios. Actualmente, la tasa general
          es del 13%, aunque algunos productos y servicios pueden tener tasas
          diferenciadas o estar exentos.
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
      <div className="-mt-10">
        <ToolsList />
      </div>
    </PlaxLayout>
  );
}
