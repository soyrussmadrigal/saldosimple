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
import FAQsSection from "@/components/post/FAQsSection";

export const revalidate = 60;

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
      },
      faqs
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

  // JSON-LD: BlogPosting
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

  // JSON-LD: BreadcrumbList
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

  // JSON-LD: FAQPage (si hay FAQs)
  const faqSchema =
    post.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* SEO JSON-LD */}
      <SEOJsonLd
        schemas={{
          blogPosting: blogPostingSchema,
          breadcrumbList: breadcrumbSchema,
          ...(faqSchema ? { faqPage: faqSchema } : {}),
        }}
      />

      <PlaxLayout>
        <div className="small-padding"></div>

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

              {/* Trigger para TOC */}
              <div id="toc-trigger" className="h-0"></div>

              {/* Post Body */}
              <div className="mil-up mt-10" style={{ wordBreak: "break-word" }}>
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>

              {/* FAQs Section */}
              {post.faqs?.length > 0 && <FAQsSection faqs={post.faqs} />}

              {/* Author Box */}
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
              <div className="sticky top-300">
                <TableOfContents triggerId="toc-trigger" />
              </div>
            </div>
          </div>
        </div>
      </PlaxLayout>
    </>
  );
}
