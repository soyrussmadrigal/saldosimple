// app/page.js

export const metadata = {
  title: "Finanzas Personales y Herramientas con IA | SaldoSimple",
  description:
    "Mejora tus finanzas con artículos y herramientas inteligentes. Calculadoras, análisis y contenido optimizado con IA para tomar mejores decisiones.",
  alternates: {
    canonical: "https://www.saldosimple.com/",
  },
};

import Banner from "@/components/sections/Banner";
import PlaxAccordion from "@/components/ui/PlaxAccordion";
import PlaxLayout from "@/layouts/PlaxLayout";
import Image from "next/image";
import { getLatestArticles } from "@/lib/sanityClient";
import ArticlesCarousel from "@/components/sections/ArticlesCarousel";
import ToolsShowcase from "@/components/sections/ToolsShowcase";
import CurrencyConverter from "@/components/client/CurrencyConverter";

const Page = async () => {
  const articles = await getLatestArticles();

  return (
    <PlaxLayout bg={false}>
      <Banner
        title="Finanzas inteligentes"
        img="/img/home-1/1.webp"
        style={{ maxWidth: "125%", transform: "translateX(10%)" }}
      />

      {/* features */}
      <div className="mil-features mil-p-160-80">
        <div className="container">
          <div className="row flex-sm-row-reverse justify-content-between align-items-center">
            <div className="col-xl-6 mil-mb-80">
              <h2 className="mil-mb-30 mil-up">
                Herramientas
                <br />
                Financieras con AI
              </h2>
              <ul className="mil-list-1">
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15 mil-up">
                      Calculadoras financieras.
                    </h5>
                    <p className="mil-text-m mil-soft mil-up">
                      Todas las herramientas financieras en un solo lugar, el
                      equipo de SaldoSimple constantemente está creando
                      diferentes tipos de calculadoras financieras entre otros
                      tipos de software financiero gratuito para nuestros
                      lectores.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15 mil-up">
                      Prospectivas de cara a futuro
                    </h5>
                    <p className="mil-text-m mil-soft mil-up">
                      Nuestro equipo trabaja en herramientas financieras que
                      permitan mejorar las perspectivas de inversión en finanzas
                      personales, de manera que usted pueda gestionar mejor sus
                      inversiones por mínimas que sean.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15 mil-up">Artículos financieros</h5>
                    <p className="mil-text-m mil-soft mil-up">
                      Publicamos artículos financieros de alto valor de manera
                      gratuita, nuestros contenidos se enfocan en finanzas
                      personales (ahorro, inversión, jubilación).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-xl-5 mil-mb-80">
              <div className="mil-image-frame mil-visible-overflow">
                <Image
                  src="/img/home-1/2.webp"
                  alt="Imagen decorativa"
                  width={1040}
                  height={1460}
                  className="mil-up"
                />
                <div className="mil-img-box mil-accent-box mil-up">
                  <div>
                    <h2 className="mil-light mil-mb-15">100%</h2>
                    <p className="mil-text-s mil-light">
                      Gratuitas <br />
                      ¡para siempre!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* facts */}
      <div className="mil-facts mil-p-0-80">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-6 mil-sm-text-center mil-mb-30 mil-up">
                  <p className="h1 mil-display mil-mb-15">
                    <span className="mil-accent mil-counter" data-number={7}>
                      10
                    </span>
                    <span className="mil-pale">+</span>
                  </p>
                  <h5>Herramientas</h5>
                </div>
                <div className="col-xl-6 mil-sm-text-center mil-mb-80 mil-up">
                  <p className="h1 mil-display mil-mb-15">
                    <span className="mil-accent mil-counter" data-number={1000}>
                      1000
                    </span>
                    <span className="mil-pale">+</span>
                  </p>
                  <h5>Usuarios/mes</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-5 mil-mb-80">
              <p className="mil-text-m mil-soft mil-up">
                Trabajamos para ofrecerte las mejores herramientas y contenido
                financiero, adaptados a las necesidades actuales. Nos apasiona
                brindarte una excelente experiencia de usuario, por eso verás
                mejoras constantes en nuestro sitio web. Así podemos ayudarte a
                tomar decisiones financieras más inteligentes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* artículos recientes */}
      <div className="mil-p-0-0">
        <ArticlesCarousel articles={articles} />
      </div>

      {/* Tipo de cambio */}
      <CurrencyConverter />

      {/* Tools Tabs */}
      <div className="mil-p-0-0 fix-padding-tools">
        <ToolsShowcase />
      </div>

      {/* FAQs */}
      <div className="mil-faq mil-p-160-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="mil-text-center">
                <h2 className="mil-mb-30 mil-up">
                  Preguntas <br />
                  Frecuentes (FAQs)
                </h2>
                <p className="mil-text-m mil-soft mil-mb-60 mil-up">
                  Conoce más sobre SaldoSimple.com una web con herramientas
                  basadas en AI para ayudarte a mejorar tus finanzas personales.
                </p>
              </div>
              <PlaxAccordion />
            </div>
          </div>
        </div>
      </div>

      {/* CTA (desactivado por ahora) */}
      {/* <CallToAction2 /> */}
    </PlaxLayout>
  );
};

export default Page;
