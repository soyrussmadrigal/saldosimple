import client from "../sanityClient";

// 🔹 Artículos con slug y categoría obligatoria
export async function getArticleSlugs() {
  return await client.fetch(`
    *[_type == "post" && defined(slug.current) && defined(categoria->slug.current)]{
      "slug": slug.current,
      "category": categoria->slug.current,
      _updatedAt
    }
  `);
}

// 🔹 Herramientas
export async function getToolSlugs() {
  return await client.fetch(`
    *[_type == "toolPage" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `);
}
