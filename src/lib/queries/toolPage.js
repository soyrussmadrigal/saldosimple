import client from "@/lib/sanityClient";

// 🔹 Query para una herramienta específica (para la vista [slug]/page.jsx)
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
    const data = await client.fetch(
      toolPageQuery,
      { slug },
      { cache: "no-store" }
    );
    return data;
  } catch (error) {
    console.error("Error al obtener datos de herramienta:", error);
    return null;
  }
}

// 🔹 Query para el listado general de herramientas (usado en /herramientas/page.jsx)
export const toolsQuery = `
  *[_type == "toolPage" && defined(slug.current)] | order(_createdAt asc) {
    _id,
    title,
    shortDescription,
    ctaText,
    icon,
    "slug": slug.current,
    "href": "/herramientas/" + slug.current
  }
`;

export async function getAllTools() {
  try {
    const data = await client.fetch(
      toolsQuery,
      {},
      {
        next: { revalidate: 0 },
        cache: "no-store",
      }
    );
    return data;
  } catch (error) {
    console.error("Error al obtener herramientas:", error);
    return [];
  }
}
