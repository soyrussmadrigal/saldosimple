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
  