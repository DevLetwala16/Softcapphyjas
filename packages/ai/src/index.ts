// AI Client & Models Scaffold (Groq + Gemini fallback)
export interface ModelConfig {
  provider: "groq" | "gemini";
  model: string;
}

export const DEFAULT_CHAT_MODEL: ModelConfig = {
  provider: "groq",
  model: "llama-3.3-70b-versatile",
};

export const FALLBACK_CHAT_MODEL: ModelConfig = {
  provider: "gemini",
  model: "gemini-2.5-flash",
};
