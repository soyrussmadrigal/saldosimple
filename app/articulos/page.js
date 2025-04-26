import { PageBanner } from "../../components/Banner";
import PlaxLayout from "../../layouts/PlaxLayout";
import Link from "next/link";
import client from "@/lib/sanityClient";

async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      categoria,
      excerpt,
      coverImage {
        asset->{ url }
      },
      publishedAt
    }
  `;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <PlaxLayout>
      <PageBanner pageName="Artículos" title="Tus fuentes de información financiera" />

      {/* blog list */}
      <div className="mil-blog-list mil-p-0-160">
        <div className="container">
          <div className="row">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.slug.current} className="col-xl-4 col-md-6">
                  <Link
                    href={`/articulos/${post.categoria}/${post.slug.current}`}
                    className="mil-blog-card mil-mb-30 mil-up"
                  >
                    <div className="mil-card-cover">
                      {post.coverImage?.asset?.url ? (
                        <img
                          src={post.coverImage.asset.url}
                          alt={post.title}
                          className="mil-scale-img"
                          data-value-1={1}
                          data-value-2="1.2"
                        />
                      ) : (
                        <div style={{ height: "300px", backgroundColor: "#f0f0f0" }} />
                      )}
                    </div>
                    <div className="mil-descr">
                      <p className="mil-text-xs mil-accent mil-mb-15">
                        {post.categoria}
                      </p>
                      <h4>{post.title}</h4>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No hay artículos disponibles todavía.</p>
              </div>
            )}
          </div>
          {/* Puedes agregar paginación más adelante si quieres */}
        </div>
      </div>
      {/* blog list end */}
    </PlaxLayout>
  );
}
