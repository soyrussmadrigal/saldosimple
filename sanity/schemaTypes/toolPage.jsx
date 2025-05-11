import IconDropdown from "../components/IconDropdown";

export default {
  name: "toolPage",
  title: "Herramientas",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título de la herramienta",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaTitle",
      title: "Meta Título (SEO)",
      type: "string",
      description: "Título que se mostrará en Google (máx 60 caracteres).",
    },
    {
      name: "metaDescription",
      title: "Meta Descripción (SEO)",
      type: "text",
      rows: 3,
      description: "Descripción breve para Google (máx 160 caracteres).",
    },
    {
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "URL canónica para evitar contenido duplicado.",
    },
    {
      name: "shortDescription",
      title: "Descripción corta",
      type: "text",
      rows: 2,
      description: "Resumen que se mostrará en la sección de herramientas.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ctaText",
      title: "Texto del botón",
      type: "string",
      description: "Texto del botón (ej. 'Usar calculadora')",
      initialValue: "Usar herramienta",
    },
    {
      name: "content",
      title: "Contenido principal",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "faqs",
      title: "Preguntas Frecuentes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Pregunta", type: "string" },
            { name: "answer", title: "Respuesta", type: "text" },
          ],
        },
      ],
    },
    {
      name: "icon",
      title: "Ícono",
      type: "string",
      components: {
        input: IconDropdown,
      },
      description: "Seleccioná un ícono desde el dropdown visual.",
      validation: (Rule) =>
        Rule.required().error("Debés seleccionar un ícono."),
    },
  ],
};
