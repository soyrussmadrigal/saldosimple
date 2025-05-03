// components/sections/ArticlesCarousel.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import urlFor from "@/lib/urlFor"; // 👈 nuevo helper

const ArticlesCarousel = ({ articles = [] }) => {

  if (!articles.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-teal-900">
            Artículos Recientes
          </h2>
          <Link
            href="/articulos"
            className="text-teal-700 font-medium hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {articles.map((article) => (
  <SwiperSlide key={article.slug}>
    {article.categoria && article.slug && (
      <Link href={`/articulos/${article.categoria}/${article.slug}`}>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden">
          {article.coverImage?.asset?.url && (
            <div className="w-full overflow-hidden rounded-t-2xl">
            <Image
              src={article.coverImage.asset.url}
              alt={article.title}
              width={800} // puedes ajustar esto
              height={600}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-teal-900 mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString("es-CR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </Link>
    )}
  </SwiperSlide>
))}
        </Swiper>
      </div>
    </section>
  );
};

export default ArticlesCarousel;

