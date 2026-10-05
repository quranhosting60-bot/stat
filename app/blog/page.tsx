import Link from "next/link";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/blog";

export const metadata = { title: "Blog — Smart Printing" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal>
        <p className="text-sm font-medium text-cyan-deep">Blog</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">
          Notes from the print floor
        </h1>
        <p className="mt-4 max-w-lg text-navy/60">
          Practical guides on materials, finishing and packaging — written by the people who
          actually run the presses.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${post.slug}`}
              className="focus-ring group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,64,0.1)]"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-cyan-deep">{post.category}</p>
              <h2 className="mt-2 font-display text-lg font-semibold text-navy group-hover:text-cyan-deep">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-navy/60">{post.excerpt}</p>
              <p className="mt-4 text-xs text-navy/40">
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
