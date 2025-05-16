import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "g88p7aul",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
});

export default async function handler(req, res) {
  const query = `*[_type == "toolPage" && defined(slug.current)] | order(_createdAt desc)[0...6] {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    "href": "/herramientas/" + slug.current
  }`;

  try {
    const tools = await client.fetch(query);
    res.status(200).json(tools);
  } catch (err) {
    console.error("Error fetching tools:", err);
    res.status(500).json({ error: "Error fetching tools" });
  }
}
