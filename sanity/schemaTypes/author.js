export default {
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    // 🧑‍💼 Información básica
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
      options: { hotspot: true },
    },

    // 🌐 Redes sociales
    {
      name: "socialLinks",
      type: "array",
      title: "Redes Sociales",
      description: "Agrega enlaces a perfiles profesionales del autor.",
      of: [
        {
          type: "object",
          name: "socialItem",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Plataforma",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Sitio Web", value: "website" },
                ],
                layout: "dropdown",
              },
            },
            {
              name: "url",
              type: "url",
              title: "URL del perfil",
            },
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare({ platform, url }) {
              return {
                title: `${platform}: ${url}`,
              };
            },
          },
        },
      ],
    },

    // ✅ Verificación editorial
    {
      name: "verified",
      type: "boolean",
      title: "Autor verificado",
      description: "Activa esta opción si el autor ha sido verificado editorialmente.",
      initialValue: false,
    },
  ],
};
