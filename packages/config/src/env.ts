import { z } from "zod";

const isDev = process.env.NODE_ENV !== "production";

export const envSchema = z.object({
  // Core
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Softcapphyjas"),
  NEXT_PUBLIC_FLAGSHIP_NAME: z.string().default("Synapse"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Database & Cache
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // Auth.js v5
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be at least 16 characters long"),
  AUTH_GOOGLE_ID: isDev ? z.string().optional() : z.string().min(1),
  AUTH_GOOGLE_SECRET: isDev ? z.string().optional() : z.string().min(1),
  AUTH_GITHUB_ID: isDev ? z.string().optional() : z.string().min(1),
  AUTH_GITHUB_SECRET: isDev ? z.string().optional() : z.string().min(1),
  JWT_ACCESS_TTL: z.coerce.number().default(900),
  JWT_REFRESH_TTL: z.coerce.number().default(2592000),
  TOTP_ISSUER: z.string().default("Softcapphyjas"),

  // Razorpay
  RAZORPAY_KEY_ID: isDev ? z.string().optional() : z.string().min(1),
  RAZORPAY_KEY_SECRET: isDev ? z.string().optional() : z.string().min(1),
  RAZORPAY_WEBHOOK_SECRET: isDev ? z.string().optional() : z.string().min(1),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: isDev ? z.string().optional() : z.string().min(1),
  RAZORPAY_EMI_MIN_AMOUNT: z.coerce.number().default(3000),
  GST_RATE: z.coerce.number().default(0.18),

  // Storage
  S3_ENDPOINT: z.string().default("http://localhost:9000"),
  S3_REGION: z.string().default("auto"),
  S3_BUCKET_PUBLIC: z.string().default("softcapphyjas-public"),
  S3_BUCKET_PRIVATE: z.string().default("softcapphyjas-private"),
  S3_ACCESS_KEY_ID: z.string().default("minioadmin"),
  S3_SECRET_ACCESS_KEY: z.string().default("minioadmin"),

  // Video (Mux)
  MUX_TOKEN_ID: isDev ? z.string().optional() : z.string().min(1),
  MUX_TOKEN_SECRET: isDev ? z.string().optional() : z.string().min(1),
  MUX_SIGNING_KEY_ID: isDev ? z.string().optional() : z.string().min(1),
  MUX_SIGNING_PRIVATE_KEY: isDev ? z.string().optional() : z.string().min(1),

  // Email
  RESEND_API_KEY: isDev ? z.string().optional() : z.string().min(1),
  EMAIL_FROM: z.string().default("Softcapphyjas <no-reply@softcapphyjas.com>"),
  HR_INBOX: z.string().default("careers@softcapphyjas.com"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // AI (Groq & Gemini)
  GROQ_API_KEY: isDev ? z.string().optional() : z.string().min(1),
  GROQ_MODEL: z.string().default("llama-3.3-70b-versatile"),
  GROQ_GUARD_MODEL: z.string().default("meta-llama/llama-prompt-guard-2-86m"),
  GEMINI_API_KEY: isDev ? z.string().optional() : z.string().min(1),
  AI_MODEL_CHAT: z.string().default("gemini-2.5-flash"),
  AI_MODEL_REASONING: z.string().default("gemini-2.5-pro"),
  EMBEDDING_MODEL: z.string().default("text-embedding-004"),
  AI_DAILY_BUDGET_INR: z.coerce.number().default(500),

  // Security & Observability
  TURNSTILE_SITE_KEY: isDev ? z.string().optional() : z.string().min(1),
  TURNSTILE_SECRET_KEY: isDev ? z.string().optional() : z.string().min(1),
  SENTRY_DSN: isDev ? z.string().optional() : z.string().min(1),
  NEXT_PUBLIC_POSTHOG_KEY: isDev ? z.string().optional() : z.string().min(1),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().default("https://us.i.posthog.com"),
  CERT_SIGNING_PRIVATE_KEY: isDev ? z.string().optional() : z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export function createEnv(customEnv?: Record<string, string | undefined>): Env {
  const source = customEnv ?? process.env;
  const parsed = envSchema.safeParse(source);

  if (!parsed.success) {
    const formattedErrors = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    console.error(
      "\n❌ [ENV CONFIG ERROR] Invalid environment variables detected:\n" + formattedErrors + "\n"
    );
    throw new Error("Invalid environment configuration. Fix .env.local before continuing.");
  }

  return parsed.data;
}

let _env: Env | null = null;

export const env = new Proxy({} as Env, {
  get(_target, prop: string) {
    if (!_env) {
      _env = createEnv();
    }
    return (_env as Record<string, unknown>)[prop];
  },
});
