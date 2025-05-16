import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "g88p7aul",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false, // cambiar a true para producción
});

export default client;

// 👉 Añade esto abajo:
export async function getLatestArticles() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...6] {
    title,
    "slug": slug.current,
    "categoria": categoria->{ title, "slug": slug.current },
    excerpt,
    coverImage {
      asset->{ url },
    },
    publishedAt,
    author -> {
      name,
      image {
        asset->{ url }
      }
    }
  }`;
  return await client.fetch(query);
}
