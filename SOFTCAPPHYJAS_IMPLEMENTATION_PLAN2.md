# Softcapphyjas — Comprehensive Development Implementation Plan

### Synthesized from: `SOFTCAPPHYJAS_ANTIGRAVITY_MASTER_SPEC.md` + `Softcapphyjas_Platform_Prototype.excalidraw`

#### Expert Full-Stack Developer & Project Manager Edition · v1.0

---

> [!IMPORTANT]
> **Excalidraw file is ALWAYS required.** It contains 40 boards (design system, wireframes, flows, DB ERD, state management, CI/CD, all 35 pages) that map 1:1 to every component you'll build. Keep it open at all times and reference it by board number.

---

## 🗂️ Current State Audit

| Item                | Current State                     | Target State                   |
| ------------------- | --------------------------------- | ------------------------------ |
| **Framework**       | Express.js + Mongoose (server.js) | Next.js 15 App Router + Prisma |
| **Database**        | MongoDB (CapFlow leftover)        | PostgreSQL 16 + pgvector       |
| **Package manager** | npm (commonjs)                    | pnpm (monorepo)                |
| **Auth**            | Custom JWT                        | Auth.js v5                     |
| **Styling**         | None                              | Tailwind v4 + shadcn/ui        |
| **Payments**        | None                              | Razorpay                       |
| **Storage**         | Cloudinary                        | S3/R2 (private)                |
| **.env.local**      | Old CapFlow vars                  | New Softcapphyjas vars needed  |

> [!WARNING]
> The current workspace is a leftover CapFlow/Express project. The entire codebase will be **replaced** with the Next.js 15 monorepo from scratch. The `.env.local` has stale credentials — a new one is needed.

---

## 🔑 ENV Variables Status & What You Need to Add

Your current `.env.local` is for an old CapFlow project. For Softcapphyjas, you need a **completely new** `.env.local`. Here is what you need to supply:

### ✅ Already Have (repurpose/update)

| Variable                                    | Source                         | Action                                                 |
| ------------------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Old file (placeholder)         | Get real values from Google Cloud Console              |
| `SMTP_USER` / `SMTP_PASS`                   | Gmail app password in old file | Can reuse for dev; switch to Resend later              |
| `CLOUDINARY_*`                              | Old file                       | **Replace** with S3/R2 — Cloudinary is not in the spec |
| `JWT_SECRET`                                | Old file                       | **Replace** — use `AUTH_SECRET` with Auth.js v5        |

### ❌ Missing — You Must Add These

```env
# ── Core ─────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Softcapphyjas
NEXT_PUBLIC_FLAGSHIP_NAME=Synapse
NODE_ENV=development

# ── Database ─────────────────────────────────
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/softcapphyjas
REDIS_URL=redis://localhost:6379

# ── Auth.js v5 ───────────────────────────────
AUTH_SECRET=                    # run: openssl rand -base64 32
AUTH_GOOGLE_ID=                 # Google Cloud Console
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=                 # GitHub OAuth App
AUTH_GITHUB_SECRET=
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=2592000
TOTP_ISSUER=Softcapphyjas

# ── Razorpay ─────────────────────────────────
RAZORPAY_KEY_ID=                # Razorpay test mode dashboard
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_EMI_MIN_AMOUNT=3000
GST_RATE=0.18

# ── Storage (MinIO locally / R2 in prod) ─────
S3_ENDPOINT=http://localhost:9000
S3_REGION=auto
S3_BUCKET_PUBLIC=softcapphyjas-public
S3_BUCKET_PRIVATE=softcapphyjas-private
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin

# ── Video (Mux) ──────────────────────────────
MUX_TOKEN_ID=                   # mux.com dashboard
MUX_TOKEN_SECRET=
MUX_SIGNING_KEY_ID=
MUX_SIGNING_PRIVATE_KEY=

# ── Email (Resend or reuse SMTP for dev) ─────
RESEND_API_KEY=                 # resend.com
EMAIL_FROM="Softcapphyjas <no-reply@softcapphyjas.com>"
HR_INBOX=careers@softcapphyjas.com

# ── AI (Groq & Gemini) ──────────────────────────────
# Groq API configuration (User preference for LLM completions):
GROQ_API_KEY=                   # console.groq.com
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_GUARD_MODEL=meta-llama/llama-prompt-guard-2-86m

GEMINI_API_KEY=                 # aistudio.google.com (fallback / embeddings)
AI_MODEL_CHAT=gemini-2.5-flash
AI_MODEL_REASONING=gemini-2.5-pro
EMBEDDING_MODEL=text-embedding-004
AI_DAILY_BUDGET_INR=500

# ── Security ─────────────────────────────────
TURNSTILE_SITE_KEY=             # cloudflare.com/turnstile
TURNSTILE_SECRET_KEY=
SENTRY_DSN=                     # sentry.io
NEXT_PUBLIC_POSTHOG_KEY=        # posthog.com
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
CERT_SIGNING_PRIVATE_KEY=       # Ed25519: openssl genpkey -algorithm ed25519
```

> [!NOTE]
> For **local dev (Phase 0)**, you only need `DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`, and `AUTH_GOOGLE_ID/SECRET`. The others can be empty strings — the env validator will warn but not crash in dev mode.

---

## 🏗️ Monorepo Target Structure

_(Excalidraw Board 31: Repo, env & CI/CD)_

```
softcapphyjas/                          # pnpm workspace root
├─ apps/
│  ├─ web/                              # Next.js 15 App Router
│  │  ├─ src/
│  │  │  ├─ app/                        # All routes (see Board 02)
│  │  │  │  ├─ (marketing)/            # Public routes group
│  │  │  │  ├─ (auth)/                 # Login/register group
│  │  │  │  ├─ (portals)/              # Student/Client dashboards
│  │  │  │  └─ admin/                  # Staff portal
│  │  │  ├─ components/
│  │  │  │  ├─ hero/                   # NeuralCanvas, Hero
│  │  │  │  ├─ nav/                    # SiteNav, MegaMenu, CommandPalette
│  │  │  │  ├─ footer/                 # SiteFooter
│  │  │  │  └─ [feature]/             # Per-feature components
│  │  │  ├─ lib/                       # Utilities, trpc client
│  │  │  └─ server/                    # tRPC routers
│  │  ├─ public/brand/                 # Placeholder brand assets
│  │  └─ next.config.ts
│  └─ worker/                          # BullMQ background jobs
│     └─ src/jobs/                     # email, invoice, resume, embeddings, dunning
├─ packages/
│  ├─ ui/                              # Design system (Board 03)
│  ├─ db/                              # Prisma schema + seed (Board 27)
│  ├─ config/                          # Env validation (Zod), constants
│  ├─ payments/                        # Razorpay adapter + EMI (Board 25)
│  ├─ ai/                              # Gemini client + RAG (Board 08 AI)
│  ├─ auth/                            # RBAC engine (Board 26)
│  └─ emails/                          # React Email templates (Board 36)
├─ infra/
│  └─ docker-compose.yml               # Postgres, Redis, MinIO, Mailhog
├─ .agent/
│  ├─ rules/project.md
│  └─ workflows/                       # verify-ui, add-page, payment-test, rbac-audit
├─ .env.local                          # Never commit
├─ .env.example
├─ pnpm-workspace.yaml
└─ SPEC.md
```

---

## 📋 Phase-by-Phase Implementation Plan

### PHASE 0 — Foundation & Monorepo Scaffold

**Branch:** `phase/0-foundation` | **Duration:** ~2 days | **Excalidraw:** Boards 01, 31

#### Tasks:

**P0.1 — Clean slate & pnpm workspace setup**

- Delete: `server.js`, `client/`, `node_modules/`, `package.json`
- Create: `pnpm-workspace.yaml`, root `package.json` (private: true, workspaces)
- Create: all `apps/` and `packages/` directories
- File: `apps/web/` → init Next.js 15 with `create-next-app` flags: `--ts --tailwind --app --src-dir --no-eslint`
- File: `apps/worker/` → bare Node.js TypeScript app

**P0.2 — TypeScript strict everywhere**

- Root `tsconfig.base.json`: `strict: true`, `noImplicitAny: true`, `exactOptionalPropertyTypes: true`
- Each app/package extends base tsconfig

**P0.3 — Code quality toolchain**

- ESLint (flat config), Prettier, `@typescript-eslint`, `eslint-plugin-import`
- Husky pre-commit: `pnpm lint && pnpm typecheck`
- Lint-staged for changed files only

**P0.4 — Docker Compose (infra/docker-compose.yml)**

```yaml
services:
  postgres:    image: pgvector/pgvector:pg16, port 5432
  redis:       image: redis:7-alpine, port 6379
  minio:       image: minio/minio, ports 9000+9001
  mailhog:     image: mailhog/mailhog, ports 1025+8025
```

**P0.5 — Environment validation (`packages/config/env.ts`)**

- Zod schema validating every variable from Section 1.3 of spec
- `createEnv()` function used by all apps; crashes early with readable error on missing vars
- Dev mode: relaxes non-critical validations with `z.string().optional()`

**P0.6 — `.env.example` & `.env.local`**

- Create `.env.example` (all keys, empty values, comments)
- Update `.env.local` with the new Softcapphyjas variables (see table above)

**P0.7 — CI Pipeline (`.github/workflows/ci.yml`)**

```yaml
jobs:
  - lint → typecheck → unit-tests → build
  - On PR: Vercel preview deploy
```

**P0.8 — `BLOCKERS.md`** ← Create this immediately
Listing every credential/asset not yet in `.env.local`

**Acceptance:** `pnpm dev` boots; CI green; Docker services healthy; Zod validation crashes with clear message on missing var.

---

### PHASE 1 — Design System

**Branch:** `phase/1-design-system` | **Duration:** ~3 days | **Excalidraw:** Boards 03, 04, 05

#### Colour Tokens (`apps/web/src/app/globals.css`)

Based on **Board 03** (Design System):

```css
:root {
  /* Dark theme (primary) */
  --bg: #05070d;
  --bg-elev-1: #0a0e1a;
  --bg-elev-2: #0f1526;
  --border: rgba(255, 255, 255, 0.08);
  --text: #e8ecf5;
  --text-muted: #8c97b2;
  --accent: #22d3ee; /* cyan */
  --accent-2: #8b5cf6; /* violet */
  --accent-3: #34d399; /* emerald */
  --warn: #f59e0b;
  --danger: #f43f5e;
  --glass: rgba(255, 255, 255, 0.04);
  --glow: 0 0 40px rgba(34, 211, 238, 0.25);
  /* Domain accents */
  --domain-medical: #f472b6;
  --domain-agri: #34d399;
  --domain-physics: #22d3ee;
  --domain-math: #a78bfa;
  --domain-frontier: #fbbf24;
  /* Fluid type scale */
  --fs-display: clamp(2.75rem, 1.6rem + 5.5vw, 6rem);
  --fs-h1: clamp(2.25rem, 1.5rem + 3.2vw, 4rem);
  --fs-h2: clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem);
  --fs-h3: clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem);
  --fs-body: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
}
.light {
  /* Light theme overrides per Board 03 */
}
```

#### Components to build in `packages/ui/`:

_(Each component must have: default · hover · focus · disabled · loading · error states — Board 03)_

| Component                               | Spec Notes                                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Button`                                | Primary (cyan fill + glow), Violet, Secondary (hairline), Ghost, Danger; fixed width on loading |
| `Input`                                 | 48px tall, visible label, `aria-describedby` error, inline validation                           |
| `Card`                                  | Standard (elev-1 + hairline), Glass (blur(16) + saturate(140%) + noise), Stat (mono font)       |
| `Badge/Chip`                            | Domain colour coded (Medical/Agri/Physics/Math/Frontier)                                        |
| `Dialog`                                | Radix Dialog, focus trap, Esc closes                                                            |
| `Tabs`                                  | Radix Tabs with animated underline indicator                                                    |
| `Accordion`                             | Radix Accordion, animated height                                                                |
| `Toast`                                 | Sonner, top-right desktop / bottom mobile, `aria-live polite`, undo action                      |
| `Table`                                 | Sortable, keyboard accessible, mobile → card list fallback                                      |
| `CommandPalette`                        | `cmdk`, role-aware results, fuzzy search, recent items (Board 04)                               |
| `Skeleton`                              | For every list/widget loading state — no spinners alone                                         |
| `Select`, `Checkbox`, `Radio`, `Switch` | Radix primitives                                                                                |

#### Typography (`apps/web/src/app/layout.tsx`)

```tsx
// next/font: Space Grotesk (display), Inter Variable (body), JetBrains Mono (data)
```

#### Fonts

- Self-hosted via `next/font`
- CSS variables: `--font-grotesk`, `--font-inter`, `--font-jetbrains`

#### Layout Engine (`packages/ui/layout.tsx`) — Board 05

```
.container-fluid: padding clamp(1rem,4vw,3rem); max 1200/1440/1760
.grid-auto: repeat(auto-fit,minmax(min(100%,18rem),1fr))
Container queries for cards
```

**Acceptance:** Storybook stories for all states; axe-core clean; dark/light parity verified at 375/768/1440/2560.

---

### PHASE 2 — Data Layer & Authentication

**Branch:** `phase/2-data-auth` | **Duration:** ~4 days | **Excalidraw:** Boards 02, 26, 27

#### P2.1 — Prisma Schema (`packages/db/schema.prisma`)

Full schema from spec Section 10. Additional tables to add:

- Auth.js: `Account`, `Session`, `VerificationToken`
- RAG: `Document`, `Chunk` with `vector(768)` via pgvector extension
- `Review` model for courses

Run: `pnpm prisma migrate dev --name init`

#### P2.2 — Seed Data (`packages/db/seed.ts`)

Mock data for every model, clearly marked `// TODO(brand)`:

- 5 Users (one per major role)
- 3 Courses with modules/lessons/quizzes
- 2 Job postings
- 3 Blog/Paper posts
- Sample orders, enrollments, plans

#### P2.3 — Auth.js v5 (`apps/web/src/auth.ts`)

```ts
providers: [Google, GitHub, Credentials, Resend (magic link)]
callbacks: { session: inject roles + mfaPassed; jwt: roles from DB }
adapter: PrismaAdapter
```

#### P2.4 — RBAC Engine (`packages/auth/rbac.ts`)

```ts
can(user, action, resource) → boolean
// Enforced in THREE places per Board 26:
// 1. Middleware (route gate)
// 2. tRPC procedure middleware (API gate)
// 3. Prisma service layer (data gate)
```

Middleware (`apps/web/src/middleware.ts`) — exact implementation from spec Section 16.6:

- `/admin/*` → staff roles + `mfaPassed === true`
- `/student-dashboard/*` → STUDENT
- `/client-dashboard/*` → CLIENT

#### P2.5 — MFA (TOTP) for Staff

- TOTP setup flow at `/admin/setup-mfa`
- `mfaPassed` flag in session
- Re-auth gate for payments/refunds/role changes

#### P2.6 — Unified `/login` route

- Split screen (Board 18): left animated brand panel, right form
- Email+Password, Google, GitHub, Magic Link tabs
- MFA step for staff only
- After auth: role-based redirect (STUDENT → `/student-dashboard`, CLIENT → `/client-dashboard`, staff → `/admin`)
- Rate limited; Turnstile after 3 failures

**Acceptance:** Role-routing e2e tests pass; RBAC unit tests cover matrix from spec §7.2.

---

### PHASE 3 — Marketing Site (Public Pages)

**Branch:** `phase/3-marketing` | **Duration:** ~7 days | **Excalidraw:** Boards 06–08, 13, 32, 33

#### Pages to build (all SSG/ISR, public):

**Board 06 — `/` Home**
Sections in order:

1. `NeuralCanvas` hero (full-viewport Canvas 2D, mouse-reactive, Board 06 spec §1) — exact code from spec §16.3
2. Trust strip with animated counters (data from `GET /api/stats`, ISR 60s)
3. Research highlights bento grid (4 domain cards, accent per domain)
4. Frontier Labs split (Quantum-Classical | Neuro-Symbolic)
5. Service matrix (segmented control → animated detail panel)
6. Flagship/Synapse teaser (violet theme, scripted mini-chat — no live API)
7. Academy promo carousel (top 3 featured courses, EMI hint)
8. Latest content (3 Posts: PAPER/BLOG/NEWS)
9. CTA + newsletter (Turnstile protected)
10. Footer (Board 06 §10)

Mobile (375px): 36 canvas nodes, stacked, sticky bottom CTA "Talk to us"

**Board 07 — `/research`** + `/research/[domain]` + `/research/papers/[slug]` + `/research/labs/[slug]`

- Hero + domain filter chips (URL state `?domain=`)
- Sticky sub-nav (Domains / Papers / Open Source / Labs / Collaborate)
- Case studies alternating layout
- Papers table: sortable, search, BibTeX copy, signed PDF URL
- OSS grid (GitHub stars via cached API ISR 1h)
- Frontier Labs with interactive diagram visualizers
- ScholarlyArticle JSON-LD per paper

**Board 08 — `/services`** + `/services/[slug]`

- Left rail service list (12 services)
- Animated right panel: What we do · Architecture diagram · Deliverables · Timeline · Tech · Case
- CTA → `/hire-us?service=slug`
- Engagement models, security strip, FAQ

**Board 13 — `/flagship-ai`** (Synapse)

- Cinematic hero (animated prompt typing)
- Live preview (rate-limited demo, 4 sample prompts)
- Capability tabs (Chat / Research / Agents / Vision)
- Benchmarks (placeholder — no fabricated numbers)
- Roadmap timeline
- Beta access form (email, use-case, org-size, Turnstile, waitlist position)

**Additional public pages (Board 32, 33):**

- `/about` — team, mission, values
- `/contact` — form with Turnstile
- `/blog` / `/blog/[slug]` — CMS posts
- `/trust` / `/trust/status` — security, compliance, status
- `/legal/privacy` / `/legal/terms` / `/legal/refunds`
- `/news`

**SEO for all pages:**

- JSON-LD (Organization, WebPage, ScholarlyArticle, Course)
- OG images via `/api/og` (dynamic)
- Canonical URLs
- Sitemap.xml, robots.txt

**Acceptance:** Lighthouse ≥ 95; hero ≥ 55fps on mid device; reduced-motion = static render; axe clean; 4-width screenshots per page.

---

### PHASE 4 — Academy Catalog & LMS Player

**Branch:** `phase/4-academy-lms` | **Duration:** ~7 days | **Excalidraw:** Boards 09, 10, 19, 20

**Board 09 — `/academy`**

- Hero + search
- Pathways section (ML Engineer, Agentic AI Dev, MLOps/LLMOps, AI Security, System Design)
- Catalog with filters: level, topic, duration, price, format, rating (URL state via `nuqs`)
- Course card: thumbnail, level, hours, price, "EMI from ₹X/mo" hint, rating
- Subscription pricing section (Monthly / Yearly / Enterprise)
- Certificate verification box
- FAQ

**Board 10 — `/academy/courses/[slug]`**

- Syllabus accordion
- Instructor profile
- Preview video (Mux, free first lesson)
- Learning outcomes, requirements, reviews
- **Sticky purchase card** (price, coupon, Add to Cart, Buy Now, EMI calculator popover)

**Board 09 — `/academy/pathways/[slug]`**

- Learning path with course sequence
- Progress tracker

**`/academy/pricing`**

- Plan cards (Monthly/Yearly/Enterprise)
- Razorpay subscription integration

**`/academy/verify/[certId]`** (public)

- Ed25519 signature verification
- Certificate details display
- QR code scanner

**Board 19 — `/student-dashboard`**

- Left nav: My Learning, Certificates, Orders & EMI, Subscription, Profile
- "Continue learning" hero with progress rings
- Enrolled course grid

**Board 20 — `/student-dashboard/courses/[id]/learn`**

- Mux video player: adaptive, speed control, captions, resume position, keyboard shortcuts
- Curriculum sidebar with completion ticks
- Tabs: Notes PDF viewer, Q&A, Resources, Quiz

**Quiz Engine:**

- MCQ, multi-select, code snippet answers
- Timer, attempt tracking, pass mark enforcement
- Results with explanation

**Certificates:**

- PDF generation via `@react-pdf/renderer`
- Ed25519 signed `publicId`
- Download + share link + QR verification

**Additional student sub-pages (Board 34):**

- `/student-dashboard/orders` — order history
- `/student-dashboard/emi` — installment schedule, next due date
- `/student-dashboard/subscription` — plan management, cancel at period end
- `/student-dashboard/profile` — avatar, name, locale, password, MFA

**Acceptance:** Enroll → watch → pass quiz → certificate PDF renders and verifies publicly.

---

### PHASE 5 — Commerce (Cart, Payments, EMI)

**Branch:** `phase/5-commerce` | **Duration:** ~6 days | **Excalidraw:** Boards 11, 12, 25

**Board 11 — `/academy/cart`**

- Item list with remove
- Coupon code input (server-validated)
- GST breakup (18% on subtotal)
- EMI estimate chip
- Order summary sticky panel

**Board 12 — `/academy/checkout`**
Stepper: Cart → Details → Payment → Confirmation

**Checkout flow (server is truth — Board 25):**

1. Client POSTs `{items, coupon}` → server recomputes price from DB
2. Apply coupon rules, add GST → `Order(PENDING)` created
3. Razorpay Order created (`amount` in paise, receipt = order number)
4. Client opens Razorpay Checkout SDK with tabs: Card | UPI | Netbanking | EMI
5. On success: `POST /api/payments/verify` → HMAC-SHA256 signature check
6. Final truth: `payment.captured` webhook → marks PAID, creates Enrollments, queues invoice + welcome email

**EMI Modes (all three — Board 25):**

| Mode                                     | Implementation                                                |
| ---------------------------------------- | ------------------------------------------------------------- |
| A. Card EMI / Cardless EMI               | Razorpay Checkout shows bank EMI options natively             |
| B. Softcapphyjas Installments (in-house) | Down payment now, 2–6 monthly installments via dunning worker |
| C. Subscription                          | Razorpay Subscription with Razorpay Plan                      |

**Payments package (`packages/payments/razorpay.ts`):**

- Exact implementation from spec §16.5
- `createRzpOrder`, `verifyCheckoutSignature`, `verifyWebhook`
- Webhook handler: **idempotent** via `WebhookEvent.id`

**Webhook route (`/api/webhooks/razorpay`):**

- `await req.text()` for raw body
- Verify signature
- Check `WebhookEvent` idempotency
- Process: mark Order PAID, create Enrollments, queue BullMQ jobs

**Invoice generation (worker job):**

- `@react-pdf/renderer` GST invoice
- Ed25519 signed certificate PDF
- Upload to S3 private bucket, serve via signed URL

**Dunning worker:**

- EMI reminders T-3 / T / T+3 / T+7 days
- BullMQ repeatable jobs
- Overdue marking

**Stale order cleanup:** Cron: cancel `PENDING` orders older than 24h

**`/academy/checkout/success`** (Board 12):

- Order ID, invoice PDF link
- "Go to My Courses" CTA
- Next EMI due date if applicable

**`/academy/checkout/failed`** (Board 12):

- Retry button, change payment method

**Acceptance:** Playwright pays with Razorpay test card/UPI; webhook replay is idempotent; EMI unit tests pass; installment schedule renders.

---

### PHASE 6 — Client & Hiring Flows

**Branch:** `phase/6-client-hiring` | **Duration:** ~6 days | **Excalidraw:** Boards 14, 15, 16, 17, 21

**Boards 14–15 — `/hire-us`** (Multi-step Project Builder)

Steps:

1. Select services (multi-select cards, 12 services)
2. Describe goals (textarea + AI "improve my brief" via Gemini)
3. Upload spec sheets (drag-drop, virus-scanned via ClamAV worker, signed S3 upload)
4. Timeline slider (4–52 weeks) + team model selector
5. **Live estimate panel** (right, sticky) — rules engine: low–high range, phases, team size
6. Contact + company details + calendar slot picker
7. Review → Pay booking deposit (Razorpay) OR "Request proposal only"
8. Confirmation: project ref `SCP-2026-0001`, ICS download

**Estimate rules engine (`packages/ai/estimator.ts`):**

- Input: selected services, timeline, brief
- Output: low/high range in paise, phases, team size
- Gemini structured output for brief enhancement

**Board 16 — `/careers`**

- Culture header
- Filter bar: team, type (Full-time/Internship/Research fellowship), location/remote
- Job cards list (from `JobPosting` table, `PublishStatus.PUBLISHED`)
- Filter is URL state via `nuqs`

**Board 17 — `/careers/[jobId]`** + **`/careers/[jobId]/apply`**

Apply wizard (5 steps):

1. Resume upload (PDF, virus-scanned), Gemini parse + prefill
2. Personal details (editable parsed data)
3. Experience/education
4. Role questions + portfolio/GitHub/arXiv links
5. Review + consent → confirmation with tracking ID

Resume parsing worker: Gemini structured output → JSON pre-fills form fields (editable by applicant).

**`/careers/track/[id]`** — application status page (token-gated)

**Board 21 — `/client-dashboard`**

- Overview: active projects, next meeting, outstanding invoices
- Project detail: milestone timeline, deliverables with versioning, sprint status, shared files, comments, approval buttons
- Meetings: calendar + "Request slot" modal
- Billing: invoices, payments, GST invoice PDF download
- Support tickets
- Files section: upload new files, versioned

**Additional client sub-pages (Board 34):**

- `/client-dashboard/projects/[id]` — full project detail
- `/client-dashboard/invoices` — all invoices
- `/client-dashboard/meetings` — calendar view
- `/client-dashboard/files` — shared file library

**`/hire-us/booking/[ref]`** — confirmation page with ICS calendar download

**Acceptance:** Booking creates `Project` + `Order`; resume parse prefills editable fields; tracking ID works; deposit payment via Razorpay.

---

### PHASE 7 — Admin & HR Portal

**Branch:** `phase/7-admin-hr` | **Duration:** ~10 days | **Excalidraw:** Boards 22, 23, 40

**Admin Shell (`/admin`) — Board 22:**

- Collapsible sidebar, global search `⌘K`, notifications bell, audit-log shortcut
- Theme toggle
- Role-aware module visibility (hide/show based on RBAC)
- Home dashboard: role-specific widget grid

**Admin Modules (Board 23 + 40):**

**1. Command Center** — `/admin`

- KPIs: MRR, enrollments, leads, open applications, traffic sparkline
- System health widget
- Tasks due today

**2. CMS Engine** — `/admin/cms`

- Tiptap editor: markdown import, cover image upload, SEO fields (title/meta/OG/canonical)
- Scheduled publish (BullMQ delayed job)
- Versioning with restore (PostVersion table)
- Draft → Review → Publish workflow
- Categories, tags, research paper entries (DOI, BibTeX, PDF)
- CMS publish triggers ISR revalidation within 5s

**3. LMS Management** — `/admin/lms`

- Course builder: modules → lessons drag-reorder
- Video upload: direct-to-Mux, processing status polling
- Notes/PDF upload
- Quiz builder with question bank
- Pricing/EMI configuration
- Coupon engine
- Certificate template designer
- Cohort management, instructor payout view

**4. Analytics** — `/admin/analytics`

- Real-time visitors (SSE)
- Top pages, geography, referrers, device split
- Funnels: visit → signup → cart → paid
- Course completion rates
- Export CSV
- Consent-aware (PostHog loads after cookie consent)

**5. Student & Client CRM** — `/admin/students` + `/admin/clients`

- Student: unified profile, enrollment status, progress, EMI tracker, dunning actions
- Client: pipeline kanban (Lead → Qualified → Proposal → Booked → Active → Delivered)
- Notes, files, invoices per client

**6. Payments & Finance** — `/admin/finance`

- Orders, refunds, webhook event log
- Settlement reconciliation
- GST reports
- Failed payment retries

**7. HR Core** — `/admin/hr`

- Employee directory
- Attendance (check-in/out, leave requests with approval)
- Task board (kanban with due dates)
- **ATS (Applicant Tracking):** pipeline kanban Applied → Screened → Interview → Offer → Hired/Rejected; scorecards; interview scheduling; email templates
- Performance reviews (OKRs, 360 feedback)

**8. Support & Inbox** — `/admin/support`

- Contact form submissions, client inquiries, beta waitlist
- Ticket assignment with SLA timers

**9. Settings** — `/admin/settings`

- Role management, feature flags (`FeatureFlag` table)
- Email templates, integrations, API keys

**Audit Log viewer** — `/admin/audit`

- Filter by actor, entity, action, date
- Diff view (before/after)

**Acceptance:** Each role sees only permitted modules; publishing a CMS post revalidates the public page within 5s; AuditLog written for all sensitive mutations.

---

### PHASE 8 — AI Layer (Powered by Groq SDK)

**Branch:** `phase/8-ai` | **Duration:** ~5 days | **Excalidraw:** Boards 04 (Chatbot), 13 (Synapse)

> [!IMPORTANT]
> **LLM Provider Requirement:** All LLM completions, guardrails, and reasoning use **Groq** (`groq-sdk` / `from groq import Groq`) with `GROQ_API_KEY`.
> Guardrail & prompt checking model: `meta-llama/llama-prompt-guard-2-86m`.
> Conversational models: `llama-3.3-70b-versatile` / `llama-3.1-8b-instant`.
> Embeddings fallback: `text-embedding-004`.

**Groq Connection Standard:**

```typescript
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const completion = await groq.chat.completions.create({
  model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: prompt }],
  temperature: 1,
});
```

**Concierge RAG Chatbot (Board 04)**

- Visible as floating button on all pages
- Guardrails: Prompt injection check using `meta-llama/llama-prompt-guard-2-86m` via Groq
- PII redaction, topic allow-list, citations required, budget cap
- pgvector embeddings: `embeddings.index` worker jobs on CMS publish
- Query: embed question → ANN search → Gemini with retrieved context
- Human handoff button → creates Support ticket
- Daily budget cap enforced: `AI_DAILY_BUDGET_INR=500`

**Synapse Live Demo (`/flagship-ai`) — Board 13:**

- Sandboxed rate-limited demo (4 sample prompts per domain)
- Domain lenses: Medical / Agri / Physics / Math
- No real user data processed

**AI Brief Improver (`/hire-us` Step 2):**

- Gemini prompt: clean and expand user's project brief
- Structured JSON output for form prefill

**Resume Parser (`apps/worker/src/jobs/resume.parse.ts`):**

- Gemini structured output from PDF
- Returns: name, email, phone, skills, education, experience JSON
- Editable by applicant in Step 3 of apply wizard

**AI Tutor (`/student-dashboard/courses/[id]/learn`):**

- Context-aware Q&A with lesson content

**Red-team suite:**

- Prompt injection tests
- PII leakage tests
- Topic boundary tests
- Budget enforcement test

**Acceptance:** Red-team suite passes; injection tests blocked; budget cap enforced; citations present in RAG answers.

---

### PHASE 9 — Hardening & Launch Prep

**Branch:** `phase/9-hardening` | **Duration:** ~5 days | **Excalidraw:** Board 38 (Security & Test Matrix)

**Security:**

- Security headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`
- CSP nonce per request (middleware)
- Rate limiting: Redis-backed, per IP + per user
- Input sanitization (all Zod-validated)
- Signed URLs for all private S3 objects (expire 1h)
- Mux signed tokens (DRM-lite)
- ClamAV virus scan on all uploads
- CSRF protection (Auth.js built-in)
- Cookie: `HttpOnly; Secure; SameSite=Lax`
- Idle session timeout: 30 min for staff

**Accessibility:**

- Full `axe-core` audit run
- Skip-link, ARIA landmarks, focus rings, visible focus-visible
- Color contrast WCAG 2.2 AA verified
- Screen reader testing (NVDA/VoiceOver)

**Performance:**

- Lighthouse ≥ 95 all public pages
- LCP < 2.0s
- Canvas ≥ 55fps on mid device
- Heavy code lazy-loaded (canvas, 3D, charts, Mux player)
- `next/image` optimization, blur placeholder
- ISR for catalog/blog; SSG for legal/static pages

**Load testing (k6):**

- `/academy` catalog: 500 concurrent users
- `/api/payments/verify`: 100 rps

**Monitoring:**

- Sentry DSN configured, error boundaries everywhere
- PostHog analytics (consent-aware, Board 37)
- `/api/health` endpoint

**Deployment:**

- Vercel: `apps/web` (ISR + Edge middleware)
- Fly.io / Railway: `apps/worker` (always-on BullMQ)
- Database: Neon PostgreSQL (production)
- Redis: Upstash (production)
- Storage: Cloudflare R2 (production)

**Documentation:**

- `README.md` with setup instructions
- Architecture diagram (from Board 01)
- Runbooks: incident response, backup restore, payment webhook replay
- `.env.example` complete

---

## 📊 Excalidraw Board Reference Map

| Board # | Name                         | Phase     |
| ------- | ---------------------------- | --------- |
| 01      | System Architecture          | P0        |
| 02      | Sitemap & Route Map          | P0, P2    |
| 03      | Design System                | P1        |
| 04      | Global Components            | P1, P8    |
| 05      | Responsive Layout Engine     | P1        |
| 06      | Home                         | P3        |
| 07      | Research                     | P3        |
| 08      | Services                     | P3        |
| 09      | Academy Catalog              | P4        |
| 10      | Course Detail                | P4        |
| 11      | Cart & Checkout              | P5        |
| 12      | Checkout States              | P5        |
| 13      | Flagship - Synapse           | P3, P8    |
| 14      | Hire Us - Builder            | P6        |
| 15      | Hire Us - Steps 2–7          | P6        |
| 16      | Careers                      | P6        |
| 17      | Careers - Apply Wizard       | P6        |
| 18      | Auth / SSO                   | P2        |
| 19      | Student Dashboard            | P4        |
| 20      | Learning Player              | P4        |
| 21      | Client Dashboard             | P6        |
| 22      | Admin Command Center         | P7        |
| 23      | Admin Modules                | P7        |
| 24      | End-to-end User Journeys     | Reference |
| 25      | Payments, EMI & Dunning      | P5        |
| 26      | RBAC & Auth Routing          | P2        |
| 27      | Database ERD                 | P2        |
| 28      | Page → API → Data Contract   | P2–P7     |
| 29      | State Management             | P1–P7     |
| 30      | Delivery Roadmap             | Reference |
| 31      | Repo, Env & CI/CD            | P0        |
| 32      | Detail & Content Pages       | P3        |
| 33      | Trust, Status & System Pages | P3        |
| 34      | Account Sub-Pages            | P4, P6    |
| 35      | Synapse App Workspace        | P8        |
| 36      | Email & Notification Catalog | P5–P7     |
| 37      | Analytics Events & SEO Map   | P9        |
| 38      | Security & Test Matrix       | P9        |
| 39      | UI State Library             | P1        |
| 40      | Admin Extra Modules          | P7        |

---

## 🗺️ State Management Architecture

_(Excalidraw Board 29)_

| Concern            | Tool                                             | Key Rule                                                   |
| ------------------ | ------------------------------------------------ | ---------------------------------------------------------- |
| Server data        | TanStack Query + tRPC                            | stale 60s catalog, 0s payments; optimistic progress ticks  |
| Cart               | Zustand + persist (localStorage) + server sync   | Guest cart merges at login; prices re-verified server-side |
| Checkout           | Zustand finite state machine                     | `idle → details → paying → verifying → success/failed`     |
| Auth session       | Auth.js session + `useSession`                   | Roles from server session ONLY                             |
| UI state           | Zustand (non-persisted, except theme)            |                                                            |
| Forms              | React Hook Form + Zod                            | Same schema: client + server                               |
| URL state          | `nuqs`                                           | Shareable, back-button-friendly                            |
| Multi-step wizards | Zustand slice + server draft autosave            | Resume after refresh                                       |
| Realtime           | SSE / WebSocket (admin analytics, notifications) | Fallback: 15s polling                                      |

---

## 📧 Email & Notification Catalog

_(Excalidraw Board 36)_

| Trigger                  | Template                      | Queue                            |
| ------------------------ | ----------------------------- | -------------------------------- |
| Registration             | Welcome + verify email        | `email.send`                     |
| Magic link               | Sign-in link                  | `email.send`                     |
| Order paid               | Receipt + invoice PDF         | `email.send` + `invoice.pdf`     |
| Enrollment               | Course welcome                | `email.send`                     |
| Certificate issued       | Certificate PDF + verify link | `email.send` + `certificate.pdf` |
| EMI reminder T-3         | Reminder: due in 3 days       | `dunning.run`                    |
| EMI due T                | Reminder: due today           | `dunning.run`                    |
| EMI overdue T+3          | Overdue notice                | `dunning.run`                    |
| EMI overdue T+7          | Final notice                  | `dunning.run`                    |
| Application received     | Confirmation + tracking ID    | `email.send`                     |
| Application stage change | Stage update email            | `email.send`                     |
| Project deposit paid     | Confirmation + ICS            | `email.send`                     |
| Project milestone        | Milestone update              | `email.send`                     |
| Synapse beta             | Waitlist position             | `email.send`                     |

---

## 🔄 Background Workers (`apps/worker/`)

_(Excalidraw Board 01)_

```
jobs/
  email.send         → Resend transactional email
  invoice.pdf        → @react-pdf/renderer, Ed25519 sign, S3 upload
  certificate.pdf    → @react-pdf/renderer, Ed25519 sign, publicId
  resume.parse       → Gemini structured output from PDF
  embeddings.index   → Chunk CMS posts/papers, embed, upsert pgvector
  dunning.run        → EMI T-3/T/T+3/T+7 reminders
  av.scan            → ClamAV virus scan for uploads
  analytics.rollup   → Aggregate stats for dashboard
  cms.revalidate     → Next.js ISR tag revalidation on CMS publish
  webhooks.retry     → Retry failed webhook deliveries

crons:
  pending-orders     → Cancel PENDING orders older than 24h
  github-stars       → Refresh OSS repo star counts (ISR 1h)
```

---

## ✅ Definition of Done (Per Phase)

### Every UI component:

- [ ] Dark + light theme
- [ ] Responsive at 375 / 768 / 1440 / 2560
- [ ] Loading skeleton, empty state, error state
- [ ] `prefers-reduced-motion` honoured
- [ ] `prefers-reduced-transparency` honoured
- [ ] Touch targets ≥ 44×44px
- [ ] WCAG 2.2 AA contrast
- [ ] Keyboard navigable
- [ ] axe-core clean

### Every API route / tRPC procedure:

- [ ] Zod input validation
- [ ] Auth + RBAC gate
- [ ] AuditLog for sensitive mutations
- [ ] Money in integer paise (never floats)
- [ ] Server is source of truth for price/role/payment

### Every page:

- [ ] Metadata (title, description, OG, canonical)
- [ ] JSON-LD structured data
- [ ] Error boundary
- [ ] Robots/sitemap entry

---

## 🚨 Blockers & Open Items

### Must have BEFORE coding starts:

| Item                                    | Priority | Notes                          |
| --------------------------------------- | -------- | ------------------------------ |
| `AUTH_SECRET`                           | 🔴 P0    | `openssl rand -base64 32`      |
| `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` | 🔴 P0    | Google Cloud Console OAuth 2.0 |
| `DATABASE_URL`                          | 🔴 P0    | Docker Compose or Neon         |
| `REDIS_URL`                             | 🔴 P0    | Docker Compose or Upstash      |

### Must have before Phase 5 (Commerce):

| Item                                      | Priority | Notes                         |
| ----------------------------------------- | -------- | ----------------------------- |
| `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` | 🔴 P5    | Razorpay test mode            |
| `RAZORPAY_WEBHOOK_SECRET`                 | 🔴 P5    | Razorpay webhook settings     |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`             | 🔴 P5    | Same as KEY_ID, public        |
| Company legal name, GSTIN                 | 🔴 P5    | Required for GST invoices     |
| Refund policy text                        | 🔴 P5    | Legally required for Razorpay |

### Must have before Phase 4 (LMS):

| Item                                             | Priority | Notes                          |
| ------------------------------------------------ | -------- | ------------------------------ |
| `MUX_TOKEN_ID` + `MUX_TOKEN_SECRET`              | 🔴 P4    | mux.com                        |
| `MUX_SIGNING_KEY_ID` + `MUX_SIGNING_PRIVATE_KEY` | 🔴 P4    | mux.com                        |
| `S3_*` variables                                 | 🔴 P4    | MinIO locally (Phase 0 Docker) |

### Must have before Phase 8 (AI):

| Item             | Priority | Notes               |
| ---------------- | -------- | ------------------- |
| `GEMINI_API_KEY` | 🔴 P8    | aistudio.google.com |

### Brand assets (use placeholders until supplied):

| Asset                     | Placeholder           | Location                         |
| ------------------------- | --------------------- | -------------------------------- |
| `logo-mark.svg`           | Cyan circle with "SC" | `/brand/logo-mark.svg`           |
| `logo-wordmark-dark.svg`  | Text "Softcapphyjas"  | `/brand/logo-wordmark-dark.svg`  |
| `logo-wordmark-light.svg` | Text on light bg      | `/brand/logo-wordmark-light.svg` |
| `favicon.ico`             | Generated from mark   | `/brand/favicon.ico`             |
| `synapse-mark.svg`        | Violet neural symbol  | `/brand/synapse-mark.svg`        |
| `og-default.png`          | 1200×630 generated    | `/brand/og-default.png`          |

### Owner decisions needed:

1. Flagship name confirmation (Synapse recommended — trademark/domain check first)
2. No-Cost EMI configuration in Razorpay dashboard (bank/merchant approval)
3. Business entity, GSTIN, registered address
4. Phase 8 Synapse scope: thin Gemini wrapper now vs placeholder
5. Legal review: privacy policy, terms, certificate claims, accreditation language
6. GitHub OAuth App creation for social login

---

## 📅 Sprint Timeline

```mermaid
flowchart LR
  P0["Phase 0\nFoundation\n2 days"] --> P1["Phase 1\nDesign System\n3 days"]
  P1 --> P2["Phase 2\nData & Auth\n4 days"]
  P2 --> P3["Phase 3\nMarketing Site\n7 days"]
  P3 --> P4["Phase 4\nAcademy & LMS\n7 days"]
  P4 --> P5["Phase 5\nCommerce\n6 days"]
  P5 --> P6["Phase 6\nClient & Hiring\n6 days"]
  P6 --> P7["Phase 7\nAdmin & HR\n10 days"]
  P7 --> P8["Phase 8\nAI Layer\n5 days"]
  P8 --> P9["Phase 9\nHardening\n5 days"]
```

**Total: ~55 working days** (single developer) → ~11 weeks
With parallel agents on larger phases (P3, P7): reduces to ~7–8 weeks

---

## 🤔 Do You Need the Excalidraw File at All Times?

**YES — always keep it available.** Here's specifically when you'll reference each board:

| When you're building... | Reference boards                                                                  |
| ----------------------- | --------------------------------------------------------------------------------- |
| Any UI component        | 03 (tokens), 04 (global components), 05 (responsive rules), 39 (UI state library) |
| Any page wireframe      | The board numbered for that page (06–21, 32–35)                                   |
| Navigation, mega-menu   | 04                                                                                |
| Auth/login/RBAC         | 18, 26                                                                            |
| DB schema               | 27                                                                                |
| Payment flows           | 11, 12, 25                                                                        |
| Admin modules           | 22, 23, 40                                                                        |
| System architecture     | 01                                                                                |
| API contracts           | 28                                                                                |
| State decisions         | 29                                                                                |
| Email templates         | 36                                                                                |
| SEO & analytics         | 37                                                                                |
| Security testing        | 38                                                                                |
| CI/CD, env vars         | 31                                                                                |
| User journeys           | 24                                                                                |
| Delivery roadmap        | 30                                                                                |

---

_This plan was synthesized from SOFTCAPPHYJAS_ANTIGRAVITY_MASTER_SPEC.md and Softcapphyjas_Platform_Prototype.excalidraw (40 boards). All 40 boards of the prototype are accounted for in the phase breakdown above._
