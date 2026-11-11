export const APP_CONFIG = {
  name: "Softcapphyjas",
  tagline: "Frontier AI Research & Enterprise Intelligence",
  flagshipName: "Softcapphyjas Synapse",
  defaultCurrency: "INR",
  supportedCurrencies: ["INR", "USD"] as const,
  gstRate: 0.18,
  minEmiAmountPaise: 300000, // 3000 INR
  routes: {
    home: "/",
    research: "/research",
    services: "/services",
    academy: "/academy",
    flagship: "/synapse",
    hireUs: "/hire-us",
    careers: "/careers",
    portalStudent: "/portal/student",
    portalClient: "/portal/client",
    portalAdmin: "/admin",
    auth: {
      login: "/login",
      register: "/register",
      verify: "/verify",
    },
  },
  domains: [
    { id: "medical", label: "Medicine & Computational Biology", color: "#F472B6" },
    { id: "agri", label: "Precision Agriculture", color: "#34D399" },
    { id: "physics", label: "Theoretical Physics", color: "#22D3EE" },
    { id: "math", label: "Higher Mathematics", color: "#A78BFA" },
    { id: "frontier", label: "Novel Algorithms & Patterns", color: "#FBBF24" },
  ] as const,
  roles: {
    STUDENT: "STUDENT",
    CLIENT: "CLIENT",
    RESEARCHER: "RESEARCHER",
    STAFF: "STAFF",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
  } as const,
} as const;

export type UserRole = (typeof APP_CONFIG.roles)[keyof typeof APP_CONFIG.roles];
