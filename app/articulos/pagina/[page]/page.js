import { PageBanner } from "@/components/Banner";
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";
import client from "@/lib/sanityClient";
import Pagination from "@/components/Pagination"; // Nuevo import

const POSTS_PER_PAGE = 10;

async function getPosts(page) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const query = `
    *[_type == "post"] | order(publishedAt desc)[${start}...${end}] {
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

async function getTotalPosts() {
  const countQuery = `count(*[_type == "post"])`;
  const total = await client.fetch(countQuery);
  return total;
}

export async function generateMetadata({ params }) {
  const page = params.page || 1;
  return {
    title: `Artículos de Finanzas - Página ${page} | SaldoSimple`,
    description: `Página ${page} de artículos de finanzas, ahorro y tarjetas en Costa Rica.`,
    alternates: {
      canonical: `https://www.saldosimple.com/articulos/pagina/${page}`,
    },
  };
}

export default async function Page({ params }) {
  const pageNumber = parseInt(params.page) || 1;
  const posts = await getPosts(pageNumber);
  const totalPosts = await getTotalPosts();
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <PlaxLayout>
      <PageBanner 
        pageName={`Artículos - Página ${pageNumber}`} 
        title="Tus fuentes de información financiera" 
      />

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
                      <p className="mil-text-xs mil-accent mil-mb-15">{post.categoria}</p>
                      <h4>{post.title}</h4>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No hay artículos disponibles.</p>
              </div>
            )}
          </div>

          {/* Paginación */}
          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
      </div>
    </PlaxLayout>
  );
}
