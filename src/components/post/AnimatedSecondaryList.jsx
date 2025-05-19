"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedSecondaryList({ posts }) {
  return (
    <div className="flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-4xl space-y-4 sm:space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug.current}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/articulos/${post.categoria.slug}/${post.slug}`}
              className="block p-3 sm:p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all"
            >
              <span
                className="inline-flex items-center justify-center text-[10px] sm:text-[11px] font-semibold uppercase mb-2 px-2 sm:px-2.5 py-[2px] sm:py-[3px] rounded-full leading-none"
                style={{
                  backgroundColor: "#0d5152",
                  color: "white",
                }}
              >
                {post.categoria?.title}
              </span>
              <h3 className="text-base sm:text-lg font-semibold mt-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
