export default {
    name: 'post',
    type: 'document',
    title: 'Artículo',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Título'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: { source: 'title', maxLength: 96 }
      },
      {
        name: 'excerpt',
        type: 'text',
        title: 'Extracto'
      },
      {
        name: 'coverImage',
        type: 'image',
        title: 'Imagen Principal'
      },
      {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Fecha de Publicación'
      },
      {
        name: 'categoria',
        type: 'string',
        title: 'Categoría'
      },
      {
        name: 'content',
        type: 'array',
        title: 'Contenido',
        of: [{ type: 'block' }]
      }
    ]
  }
  