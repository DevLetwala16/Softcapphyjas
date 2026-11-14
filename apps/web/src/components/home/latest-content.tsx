"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Newspaper, BookOpen } from "lucide-react";
import { Container, Badge } from "@softcapphyjas/ui";

export function LatestContent() {
  const articles = [
    {
      id: "paper-1",
      kind: "PAPER",
      kindLabel: "Peer-Reviewed Paper",
      icon: FileText,
      badgeVariant: "medical",
      domain: "Medical AI",
      title: "Neuro-symbolic triage for ICU clinical decision pathways under high uncertainty",
      date: "Nov 2026",
      meta: "DOI: 10.1038/s41746-026-00912",
      readTime: "18 pages · PDF Available",
      href: "/research/papers/neuro-symbolic-triage-icu",
      excerpt:
        "Presenting a hybrid architecture that pairs multi-scale continuous vital sign embeddings with SMT constraint solvers to guarantee counterfactual safety in critical care units.",
    },
    {
      id: "blog-1",
      kind: "BLOG",
      kindLabel: "Engineering Blog",
      icon: BookOpen,
      badgeVariant: "physics",
      domain: "Architecture",
      title: "Architecting High-Throughput RAG for Legacy Enterprise Stacks with Zero Disruption",
      date: "Oct 2026",
      meta: "By Dr. Siddharth Iyer · Chief Architect",
      readTime: "7 min read",
      href: "/blog/high-throughput-rag-legacy-stacks",
      excerpt:
        "How we deployed pgvector index streaming alongside 20-year-old transactional databases, cutting query latency by 78% while preserving strict ACID isolation.",
    },
    {
      id: "news-1",
      kind: "NEWS",
      kindLabel: "Press Release",
      icon: Newspaper,
      badgeVariant: "frontier",
      domain: "Milestone",
      title: "Softcapphyjas Synapse Beta Opens for Medical Centers & Universities",
      date: "Nov 2026",
      meta: "Bengaluru & Global Research Press",
      readTime: "3 min read",
      href: "/news/synapse-beta-announcement",
      excerpt:
        "Announcing the initial cohort of 24 institutional research partners granted early access to the Synapse multimodal foundation model and reasoning workspace.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--bg-elev-1)]/40 border-t border-[var(--border)] transition-colors relative">
      <Container size="ultra">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Dispatches & Publications</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text)]">
              Latest <span className="text-[var(--accent)]">research & news</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Read our latest peer-reviewed scientific contributions, production engineering field
              notes, and company announcements.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              All Blog Posts
            </Link>
            <span className="text-[var(--text-muted)]/50">·</span>
            <Link
              href="/news"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Press Room
            </Link>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={item.badgeVariant as "medical" | "physics" | "frontier"}
                      size="sm"
                    >
                      <span className="inline-flex items-center gap-1">
                        <Icon className="h-3 w-3" />
                        <span>{item.domain}</span>
                      </span>
                    </Badge>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    <Link href={item.href}>{item.title}</Link>
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {item.readTime}
                  </span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
