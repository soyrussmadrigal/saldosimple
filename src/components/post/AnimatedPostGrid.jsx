"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedPostGrid({ posts }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
            className="block p-5 border rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-xs text-blue-500 uppercase font-medium">
              {post.categoria}
            </span>
            <h4 className="text-xl font-bold mt-1">{post.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
