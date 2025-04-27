export default {
  name: 'post',
  type: 'document',
  title: 'Artículo',
  fields: [
    // 🏷️ Información Principal
    {
      name: 'title',
      type: 'string',
      title: 'Título',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
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

    // 👤 Autor Principal
    {
      name: 'author',
      type: 'reference',
      title: 'Autor',
      to: [{ type: 'author' }],
      description: 'Selecciona el autor principal de este artículo.',
    },

    // ✏️ Última Edición (Editor)
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

    // 📄 Contenido
    {
      name: 'content',
      type: 'array',
      title: 'Contenido',
      of: [{ type: 'block' }],
    },
  ],
};
