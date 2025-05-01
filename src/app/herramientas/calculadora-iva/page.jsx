import { PageBanner } from "@/components/sections/Banner";
import PlaxLayout from "@/layouts/PlaxLayout";
import IVACalculator from "@/components/tools/IVACalculator";

export default function CalculadoraIVAPage() {
  return (
    <PlaxLayout>
      <PageBanner
        pageName="Herramientas"
        title="Calculadora de IVA en Costa Rica"
      />
      <div className="mil-blog-list mil-p-0-160">
        <div className="container max-w-xl mx-auto">
          <IVACalculator
            defaultIVA={13}
            currency="CRC"
            locale="es-CR"
            title="Calculadora de IVA en Costa Rica"
          />
        </div>
      </div>
    </PlaxLayout>
  );
}
