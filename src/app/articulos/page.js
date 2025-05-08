// src/app/articulos/pagina/[page]/page.jsx
import { PageBanner } from "@/components/sections/Banner";
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";
import client from "@/lib/sanityClient";
import Pagination from "@/components/ui/Pagination";
import Image from "next/image";

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
        asset->{ url },
        alt
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

  const featured = posts[0];
  const others = posts.slice(1);

  return (
    <PlaxLayout>
      <PageBanner 
        pageName={`Artículos - Página ${pageNumber}`} 
        title="Tus fuentes de información financiera" 
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Artículo destacado */}
          {featured && (
            <div className="lg:col-span-2">
              <Link href={`/articulos/${featured.categoria}/${featured.slug.current}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-lg group">
                  <Image
                    src={featured.coverImage?.asset?.url || "/placeholder.jpg"}
                    alt={featured.coverImage?.alt || featured.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <span className="text-sm uppercase text-blue-400 font-semibold">
                      {featured.categoria}
                    </span>
                    <h2 className="text-2xl font-bold leading-snug mt-1">
                      {featured.title}
                    </h2>
                    <p className="text-sm mt-2 line-clamp-2 max-w-xl">{featured.excerpt}</p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Artículos secundarios */}
          <div className="space-y-6">
            {others.slice(0, 3).map((post) => (
              <Link
                key={post.slug.current}
                href={`/articulos/${post.categoria}/${post.slug.current}`}
                className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all"
              >
                <span className="text-xs uppercase text-blue-600 font-medium">
                  {post.categoria}
                </span>
                <h3 className="text-lg font-semibold mt-1">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Artículos adicionales */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.slice(3).map((post) => (
            <Link
              key={post.slug.current}
              href={`/articulos/${post.categoria}/${post.slug.current}`}
              className="block p-5 border rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xs text-blue-500 uppercase font-medium">
                {post.categoria}
              </span>
              <h4 className="text-xl font-bold mt-1">{post.title}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-12">
          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
      </div>
    </PlaxLayout>
  );
}