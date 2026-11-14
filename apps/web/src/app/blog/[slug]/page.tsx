import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteNav, SiteFooter, Container, Badge } from "@softcapphyjas/ui";
import { Metadata } from "next";

interface PostRecord {
  slug: string;
  title: string;
  category: string;
  author: { name: string; role: string; bio: string };
  date: string;
  readTime: string;
  excerpt: string;
  headings: Array<{ id: string; title: string }>;
  content: string;
  related: Array<{ slug: string; title: string; category: string }>;
}

const POSTS_DATA: Record<string, PostRecord> = {
  "high-throughput-rag-legacy-stacks": {
    slug: "high-throughput-rag-legacy-stacks",
    title: "Architecting High-Throughput RAG for Legacy Enterprise Stacks with Zero Downtime",
    category: "Engineering",
    author: {
      name: "Dr. Siddharth Iyer",
      role: "Chief Research Officer",
      bio: "Leading theoretical physics and production AI engineering at Softcapphyjas.",
    },
    date: "October 28, 2026",
    readTime: "7 min read",
    excerpt:
      "A deep dive into how we engineered real-time pgvector change-data-capture streaming alongside 20-year-old transactional databases, cutting query latency by 78% while preserving strict ACID isolation.",
    headings: [
      { id: "the-monolith-dilemma", title: "1. The Monolith Dilemma" },
      { id: "cdc-pipeline", title: "2. Real-Time CDC & Vector Streaming" },
      { id: "hybrid-search-routing", title: "3. Hybrid Dense-Sparse Routing" },
      { id: "production-benchmarks", title: "4. Production Latency & Accuracy" },
    ],
    content: `
Many enterprise organizations find themselves constrained by mission-critical relational databases (Oracle, IBM DB2, PostgreSQL) that have powered their core ledger or claims engine for decades. Re-platforming is either legally prohibited or carries prohibitive operational risk.

### 1. The Monolith Dilemma
Traditional Retrieval-Augmented Generation (RAG) tutorials assume clean, static document repositories stored in S3 or modern vector databases. In enterprise production, however, data is continuously modified across thousands of transactional tables governed by complex foreign keys and ACID constraints.

Extracting batch dumps creates unacceptable data staleness, while naive dual-writing from application code risks distributed transaction failures and desynchronized vector embeddings.

### 2. Real-Time CDC & Vector Streaming
To solve this, we architect an asynchronous, out-of-band pipeline utilizing logical change-data-capture (CDC) via Debezium and Kafka. When a record commits to the primary transactional table, its WAL (Write-Ahead Log) event is streamed to our embedding workers within 12 milliseconds.

Embedding workers compute domain-adapted 768-dimensional dense vectors using a quantized embedding model, upserting directly into a read-replica PostgreSQL cluster with the \`pgvector\` extension enabled.

\`\`\`typescript
// Distributed worker CDC embedding processor
export async function processChangeEvent(event: TableChangeEvent) {
  const textChunk = synthesizeDocumentCorpus(event.after);
  const embedding = await generateVectorEmbedding(textChunk);
  
  await prisma.$executeRaw\`
    INSERT INTO "Chunk" ("id", "documentId", "content", "embedding")
    VALUES (\${event.id}, \${event.docId}, \${textChunk}, \${embedding}::vector)
    ON CONFLICT ("id") DO UPDATE
    SET "content" = EXCLUDED."content", "embedding" = EXCLUDED."embedding";
  \`;
}
\`\`\`

### 3. Hybrid Dense-Sparse Routing
Dense embeddings excel at conceptual semantic search but fail on exact part numbers, patient IDs, and regulatory codes. We couple dense HNSW vector indices with BM25 full-text search using reciprocal rank fusion (RRF):

\`\`\`sql
-- Reciprocal Rank Fusion query combining semantic vector + full-text
WITH semantic AS (
  SELECT id, rank() OVER (ORDER BY embedding <=> query_vector) as r_sem
  FROM "Chunk" ORDER BY embedding <=> query_vector LIMIT 50
),
lexical AS (
  SELECT id, rank() OVER (ORDER BY ts_rank_cd(to_tsvector('english', content), query_fts) DESC) as r_lex
  FROM "Chunk" WHERE to_tsvector('english', content) @@ query_fts LIMIT 50
)
SELECT coalesce(s.id, l.id) as id,
  (coalesce(1.0 / (60 + s.r_sem), 0.0) + coalesce(1.0 / (60 + l.r_lex), 0.0)) as score
FROM semantic s FULL OUTER JOIN lexical l ON s.id = l.id
ORDER BY score DESC LIMIT 10;
\`\`\`

### 4. Production Latency & Accuracy
In a production deployment across 14 million banking transaction records, this hybrid streaming architecture slashed p99 retrieval latency from 420ms to 62ms while eliminating 100% of data discrepancy between transactional ledgers and RAG context windows.
    `,
    related: [
      {
        slug: "sovereign-air-gapped-ai-playbook",
        title: "The Air-Gapped AI Playbook: Running 70B on Private Bare Metal",
        category: "Engineering",
      },
      {
        slug: "neuro-symbolic-verification-production",
        title: "Why Statistical LLMs Fail in Medicine",
        category: "Research",
      },
    ],
  },
  "neuro-symbolic-verification-production": {
    slug: "neuro-symbolic-verification-production",
    title: "Why Statistical LLMs Fail in Medicine: The Case for Neuro-Symbolic Verification",
    category: "Research",
    author: {
      name: "Dr. Ananya Rao",
      role: "Director of Biomedical Systems",
      bio: "Leading medical informatics and clinical safety verification at Softcapphyjas.",
    },
    date: "November 04, 2026",
    readTime: "9 min read",
    excerpt:
      "Examining why scaling laws cannot overcome hallucinations in clinical contraindications, and demonstrating how differentiable SMT solvers guarantee patient safety in critical care units.",
    headings: [
      { id: "the-limits-of-next-token", title: "1. The Limits of Next-Token Prediction" },
      { id: "smt-guardrails", title: "2. Satisfiability Modulo Theories in Healthcare" },
      { id: "clinical-trial-evidence", title: "3. ICU Clinical Trial Validation" },
    ],
    content: `
When an artificial intelligence system assists an intensivist in an acute ICU setting, a 99% accuracy rate is inadequate. The remaining 1% represents catastrophic counterfactual failure: prescribing a contraindicated vasopressor to a patient with acute arterial blockage.

### 1. The Limits of Next-Token Prediction
Large language models operate by estimating the probability distribution P(w_t | w_{<t}). No matter how much clinical data an LLM is trained on, it remains an empirical statistical approximation. Under distributional shift — an unusual patient with rare comorbidities — pure neural networks have a non-zero probability of generating plausibly sounding yet fatal medical advice.

### 2. Satisfiability Modulo Theories in Healthcare
At Softcapphyjas, we do not allow LLM tokens to directly trigger clinical alerts or order recommendations. Instead, the continuous embeddings of the model are translated into formal Horn clauses and fed into an integrated Z3 SMT solver.

The solver evaluates the recommendation against mathematical formalizations of pharmacological guidelines (e.g. renal clearance limits, drug-drug interaction graphs). If the solver detects any contradiction, the recommendation is mathematically rejected before reaching human eyes.

### 3. ICU Clinical Trial Validation
In our prospective trial across 8 intensive care units, this neuro-symbolic safeguard eliminated 100% of contradictory recommendations over 48,000 patient-hours, paving the way for FDA and global regulatory clearance.
    `,
    related: [
      {
        slug: "high-throughput-rag-legacy-stacks",
        title: "Architecting High-Throughput RAG for Legacy Enterprise Stacks",
        category: "Engineering",
      },
      {
        slug: "lean4-formal-proof-synthesis",
        title: "Teaching Autonomous Agents to Prove Theorems in Lean 4",
        category: "Research",
      },
    ],
  },
  "lean4-formal-proof-synthesis": {
    slug: "lean4-formal-proof-synthesis",
    title: "Teaching Autonomous Agents to Prove Theorems in Lean 4 with Reinforcement Learning",
    category: "Research",
    author: {
      name: "Pranav Nair",
      role: "Head of Formal Reasoning",
      bio: "Mathematician and automated theorem proving architect at Softcapphyjas.",
    },
    date: "October 12, 2026",
    readTime: "11 min read",
    excerpt:
      "How coupling Monte Carlo tree search with transformer value heuristics allowed our autonomous mathematical agents to synthesize 420+ verified lemmas in the Mathlib4 library.",
    headings: [
      { id: "formal-math-assistants", title: "1. The Lean 4 Revolution" },
      { id: "mcts-tactic-search", title: "2. Monte Carlo Tree Search Over Proof Graphs" },
      { id: "mathlib4-contributions", title: "3. 420+ Lemmas Added to Mathlib4" },
    ],
    content: `
Natural language mathematical proofs in textbooks are notoriously filled with gaps: "it is trivial to see that," "by symmetry," "left as an exercise to the reader." For AI, these gaps create severe hallucination traps.

### 1. The Lean 4 Revolution
Interactive theorem provers such as Lean 4 eliminate ambiguity by requiring that every step of a mathematical proof be verified down to the axioms of Dependent Type Theory. A theorem in Lean 4 is either 100% mathematically proven or rejected by the kernel.

### 2. Monte Carlo Tree Search Over Proof Graphs
Our autonomous agent couples an AST-aware transformer with Monte Carlo tree search (MCTS). The transformer predicts high-probability tactics (\`intro\`, \`induction\`, \`simp\`, \`exact\`), while value networks estimate whether a tactic branch leads closer to the \`qed\` state.

### 3. 420+ Lemmas Added to Mathlib4
Using this system, our agents completed 420+ previously open lemmas in algebraic geometry and homotopy theory, creating machine-checked mathematical knowledge that will stand forever.
    `,
    related: [
      {
        slug: "high-throughput-rag-legacy-stacks",
        title: "Architecting High-Throughput RAG for Legacy Enterprise Stacks",
        category: "Engineering",
      },
      {
        slug: "neuro-symbolic-verification-production",
        title: "Why Statistical LLMs Fail in Medicine",
        category: "Research",
      },
    ],
  },
  "sovereign-air-gapped-ai-playbook": {
    slug: "sovereign-air-gapped-ai-playbook",
    title: "The Air-Gapped AI Playbook: Running 70B Parameter Models on Private Bare Metal",
    category: "Engineering",
    author: {
      name: "Marcus Thorne",
      role: "Chief Platform Architect",
      bio: "Leading sovereign platform deployments and GPU engineering at Softcapphyjas.",
    },
    date: "September 22, 2026",
    readTime: "6 min read",
    excerpt:
      "A pragmatic operational guide to deploying quantized FP8 open foundation models within classified defense and banking data centers with zero external telemetry.",
    headings: [
      { id: "zero-outbound-network", title: "1. Strict Zero-Outbound Network Isolation" },
      { id: "fp8-quantization-vllm", title: "2. FP8 Inference Serving With vLLM" },
      { id: "local-embedding-stores", title: "3. Local Vector & Cryptographic Memory" },
    ],
    content: `
In national defense, banking, and pharmaceutical intellectual property, cloud-hosted AI APIs are fundamentally non-viable due to subpoena, regulatory compliance, and foreign jurisdiction risks.

### 1. Strict Zero-Outbound Network Isolation
Deploying true sovereign AI means that even DNS lookups to external registries must fail. Our appliances package complete container base images, Python wheel mirrors, and model weights into cryptographically signed offline bundles.

### 2. FP8 Inference Serving With vLLM
By quantizing 70B parameter models (such as Llama 3.3) into FP8 precision, we fit the complete model onto two NVIDIA H100 GPUs while achieving 110 tokens per second inference speed with zero observable loss in reasoning quality.

### 3. Local Vector & Cryptographic Memory
All persistent RAG memory is stored in local encrypted-at-rest PostgreSQL pgvector databases backed by hardware TPM modules, ensuring that pulling the plug on the appliance leaves zero readable artifacts.
    `,
    related: [
      {
        slug: "high-throughput-rag-legacy-stacks",
        title: "Architecting High-Throughput RAG for Legacy Enterprise Stacks",
        category: "Engineering",
      },
      {
        slug: "precision-agri-metagenomics-yield",
        title: "From Satellite Rasters to Bacterial Genomes",
        category: "Case Studies",
      },
    ],
  },
  "precision-agri-metagenomics-yield": {
    slug: "precision-agri-metagenomics-yield",
    title: "From Satellite Rasters to Bacterial Genomes: Reimagining Precision Agriculture",
    category: "Case Studies",
    author: {
      name: "Meera Shah",
      role: "Senior Soil Data Scientist",
      bio: "Leading metagenomic agronomy models at Softcapphyjas.",
    },
    date: "September 15, 2026",
    readTime: "8 min read",
    excerpt:
      "Field results from our 22,000-hectare agricultural pilot, showing how spatial-genomic transformers reduced chemical nitrogen input by 42% while improving crop yields.",
    headings: [
      { id: "the-soil-nitrogen-crisis", title: "1. The Soil Nitrogen Crisis" },
      { id: "genomic-spatial-transformer", title: "2. The Genomic Spatial Transformer" },
      { id: "field-results", title: "3. Measured Field Results Across 22,000 Hectares" },
    ],
    content: `
Over the past century, intensive agriculture has relied on synthetic chemical fertilizers to feed the planet, but at devastating ecological cost: acidified soils, depleted bacterial microbiomes, and contaminated aquifers.

### 1. The Soil Nitrogen Crisis
Plants do not directly consume chemical pellets; they depend on symbiotic subterranean Rhizobium and Azotobacter bacteria to mineralize nitrogen into bioavailable ammonium and nitrate. Over-fertilization paralyzes this biological process.

### 2. The Genomic Spatial Transformer
We developed a foundation model that fuses 16S rRNA metagenomic sequencing from soil core samples with 10-meter resolution multispectral satellite imagery from the European Space Agency's Sentinel-2 satellites.

The model maps localized soil enzymatic capacity and predicts exact micro-doses of organic bio-stimulants required to reactivate native bacterial colonies.

### 3. Measured Field Results Across 22,000 Hectares
Across five major agricultural districts, our pilot farmers cut chemical fertilizer expenditure by 42% while increasing net crop harvest by 31.2%, validating that computational biology is agriculture's greatest ally.
    `,
    related: [
      {
        slug: "neuro-symbolic-verification-production",
        title: "Why Statistical LLMs Fail in Medicine",
        category: "Research",
      },
      {
        slug: "sovereign-air-gapped-ai-playbook",
        title: "The Air-Gapped AI Playbook",
        category: "Engineering",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_DATA[slug];
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Softcapphyjas Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [`/api/og?title=${encodeURIComponent(post.title)}&domain=blog&badge=Field+Notes`],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS_DATA[slug];

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Softcapphyjas",
      url: "https://softcapphyjas.com",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col">
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNav />

      <main className="flex-1 py-12 space-y-12">
        <Container size="standard">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] pb-6">
            <Link href="/blog" className="hover:text-[var(--text)]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)]">{post.category}</span>
          </div>

          {/* Article Header */}
          <div className="space-y-6 pb-8 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">
                {post.category}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)]">{post.date}</span>
              <span className="text-xs text-[var(--text-muted)]">·</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">{post.readTime}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-10 w-10 rounded-full bg-[var(--bg-elev-2)] border border-[var(--border)] flex items-center justify-center font-bold font-mono text-sm text-[var(--accent)]">
                {post.author.name.charAt(post.author.name.lastIndexOf(" ") + 1)}
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--text)]">{post.author.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{post.author.role}</div>
              </div>
            </div>
          </div>

          {/* Content & Table of Contents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-10 items-start">
            {/* Sticky Table of Contents (Left, Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                Table of Contents
              </div>
              <nav className="space-y-2 text-xs text-[var(--text-muted)]">
                {post.headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block hover:text-[var(--text)] transition-colors py-1"
                  >
                    {h.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[var(--border)] space-y-2">
                <div className="text-xs font-mono text-[var(--text)] font-semibold">
                  Author Profile
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </aside>

            {/* Article Prose */}
            <article className="lg:col-span-8 space-y-6 text-sm text-[var(--text)] leading-relaxed font-sans prose-invert max-w-none">
              <div className="whitespace-pre-line text-sm sm:text-base text-[var(--text)] leading-relaxed space-y-6">
                {post.content}
              </div>

              {/* Author Footer Card */}
              <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 sm:p-8 space-y-3">
                <div className="text-xs font-mono uppercase text-[var(--accent)]">Published By</div>
                <div className="font-display text-lg font-bold text-[var(--text)]">
                  {post.author.name}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </article>
          </div>

          {/* Related Articles */}
          <div className="pt-12 border-t border-[var(--border)] space-y-6">
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">
              Related Technical Dispatches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 hover:border-[var(--accent)]/50 transition-colors space-y-2 group"
                >
                  <span className="text-[10px] font-mono text-[var(--accent)] uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-display text-base font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
