// src/app/articulos/pagina/[page]/page.jsx
import { PageBanner } from "@/components/sections/Banner";
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";
import client from "@/lib/sanityClient";
import Pagination from "@/components/ui/Pagination";
import Image from "next/image";
import AnimatedPostGrid from "@/components/post/AnimatedPostGrid";
import AnimatedSecondaryList from "@/components/post/AnimatedSecondaryList";

const POSTS_PER_PAGE = 10;

async function getPosts(page, categoria) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const filter = categoria
    ? `&& categoria->slug.current == "${categoria}"`
    : "";
  const query = `
  *[_type == "post" && !(_id in path("drafts.**")) ${filter}]
    | order(publishedAt desc)[${start}...${end}] {
    title,
    "slug": slug.current,
    "categoria": categoria->{ title, "slug": slug.current },
    excerpt,
    coverImage {
      asset->{ url },
      alt
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
  const query = `
    *[_type == "category" && count(*[_type == "post" && categoria._ref == ^._id]) > 0] {
      title,
      "slug": slug.current
    }
  `;
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
  const featured = posts[0];
  const others = posts.slice(1);

  return (
    <PlaxLayout>
      <PageBanner title="Artículos" categoria={categoria || null} />

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

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {featured && (
            <div className="lg:col-span-2">
              <Link
                href={`/articulos/${featured.categoria?.slug}/${featured.slug}`}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-lg group">
                  <Image
                    src={featured.coverImage?.asset?.url || "/placeholder.jpg"}
                    alt={featured.coverImage?.alt || featured.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <span
                      className="text-sm uppercase font-semibold px-2 py-1 rounded-md"
                      style={{ backgroundColor: "#0d5152", color: "white" }}
                    >
                      {featured.categoria?.title}
                    </span>
                    <h2 className="text-2xl font-bold leading-snug mt-1 text-white">
                      {featured.title}
                    </h2>
                    <p className="text-sm mt-2 line-clamp-2 max-w-xl text-white">
                      {featured.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <AnimatedSecondaryList posts={others.slice(0, 3)} />
        </div>

        <div className="mt-12">
          <AnimatedPostGrid posts={others.slice(3)} />
        </div>

        <div className="mt-12">
          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
      </div>
    </PlaxLayout>
  );
}
