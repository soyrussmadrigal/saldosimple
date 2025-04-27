import DisclaimerBox from "@/components/post/DisclaimerBox";
import AuthorBox from "@/components/post/AuthorBox"; // Nuevo Import
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";
import client from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextConfig";
import { notFound } from "next/navigation";

async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      categoria,
      excerpt,
      coverImage { asset->{ url } },
      publishedAt,
      content,
      metaTitle,
      metaDescription,
      author -> {
        name,
        bio,
        image { asset->{ url } }
      }
    }
  `;
  const params = { slug };
  return await client.fetch(query, params);
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) return {};

  const plainText = post.content
    ?.map((block) =>
      block._type === "block"
        ? block.children.map((child) => child.text).join(" ")
        : ""
    )
    .join("\n\n");

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
    author: {
      "@type": "Organization",
      name: "SaldoSimple",
    },
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
    articleBody: plainText || "",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.saldosimple.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artículos",
        item: "https://www.saldosimple.com/articulos",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.categoria,
        item: `https://www.saldosimple.com/articulos/${post.categoria}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://www.saldosimple.com/articulos/${post.categoria}/${post.slug.current}`,
      },
    ],
  };

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
    other: {
      "structured-data": JSON.stringify([blogPostingSchema, breadcrumbSchema]),
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
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

            {/* DisclaimerBox */}
            <div className="col-xl-9 mt-6">
              <DisclaimerBox />
            </div>

            {/* Contenido principal */}
            <div className="col-xl-9 mil-p-40-40">
              <div className="mil-up" style={{ wordBreak: "break-word" }}>
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>
            </div>

            {/* AuthorBox (Al final del contenido) */}
            {post.author && (
              <div className="col-xl-9 mil-p-40-40">
                <AuthorBox
                  name={post.author.name}
                  bio={post.author.bio}
                  image={post.author.image?.asset?.url}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PlaxLayout>
  );
}