export default {
    name: "author",
    title: "Author",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Nombre",
        type: "string",
      },
      {
        name: "bio",
        title: "Biografía",
        type: "text",
      },
      {
        name: "image",
        title: "Foto del Autor",
        type: "image",
        options: {
          hotspot: true,
        },
      },
    ],
  };
  