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

  const filter = categoria
    ? `&& categoria->slug.current == "${categoria}"`
    : "";
  const query = `
    *[_type == "post" ${filter}] | order(publishedAt desc)[${start}...${end}] {
      title,
      "slug": slug.current,
      "categoria": categoria->{ title, "slug": slug.current },
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
  const filter = categoria
    ? `&& categoria->slug.current == "${categoria}"`
    : "";
  const countQuery = `count(*[_type == "post" ${filter}])`;
  return await client.fetch(countQuery);
}

async function getAllCategories() {
  const query = `*[_type == "category"]{ title, "slug": slug.current }`;
  return await client.fetch(query);
}

export async function generateMetadata({ params, searchParams }) {
  const page = params.page || 1;
  const categoria = searchParams?.categoria || null;

  return {
    title: `Artículos de Finanzas${
      categoria ? ` sobre ${categoria}` : ""
    } - Página ${page} | SaldoSimple`,
    description: `Página ${page} de artículos de finanzas${
      categoria ? ` en la categoría ${categoria}` : ""
    }.`,
    alternates: {
      canonical: `https://www.saldosimple.com/articulos/pagina/${page}${
        categoria ? `?categoria=${categoria}` : ""
      }`,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const pageNumber = parseInt(params.page) || 1;
  const categoria = searchParams?.categoria || null;

  const [posts, totalPosts, categories] = await Promise.all([
    getPosts(pageNumber, categoria),
    getTotalPosts(categoria),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <PlaxLayout>
      <PageBanner
        title="Tus fuentes de información financiera"
        categoria={categoria}
      />

      {/* Filtros por categoría */}
      <div className="max-w-7xl mx-auto px-6 mt-4 mb-12">
        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href={`/articulos/pagina/1`}
            className={`px-4 py-2 rounded-full text-sm border ${
              !categoria
                ? "text-white"
                : "bg-white text-gray-800 hover:bg-blue-50"
            }`}
            style={!categoria ? { backgroundColor: "#0d5152" } : {}}
          >
            Todas
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/articulos/pagina/1?categoria=${encodeURIComponent(
                cat.slug
              )}`}
              className={`px-4 py-2 rounded-full text-sm border ${
                categoria === cat.slug
                  ? "text-white"
                  : "bg-white text-gray-800 hover:bg-blue-50"
              }`}
              style={
                categoria === cat.slug ? { backgroundColor: "#f27457" } : {}
              }
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid de artículos */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.slug}
                className="mil-blog-card mil-up rounded-xl overflow-hidden shadow-md bg-white"
              >
                <Link href={`/articulos/${post.categoria?.slug}/${post.slug}`}>
                  <div className="relative w-full h-[200px]">
                    {post.coverImage?.asset?.url ? (
                      <Image
                        src={post.coverImage.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-sm font-medium text-gray-500">
                      {post.categoria?.title}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay artículos disponibles.
            </div>
          )}
        </div>

        {/* Paginación */}
        <div className="mt-16">
          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
      </div>
    </PlaxLayout>
  );
}
