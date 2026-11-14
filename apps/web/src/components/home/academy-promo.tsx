"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Star, Clock, GraduationCap, Award, CreditCard } from "lucide-react";
import { Container, Button, Badge } from "@softcapphyjas/ui";

export function AcademyPromo() {
  const courses = [
    {
      id: "ml-foundations",
      slug: "machine-learning-foundations",
      title: "Machine Learning Foundations & Mathematical Foundations",
      level: "Beginner",
      hours: 32,
      price: "₹4,999",
      emiHint: "EMI from ₹833/mo",
      rating: 4.9,
      reviewsCount: 312,
      tag: "Foundations",
      description:
        "Linear algebra, multivariable calculus, convex optimization, and foundational PyTorch model architectures from scratch.",
    },
    {
      id: "agentic-ai",
      slug: "agentic-ai-engineering",
      title: "Agentic AI Engineering & Multi-Agent Workflows",
      level: "Advanced",
      hours: 28,
      price: "₹9,999",
      emiHint: "EMI from ₹1,666/mo",
      rating: 4.95,
      reviewsCount: 480,
      tag: "Flagship",
      description:
        "Autonomous planning, tool calling, memory stores, LangGraph DAGs, eval harnesses, and deterministic production guardrails.",
    },
    {
      id: "mlops-llmops",
      slug: "mlops-and-llmops-in-production",
      title: "MLOps & LLMOps Platform Engineering",
      level: "Intermediate",
      hours: 36,
      price: "₹7,499",
      emiHint: "EMI from ₹1,250/mo",
      rating: 4.88,
      reviewsCount: 228,
      tag: "Production",
      description:
        "Continuous fine-tuning, vLLM inference serving, Triton server, drift detection, and automated canary deployments on Kubernetes.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--bg)] transition-colors relative">
      <Container size="ultra">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
              <span>Softcapphyjas Academy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text)]">
              Certify your <span className="text-[var(--accent)]">frontier AI skills</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Curriculums designed by the same research scientists and platform architects who build
              the models. Ed25519 cryptographically signed certificates.
            </p>
          </div>

          <Button variant="secondary" asChild>
            <Link href="/academy">
              <span>Explore All Pathways & Courses</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Top Badge + Rating */}
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">
                    {c.tag}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                    <Star className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                    <span className="font-bold text-[var(--text)]">{c.rating}</span>
                    <span>({c.reviewsCount})</span>
                  </div>
                </div>

                {/* Title & Level */}
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                    <span className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-[var(--accent)]" />
                      {c.level}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
                      {c.hours} Hours
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1">
                    {c.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Purchase Button */}
              <div className="pt-6 mt-6 border-t border-[var(--border)] space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xl font-bold font-mono text-[var(--text)]">{c.price}</div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CreditCard className="h-3 w-3" />
                      <span>{c.emiHint}</span>
                    </div>
                  </div>

                  <Button variant="primary" size="sm" asChild>
                    <Link href={`/academy/courses/${c.slug}`}>
                      <span>Enroll</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
