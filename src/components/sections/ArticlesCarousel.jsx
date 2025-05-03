"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const ArticlesCarousel = ({ articles = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  if (!articles.length) return null;

  const [mainArticle, ...otherArticles] = articles;

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("es-CR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const getExcerpt = (post) => {
    const excerpt = post.excerptAI || post.excerpt || "";
    return (
      excerpt.split(" ").slice(0, 25).join(" ") +
      (excerpt.split(" ").length > 25 ? "..." : "")
    );
  };

  return (
    <section className="bg-[#e6f4ef] py-16" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-green-900">
            Manténgase al día con nuestros análisis financieros
          </h2>
          <Link
            href="/articulos"
            className="text-green-800 hover:text-green-900 text-sm font-semibold"
          >
            VER TODOS →
          </Link>
        </div>

        {/* Artículo principal */}
        <div className="flex flex-col md:flex-row-reverse gap-6 mb-10 bg-white rounded-2xl shadow-md overflow-hidden">
          <Link
            href={`/articulos/${mainArticle.categoria}/${mainArticle.slug}`}
            className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:h-auto"
          >
            <Image
              src={mainArticle.coverImage?.asset?.url || "/img/default.webp"}
              alt={mainArticle.title}
              fill
              className="object-cover"
            />
          </Link>

          <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                {mainArticle.title}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={
                    mainArticle.author?.image?.asset?.url || "/img/default.webp"
                  }
                  alt={mainArticle.author?.name || "SaldoSimple"}
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8"
                />
                <span className="text-sm text-gray-600">
                  {mainArticle.author?.name || "SaldoSimple"}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {getExcerpt(mainArticle)}
              </p>
            </div>
            <div className="text-sm text-gray-500 flex justify-end">
              <span>{formatDate(mainArticle.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{mainArticle.readingTime || "2 min"} lectura</span>
            </div>
          </div>
        </div>

        {/* Carrusel */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
          }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {otherArticles.map((article, index) => (
            <SwiperSlide key={article.slug}>
              <Link
                href={`/articulos/${article.categoria}/${article.slug}`}
                className="flex flex-col justify-between bg-white rounded-2xl shadow p-5 h-[260px] hover:shadow-lg transition relative"
              >
                <div>
                  <h4 className="text-lg font-semibold text-green-900 mb-2 line-clamp-2">
                    {article.title}
                  </h4>

                  <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                    <span className="text-green-600">●</span>
                    <span>{formatDate(article.publishedAt)}</span>
                    <span>•</span>
                    <span>{article.readingTime || "2 min"} lectura</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={
                      article.author?.image?.asset?.url || "/img/default.webp"
                    }
                    alt={article.author?.name || "SaldoSimple"}
                    width={24}
                    height={24}
                    className="rounded-full object-cover w-6 h-6"
                  />
                  <p className="text-sm text-green-900 font-medium">
                    {article.author?.name || "SaldoSimple"}
                  </p>
                </div>

                {index === otherArticles.length - 1 && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="swiper-btn-prev bg-green-100 hover:bg-green-700 text-green-900 hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition">
                      &larr;
                    </button>
                    <button className="swiper-btn-next bg-green-100 hover:bg-green-700 text-green-900 hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition">
                      &rarr;
                    </button>
                  </div>
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ArticlesCarousel;
