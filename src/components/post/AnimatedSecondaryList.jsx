"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedSecondaryList({ posts }) {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug.current}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/articulos/${post.categoria}/${post.slug.current}`}
            className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all"
          >
            <span
              className="inline-block text-xs font-semibold uppercase mb-2"
              style={{
                backgroundColor: "#0d5152",
                color: "white",
                padding: "4px 10px",
                borderRadius: "999px",
              }}
            >
              {post.categoria}
            </span>
            <h3 className="text-lg font-semibold mt-1">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
