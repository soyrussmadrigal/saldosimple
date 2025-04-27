import DisclaimerBox from "@/components/post/DisclaimerBox";
import AuthorBox from "@/components/post/AuthorBox";
import ExcerptBox from "@/components/post/ExcerptBox";
import FactCheckBox from "@/components/post/FactCheckBox";
import TableOfContents from "@/components/post/TableOfContents"; // 👈 NUEVO
import PlaxLayout from "@/layouts/PlaxLayout";
import client from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextConfig";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60; // Cada 60 segundos, Next.js vuelve a consultar Sanity

async function getPost(slug) {
  if (!slug || typeof slug !== "string") {
    console.error("getPost() llamado sin slug válido:", slug);
    return null;
  }

  const query = `
    *[_type == "post" && slug.current == "${slug}"][0] {
      title,
      slug,
      categoria,
      excerpt,
      coverImage {
        asset->{ url },
        alt,
        caption
      },
      publishedAt,
      content,
      metaTitle,
      metaDescription,
      author -> {
        name,
        image { asset->{ url } }
      },
      lastEditedBy -> {
        name,
        image { asset->{ url } }
      }
    }
  `;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error al consultar Sanity:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  if (!slug || typeof slug !== "string") return {};

  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `https://www.saldosimple.com/articulos/${post.categoria}/${post.slug.current}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      url: `https://www.saldosimple.com/articulos/${post.categoria}/${post.slug.current}`,
      images: [
        {
          url:
            post.coverImage?.asset?.url ||
            "https://www.saldosimple.com/default-og.jpg",
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // 🎯 Schema Markup
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    image:
      post.coverImage?.asset?.url ||
      "https://www.saldosimple.com/default-image.jpg",
    articleSection: post.categoria,
    author: { "@type": "Organization", name: "SaldoSimple" },
    publisher: {
      "@type": "Organization",
      name: "SaldoSimple",
      logo: {
        "@type": "ImageObject",
        url: "https://www.saldosimple.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.saldosimple.com/articulos/${post.categoria}/${post.slug.current}`,
    },
    articleBody: post.content
      ?.map((block) =>
        block._type === "block"
          ? block.children.map((child) => child.text).join(" ")
          : ""
      )
      .join("\n\n"),
  };

  return (
    <>
      {/* Inyectamos Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <PlaxLayout>
        {/* Banner */}
        <div className="mil-banner mil-banner-inner mil-dissolve">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-8">
                <div className="mil-banner-text mil-text-center">
                  <h1 className="mil-mb-1">{post.title}</h1>
                  <div className="mil-text-m mil-mb-20">{post.categoria}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Publicación */}
        <div className="mil-blog-list mil-p-0-160">
          <div className="container mx-auto flex flex-col lg:flex-row gap-10">
            {/* Columna de contenido */}
            <div className="w-full lg:w-3/4">
              {/* ExcerptBox */}
              {post.excerpt && (
                <div className="mb-6">
                  <ExcerptBox excerpt={post.excerpt} />
                </div>
              )}

              {/* FactCheckBox */}
              <div className="mb-6">
                <FactCheckBox
                  publishedAt={post.publishedAt}
                  content={post.content}
                  author={{
                    name: post.author?.name,
                    image: post.author?.image?.asset?.url,
                  }}
                  editor={{
                    name: post.lastEditedBy?.name,
                    image: post.lastEditedBy?.image?.asset?.url,
                  }}
                />
              </div>

              {/* Imagen destacada */}
              <div className="relative w-full aspect-[4/2] overflow-hidden rounded-lg">
                <Image
                  src={post.coverImage.asset.url}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Caption debajo */}
              {post.coverImage.caption && (
                <p className="text-center text-xs text-gray-500 mt-2 max-w-2xl mx-auto">
                  {post.coverImage.caption}
                </p>
              )}

              {/* Disclaimer */}
              <div className="mt-6">
                <DisclaimerBox />
              </div>

              {/* Contenido principal */}
              <div className="mil-up mt-10" style={{ wordBreak: "break-word" }}>
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>

              {/* AuthorBox */}
              {post.author && (
                <div className="mt-10">
                  <AuthorBox
                    name={post.author.name}
                    bio={post.author.bio}
                    image={post.author.image?.asset?.url}
                  />
                </div>
              )}
            </div>

            {/* Columna de índice (ToC) */}
            <div className="hidden lg:block w-1/4">
              <TableOfContents />
            </div>
          </div>
        </div>
      </PlaxLayout>
    </>
  );
}
