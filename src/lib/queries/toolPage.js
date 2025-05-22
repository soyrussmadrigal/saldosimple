import client from "@/lib/sanityClient";

// 🔹 Query para una herramienta específica (para la vista [slug]/page.jsx)
export const toolPageQuery = `*[_type == "toolPage" && slug.current == $slug][0]{
  title,
  metaTitle,
  metaDescription,
  canonicalUrl,
  content,
  faqs,
  ocultarDelListado
}`;

export async function getToolPageData(slug) {
  try {
    const data = await client.fetch(
      toolPageQuery,
      { slug },
      { cache: "no-store" } // 👈 válido para desarrollo, siempre fresco
    );
    return data;
  } catch (error) {
    console.error("Error al obtener datos de herramienta:", error);
    return null;
  }
}

// 🔹 Query para el listado general de herramientas (usado en /herramientas/page.jsx)
export const toolsQuery = `
  *[_type == "toolPage" && defined(slug.current) && ocultarDelListado != true] 
  | order(_createdAt asc) {
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
        cache: "no-store", // ✅ Elimina revalidate para evitar conflicto
      }
    );
    return data;
  } catch (error) {
    console.error("Error al obtener herramientas:", error);
    return [];
  }
}
