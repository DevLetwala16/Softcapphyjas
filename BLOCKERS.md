# Softcapphyjas — Platform Setup Blockers & Required Credentials

> **Status as of Phase 0 Foundation:**
> All core local development services are unblocked! You have configured `DATABASE_URL` (Neon PostgreSQL), `REDIS_URL` (Docker Redis), `AUTH_SECRET`, Google OAuth, GitHub OAuth, SMTP credentials, and `GROQ_API_KEY`.
>
> Below is the audit of pending third-party credentials and assets needed before entering production or enabling specialized sub-modules (Payments, Protected Video Streaming, Bot Detection, Error Tracking).

---

## 🔑 Missing Environment Credentials

| Service / Variable                                                                          | Purpose                                                                        | Required Phase                                  | Where to Obtain / Action Needed                                                                            |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **RAZORPAY_KEY_ID**<br>`RAZORPAY_KEY_SECRET`<br>`RAZORPAY_WEBHOOK_SECRET`                   | Processing UPI, Cards, NetBanking, and Subscriptions                           | **Phase 5** (Commerce)                          | Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/) > Settings > API Keys (Generate Test Key). |
| **MUX_TOKEN_ID**<br>`MUX_TOKEN_SECRET`<br>`MUX_SIGNING_KEY_ID`<br>`MUX_SIGNING_PRIVATE_KEY` | Signed, DRM-protected video streaming for Academy LMS player                   | **Phase 4** (Academy/LMS)                       | Create account on [Mux.com](https://mux.com) > Settings > Access Tokens & Signing Keys.                    |
| **RESEND_API_KEY**                                                                          | High-deliverability transactional email for password resets & invoices         | **Phase 2 & 5** (Can use Gmail SMTP during dev) | Create API key at [Resend.com](https://resend.com/api-keys).                                               |
| **GEMINI_API_KEY**                                                                          | Multimodal reasoning, RAG embeddings (`text-embedding-004`) & Groq fallback    | **Phase 8** (AI Layer)                          | Generate key from [Google AI Studio](https://aistudio.google.com/app/apikey).                              |
| **TURNSTILE_SITE_KEY**<br>`TURNSTILE_SECRET_KEY`                                            | Privacy-friendly bot/spam protection on login, contact, and checkout           | **Phase 9** (Hardening)                         | Cloudflare Dashboard > Turnstile > Add Site (`localhost` supported).                                       |
| **SENTRY_DSN**                                                                              | Full-stack exception tracking and performance profiling                        | **Phase 9** (Hardening)                         | Create Next.js project on [Sentry.io](https://sentry.io).                                                  |
| **NEXT_PUBLIC_POSTHOG_KEY**                                                                 | Product analytics, conversion funnels, and feature flags                       | **Phase 9** (Hardening)                         | Create project on [PostHog](https://us.i.posthog.com).                                                     |
| **CERT_SIGNING_PRIVATE_KEY**                                                                | Ed25519 cryptographic private key for digitally signed completion certificates | **Phase 4** (Academy)                           | Generate via terminal: `openssl genpkey -algorithm ed25519 -outform PEM`.                                  |

---

## 🎨 Brand Assets To Supply (Phase 1 & 3)

The following assets currently use working placeholder graphics in `/apps/web/public/brand/`:

- [ ] `logo-mark.svg` (Square symbol, single colour, transparent background)
- [ ] `logo-wordmark-dark.svg` (Horizontal typography logo for dark theme)
- [ ] `logo-wordmark-light.svg` (Horizontal typography logo for light theme)
- [ ] `og-default.png` (1200×630 OpenGraph social preview card)
- [ ] `synapse-mark.svg` (Flagship consumer AI product emblem)
- [ ] Team photos and partner logos (Optional, for `/about` and `/research`)

---

## 📄 Legal & Compliance Copy To Supply (Phase 3 & 5)

- [ ] Registered Company Legal Name & Registered Office Address
- [ ] GSTIN (Goods and Services Tax Identification Number for Indian B2B invoices)
- [ ] Terms of Service & Privacy Policy copy
