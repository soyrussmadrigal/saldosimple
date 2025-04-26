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
