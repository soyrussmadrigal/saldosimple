export async function GET() {
  const baseUrl = "https://www.saldosimple.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemap-articulos.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-herramientas.xml</loc>
      </sitemap>
    </sitemapindex>
  `;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
