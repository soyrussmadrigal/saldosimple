import { PageBanner } from "@/components/sections/Banner";
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";
import Image from "next/image";
import client from "@/lib/sanityClient";
import Pagination from "@/components/ui/Pagination";

const POSTS_PER_PAGE = 10;

async function getPosts(page, categoria) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const filter = categoria ? `&& categoria == "${categoria}"` : "";
  const query = `
    *[_type == "post" ${filter}] | order(publishedAt desc)[${start}...${end}] {
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

  return await client.fetch(query);
}

async function getTotalPosts(categoria) {
  const filter = categoria ? `&& categoria == "${categoria}"` : "";
  const countQuery = `count(*[_type == "post" ${filter}])`;
  return await client.fetch(countQuery);
}

export async function generateMetadata({ params, searchParams }) {
  const page = params.page || 1;
  const categoria = searchParams?.categoria || null;

  return {
    title: `Artículos de Finanzas${categoria ? ` sobre ${categoria}` : ""} - Página ${page} | SaldoSimple`,
    description: `Página ${page} de artículos de finanzas${categoria ? ` en la categoría ${categoria}` : ""}.`,
    alternates: {
      canonical: `https://www.saldosimple.com/articulos/pagina/${page}${categoria ? `?categoria=${categoria}` : ""}`,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const pageNumber = parseInt(params.page) || 1;
  const categoria = searchParams?.categoria || null;

  const [posts, totalPosts] = await Promise.all([
    getPosts(pageNumber, categoria),
    getTotalPosts(categoria),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <PlaxLayout>
      <PageBanner
        title="Tus fuentes de información financiera"
        categoria={categoria}
      />

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
                    <div className="mil-card-cover relative w-full h-[250px] overflow-hidden rounded-xl">
                      {post.coverImage?.asset?.url ? (
                        <Image
                          src={post.coverImage.asset.url}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={false}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                          Sin imagen
                        </div>
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
                <p>No hay artículos disponibles para esta categoría.</p>
              </div>
            )}
          </div>

          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
      </div>
    </PlaxLayout>
  );
}
