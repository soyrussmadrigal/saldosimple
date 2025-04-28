import DisclaimerBox from "@/components/post/DisclaimerBox";
import AuthorBox from "@/components/post/AuthorBox";
import ExcerptBox from "@/components/post/ExcerptBox";
import FactCheckBox from "@/components/post/FactCheckBox";
import TableOfContents from "@/components/post/TableOfContents";
import PlaxLayout from "@/layouts/PlaxLayout";
import client from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextConfig";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/post/Breadcrumb";
import SEOJsonLd from "@/components/seo/SEOJsonLd";

export const revalidate = 60;

// Fetch Post
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
        bio,
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

// Metadata SEO
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

// Render
export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // 🎯 JSON-LD Schema generation
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
        name: post.categoria,
        item: `https://www.saldosimple.com/articulos/${post.categoria}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.saldosimple.com/articulos/${post.categoria}/${post.slug.current}`,
      },
    ],
  };

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <SEOJsonLd
        schemas={{
          blogPosting: blogPostingSchema,
          breadcrumbList: breadcrumbSchema,
          // si quieres agregar más
        }}
      />

      <PlaxLayout>
        {/* Banner */}
        <div className="small-padding"></div>

        {/* Post Content */}
        <div className="mil-blog-list mil-p-0-160">
          <div className="container mx-auto flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <div className="pt-16 pb-8">
                <h1 className="text-4xl font-bold text-black leading-tight mb-2">
                  {post.title}
                </h1>

                <Breadcrumb categoria={post.categoria} titulo={post.title} />
              </div>

              {post.excerpt && (
                <div className="mb-6">
                  <ExcerptBox excerpt={post.excerpt} />
                </div>
              )}

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

              <div className="relative w-full aspect-[4/2] overflow-hidden rounded-lg mb-2">
                <Image
                  src={post.coverImage.asset.url}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {post.coverImage.caption && (
                <p className="text-center text-xs text-gray-600 leading-tight mt-1 max-w-2xl mx-auto">
                  {post.coverImage.caption}
                </p>
              )}

              <div className="mt-6">
                <DisclaimerBox />
              </div>

              {/* TOC Trigger */}
              <div id="toc-trigger" className="h-0"></div>

              <div className="mil-up mt-10" style={{ wordBreak: "break-word" }}>
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>

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

            {/* Sidebar */}
            <div className="hidden lg:block w-1/4">
              <div className="sticky top-16">
                <TableOfContents triggerId="toc-trigger" />
              </div>
            </div>
          </div>
        </div>
      </PlaxLayout>
    </>
  );
}
