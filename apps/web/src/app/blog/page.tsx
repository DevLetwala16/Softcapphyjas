"use client";

import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { Search, Sparkles, ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  category: "Engineering" | "Research" | "Case Studies" | "Company";
  author: string;
  role: string;
  date: string;
  readTime: string;
  excerpt: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "high-throughput-rag-legacy-stacks",
    title: "Architecting High-Throughput RAG for Legacy Enterprise Stacks with Zero Downtime",
    category: "Engineering",
    author: "Dr. Siddharth Iyer",
    role: "Chief Research Officer",
    date: "Oct 28, 2026",
    readTime: "7 min read",
    featured: true,
    excerpt:
      "A deep dive into how we engineered real-time pgvector change-data-capture streaming alongside 20-year-old transactional databases, cutting query latency by 78% while preserving strict ACID isolation.",
  },
  {
    slug: "neuro-symbolic-verification-production",
    title: "Why Statistical LLMs Fail in Medicine: The Case for Neuro-Symbolic Verification",
    category: "Research",
    author: "Dr. Ananya Rao",
    role: "Director of Biomedical AI",
    date: "Nov 04, 2026",
    readTime: "9 min read",
    excerpt:
      "Examining why scaling laws cannot overcome hallucinations in clinical contraindications, and demonstrating how differentiable SMT solvers guarantee patient safety in critical care units.",
  },
  {
    slug: "lean4-formal-proof-synthesis",
    title: "Teaching Autonomous Agents to Prove Theorems in Lean 4 with Reinforcement Learning",
    category: "Research",
    author: "Pranav Nair",
    role: "Head of Formal Reasoning",
    date: "Oct 12, 2026",
    readTime: "11 min read",
    excerpt:
      "How coupling Monte Carlo tree search with transformer value heuristics allowed our autonomous mathematical agents to synthesize 420+ verified lemmas in the Mathlib4 library.",
  },
  {
    slug: "sovereign-air-gapped-ai-playbook",
    title: "The Air-Gapped AI Playbook: Running 70B Parameter Models on Private Bare Metal",
    category: "Engineering",
    author: "Marcus Thorne",
    role: "Chief Platform Architect",
    date: "Sep 22, 2026",
    readTime: "6 min read",
    excerpt:
      "A pragmatic operational guide to deploying quantized FP8 open foundation models within classified defense and banking data centers with zero external telemetry.",
  },
  {
    slug: "precision-agri-metagenomics-yield",
    title: "From Satellite Rasters to Bacterial Genomes: Reimagining Precision Agriculture",
    category: "Case Studies",
    author: "Meera Shah",
    role: "Senior Soil Data Scientist",
    date: "Sep 15, 2026",
    readTime: "8 min read",
    excerpt:
      "Field results from our 22,000-hectare agricultural pilot, showing how spatial-genomic transformers reduced chemical nitrogen input by 42% while improving crop yields.",
  },
];

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [query, setQuery] = React.useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.author.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0]!;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <SiteNav />

      <main className="flex-1 space-y-16 py-12">
        <Container size="ultra">
          {/* Header */}
          <div className="space-y-4 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Engineering & Research Field Notes</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              Softcapphyjas Blog
            </h1>
            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed">
              Technical field notes, algorithmic deep dives, and production post-mortems written by
              our research scientists and platform architects.
            </p>
          </div>

          {/* Featured Post Card */}
          {selectedCategory === "All" && query === "" && (
            <div className="mb-14 rounded-3xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 sm:p-12 hover:border-[var(--accent)]/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-bold">
                    Featured Dispatch
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {featured.date}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">·</span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[var(--text)] leading-snug">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="h-9 w-9 rounded-full bg-[var(--bg-elev-2)] border border-[var(--border)] flex items-center justify-center font-bold font-mono text-xs text-[var(--accent)]">
                    SI
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[var(--text)]">{featured.author}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{featured.role}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-end">
                <Button variant="primary" size="lg" asChild>
                  <Link href={`/blog/${featured.slug}`}>
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Engineering", "Research", "Case Studies"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors border ${
                    selectedCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-semibold"
                      : "border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] pl-9 pr-3 py-2 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 space-y-4 hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[var(--accent)] tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">
                    {post.author}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
