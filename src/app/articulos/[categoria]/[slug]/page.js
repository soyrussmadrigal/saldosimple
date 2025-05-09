import { PageBanner } from "@/components/sections/Banner";
import PlaxLayout from "@/layouts/PlaxLayout";
import client from "@/lib/sanityClient";

async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0] {
      title,
      categoria,
      content,
      coverImage {
        asset->{ url }
      }
    }
  `;
  return await client.fetch(query);
}

export default async function Page({ params }) {
  const { slug, categoria } = params;
  const post = await getPost(slug);

  return (
    <PlaxLayout>
      <PageBanner title={post?.title || "Artículo"} categoria={categoria} />

      <div className="container my-16">
        <div className="max-w-3xl mx-auto">
          {post?.coverImage?.asset?.url && (
            <img
              src={post.coverImage.asset.url}
              alt={post.title}
              className="mb-8 rounded-xl"
            />
          )}
          <div className="prose max-w-none">{post?.content}</div>
        </div>
      </div>
    </PlaxLayout>
  );
}
