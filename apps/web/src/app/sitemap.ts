import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://softcapphyjas.com";
  const now = new Date();

  const routes = [
    "",
    "/research",
    "/research/medical",
    "/research/agri",
    "/research/physics",
    "/research/math",
    "/research/frontier",
    "/research/labs/quantum-classical",
    "/research/labs/neuro-symbolic",
    "/services",
    "/services/agentic-ai",
    "/services/custom-models",
    "/services/legacy-modernization",
    "/services/ai-security",
    "/services/mlops",
    "/services/automation",
    "/services/quantum-hybrid",
    "/services/edge-ai",
    "/services/synthetic-data",
    "/services/sovereign-ai",
    "/flagship-ai",
    "/academy",
    "/academy/pricing",
    "/academy/verify",
    "/careers",
    "/hire-us",
    "/about",
    "/contact",
    "/blog",
    "/news",
    "/trust",
    "/trust/status",
    "/legal/privacy",
    "/legal/terms",
    "/legal/refunds",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route.startsWith("/blog") ? "daily" : "weekly",
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/research") || route.startsWith("/services")
          ? 0.9
          : 0.7,
  }));
}
