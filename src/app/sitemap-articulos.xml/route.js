import { getArticleSlugs } from "@/lib/queries/sitemaps";

export async function GET() {
  const baseUrl = "https://www.saldosimple.com";
  const articles = await getArticleSlugs();
  console.log("📄 Artículos obtenidos del CMS:", articles);
  const urls = articles
    .filter((a) => a.slug && a.category)
    .map(({ slug, category, _updatedAt }) => {
      const loc = `${baseUrl}/articulos/${category}/${slug}`;
      return `
        <url>
          <loc>${loc}</loc>
          <lastmod>${new Date(_updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
