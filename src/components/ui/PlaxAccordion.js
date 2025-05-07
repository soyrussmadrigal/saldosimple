"use client";
import { useState } from "react";

const PlaxAccordion = ({ dark }) => {
  const accordionData = [
    {
      id: 1,
      title: "¿Qué tipos de herramientas financieras encontraré aquí?",
      desc: "En SaldoSimple.com usted encontrará muchos tipos de herramientas financieras, desde calculadoras simples hasta sistemas de protección de inversión, tales como calculadoras de hipotecas, interés compuesto, cálculo de certificado de depósitos a plazo muchos otros tipos de herramientas del sector financiero.",
    },
    {
      id: 2,
      title: "¿En qué países funciona SaldoSimple?",
      desc: "Si bien nuestros contenidos están enfocados en México, la gran mayoría de herramientas financieras pueden ser utilizadas desde otros países en LATAM, estamos en crecimiento por lo que, en 2026 estaremos creando una versión del sitio para otros países, con contenidos enfocados en cada región.",
    },
    {
      id: 3,
      title: "¿Son las herramientas 100% gratuitas?",
      desc: "Sí, todas las herramientas que proveemos a nuestros lectores son gratuitas. Quizás a futuro lancemos una plataforma para el control de las finanzas personales, esta tendría un precio muy accesible. Les estaremos haciendo saber a nuestros lectores, cuando lleguen herramientas premium al sitio web.",
    },
    {
      id: 4,
      title: "¿Cómo puedo contactar al equipo de SaldoSimple?",
      desc: "Para entrar en contacto puede enviarnos un email al correo: contacto@saldosimple.com ",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className={`mil-accordion`}>
      {accordionData.map((item) => (
        <div
          className={`mil-accordion-group mil-up ${
            active == item.id ? " mil-active" : ""
          }`}
          key={item.id}
        >
          <div
            className={`mil-accordion-menu `}
            onClick={() => setActive(active == item.id ? null : item.id)}
          >
            <h5 className={dark ? "mil-light" : ""}>{item.title}</h5>
            <div className="mil-accordion-icon">
              <i className="fas fa-chevron-up" />
            </div>
          </div>
          <div className="mil-accordion-content">
            <p
              className="mil-text-m mil-soft"
              dangerouslySetInnerHTML={{ __html: item.desc }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PlaxAccordion;
