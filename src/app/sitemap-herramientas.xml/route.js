import { getToolSlugs } from "@/lib/queries/sitemaps";

export async function GET() {
  const baseUrl = "https://www.saldosimple.com";
  const tools = await getToolSlugs();

  const urls = tools
    .filter(t => t.slug)
    .map(({ slug, _updatedAt }) => {
      const loc = `${baseUrl}/herramientas/${slug}`;
      return `
        <url>
          <loc>${loc}</loc>
          <lastmod>${new Date(_updatedAt).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
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
