import client from "@/lib/sanityClient";

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
