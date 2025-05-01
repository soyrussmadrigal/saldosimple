// ./sanity/schemas/toolPage.js

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
            {
              name: "question",
              title: "Pregunta",
              type: "string",
            },
            {
              name: "answer",
              title: "Respuesta",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
