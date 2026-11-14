import * as React from "react";
import Link from "next/link";
import { SiteNav, SiteFooter, Container, Button } from "@softcapphyjas/ui";
import { Compass, Home, Search, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors flex flex-col justify-between">
      <SiteNav />

      <main className="flex-1 flex items-center justify-center py-20">
        <Container size="standard">
          <div className="text-center space-y-6 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              <Compass className="h-3.5 w-3.5" />
              <span>Error 404 · Manifold Singularity</span>
            </div>

            <div className="font-mono text-7xl sm:text-8xl font-black tracking-tight text-[var(--accent)]/80">
              404
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)]">
              We couldn&apos;t find that coordinates.
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              The page or resource you requested does not exist or may have been relocated within
              our research taxonomy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button variant="primary" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-1.5" />
                  <span>Return Home</span>
                </Link>
              </Button>

              <Button variant="secondary" asChild>
                <Link href="/research">
                  <Search className="h-4 w-4 mr-1.5" />
                  <span>Explore Research Hub</span>
                </Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link href="/contact">
                  <LifeBuoy className="h-4 w-4 mr-1.5" />
                  <span>Contact Support</span>
                </Link>
              </Button>
            </div>

            {/* Popular quick links */}
            <div className="pt-8 border-t border-[var(--border)] text-xs text-[var(--text-muted)] space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text)]">
                Popular Destinations:
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-mono">
                <Link href="/services" className="hover:text-[var(--accent)] transition-colors">
                  /services
                </Link>
                <Link
                  href="/flagship-ai"
                  className="hover:text-[var(--accent-2)] transition-colors"
                >
                  /flagship-ai
                </Link>
                <Link href="/academy" className="hover:text-emerald-400 transition-colors">
                  /academy
                </Link>
                <Link href="/trust/status" className="hover:text-amber-400 transition-colors">
                  /trust/status
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
