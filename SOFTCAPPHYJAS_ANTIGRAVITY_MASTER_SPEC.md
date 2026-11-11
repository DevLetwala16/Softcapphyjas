# SOFTCAPPHYJAS — Master Build Specification & Implementation Plan

### For Google Antigravity (agent-first IDE) · v1.0

> **How to use this file:** Put it in the repo root as `SPEC.md`. In Antigravity, open the workspace, start a Planning-mode agent in Mission Control, and paste the **Master Prompt in Section 17**. The agent must first produce an _Implementation Plan artifact_ from this spec and wait for your approval before writing code.

---

## 0. Executive Summary

**Softcapphyjas** is a frontier-AI company with two engines:

1. **Frontier AI Research** — taking AI into domains where it has rarely or never been applied: medicine and computational biology, precision agriculture, theoretical physics, higher mathematics, pattern recognition, novel algorithms.
2. **Enterprise AI Engineering** — custom models, agentic workflows, legacy modernization, AI security, LLM/MLOps, automation, plus new verticals (quantum-classical, edge AI, synthetic data, sovereign AI).

Around those sit an **Academy/LMS** (certifications, subscriptions, cart, EMI), a **Client project booking portal**, a **Careers portal**, role-based **Client / Student / Staff dashboards**, and the flagship consumer AI app **Softcapphyjas Synapse**.

The deliverable is a **single, production-grade monorepo**: public marketing site, authenticated portals, admin/HR/CMS/LMS back office, payment infrastructure, and an AI layer (chatbot, RAG, resume parsing, cost estimator).

---

## 1. Pre-Requirements (Read Before Building)

### 1.1 Tooling on your machine

| Tool                     | Version      | Purpose                      |
| ------------------------ | ------------ | ---------------------------- |
| Node.js                  | 20 LTS or 22 | Runtime                      |
| pnpm                     | 9+           | Monorepo package manager     |
| Docker Desktop           | latest       | Local Postgres, Redis, MinIO |
| Git                      | 2.40+        | Version control              |
| Google Antigravity       | latest       | Agentic IDE                  |
| Razorpay CLI / dashboard | —            | Test-mode payments           |

### 1.2 External accounts (create these first)

| Service                                       | Why                                         | Free tier OK for dev? |
| --------------------------------------------- | ------------------------------------------- | --------------------- |
| **Razorpay** (test mode)                      | Cards, UPI, net banking, EMI, subscriptions | Yes                   |
| **Neon / Supabase / local Docker**            | PostgreSQL                                  | Yes                   |
| **Upstash / local Docker**                    | Redis (rate limit, queues, cache)           | Yes                   |
| **Cloudflare R2 / AWS S3 / MinIO**            | PDFs, resumes, spec sheets, thumbnails      | Yes                   |
| **Mux** (or Cloudflare Stream / Bunny Stream) | Protected video streaming for courses       | Trial                 |
| **Resend / Postmark**                         | Transactional email                         | Yes                   |
| **Google AI Studio (Gemini API key)**         | Chatbot, RAG, estimator, resume parsing     | Yes                   |
| **Google OAuth + GitHub OAuth**               | SSO                                         | Yes                   |
| **Cloudflare Turnstile**                      | Bot protection on forms                     | Yes                   |
| **PostHog** (self-host or cloud)              | Product analytics, funnels                  | Yes                   |
| **Sentry**                                    | Error monitoring                            | Yes                   |
| **Vercel + Railway/Fly.io**                   | Deploy web + API/workers                    | Later                 |

### 1.3 Environment variables — create `.env.local` (never commit)

```bash
# ── App ─────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Softcapphyjas
NEXT_PUBLIC_FLAGSHIP_NAME=Synapse
NODE_ENV=development

# ── Database / cache ────────────────────────────────
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/softcapphyjas
REDIS_URL=redis://localhost:6379

# ── Auth (Auth.js v5) ───────────────────────────────
AUTH_SECRET=                      # openssl rand -base64 32
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
JWT_ACCESS_TTL=900                # seconds
JWT_REFRESH_TTL=2592000
TOTP_ISSUER=Softcapphyjas         # MFA for staff

# ── Payments (Razorpay) ─────────────────────────────
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_EMI_MIN_AMOUNT=3000      # INR threshold shown in UI
GST_RATE=0.18

# ── Storage ─────────────────────────────────────────
S3_ENDPOINT=
S3_REGION=auto
S3_BUCKET_PUBLIC=softcapphyjas-public
S3_BUCKET_PRIVATE=softcapphyjas-private
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=

# ── Video ───────────────────────────────────────────
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_SIGNING_KEY_ID=
MUX_SIGNING_PRIVATE_KEY=

# ── Email ───────────────────────────────────────────
RESEND_API_KEY=
EMAIL_FROM="Softcapphyjas <no-reply@yourdomain.com>"
HR_INBOX=careers@yourdomain.com

# ── AI ──────────────────────────────────────────────
GEMINI_API_KEY=
AI_MODEL_CHAT=gemini-2.5-flash    # confirm current model id in AI Studio
AI_MODEL_REASONING=gemini-2.5-pro
EMBEDDING_MODEL=text-embedding-004
AI_DAILY_BUDGET_INR=500           # hard cap per day

# ── Security / observability ────────────────────────
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
CERT_SIGNING_PRIVATE_KEY=         # Ed25519, signs certificates
```

Also commit a `.env.example` with the same keys and empty values. Validate everything at boot with **Zod** in `packages/config/env.ts`; the app must crash early on missing vars.

### 1.4 Brand assets you will supply later

Put them in `/apps/web/public/brand/`. The agent must use clearly named placeholders until you drop the real files in.

| File                                                        | Spec                                           |
| ----------------------------------------------------------- | ---------------------------------------------- |
| `logo-mark.svg`                                             | Square symbol, single colour, transparent      |
| `logo-wordmark-dark.svg` / `logo-wordmark-light.svg`        | Horizontal lockup for dark / light backgrounds |
| `favicon.ico`, `apple-touch-icon.png` (180), `icon-512.png` | Favicons + PWA                                 |
| `og-default.png`                                            | 1200×630 social card                           |
| `synapse-mark.svg`                                          | Flagship product symbol                        |
| `team/*.jpg`, `partners/*.svg`                              | Optional                                       |
| Fonts                                                       | Self-hosted via `next/font` (see 3.2)          |

### 1.5 Content you will supply later

Company legal name and address, GSTIN, terms/privacy text, research paper PDFs, course syllabi, job descriptions, and team bios. The agent must seed realistic **mock data** in `prisma/seed.ts` and mark everything replaceable.

### 1.6 Decisions locked in this spec (change only by editing here)

- **Database:** PostgreSQL + Prisma (relational integrity for payments/EMI beats MongoDB here). Optional `pgvector` for RAG.
- **Payments:** Razorpay (India-first: UPI, net banking, cards, EMI). Stripe may be added as an international adapter behind the same interface.
- **Currency:** INR primary; USD display toggle (rates via config).
- **Flagship name:** **Softcapphyjas Synapse**.

---

## 2. Tech Stack

| Layer         | Choice                                                                                                  | Reason                                   |
| ------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Framework     | **Next.js 15 (App Router) + React 19 + TypeScript strict**                                              | RSC, streaming, per-route code splitting |
| Styling       | **Tailwind CSS v4 + CSS variables tokens + shadcn/ui (Radix)**                                          | Fast, accessible, themeable              |
| Motion / 3D   | **Framer Motion**, **Three.js / React Three Fiber** (lazy), Canvas 2D for the hero                      | Hardware-accelerated                     |
| State         | **Zustand** (client UI + cart), **TanStack Query v5** (server state), **React Hook Form + Zod** (forms) | See Section 9                            |
| Backend       | **Next.js Route Handlers + tRPC** for web; **BullMQ workers** (Node) for background jobs                | Type-safe end to end                     |
| DB / ORM      | **PostgreSQL 16 + Prisma**, `pgvector`                                                                  |                                          |
| Cache / queue | **Redis**                                                                                               | Rate limits, sessions, job queue         |
| Auth          | **Auth.js v5** + credentials + OAuth + TOTP MFA                                                         | Unified SSO                              |
| Storage       | S3-compatible (R2/MinIO) with signed URLs                                                               |                                          |
| Video         | Mux signed playback (DRM-lite via signed tokens)                                                        |                                          |
| Payments      | Razorpay Orders, Subscriptions, Webhooks                                                                |                                          |
| PDF           | `@react-pdf/renderer` (certificates, invoices)                                                          |                                          |
| Rich text     | **Tiptap** (CMS editor)                                                                                 |                                          |
| Search        | Postgres FTS first; Meilisearch later                                                                   |                                          |
| Testing       | Vitest, Playwright, Testing Library, axe-core                                                           |                                          |
| CI/CD         | GitHub Actions → Vercel (web) + Fly.io/Railway (workers)                                                |                                          |

### 2.1 Monorepo layout

```
softcapphyjas/
├─ apps/
│  ├─ web/                    # Next.js app (all routes)
│  └─ worker/                 # BullMQ workers (email, invoices, resume parse, embeddings)
├─ packages/
│  ├─ ui/                     # Design system components
│  ├─ db/                     # Prisma schema, client, seed
│  ├─ config/                 # env validation, constants, tailwind preset
│  ├─ payments/               # Razorpay adapter + EMI math
│  ├─ ai/                     # Gemini client, RAG, guardrails, estimator
│  ├─ auth/                   # RBAC policy engine
│  └─ emails/                 # React Email templates
├─ infra/docker-compose.yml   # postgres, redis, minio, mailhog
├─ .agent/rules/              # Antigravity workspace rules (Section 16)
├─ .agent/workflows/          # Reusable agent workflows
└─ SPEC.md
```

---

## 3. Visual Design System

**Principle:** _Academic meets futuristic._ Generous whitespace, precise type, restrained colour, glass used as accent only, motion that explains instead of decorates. Benchmarks: Google DeepMind (clarity), Anthropic (warmth and editorial typography), OpenAI (minimal confidence).

### 3.1 Colour tokens (dark primary, light supported)

| Token                  | Dark                            | Light                   | Use                   |
| ---------------------- | ------------------------------- | ----------------------- | --------------------- |
| `--bg`                 | `#05070D`                       | `#FAFAF7`               | Page background       |
| `--bg-elev-1`          | `#0A0E1A`                       | `#FFFFFF`               | Cards                 |
| `--bg-elev-2`          | `#0F1526`                       | `#F1F2EE`               | Raised panels         |
| `--border`             | `rgba(255,255,255,.08)`         | `rgba(10,14,26,.10)`    | Hairlines             |
| `--text`               | `#E8ECF5`                       | `#0B1020`               | Primary text          |
| `--text-muted`         | `#8C97B2`                       | `#5B6478`               | Secondary             |
| `--accent` (cyan)      | `#22D3EE`                       | `#0891B2`               | Primary actions, glow |
| `--accent-2` (violet)  | `#8B5CF6`                       | `#6D28D9`               | Gradients, Synapse    |
| `--accent-3` (emerald) | `#34D399`                       | `#059669`               | Agritech, success     |
| `--warn`               | `#F59E0B`                       | `#B45309`               |                       |
| `--danger`             | `#F43F5E`                       | `#BE123C`               |                       |
| `--glass`              | `rgba(255,255,255,.04)`         | `rgba(255,255,255,.70)` | Glass fill            |
| `--glow`               | `0 0 40px rgba(34,211,238,.25)` | `none`                  | Hero glow             |

**Domain accent mapping:** Medical `#F472B6` · Agriculture `#34D399` · Physics `#22D3EE` · Mathematics `#A78BFA` · Frontier `#FBBF24`.

Contrast rule: all text and interactive states meet **WCAG 2.2 AA**; neon accents are never used for body text on light theme.

### 3.2 Typography

| Role            | Font                                                                       | Notes                      |
| --------------- | -------------------------------------------------------------------------- | -------------------------- |
| Display / H1–H2 | **Space Grotesk** (or _Instrument Serif_ for editorial research headlines) | Tight tracking −0.02em     |
| UI / body       | **Inter** (variable)                                                       | 16px base, 1.6 line-height |
| Mono / data     | **JetBrains Mono**                                                         | Stats, code, tickers       |

Fluid scale with `clamp()`:

```
--fs-display: clamp(2.75rem, 1.6rem + 5.5vw, 6rem)
--fs-h1:      clamp(2.25rem, 1.5rem + 3.2vw, 4rem)
--fs-h2:      clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)
--fs-h3:      clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem)
--fs-body:    clamp(1rem, 0.96rem + 0.2vw, 1.125rem)
```

### 3.3 Layout, spacing, breakpoints

- 4px base grid. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Breakpoints (mobile-first): `sm 480` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536` · `3xl 1920 (ultra-wide)`.
- Content max-widths: prose `68ch`, standard `1200px`, wide `1440px`, ultra-wide `1760px` with side gutters (never stretch text).
- Use **container queries** for cards and dashboard widgets so components adapt to their slot, not only the viewport.
- Safe-area insets for notched phones; 44×44px minimum touch targets.

### 3.4 Component guidelines

- **Glass card:** `backdrop-filter: blur(16px) saturate(140%)`, 1px hairline border, 2% noise overlay. Use sparingly; max 3 glass layers in view; fall back to solid on `prefers-reduced-transparency` and low-power devices.
- **Buttons:** Primary (cyan fill, dark text, soft glow on hover), Secondary (hairline), Ghost, Danger. Loading state with inline spinner; never change button width.
- **Inputs:** 48px tall, visible labels (no placeholder-only), inline validation, clear error text with `aria-describedby`.
- **Navigation:** Sticky translucent top bar; mega-menu for Research/Services; command palette `⌘K` for global search and navigation; bottom tab bar on mobile for authenticated dashboards.
- **Data viz:** Recharts for dashboards; domain colours above; every chart has a table fallback and accessible description.
- **Empty / loading / error states** are required for every list and widget (skeletons, never spinners alone).

### 3.5 Motion

- Durations: micro 120ms, standard 240ms, large 480ms. Easing `cubic-bezier(.2,.8,.2,1)`.
- Scroll reveals via Framer Motion `whileInView` (once).
- Hero canvas runs at 60fps, pauses off-screen (IntersectionObserver), drops to static render under `prefers-reduced-motion`.
- Page transitions: subtle fade/translate using the App Router template pattern.

### 3.6 Accessibility & i18n

Keyboard-first, visible focus rings, skip-link, ARIA landmarks, `axe` in CI. Prepare i18n with `next-intl` (English first; Hindi and Gujarati are good second-wave locales).

---

## 4. Product Naming — Flagship AI

| #   | Name                      | Verdict                                                                                                                                                             |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Softcapphyjas Synapse** | ✅ **Recommended.** Evokes neural connection, which fits the research roots and multi-modal reasoning. Short, pronounceable, ownable as "Synapse by Softcapphyjas". |
| 2   | Softcapphyjas CogniX      | Strong tech feel; slightly gaming-like                                                                                                                              |
| 3   | Softcapphyjas Aether AI   | Premium, but name is crowded in the market                                                                                                                          |
| 4   | Softcapphyjas Nexus AI    | Generic; many conflicts                                                                                                                                             |
| 5   | Softcapphyjas Omnia       | Good for "everything assistant"; weaker research link                                                                                                               |

**Action item (not for the agent):** run trademark and domain checks on your top choice before launch. Use the name via the `NEXT_PUBLIC_FLAGSHIP_NAME` env variable and a single `brand.ts` constants file so renaming is a one-line change.

**Synapse capability pillars:** multi-modal chat (text, image, PDF, audio), research mode (cited long-form reasoning), agent mode (multi-step tool use), domain lenses (Medical, Agri, Physics, Math), workspace memory, enterprise "private deployment" tier.

---

## 5. Information Architecture / Sitemap

### 5.1 Public routes

| Route                                                               | Purpose                                                                                                                                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                                 | Home                                                                                                                                                                              |
| `/research`                                                         | Research hub; `/research/[domain]` (medical, agriculture, physics, mathematics, frontier); `/research/papers/[slug]`; `/research/labs/[slug]` (quantum-classical, neuro-symbolic) |
| `/services`                                                         | Services hub; `/services/[slug]` (agentic-ai, legacy-modernization, ai-security, llm-engineering, mlops, automation, quantum-hybrid, edge-ai, synthetic-data, sovereign-ai)       |
| `/academy`                                                          | Catalog; `/academy/courses/[slug]`; `/academy/pathways/[slug]`; `/academy/pricing`; `/academy/verify/[certId]` (public certificate verification)                                  |
| `/academy/cart` · `/academy/checkout` · `/academy/checkout/success` | Commerce                                                                                                                                                                          |
| `/flagship-ai`                                                      | Synapse showcase, live demo, beta waitlist                                                                                                                                        |
| `/hire-us`                                                          | Project builder + estimator + deposit                                                                                                                                             |
| `/careers` · `/careers/[jobId]` · `/careers/[jobId]/apply`          | Recruitment                                                                                                                                                                       |
| `/blog` · `/blog/[slug]` · `/news`                                  | CMS content                                                                                                                                                                       |
| `/about` · `/contact` · `/trust` (security, compliance, status)     | Company                                                                                                                                                                           |
| `/legal/privacy` · `/legal/terms` · `/legal/refunds`                | Policies (refund page is mandatory for payments)                                                                                                                                  |

### 5.2 Authenticated routes

| Route                                                                                                           | Roles         |
| --------------------------------------------------------------------------------------------------------------- | ------------- |
| `/login` · `/register` · `/forgot-password` · `/verify-email` · `/mfa`                                          | Public (auth) |
| `/student-dashboard` (+ `/courses/[id]/learn`, `/certificates`, `/orders`, `/emi`, `/subscription`, `/profile`) | STUDENT       |
| `/client-dashboard` (+ `/projects/[id]`, `/invoices`, `/meetings`, `/files`, `/support`)                        | CLIENT        |
| `/admin` (role-aware shell; modules in Section 8)                                                               | Staff roles   |

**Unified SSO behaviour:** a single `/login`; after auth, route by primary role: STUDENT → `/student-dashboard`, CLIENT → `/client-dashboard`, any staff role → `/admin`. A user with several roles gets a workspace switcher.

---

## 6. Page-by-Page UX Wireframes

(ASCII is structural; the agent turns each into real components.)

### 6.1 `/` Home

```
┌───────────────────────────────────────────────────────────┐
│ NAV  Logo | Research▾ Services▾ Academy Synapse Careers  ⌘K│[Hire us]
├───────────────────────────────────────────────────────────┤
│ HERO  (full viewport, canvas node network behind)         │
│  eyebrow: "Frontier AI Research Lab"                      │
│  H1: "Intelligence, taken where it has never been."       │
│  sub + [Explore research]  [Talk to us]                   │
│  mouse-reactive neural graph; nodes labelled by domain    │
│  (Medical • Agri • Physics • Math) that expand on hover   │
├───────────────────────────────────────────────────────────┤
│ TRUST STRIP  live counters (papers, models, clients,      │
│              learners)  + partner/logo marquee            │
├───────────────────────────────────────────────────────────┤
│ RESEARCH HIGHLIGHTS  4 domain cards (bento grid)          │
│   each: accent colour, 1-line result, "Read case study"   │
├───────────────────────────────────────────────────────────┤
│ FRONTIER LABS  Quantum-Classical | Neuro-Symbolic (split) │
├───────────────────────────────────────────────────────────┤
│ SERVICE MATRIX  tabs/segmented control → detail panel     │
├───────────────────────────────────────────────────────────┤
│ FLAGSHIP TEASER  Synapse device mockup + live mini-chat   │
├───────────────────────────────────────────────────────────┤
│ ACADEMY PROMO   featured courses carousel + "Start free"  │
├───────────────────────────────────────────────────────────┤
│ LATEST (blog/papers) · CTA band · FOOTER (sitemap, social)│
└───────────────────────────────────────────────────────────┘
```

Mobile: hero graph reduced to 40 nodes; sections stack; sticky bottom CTA "Talk to us".

### 6.2 `/research`

Hero with domain filter chips → sticky sub-nav (Domains / Papers / Open Source / Labs) → **Domain case studies** (problem → approach → result → publication) → **Papers table** (search, year, domain, PDF, BibTeX copy) → **Open-source grid** (GitHub stars via API, license, install snippet) → **Frontier Labs** (Quantum-Classical, Neuro-Symbolic with diagram visualizers) → **Collaborate** CTA (academic partnerships, grants).

### 6.3 `/services`

Interactive selector: left rail of services (vertical on desktop, horizontal scroll on mobile) → right panel changes with animation: _What we do · Architecture diagram · Typical deliverables · Timeline · Tech used · Case snippet · [Estimate this project]_. Bottom: engagement models (Project / Retainer / Embedded team), security & compliance strip, FAQ, CTA to `/hire-us` pre-filled with the chosen service.

### 6.4 `/academy`

Hero + search → **Pathways** (ML Engineer, Agentic AI Developer, MLOps/LLMOps, AI Security Specialist, System Design) → **Catalog** with filters (level, topic, duration, price, format, rating) → course card (thumbnail, level, hours, price, EMI hint "from ₹X/mo", rating) → **Pricing** section (Monthly / Yearly / Enterprise) → certificate verification box → FAQ.
**Course detail:** syllabus accordion, instructor, preview video, outcomes, requirements, reviews, sticky purchase card (price, coupon, Add to cart, Buy now, EMI calculator popover).

### 6.5 `/academy/cart` and `/academy/checkout`

```
Stepper: 1 Cart → 2 Details → 3 Payment → 4 Confirmation
┌────────────── Order summary (sticky) ┐ ┌──── Main step ────────────┐
│ items · coupon · GST breakup · total │ │ Details: name, email, GSTIN│
│ EMI estimate chip                    │ │ Payment tabs:              │
└──────────────────────────────────────┘ │  Card | UPI | Netbanking | │
                                         │  EMI (Card EMI / Cardless /│
                                         │  Softcapphyjas Installments)│
                                         │ EMI plan table (3/6/9/12)  │
                                         │ Pay button (Razorpay)      │
                                         └────────────────────────────┘
```

Success page: order ID, invoice PDF, "Go to My Courses", next EMI due date if applicable.

### 6.6 `/flagship-ai` (Synapse)

Cinematic hero (product shot + animated prompt typing) → **Live preview** (sandboxed, rate-limited demo chat with 4 sample prompts per domain) → capability tabs (Chat, Research, Agents, Vision) → comparison/benchmarks section (only with real, citable numbers) → **Roadmap timeline** → privacy/safety promises → **Beta access form** (email, use-case, org size; Turnstile; waitlist position shown) → FAQ.

### 6.7 `/hire-us`

Multi-step **Project Builder**:

1. Select services (multi-select cards)
2. Describe goals (textarea + AI "improve my brief" helper)
3. Upload spec sheets (drag-drop, virus-scanned, signed upload)
4. Choose timeline (slider: 4–52 weeks) and team model
5. **Live estimate panel** (right, sticky): low–high range, phases, team size; computed from the rules engine (Section 11.3)
6. Contact + company details, preferred consult slot (calendar picker)
7. Review → pay **booking deposit** (Razorpay) or "Request proposal only" → confirmation with project reference `SCP-2026-0001`.

### 6.8 `/careers`

Header + culture → filter bar (team, type: Full-time/Internship/Research fellowship, location/remote) → job cards → **Job detail** → **Apply wizard**: (1) Resume upload with parse and prefill, (2) Personal details, (3) Experience/education (editable parsed data), (4) Role questions + portfolio/GitHub/arXiv links, (5) Review + consent → confirmation with tracking ID and status page.

### 6.9 `/login`

Split screen: left animated brand panel; right form with Email+Password, Google, GitHub, magic link; role is auto-detected (no role picker, so attackers can't target it). MFA step for staff. Rate-limited, Turnstile after 3 failures.

### 6.10 `/student-dashboard`

Left nav (My Learning, Certificates, Orders & EMI, Subscription, Profile) → **Continue learning** hero → progress rings → enrolled course grid. **Learn view** (`/courses/[id]/learn`): video player (adaptive, speed, captions, resume position, keyboard shortcuts) + curriculum sidebar with completion ticks + tabs (Notes PDF viewer, Q&A, Resources, Quiz). Quiz engine: MCQ, multi-select, code snippet answers, timer, attempts, pass mark. Certificates page: download PDF, share link, QR verification.

### 6.11 `/client-dashboard`

Overview (active projects, next meeting, outstanding invoices) → **Project detail** (milestone timeline, deliverables with versioning, sprint status, shared files, comments, approval buttons) → Meetings (calendar + request slot) → Billing (invoices, payments, GST invoices PDF) → Support tickets.

### 6.12 `/admin`

Role-aware shell: collapsible sidebar, global search `⌘K`, notifications, audit-log shortcut, theme toggle. Modules in Section 8. Home dashboard shows widgets according to role (see matrix).

---

## 7. RBAC Model

### 7.1 Roles

`SUPER_ADMIN`, `ADMIN`, `HR_MANAGER`, `HR_EXECUTIVE`, `RESEARCHER`, `INSTRUCTOR`, `CONTENT_EDITOR`, `ENGINEER`, `SALES_MANAGER`, `FINANCE`, `EMPLOYEE`, plus external `CLIENT`, `STUDENT`, `APPLICANT`.

### 7.2 Permission matrix (R = read, W = write, A = approve/publish, — none)

| Module                                           | SUPER | ADMIN | HR          | RESEARCHER | INSTRUCTOR      | EDITOR     | SALES     | FINANCE    | EMPLOYEE |
| ------------------------------------------------ | ----- | ----- | ----------- | ---------- | --------------- | ---------- | --------- | ---------- | -------- |
| Users & roles                                    | RWA   | RW    | R(HR scope) | —          | —               | —          | —         | —          | —        |
| CMS (research/blog/news)                         | RWA   | RWA   | —           | RW (own)   | —               | RWA        | —         | —          | R        |
| LMS (courses/videos/notes)                       | RWA   | RWA   | —           | —          | RW (own)        | RW         | —         | —          | R        |
| Student CRM + EMI                                | RWA   | RW    | —           | —          | R (own courses) | —          | R         | RW         | —        |
| Client CRM + bookings                            | RWA   | RW    | —           | —          | —               | —          | RWA       | R          | —        |
| Payments & refunds                               | RWA   | R     | —           | —          | —               | —          | R         | RWA        | —        |
| HR core (attendance, tasks, reviews, applicants) | RWA   | R     | RWA         | —          | —               | —          | —         | R(payroll) | R (self) |
| Analytics                                        | RWA   | RWA   | R(HR)       | —          | R(own)          | R(content) | R(funnel) | R          | —        |
| System health / audit logs                       | RWA   | R     | —           | —          | —               | —          | —         | —          | —        |

### 7.3 Implementation rules

- Policy engine in `packages/auth`: `can(user, action, resource)` using **RBAC + attribute rules** (e.g., "instructor can edit only courses they own").
- Enforce in **three places**: Next.js middleware (route gate), tRPC procedure middleware (API gate), and Postgres row filters in service layer (data gate). UI hiding is cosmetic only.
- Every sensitive mutation writes an **AuditLog** row (who, what, before/after diff, IP, UA).
- Staff accounts require **TOTP MFA**; session idle timeout 30 min; re-auth for payments/refunds/role changes.

---

## 8. Admin & HR Portal Modules

1. **Command Center (home):** KPIs (revenue, MRR, enrollments, leads, open applications), traffic sparkline, system health, tasks due.
2. **CMS Engine:** Tiptap editor with markdown import, cover image upload, SEO fields (title, meta, OG, canonical), scheduled publish, versioning with restore, draft → review → publish workflow, categories/tags, research paper entries (authors, DOI, PDF, BibTeX, domain).
3. **LMS Management:** course builder (modules → lessons), video upload via direct-to-Mux with processing status, notes/PDF upload, quiz builder with question bank, pricing/EMI config, coupon engine, certificate template designer, cohort management, instructor payouts view.
4. **Analytics & Visitor Tracking:** real-time visitors, top pages, geography, referrers, device split; funnels (visit → signup → cart → paid); cohort retention; course completion; export CSV. Consent-aware (cookie banner; no tracking without consent where required).
5. **Student & Client CRM:** unified profile timeline; student roster, enrolment status, progress; EMI tracker (due dates, overdue, dunning actions); client pipeline kanban (Lead → Qualified → Proposal → Booked → Active → Delivered), notes, files, invoices.
6. **Payments & Finance:** orders, refunds, webhook event log, settlement reconciliation, GST reports, failed payment retries.
7. **HR Core:** employee directory, attendance (check-in/out, leave requests with approval), task board assignment (kanban with due dates), applicant tracking (pipeline: Applied → Screened → Interview → Offer → Hired/Rejected, scorecards, interview scheduling, email templates), performance reviews (goals/OKRs, 360 feedback).
8. **Support & Inbox:** contact forms, client inquiries, beta waitlist, ticket assignment with SLA timers.
9. **Settings:** roles, feature flags, email templates, integrations, API keys, audit log viewer.

---

## 9. Frontend State Management Scheme

| Concern                                    | Tool                                                                                          | Rules                                                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Server data (courses, orders, projects)    | **TanStack Query** + tRPC                                                                     | Query keys by domain: `['courses', filters]`; stale time 60s for catalog, 0 for payments; optimistic updates for progress ticks |
| Cart                                       | **Zustand + persist (localStorage)** + server sync when logged in                             | Guest cart merges into user cart at login; prices **always re-verified server-side** at checkout                                |
| Checkout flow                              | **Zustand slice with finite states** (`idle → details → paying → verifying → success/failed`) | Never trust client success callback; wait for webhook/verify endpoint                                                           |
| Auth session                               | Auth.js session (server) + `useSession`                                                       | Roles from session, never from client storage                                                                                   |
| UI state (theme, sidebar, command palette) | Zustand (non-persisted except theme)                                                          |                                                                                                                                 |
| Forms                                      | React Hook Form + Zod, shared schemas from `packages/config`                                  | Same schema validates client and server                                                                                         |
| URL state (filters, tabs, pagination)      | `nuqs` (search params)                                                                        | Shareable, back-button friendly                                                                                                 |
| Multi-step wizards (hire-us, apply)        | Zustand slice + draft autosave to server                                                      | Resume after refresh                                                                                                            |
| Realtime (admin analytics, notifications)  | SSE (Server-Sent Events) or WebSocket via worker                                              | Fall back to 15s polling                                                                                                        |

**Cart store (reference shape):**

```ts
type CartItem = { courseId: string; planId?: string; priceInr: number; qty: 1 };
type CartState = {
  items: CartItem[];
  coupon?: string;
  add(i: CartItem): void;
  remove(id: string): void;
  clear(): void;
  applyCoupon(code: string): Promise<void>;
  totals(): { subtotal: number; discount: number; gst: number; total: number };
};
```

---

## 10. Database Schema (PostgreSQL + Prisma)

> Full schema lives in `packages/db/schema.prisma`. Use `Decimal`/integer **paise** for money (never floats). Add `createdAt/updatedAt` to every model, soft-delete (`deletedAt`) for user-generated content.

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum Role { SUPER_ADMIN ADMIN HR_MANAGER HR_EXECUTIVE RESEARCHER INSTRUCTOR CONTENT_EDITOR ENGINEER SALES_MANAGER FINANCE EMPLOYEE CLIENT STUDENT APPLICANT }
enum OrderStatus { PENDING PAID PARTIALLY_PAID FAILED REFUNDED CANCELLED }
enum PaymentMethod { CARD UPI NETBANKING CARD_EMI CARDLESS_EMI INSTALLMENT WALLET }
enum InstallmentStatus { SCHEDULED DUE PAID OVERDUE WAIVED }
enum ProjectStatus { LEAD QUALIFIED PROPOSAL BOOKED ACTIVE DELIVERED CLOSED }
enum PublishStatus { DRAFT IN_REVIEW SCHEDULED PUBLISHED ARCHIVED }

model User {
  id String @id @default(cuid())
  email String @unique
  emailVerified DateTime?
  passwordHash String?
  name String?
  image String?
  roles Role[]
  mfaSecret String?
  mfaEnabled Boolean @default(false)
  locale String @default("en")
  lastLoginAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  accounts Account[]; sessions Session[]
  employee Employee?; enrollments Enrollment[]; orders Order[]
  projects Project[] @relation("ClientProjects")
  auditLogs AuditLog[]
}

model Course {
  id String @id @default(cuid())
  slug String @unique
  title String; subtitle String?; description String
  level String                       // BEGINNER | INTERMEDIATE | ADVANCED
  category String                    // ML, DL, AGENTIC, MLOPS, LLMOPS, SECURITY, SYSTEM_DESIGN
  priceInPaise Int; compareAtPaise Int?
  emiEligible Boolean @default(true)
  durationMinutes Int
  thumbnailUrl String?
  status PublishStatus @default(DRAFT)
  instructorId String; instructor User @relation(fields:[instructorId], references:[id])
  modules Module[]; enrollments Enrollment[]; reviews Review[]
  certificateTemplateId String?
  createdAt DateTime @default(now()); updatedAt DateTime @updatedAt
  @@index([category, status])
}

model Module { id String @id @default(cuid()); courseId String; course Course @relation(fields:[courseId], references:[id]); title String; position Int; lessons Lesson[] }

model Lesson {
  id String @id @default(cuid())
  moduleId String; module Module @relation(fields:[moduleId], references:[id])
  title String; position Int
  type String                        // VIDEO | PDF | QUIZ | ARTICLE
  muxPlaybackId String?; muxAssetId String?
  pdfKey String?; contentMd String?
  durationSec Int?; isPreview Boolean @default(false)
  quiz Quiz?; progress LessonProgress[]
}

model Quiz { id String @id @default(cuid()); lessonId String @unique; lesson Lesson @relation(fields:[lessonId], references:[id]); passMark Int @default(70); maxAttempts Int @default(3); timeLimitSec Int?; questions Question[]; attempts QuizAttempt[] }
model Question { id String @id @default(cuid()); quizId String; quiz Quiz @relation(fields:[quizId], references:[id]); kind String; prompt String; options Json; answer Json; explanation String?; points Int @default(1) }
model QuizAttempt { id String @id @default(cuid()); quizId String; userId String; score Int; passed Boolean; answers Json; startedAt DateTime; submittedAt DateTime?; quiz Quiz @relation(fields:[quizId], references:[id]) }

model Enrollment {
  id String @id @default(cuid())
  userId String; user User @relation(fields:[userId], references:[id])
  courseId String; course Course @relation(fields:[courseId], references:[id])
  source String                      // PURCHASE | SUBSCRIPTION | GRANT
  orderId String?; subscriptionId String?
  progressPct Int @default(0); completedAt DateTime?
  lessonProgress LessonProgress[]; certificate Certificate?
  @@unique([userId, courseId])
}
model LessonProgress { id String @id @default(cuid()); enrollmentId String; lessonId String; positionSec Int @default(0); completed Boolean @default(false); updatedAt DateTime @updatedAt; enrollment Enrollment @relation(fields:[enrollmentId], references:[id]); lesson Lesson @relation(fields:[lessonId], references:[id]); @@unique([enrollmentId, lessonId]) }

model Certificate { id String @id @default(cuid()); publicId String @unique; enrollmentId String @unique; enrollment Enrollment @relation(fields:[enrollmentId], references:[id]); issuedAt DateTime @default(now()); signature String; pdfKey String? }

model Plan { id String @id @default(cuid()); code String @unique; name String; interval String /* MONTHLY|YEARLY|ENTERPRISE */; amountInPaise Int; razorpayPlanId String?; features Json; seats Int @default(1); active Boolean @default(true); subscriptions Subscription[] }
model Subscription { id String @id @default(cuid()); userId String; planId String; plan Plan @relation(fields:[planId], references:[id]); razorpaySubId String? @unique; status String; currentPeriodEnd DateTime?; cancelAtPeriodEnd Boolean @default(false) }

model Coupon { id String @id @default(cuid()); code String @unique; percentOff Int?; amountOffPaise Int?; maxRedemptions Int?; redeemed Int @default(0); validFrom DateTime?; validUntil DateTime?; appliesTo Json? }

model Order {
  id String @id @default(cuid())
  number String @unique              // SCP-ORD-000123
  userId String; user User @relation(fields:[userId], references:[id])
  status OrderStatus @default(PENDING)
  subtotalPaise Int; discountPaise Int @default(0); gstPaise Int; totalPaise Int
  currency String @default("INR")
  couponId String?
  razorpayOrderId String? @unique
  items OrderItem[]; payments Payment[]; installmentPlan InstallmentPlan?
  invoiceKey String?
  createdAt DateTime @default(now())
}
model OrderItem { id String @id @default(cuid()); orderId String; order Order @relation(fields:[orderId], references:[id]); courseId String?; planId String?; title String; pricePaise Int }

model Payment {
  id String @id @default(cuid())
  orderId String; order Order @relation(fields:[orderId], references:[id])
  razorpayPaymentId String? @unique
  method PaymentMethod; amountPaise Int; status String
  emiTenureMonths Int?; emiIssuer String?
  raw Json?; failureReason String?
  createdAt DateTime @default(now())
}

model InstallmentPlan { id String @id @default(cuid()); orderId String @unique; order Order @relation(fields:[orderId], references:[id]); tenureMonths Int; downPaymentPaise Int; interestBps Int @default(0); installments Installment[]; status String }
model Installment { id String @id @default(cuid()); planId String; plan InstallmentPlan @relation(fields:[planId], references:[id]); sequence Int; dueDate DateTime; amountPaise Int; status InstallmentStatus @default(SCHEDULED); paidAt DateTime?; paymentId String?; remindersSent Int @default(0) }

model Project {
  id String @id @default(cuid())
  ref String @unique                 // SCP-2026-0001
  clientId String; client User @relation("ClientProjects", fields:[clientId], references:[id])
  title String; services String[]; brief String
  status ProjectStatus @default(LEAD)
  estimateLowPaise Int; estimateHighPaise Int
  depositPaise Int @default(0); depositPaid Boolean @default(false)
  timelineWeeks Int; startDate DateTime?
  milestones Milestone[]; files ProjectFile[]; meetings Meeting[]; invoices Invoice[]
  assignedToId String?
}
model Milestone { id String @id @default(cuid()); projectId String; project Project @relation(fields:[projectId], references:[id]); title String; dueDate DateTime; status String; amountPaise Int? }
model ProjectFile { id String @id @default(cuid()); projectId String; project Project @relation(fields:[projectId], references:[id]); key String; name String; version Int @default(1); uploadedById String; scanStatus String @default("PENDING") }
model Meeting { id String @id @default(cuid()); projectId String?; startsAt DateTime; endsAt DateTime; link String?; project Project? @relation(fields:[projectId], references:[id]) }
model Invoice { id String @id @default(cuid()); number String @unique; projectId String?; project Project? @relation(fields:[projectId], references:[id]); amountPaise Int; gstPaise Int; status String; pdfKey String?; dueDate DateTime? }

model JobPosting { id String @id @default(cuid()); slug String @unique; title String; team String; type String; location String; descriptionMd String; status PublishStatus; applications Application[] }
model Application { id String @id @default(cuid()); trackingId String @unique; jobId String; job JobPosting @relation(fields:[jobId], references:[id]); name String; email String; phone String?; resumeKey String; parsed Json?; links Json?; answers Json?; stage String @default("APPLIED"); score Int?; notes Json?; createdAt DateTime @default(now()) }

model Employee { id String @id @default(cuid()); userId String @unique; user User @relation(fields:[userId], references:[id]); code String @unique; department String; title String; managerId String?; joinedOn DateTime; attendance Attendance[]; tasks Task[]; reviews PerformanceReview[]; leaves LeaveRequest[] }
model Attendance { id String @id @default(cuid()); employeeId String; employee Employee @relation(fields:[employeeId], references:[id]); date DateTime; checkIn DateTime?; checkOut DateTime?; @@unique([employeeId, date]) }
model LeaveRequest { id String @id @default(cuid()); employeeId String; employee Employee @relation(fields:[employeeId], references:[id]); from DateTime; to DateTime; type String; status String @default("PENDING"); approverId String? }
model Task { id String @id @default(cuid()); title String; description String?; assigneeId String; assignee Employee @relation(fields:[assigneeId], references:[id]); dueDate DateTime?; status String @default("TODO"); priority Int @default(2) }
model PerformanceReview { id String @id @default(cuid()); employeeId String; employee Employee @relation(fields:[employeeId], references:[id]); period String; goals Json; rating Int?; feedback Json?; reviewerId String }

model Post { id String @id @default(cuid()); kind String /* BLOG|NEWS|PAPER|CASE_STUDY */; slug String @unique; title String; excerpt String?; bodyJson Json; domain String?; doi String?; pdfKey String?; coverUrl String?; authorId String; status PublishStatus @default(DRAFT); publishAt DateTime?; seo Json?; versions PostVersion[] }
model PostVersion { id String @id @default(cuid()); postId String; post Post @relation(fields:[postId], references:[id]); bodyJson Json; createdAt DateTime @default(now()); createdById String }

model BetaSignup { id String @id @default(cuid()); email String @unique; useCase String?; orgSize String?; position Int; invitedAt DateTime? }
model Inquiry { id String @id @default(cuid()); name String; email String; message String; source String; status String @default("NEW"); createdAt DateTime @default(now()) }
model AuditLog { id String @id @default(cuid()); actorId String?; actor User? @relation(fields:[actorId], references:[id]); action String; entity String; entityId String; diff Json?; ip String?; ua String?; createdAt DateTime @default(now()); @@index([entity, entityId]) }
model WebhookEvent { id String @id; provider String; type String; payload Json; processedAt DateTime?; createdAt DateTime @default(now()) }  // idempotency
model FeatureFlag { key String @id; enabled Boolean; rules Json? }
```

_(Agent: add Auth.js `Account`, `Session`, `VerificationToken`, `Review`, plus RAG tables `Document`/`Chunk` with `vector(768)` via pgvector.)_

---

## 11. Core Business Logic

### 11.1 Cart & checkout (server is the source of truth)

1. Client posts `{items, coupon}` → server recomputes prices from DB, applies coupon rules, adds GST (`GST_RATE`), returns totals.
2. Server creates `Order(PENDING)` and a Razorpay Order (`amount` in paise), returns `razorpayOrderId`.
3. Client opens Razorpay Checkout with the selected method.
4. On success callback, client calls `/api/payments/verify` (signature check HMAC-SHA256 using `RAZORPAY_KEY_SECRET`). **Final truth = verified signature + `payment.captured` webhook.**
5. Webhook handler is **idempotent** (`WebhookEvent.id` unique): marks Order PAID, creates Enrollments, queues invoice PDF + welcome email.

### 11.2 EMI facility (three modes, all must be supported)

| Mode                                         | How it works                                                                                                                                                                                                                             | Data                                             |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **A. Card EMI / Cardless EMI (gateway)**     | Razorpay Checkout shows EMI options for eligible banks/providers; the bank handles repayment. "No-cost EMI" appears only if configured in the Razorpay dashboard and offered by the issuer.                                              | `Payment.method`, `emiTenureMonths`, `emiIssuer` |
| **B. Softcapphyjas Installments (in-house)** | Down payment now (e.g., 25%), remainder in 2–6 monthly instalments collected via Razorpay Subscriptions/UPI AutoPay or payment links. Course access policy configurable: unlock at down payment, or per-module drip by paid instalments. | `InstallmentPlan`, `Installment`                 |
| **C. Display calculator**                    | Pure UI estimator ("from ₹X/month") using tenure and an interest-rate table in config, always labelled _indicative_.                                                                                                                     | none                                             |

**EMI math (in `packages/payments/emi.ts`):**

```ts
export function emi(principalPaise: number, annualRatePct: number, months: number) {
  if (annualRatePct === 0) return Math.ceil(principalPaise / months);
  const r = annualRatePct / 12 / 100;
  const f = Math.pow(1 + r, months);
  return Math.ceil((principalPaise * r * f) / (f - 1));
}
```

Unit-test this with edge cases (0%, 3, 6, 12 months, rounding so total never under-collects).
Dunning job (worker): reminders at T−3, T, T+3, T+7 days; mark OVERDUE; optionally pause access after a grace period; all actions logged.

### 11.3 Instant project cost estimator

Deterministic **rules engine first**, AI second:

```
estimate = Σ(service.baseWeeks × teamSizeFactor × complexityMultiplier × rateCard)
         × timelineUrgencyFactor (compressed timelines cost more)
range = [estimate × 0.85, estimate × 1.25]
```

Complexity inputs: data readiness, compliance level, integrations count, deployment target (cloud / edge / on-prem). Store the rate card in DB (editable by Sales/Finance). Gemini only generates the human-readable _scope summary_ and risk notes, never the final number. Deposit = configurable % (default 10%).

### 11.4 Certificates

On course completion (all lessons + passed quizzes): generate PDF with unique `publicId`, QR to `/academy/verify/[publicId]`, Ed25519 signature stored in DB using `CERT_SIGNING_PRIVATE_KEY`. Verify page shows name, course, date, validity.

### 11.5 Video protection

Mux signed playback tokens with short TTL, per-user watermark overlay (email + timestamp), disable download, concurrent-session limit.

---

## 12. API Surface (tRPC routers / REST for webhooks)

| Router         | Key procedures                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| `auth`         | register, login, magicLink, mfaEnroll, mfaVerify, resetPassword                                               |
| `catalog`      | listCourses, getCourse, listPathways, search                                                                  |
| `cart`         | quote, applyCoupon, merge                                                                                     |
| `checkout`     | createOrder, verifyPayment, createInstallmentPlan, getEmiOptions                                              |
| `student`      | myCourses, getLesson, saveProgress, submitQuiz, myCertificates, myOrders, myInstallments                      |
| `subscription` | plans, subscribe, cancel, portal                                                                              |
| `projects`     | estimate, createBooking, uploadUrl, mine, getById, comment, approveMilestone                                  |
| `careers`      | listJobs, getJob, parseResume, submitApplication, trackApplication                                            |
| `cms`          | CRUD posts, schedule, version/restore, uploadUrl                                                              |
| `lms`          | CRUD courses/modules/lessons, createMuxUpload, quiz builder, coupons                                          |
| `hr`           | employees, attendance, leave, tasks, applicants, reviews                                                      |
| `analytics`    | overview, realtime (SSE), funnels, export                                                                     |
| `ai`           | chatDemo (rate-limited), improveBrief, ragAsk                                                                 |
| `admin`        | users, roles, flags, audit                                                                                    |
| **REST**       | `POST /api/webhooks/razorpay`, `POST /api/webhooks/mux`, `GET /api/health`, `GET /api/sitemap`, `GET /api/og` |

All inputs Zod-validated; all outputs typed; rate limit via Redis sliding window (per IP + per user).

---

## 13. Extra Features Added (Scalability & Differentiation)

**Product & growth**

1. **Softcapphyjas Chat Concierge** — site-wide RAG chatbot on research papers, courses, and services, with handoff to a human or to `/hire-us`.
2. **AI Course Tutor** — per-lesson Q&A grounded in transcripts and notes.
3. **Personalized learning path generator** (quiz → recommended pathway).
4. **Referral program & affiliate links** with wallet credits.
5. **Corporate/team seats** with admin console for bulk invite and usage reports.
6. **Public research API & dataset catalog** (read-only, API keys, rate limits).
7. **Live cohort classes** (scheduled sessions, join links, attendance, recordings).
8. **Community/discussion** per course and a research-collab board.
9. **Status page** (`/trust/status`) and security whitepaper downloads.
10. **Newsletter + RSS** with double opt-in.
11. **Blog/research SEO engine:** JSON-LD (`ScholarlyArticle`, `Course`, `JobPosting`, `Organization`), sitemap, OG images generated dynamically.
12. **Multi-currency & GST-compliant invoicing**, credit notes for refunds.
13. **PWA** with offline notes for the student dashboard.
14. **Feature flags and A/B tests** (admin-controlled).
15. **Webhooks for clients** (project status changes).

**Platform engineering** 16. Background job dashboard (Bull Board) for admins. 17. Full-text and semantic search with `⌘K`. 18. Edge caching and ISR for marketing pages; revalidate on CMS publish. 19. Multi-tenant-ready data model (`orgId` on enterprise entities) for future white-label. 20. Data export / delete-my-data flow (privacy rights).

---

## 14. Security, Privacy & Compliance

- **OWASP ASVS L2 baseline:** CSP with nonces, HSTS, `SameSite=Lax` cookies, CSRF protection, strict CORS, secure headers via Next config.
- **Passwords:** Argon2id; breached-password check; lockout and progressive delays.
- **Uploads:** MIME + magic-byte validation, size caps, antivirus scan (ClamAV worker) before files become visible; resumes and spec sheets stored privately with signed URLs.
- **Payments:** never store card data (PCI scope stays with Razorpay); verify signatures; idempotent webhooks; amounts always server-computed.
- **Secrets:** env only; rotate; no secrets in client bundles (only `NEXT_PUBLIC_*`).
- **Privacy:** consent banner, data retention policy, PII encryption at rest for resumes/IDs, designed with India's **DPDP Act 2023** and GDPR principles in mind. Have counsel review before launch.
- **AI safety (our own site practices what we sell):** input/output filter chain on the chatbot (PII redaction, prompt-injection detection, topic allow-list, output moderation), per-user token budgets, full request logging (redacted), red-team test suite in CI.
- **Backups:** daily Postgres snapshots + PITR; restore drill documented.

---

## 15. Performance, SEO & Quality Gates

- Core Web Vitals targets: **LCP < 2.0s, INP < 200ms, CLS < 0.05** on mid-range mobile.
- Hero canvas and R3F lazy-loaded (`dynamic(..., {ssr:false})`), initial JS per route < 180KB gz.
- Images via `next/image` (AVIF/WebP), fonts self-hosted with `display: swap`.
- Lighthouse CI ≥ 95 (Perf/A11y/Best Practices/SEO) on `/`, `/academy`, `/research`.
- Test pyramid: Vitest unit (EMI math, RBAC policies, estimator), integration (tRPC + test DB), **Playwright e2e** (full checkout with Razorpay test mode, login per role, apply to job, book project), axe accessibility checks, visual regression on key pages.

---

## 16. Code Starters

### 16.1 Design tokens & responsive layout engine — `apps/web/src/app/globals.css`

```css
@import "tailwindcss";

:root {
  --bg: #fafaf7;
  --bg-1: #ffffff;
  --bg-2: #f1f2ee;
  --border: rgba(10, 14, 26, 0.1);
  --text: #0b1020;
  --muted: #5b6478;
  --accent: #0891b2;
  --accent-2: #6d28d9;
  --accent-3: #059669;
  --glass: rgba(255, 255, 255, 0.7);
  --glow: none;
  --gutter: clamp(1rem, 4vw, 3rem);
  --radius: 16px;
  color-scheme: light;
}
.dark,
:root[data-theme="dark"] {
  --bg: #05070d;
  --bg-1: #0a0e1a;
  --bg-2: #0f1526;
  --border: rgba(255, 255, 255, 0.08);
  --text: #e8ecf5;
  --muted: #8c97b2;
  --accent: #22d3ee;
  --accent-2: #8b5cf6;
  --accent-3: #34d399;
  --glass: rgba(255, 255, 255, 0.04);
  --glow: 0 0 40px rgba(34, 211, 238, 0.25);
  color-scheme: dark;
}
@theme inline {
  --color-bg: var(--bg);
  --color-bg1: var(--bg-1);
  --color-bg2: var(--bg-2);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent2: var(--accent-2);
  --color-accent3: var(--accent-3);
  --font-display: var(--font-space-grotesk);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
  --breakpoint-3xl: 120rem;
}

html {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans), system-ui, sans-serif;
}
body {
  min-height: 100dvh;
  padding-inline: env(safe-area-inset-left) env(safe-area-inset-right);
}

/* Layout primitives */
.container-fluid {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--gutter);
  max-width: 1200px;
}
.container-wide {
  max-width: 1440px;
}
@media (min-width: 120rem) {
  .container-fluid {
    max-width: 1760px;
  }
} /* ultra-wide */
.prose-measure {
  max-width: 68ch;
}

/* Auto-fit grid: adapts without breakpoints */
.grid-auto {
  display: grid;
  gap: clamp(1rem, 2vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
}

/* Container-query cards: respond to their slot */
.cq {
  container-type: inline-size;
}
@container (min-width: 28rem) {
  .card-row {
    display: grid;
    grid-template-columns: 8rem 1fr;
    gap: 1rem;
  }
}

/* Glass */
.glass {
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px) saturate(140%);
  border-radius: var(--radius);
}
@media (prefers-reduced-transparency: reduce) {
  .glass {
    backdrop-filter: none;
    background: var(--bg-1);
  }
}

.display {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
  line-height: 1.02;
  font-size: clamp(2.75rem, 1.6rem + 5.5vw, 6rem);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 16.2 Root layout with fonts and theme — `apps/web/src/app/layout.tsx`

```tsx
import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: "Softcapphyjas — Frontier AI Research & Engineering",
    template: "%s · Softcapphyjas",
  },
  description:
    "AI where it has never been: medicine, agriculture, physics, mathematics, and enterprise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 16.3 Interactive hero canvas — `apps/web/src/components/hero/neural-canvas.tsx`

Self-contained Canvas 2D node network: mouse-reactive, DPR-aware, density adapts to screen size, pauses off-screen, static under reduced motion.

```tsx
"use client";
import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
  label?: string;
};
const DOMAINS = [
  { label: "Medical", hue: "#F472B6" },
  { label: "Agriculture", hue: "#34D399" },
  { label: "Physics", hue: "#22D3EE" },
  { label: "Mathematics", hue: "#A78BFA" },
];

export function NeuralCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0,
      visible = true;
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, Math.max(36, (w * h) / 14000))); // adaptive density
      nodes = Array.from({ length: count }, (_, i) => {
        const d = i < DOMAINS.length ? DOMAINS[i] : undefined;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: d ? 5 : 1.6 + Math.random() * 1.2,
          hue: d?.hue ?? "#8C97B2",
          label: d?.label,
        };
      });
    };

    const link = Math.min(160, Math.max(90, w / 8));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const L = Math.min(160, Math.max(90, w / 8));
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduce) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          const dx = a.x - mouse.x,
            dy = a.y - mouse.y,
            d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            a.x += dx * 0.002;
            a.y += dy * 0.002;
          } // gentle repel
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j],
            dx = a.x - b.x,
            dy = a.y - b.y,
            d = Math.hypot(dx, dy);
          if (d < L) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / L) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = a.hue;
        ctx.shadowColor = a.hue;
        ctx.shadowBlur = a.label ? 18 : 6;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (a.label) {
          ctx.fillStyle = "rgba(232,236,245,.85)";
          ctx.font = "12px var(--font-jetbrains), monospace";
          ctx.fillText(a.label, a.x + 10, a.y + 4);
        }
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    const ro = new ResizeObserver(resize);

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    if (reduce) draw();
    else loop();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
```

### 16.4 Hero section — `apps/web/src/components/hero/hero.tsx`

```tsx
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const NeuralCanvas = dynamic(() => import("./neural-canvas").then((m) => m.NeuralCanvas), {
  ssr: false,
});

export function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <NeuralCanvas />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(34,211,238,.10),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--bg)]" />
      </div>
      <div className="container-fluid flex min-h-[100dvh] flex-col justify-center gap-8 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm tracking-widest text-[var(--accent)] uppercase"
        >
          Frontier AI Research Lab
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="display max-w-[16ch]"
        >
          Intelligence, taken where it has never been.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose-measure text-[var(--muted)] text-lg"
        >
          We bring AI to medicine, agriculture, physics and mathematics, and engineer it for the
          enterprise.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/research"
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-[#05070D] shadow-[var(--glow)] transition hover:brightness-110"
          >
            Explore research
          </Link>
          <Link href="/hire-us" className="glass px-6 py-3 transition hover:border-[var(--accent)]">
            Talk to us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

### 16.5 Razorpay order + verify (server) — `packages/payments/razorpay.ts`

```ts
import Razorpay from "razorpay";
import crypto from "node:crypto";

export const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRzpOrder = (amountPaise: number, receipt: string) =>
  rzp.orders.create({ amount: amountPaise, currency: "INR", receipt, payment_capture: true });

export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export function verifyWebhook(rawBody: string, signature: string) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
```

Webhook route must read the **raw body** (`await req.text()`), verify, check `WebhookEvent` idempotency, then process.

### 16.6 RBAC middleware — `apps/web/src/middleware.ts`

```ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const STAFF = [
  "SUPER_ADMIN",
  "ADMIN",
  "HR_MANAGER",
  "HR_EXECUTIVE",
  "RESEARCHER",
  "INSTRUCTOR",
  "CONTENT_EDITOR",
  "ENGINEER",
  "SALES_MANAGER",
  "FINANCE",
  "EMPLOYEE",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const roles: string[] = req.auth?.user?.roles ?? [];
  const need = (ok: boolean) =>
    ok
      ? NextResponse.next()
      : NextResponse.redirect(new URL(req.auth ? "/403" : `/login?next=${pathname}`, req.url));

  if (pathname.startsWith("/admin"))
    return need(roles.some((r) => STAFF.includes(r)) && req.auth?.user?.mfaPassed === true);
  if (pathname.startsWith("/student-dashboard")) return need(roles.includes("STUDENT"));
  if (pathname.startsWith("/client-dashboard")) return need(roles.includes("CLIENT"));
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/student-dashboard/:path*", "/client-dashboard/:path*"],
};
```

---

## 17. Antigravity Implementation Plan

### 17.1 Operating rules for the agents

- **Planning mode first.** Produce an _Implementation Plan_ artifact and a _Task List_ artifact; wait for approval.
- Work **one phase at a time** on its own branch; commit per task with conventional commits.
- After each phase: run lint, typecheck, unit tests, and **launch the app and verify in the integrated browser** (screenshot artifacts for each key page at 375px, 768px, 1440px, 2560px).
- Never hardcode secrets; ask me for missing credentials/assets by listing them in a `BLOCKERS.md`.
- Use placeholders for brand assets (`/brand/*`) and mock data; mark with `// TODO(brand)`.

### 17.2 Phases, deliverables, acceptance criteria

| Phase                               | Scope                                                                                                                                                            | Parallel agents                          | Acceptance criteria                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **0. Foundation**                   | Monorepo, TS strict, ESLint/Prettier, Husky, Docker compose (Postgres/Redis/MinIO/Mailhog), env validation, CI pipeline                                          | 1                                        | `pnpm dev` boots; CI green; `.env.example` complete                                                                                     |
| **1. Design system**                | Tokens, fonts, theme toggle, `packages/ui` (Button, Input, Card, Glass, Dialog, Tabs, Accordion, Toast, Table, Command palette, Skeleton), Storybook             | 1–2                                      | Stories for all states; axe clean; dark/light parity                                                                                    |
| **2. Data layer & Auth**            | Prisma schema + migrations + seed; Auth.js (credentials, OAuth, magic link); RBAC engine; MFA; audit log; unified `/login` redirecting by role                   | 2                                        | Role-routing e2e passes; RBAC unit tests cover matrix in §7.2                                                                           |
| **3. Marketing site**               | `/`, `/research`, `/services`, `/flagship-ai`, `/about`, `/contact`, `/blog`, `/trust`, legal pages; hero canvas; live stats; SEO + JSON-LD                      | 2–3 (split by page)                      | Lighthouse ≥ 95; responsive screenshots at 4 widths; hero ≥ 55fps on mid device                                                         |
| **4. Academy catalog & LMS player** | Catalog, filters, course detail, pathways, student dashboard, video player, notes viewer, quiz engine, progress, certificates + verify page                      | 2                                        | Enroll → watch → pass quiz → certificate PDF verifies                                                                                   |
| **5. Commerce**                     | Cart, coupons, GST, Razorpay checkout, webhooks, subscriptions, EMI modes A/B/C, invoices, dunning worker                                                        | 2                                        | Playwright pays with Razorpay test cards/UPI; webhook replay is idempotent; EMI unit tests pass; installment schedule renders correctly |
| **6. Client & hiring flows**        | `/hire-us` builder + estimator + deposit; `/client-dashboard`; `/careers` + apply wizard + resume parsing (Gemini structured output)                             | 2                                        | Booking creates Project + Order; resume parse prefilled with editable fields; tracking ID works                                         |
| **7. Admin & HR portal**            | Shell, Command Center, CMS (Tiptap, versions, schedule), LMS manager (Mux direct upload), CRM, finance, HR core, analytics (SSE), settings, audit viewer         | 3 (CMS+LMS / CRM+Finance / HR+Analytics) | Each role sees only permitted modules; publishing a post revalidates the public page within 5s                                          |
| **8. AI layer**                     | Concierge RAG chatbot (pgvector), guardrails, AI tutor, brief improver, Synapse live-demo sandbox, token budgets                                                 | 1–2                                      | Red-team suite passes; injection tests blocked; budget cap enforced                                                                     |
| **9. Hardening & launch**           | Security headers/CSP, rate limits, a11y audit, perf budget, load test (k6), backups, Sentry, runbooks, deployment (Vercel + worker host), seed prod data scripts | 1–2                                      | All quality gates in §15 green; staging smoke test recorded as a browser-agent artifact                                                 |

### 17.3 Suggested Antigravity workflows (`.agent/workflows/`)

- `verify-ui.md` — start dev server, visit listed routes, capture screenshots at 375/768/1440/2560, report layout overflow and console errors.
- `add-page.md` — scaffold a route with metadata, JSON-LD, skeleton, error boundary, e2e test.
- `payment-test.md` — run Playwright checkout in Razorpay test mode and replay the webhook twice.
- `rbac-audit.md` — for every route and tRPC procedure, assert allowed vs denied roles against §7.2.

### 17.4 Workspace rules (`.agent/rules/project.md`)

```
- TypeScript strict; no `any` without a justification comment.
- All money is integer paise. Never use floating point for currency.
- Every API input is validated with Zod; every mutation on sensitive entities writes AuditLog.
- Never trust client-side price, role, or payment status.
- UI: use tokens from globals.css only; no hardcoded hex in components.
- Every list/widget has loading, empty, and error states.
- Mobile-first; verify at 375, 768, 1440, 2560 px before marking a UI task done.
- Respect prefers-reduced-motion and prefers-reduced-transparency.
- Heavy client code (canvas, 3D, charts) is lazy-loaded.
- Do not claim benchmark numbers, client logos, or statistics on public pages unless supplied; use clearly marked placeholders.
```

### 17.5 Master Prompt — paste into Antigravity (Planning mode)

```
You are the lead engineer for Softcapphyjas, a frontier-AI company. Read SPEC.md in full.

GOAL: Build the full platform described in SPEC.md as a pnpm monorepo (Next.js 15, TypeScript,
Tailwind v4, Prisma/PostgreSQL, Auth.js, tRPC, Razorpay, Mux, Gemini).

STEP 1 — PLAN ONLY. Produce (a) an Implementation Plan artifact that expands every phase in
SPEC §17.2 into concrete tasks with file paths, (b) a Task List artifact, (c) a Risks &
Assumptions list, (d) a BLOCKERS.md listing every credential, env var, and brand asset you
need from me (use SPEC §1). Do not write application code yet. Wait for my approval.

STEP 2 — EXECUTE phase by phase after approval. For each phase: create a branch, implement,
run lint/typecheck/tests, launch the app, verify in the browser at 375/768/1440/2560 px, attach
screenshot artifacts, then summarize results and open questions before moving on.

NON-NEGOTIABLES: follow .agent/rules/project.md; integer-paise money; server-side price and
payment verification; RBAC enforced in middleware + API + data layer; accessibility AA;
lazy-load heavy visuals; mock data and brand placeholders until I supply real ones; no
fabricated statistics, benchmarks, or client names.

START with Phase 0 plan details and the monorepo scaffold proposal.
```

---

## 18. Definition of Done (Platform-Wide)

- [ ] Every route in §5 exists, is responsive, accessible, and has loading/empty/error states.
- [ ] Student can register → buy (card/UPI/EMI) → learn → certify → verify publicly.
- [ ] Client can configure project → get estimate → pay deposit → track in dashboard.
- [ ] Applicant can upload resume → review parsed data → submit → track status; HR can process through pipeline.
- [ ] Each internal role sees only permitted modules; all sensitive actions audited.
- [ ] CMS publish → public page updates automatically.
- [ ] Payment webhooks idempotent; refunds and invoices work; GST breakup correct.
- [ ] All quality gates in §15 pass; security checklist in §14 complete.
- [ ] `README.md`, `.env.example`, runbooks, and architecture diagram committed.

---

## 19. Open Items For You (Not the Agent)

1. Supply logos, fonts (if custom), legal text, course/job content.
2. Confirm flagship name (Synapse recommended) after trademark/domain check.
3. Configure No-Cost EMI offers in the Razorpay dashboard (availability depends on banks/merchant approval).
4. Confirm your business entity, GST registration, and refund policy for payments.
5. Decide Phase 8 scope: public Synapse demo as a thin wrapper over Gemini now, or placeholder until your own model exists.
6. Have a lawyer review privacy, terms, certificate claims, and any accreditation language.

_End of specification._
