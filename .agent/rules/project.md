# Softcapphyjas Engineering & Architectural Rules

## 1. Core Monorepo Principles

- **Package Manager:** pnpm workspaces only. Never run npm or yarn directly.
- **TypeScript Strict Everywhere:** `noImplicitAny: true`, `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true`.
- **Environment Integrity:** Always import `env` from `@softcapphyjas/config`. Never read raw `process.env` directly in application logic.
- **Financial Calculations:** All monetary values MUST be stored and computed in integer paise (1 INR = 100 paise) to prevent floating-point inaccuracies.
- **Role-Based Access Control:** Always verify permissions at the middleware layer, API layer, and data repository layer.

## 2. Design System Alignment

- Follow Excalidraw design specifications and tokens from Board 03.
- Dark theme is the default system theme (`#05070D`).
- Accessible contrast (WCAG AA), fluid clamp typography, glassmorphism cards with border glow accents.
- Every async list or container must implement Loading (Skeleton), Empty, and Error states.
