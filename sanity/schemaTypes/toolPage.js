// ./schemas/toolPage.js

import { defineField, defineType } from "sanity";
import IconDropdown from "../components/IconDropdown"; // ✅ Asegúrate de que la ruta sea correcta

export default defineType({
  name: "toolPage",
  title: "Herramientas",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título de la herramienta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      description: "Seleccioná un ícono representativo para la herramienta.",
      components: {
        input: IconDropdown,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Título (SEO)",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Descripción (SEO)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
    }),
    defineField({
      name: "shortDescription",
      title: "Descripción corta",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Texto del botón",
      type: "string",
      initialValue: "Usar herramienta",
    }),
    defineField({
      name: "content",
      title: "Contenido principal",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "faqs",
      title: "Preguntas Frecuentes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Pregunta", type: "string" },
            {
              name: "answer",
              title: "Respuesta",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    }),
  ],
});
