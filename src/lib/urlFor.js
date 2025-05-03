import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "g88p7aul", // tu ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export default function urlFor(source) {
  return builder.image(source);
}
