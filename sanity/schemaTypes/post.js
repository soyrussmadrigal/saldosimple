export default {
  name: 'post',
  type: 'document',
  title: 'Artículo',
  fields: [
    // 🏷️ Información principal
    {
      name: 'title',
      type: 'string',
      title: 'Título',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input =>
          input
            .toLowerCase()
            .normalize("NFD") // 🔥 Elimina acentos
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")
      }
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Extracto',
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Imagen Principal',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (alt)',
          description: 'Descripción breve para accesibilidad y SEO.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Pie de foto (caption)',
          description: 'Texto que se mostrará debajo de la imagen destacada.',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Fecha de Publicación',
    },
    {
      name: 'categoria',
      type: 'string',
      title: 'Categoría',
    },

    // 👤 Autor y editor (referencias a documents author.js)
    {
      name: 'author',
      type: 'reference',
      title: 'Autor',
      to: [{ type: 'author' }],
      description: 'Selecciona el autor principal de este artículo.',
    },
    {
      name: 'lastEditedBy',
      type: 'reference',
      title: 'Editado por',
      to: [{ type: 'author' }],
      description: 'Selecciona quién fue el último en editar este artículo.',
    },

    // 🔍 SEO
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: 'Título SEO para buscadores. Máximo 60 caracteres recomendado.',
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'Descripción SEO para buscadores. Máximo 160 caracteres recomendado.',
    },

    // 📄 Contenido enriquecido
    {
      name: 'content',
      type: 'array',
      title: 'Contenido',
      of: [
        { type: 'block' },

        // 🟨 Bloque CTA
        {
          type: 'object',
          name: 'ctaBox',
          title: 'Caja CTA',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título del CTA',
            },
            {
              name: 'emoji',
              type: 'string',
              title: 'Emoji (opcional)',
            },
            {
              name: 'backgroundColor',
              type: 'string',
              title: 'Color de fondo',
              initialValue: '#FFF8E1',
            },
            {
              name: 'body',
              type: 'array',
              title: 'Contenido del CTA',
              of: [
                { type: 'block' },
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Texto alternativo',
                    },
                  ],
                },
                {
                  type: 'object',
                  name: 'ctaButton',
                  title: 'Botón CTA',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Texto del botón',
                    },
                    {
                      name: 'url',
                      type: 'url',
                      title: 'Enlace',
                    },
                    {
                      name: 'style',
                      type: 'string',
                      title: 'Estilo',
                      options: {
                        list: [
                          { title: 'Primario (azul)', value: 'primary' },
                          { title: 'Secundario (gris)', value: 'secondary' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'primary',
                    },
                  ],
                  preview: {
                    select: { title: 'label' },
                    prepare: ({ title }) => ({
                      title: `🔘 Botón: ${title}`,
                    }),
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare: ({ title }) => ({
              title: `📣 CTA: ${title}`,
            }),
          },
        },
      ],
    },

    // ❓ Preguntas frecuentes
    {
      name: 'faqs',
      type: 'array',
      title: 'Preguntas Frecuentes (FAQs)',
      description: 'Agrega preguntas y respuestas relacionadas con el artículo.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Pregunta',
              validation: (Rule) => Rule.required().min(10).max(150),
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Respuesta',
              validation: (Rule) => Rule.required().min(20).max(1000),
            },
          ],
        },
      ],
    },

    // 📚 Fuentes del artículo
    {
      name: 'sources',
      type: 'array',
      title: 'Fuentes del artículo',
      description: 'Lista de enlaces usados como referencia para redactar este contenido.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título de la fuente',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Enlace',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    },
  ],
};
