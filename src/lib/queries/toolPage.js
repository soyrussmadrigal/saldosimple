import client from "@/lib/sanityClient";

// 🔹 Query para una herramienta específica (ya la tenías)
export const toolPageQuery = `*[_type == "toolPage" && slug.current == $slug][0]{
  title,
  metaTitle,
  metaDescription,
  canonicalUrl,
  content,
  faqs
}`;

export async function getToolPageData(slug) {
  try {
    const data = await client.fetch(toolPageQuery, { slug }, { cache: "no-store" });
    return data;
  } catch (error) {
    console.error("Error al obtener datos de herramienta:", error);
    return null;
  }
}

// 🔹 Nueva query para todas las herramientas (para tabs o listados)
export const toolsQuery = `
  *[_type == "toolPage"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    ctaText
  }
`;

export async function getAllTools() {
  try {
    const data = await client.fetch(toolsQuery, {}, { next: { revalidate: 0 }, cache: "no-store" });
    return data;
  } catch (error) {
    console.error("Error al obtener herramientas:", error);
    return [];
  }
}
