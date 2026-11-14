"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import {
  Search,
  BookOpen,
  FlaskConical,
  Briefcase,
  Cpu,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./dialog";
import { cn } from "../utils";

export interface CommandItemDef {
  id: string;
  title: string;
  description?: string;
  category: "PAGES" | "RESEARCH" | "COURSES" | "ACTIONS";
  icon?: React.ReactNode;
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: CommandItemDef[];
  onToggleTheme?: () => void;
  onNavigate?: (href: string) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  onToggleTheme,
  onNavigate,
}: CommandPaletteProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const defaultItems: CommandItemDef[] = [
    // Pages
    {
      id: "page-home",
      title: "Home",
      description: "Frontier AI research & enterprise solutions",
      category: "PAGES",
      icon: <Sparkles className="h-4 w-4 text-[var(--accent)]" />,
      onSelect: () => onNavigate?.("/"),
    },
    {
      id: "page-research",
      title: "Research Hub",
      description: "Exploration across 5 frontier scientific domains",
      category: "PAGES",
      icon: <FlaskConical className="h-4 w-4 text-[#22D3EE]" />,
      onSelect: () => onNavigate?.("/research"),
    },
    {
      id: "page-services",
      title: "Services & Solutions",
      description: "Enterprise AI architectures, agentic systems, MLOps",
      category: "PAGES",
      icon: <Cpu className="h-4 w-4 text-[#8B5CF6]" />,
      onSelect: () => onNavigate?.("/services"),
    },
    {
      id: "page-academy",
      title: "Softcapphyjas Academy",
      description: "Certifications, immersive pathways, LMS courses",
      category: "PAGES",
      icon: <GraduationCap className="h-4 w-4 text-[#34D399]" />,
      onSelect: () => onNavigate?.("/academy"),
    },
    {
      id: "page-synapse",
      title: "Softcapphyjas Synapse (Flagship AI)",
      description: "Multi-modal scientific reasoning intelligence",
      category: "PAGES",
      icon: <Cpu className="h-4 w-4 text-[#22D3EE]" />,
      onSelect: () => onNavigate?.("/flagship-ai"),
    },
    {
      id: "page-careers",
      title: "Careers & Open Positions",
      description: "Join the frontier intelligence team",
      category: "PAGES",
      icon: <Briefcase className="h-4 w-4 text-[#FBBF24]" />,
      onSelect: () => onNavigate?.("/careers"),
    },

    // Research domains
    {
      id: "domain-medical",
      title: "Medicine & Computational Biology",
      description: "Genomics, protein dynamics, oncology AI",
      category: "RESEARCH",
      icon: <span className="h-2 w-2 rounded-full bg-[#F472B6]" />,
      onSelect: () => onNavigate?.("/research/medical"),
    },
    {
      id: "domain-agri",
      title: "Precision Agriculture",
      description: "Crop pathology, hyperspectral satellite analytics",
      category: "RESEARCH",
      icon: <span className="h-2 w-2 rounded-full bg-[#34D399]" />,
      onSelect: () => onNavigate?.("/research/agriculture"),
    },
    {
      id: "domain-physics",
      title: "Theoretical Physics",
      description: "Hamiltonian neural networks, plasma simulations",
      category: "RESEARCH",
      icon: <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />,
      onSelect: () => onNavigate?.("/research/physics"),
    },
    {
      id: "domain-math",
      title: "Higher Mathematics",
      description: "Automated theorem proving, topology, geometric deep learning",
      category: "RESEARCH",
      icon: <span className="h-2 w-2 rounded-full bg-[#A78BFA]" />,
      onSelect: () => onNavigate?.("/research/mathematics"),
    },

    // Courses
    {
      id: "course-agentic",
      title: "Agentic AI Engineering",
      description: "Production autonomous agents, tool orchestration & guardrails",
      category: "COURSES",
      icon: <BookOpen className="h-4 w-4 text-[var(--text-muted)]" />,
      onSelect: () => onNavigate?.("/academy/courses/agentic-ai-engineering"),
    },
    {
      id: "course-mlops",
      title: "Enterprise MLOps & LLM Orchestration",
      description: "Serving high-throughput models, evals, Redis, pgvector",
      category: "COURSES",
      icon: <BookOpen className="h-4 w-4 text-[var(--text-muted)]" />,
      onSelect: () => onNavigate?.("/academy/courses/enterprise-mlops"),
    },

    // Actions
    {
      id: "action-hire",
      title: "Hire Us / Start a Project",
      description: "Use our interactive scope builder and quote estimator",
      category: "ACTIONS",
      icon: <ArrowRight className="h-4 w-4 text-[var(--accent)]" />,
      onSelect: () => onNavigate?.("/hire-us"),
    },
    {
      id: "action-verify",
      title: "Verify Public Certificate",
      description: "Cryptographic validation for academy cert credentials",
      category: "ACTIONS",
      icon: <ShieldCheck className="h-4 w-4 text-[#34D399]" />,
      onSelect: () => onNavigate?.("/academy/verify"),
    },
    {
      id: "action-theme",
      title: "Toggle Theme (Dark / Light)",
      description: "Switch between dark obsidian and editorial light canvas",
      category: "ACTIONS",
      icon: <Sun className="h-4 w-4 text-[var(--warn)]" />,
      onSelect: () => onToggleTheme?.(),
    },
  ];

  const candidateItems = items || defaultItems;

  const categories = ["PAGES", "RESEARCH", "COURSES", "ACTIONS"] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-2xl bg-[var(--bg-elev-1)] border-[var(--border)] shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Quickly navigate pages, courses, research domains, or execute actions
        </DialogDescription>

        <CommandPrimitive className="flex flex-col h-full w-full">
          <div className="flex items-center px-4 border-b border-[var(--border)] h-14">
            <Search className="h-5 w-5 text-[var(--text-muted)] shrink-0 mr-3" />
            <CommandPrimitive.Input
              placeholder="Search pages, courses, research domains, actions... (⌘K)"
              className="w-full bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <span className="text-[11px] font-mono-data bg-[var(--bg-elev-2)] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]">
              ESC
            </span>
          </div>

          <CommandPrimitive.List className="max-h-[420px] overflow-y-auto p-2 scrollbar-thin">
            <CommandPrimitive.Empty className="py-8 text-center text-sm text-[var(--text-muted)]">
              No matching results found.
            </CommandPrimitive.Empty>

            {categories.map((cat) => {
              const catItems = candidateItems.filter((i) => i.category === cat);
              if (catItems.length === 0) return null;

              return (
                <CommandPrimitive.Group
                  key={cat}
                  heading={
                    <span className="text-[11px] font-semibold text-[var(--text-muted)] tracking-wider px-2 py-1.5 uppercase font-mono-data">
                      {cat}
                    </span>
                  }
                  className="mb-2"
                >
                  {catItems.map((item) => (
                    <CommandPrimitive.Item
                      key={item.id}
                      value={`${item.title} ${item.description || ""} ${item.category} ${item.keywords?.join(" ") || ""}`}
                      onSelect={() => {
                        item.onSelect();
                        onOpenChange(false);
                      }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors select-none text-[var(--text)]",
                        "hover:bg-[var(--bg-elev-2)] hover:text-white",
                        "data-[selected=true]:bg-[var(--bg-elev-2)] data-[selected=true]:text-[var(--accent)]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-[var(--bg)] border border-[var(--border)] shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-medium text-sm leading-tight">{item.title}</span>
                          {item.description && (
                            <span className="text-xs text-[var(--text-muted)] leading-normal line-clamp-1">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-30 group-data-[selected=true]:opacity-100 text-[var(--accent)] shrink-0" />
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              );
            })}
          </CommandPrimitive.List>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] bg-[var(--bg-elev-2)]/50 text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-3">
              <span>
                Use{" "}
                <kbd className="font-mono-data px-1 rounded bg-[var(--bg)] border border-[var(--border)]">
                  ↑
                </kbd>{" "}
                <kbd className="font-mono-data px-1 rounded bg-[var(--bg)] border border-[var(--border)]">
                  ↓
                </kbd>{" "}
                to navigate
              </span>
              <span>
                <kbd className="font-mono-data px-1 rounded bg-[var(--bg)] border border-[var(--border)]">
                  ↵
                </kbd>{" "}
                to select
              </span>
            </div>
            <span>Softcapphyjas Navigation</span>
          </div>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}
