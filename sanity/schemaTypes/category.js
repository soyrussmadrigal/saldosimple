// /sanity/schemaTypes/category.js
export default {
  name: "category",
  type: "document",
  title: "Categoría",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Nombre de la categoría",
      validation: (Rule) => Rule.required().min(3).max(50),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug (URL)",
      options: {
        source: "title",
        maxLength: 50,
        slugify: input =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")
      },
    },
    {
      name: "description",
      type: "text",
      title: "Descripción",
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
};
