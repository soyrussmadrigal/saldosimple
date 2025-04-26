import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";
import client from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextConfig";

async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      categoria,
      excerpt,
      coverImage {
        asset->{ url }
      },
      publishedAt,
      content
    }
  `;
  const params = { slug };
  const post = await client.fetch(query, params);
  return post;
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return <div className="container py-10">Artículo no encontrado.</div>;
  }

  return (
    <PlaxLayout>
      {/* Banner */}
      <div className="mil-banner mil-banner-inner mil-dissolve">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8">
              <div className="mil-banner-text mil-text-center">
                <div className="mil-text-m mil-mb-20">{post.categoria}</div>
                <h1 className="mil-mb-60">{post.title}</h1>
                <ul className="mil-breadcrumbs mil-pub-info mil-center">
                  <li>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("es-CR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </li>
                  <li>
                    <Link href="#comments">48 Comments</Link>
                  </li>
                  <li>
                    <Link href="#.">356 Shared</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publicación */}
      <div className="mil-blog-list mil-p-0-160">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              {post.coverImage?.asset?.url && (
                <div className="mil-pub-cover mil-up">
                  <img
                    src={post.coverImage.asset.url}
                    alt={post.title}
                    className="mil-scale-img"
                    data-value-1={1}
                    data-value-2="1.2"
                  />
                </div>
              )}
            </div>

            <div className="col-xl-9 mil-p-80-80">
              {/* Contenido enriquecido con estilo */}
              <div className="mil-up" style={{ wordBreak: "break-word" }}>
  <PortableText
    value={post.content}
    components={portableTextComponents}
  />
</div>
            </div>
          </div>
        </div>
      </div>
    </PlaxLayout>
  );
}
