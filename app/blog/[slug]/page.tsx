import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { blogPosts, getBlogPost } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[720px] px-6 py-14">
      <Reveal>
        <Link href="/blog" className="focus-ring text-sm font-medium text-cyan-deep hover:text-navy">
          ← Back to blog
        </Link>
        <p className="mt-6 text-sm font-medium uppercase tracking-wide text-cyan-deep">{post.category}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-navy/40">
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </Reveal>

      <div className="mt-8 space-y-5">
        {post.content.map((para, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="leading-relaxed text-navy/75">{para}</p>
          </Reveal>
        ))}
      </div>
    </article>
  );
}
