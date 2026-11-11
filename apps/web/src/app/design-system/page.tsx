"use client";

import * as React from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  SkeletonCard,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  CommandPalette,
  SiteNav,
  CookieBanner,
  BottomTabBar,
  ConciergeChatbot,
  EmptyState,
  ErrorState,
  PermissionDeniedState,
  RateLimitedState,
  OfflineBanner,
  FormErrorSummary,
  Container,
  Section,
  notify,
} from "@softcapphyjas/ui";
import {
  ExternalLink,
  TrendingUp,
  Cpu,
  ArrowRight,
  Shield,
  Activity,
  Sparkles,
} from "lucide-react";

type DomainId = "medical" | "agri" | "physics" | "math" | "frontier";

export default function DesignSystemShowcase() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [selectedDomain, setSelectedDomain] = React.useState("physics");
  const [checkedBox, setCheckedBox] = React.useState(true);
  const [switchVal, setSwitchVal] = React.useState(true);
  const [radioVal, setRadioVal] = React.useState("pro");
  const [activeBottomTab, setActiveBottomTab] = React.useState("home");
  const [showOfflineBanner, setShowOfflineBanner] = React.useState(false);

  // Sample sortable table data
  const [tableData, setTableData] = React.useState([
    { id: "1", name: "Hamiltonian Physics Model v3", domain: "physics", status: "Active", latency: "14ms", accuracy: "99.4%" },
    { id: "2", name: "Crop Pathology Hyperspectral", domain: "agri", status: "Training", latency: "38ms", accuracy: "96.8%" },
    { id: "3", name: "Oncology Drug Binding Predictor", domain: "medical", status: "Active", latency: "22ms", accuracy: "98.7%" },
    { id: "4", name: "Geometric Deep Learning Prover", domain: "math", status: "Testing", latency: "85ms", accuracy: "94.2%" },
    { id: "5", name: "Synapse Multi-modal Reasoner", domain: "frontier", status: "Active", latency: "19ms", accuracy: "99.8%" },
  ]);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc" | null>(null);

  const handleSort = () => {
    const nextDir = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(nextDir);
    setTableData((prev) =>
      [...prev].sort((a, b) =>
        nextDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 pb-20">
      {/* Optional Offline Banner (Board 39) */}
      <OfflineBanner isOnline={!showOfflineBanner} queuedCount={2} />

      {/* Global Navigation with Mega-Menu (Board 04) */}
      <SiteNav onOpenCommandPalette={() => setCommandOpen(true)} />

      {/* Hero Banner */}
      <Section spacing="sm" className="border-b border-[var(--border)]/50 bg-[var(--bg-elev-1)]/40">
        <Container size="ultra">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono-data text-[var(--accent)] uppercase tracking-wider mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-ping" />
              Phase 1 Deliverable · Excalidraw Boards 03, 04, 05, 39
            </div>
            <h1 className="text-h1 mb-3 text-[var(--text)]">
              Visual Design System & Prototype Architecture
            </h1>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              Academic meets futuristic. Fluid typography, responsive layout engine (375px → 2560px),
              domain colour taxonomy, full state matrix, accessible keyboard navigation, and micro-interactions.
            </p>
          </div>
        </Container>
      </Section>

      <main className="py-12 space-y-20">
        {/* 1. Colour Tokens & Domain Taxonomy */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">01.</span>
              <span>Colour Tokens & Domain Taxonomy</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              WCAG 2.2 AA compliant. Dark theme primary with seamless light theme overrides.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-left">
              <div className="h-6 w-full rounded bg-[var(--bg)] border border-[var(--border)] mb-2" />
              <div className="text-xs font-semibold">--bg</div>
              <div className="text-[11px] font-mono-data text-[var(--text-muted)]">#05070D</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] text-left">
              <div className="h-6 w-full rounded bg-[var(--bg-elev-1)] border border-[var(--border)] mb-2" />
              <div className="text-xs font-semibold">--bg-elev-1</div>
              <div className="text-[11px] font-mono-data text-[var(--text-muted)]">#0A0E1A</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-2)] text-left">
              <div className="h-6 w-full rounded bg-[var(--bg-elev-2)] border border-[var(--border)] mb-2" />
              <div className="text-xs font-semibold">--bg-elev-2</div>
              <div className="text-[11px] font-mono-data text-[var(--text-muted)]">#0F1526</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] text-left">
              <div className="h-6 w-full rounded bg-[#22D3EE] mb-2 shadow-[0_0_12px_rgba(34,211,238,0.4)]" />
              <div className="text-xs font-semibold text-[#22D3EE]">--accent (Cyan)</div>
              <div className="text-[11px] font-mono-data text-[var(--text-muted)]">#22D3EE</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] text-left">
              <div className="h-6 w-full rounded bg-[#8B5CF6] mb-2 shadow-[0_0_12px_rgba(139,92,246,0.4)]" />
              <div className="text-xs font-semibold text-[#8B5CF6]">--accent-2 (Violet)</div>
              <div className="text-[11px] font-mono-data text-[var(--text-muted)]">#8B5CF6</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)] text-left">
              <div className="h-6 w-full rounded bg-[#34D399] mb-2 shadow-[0_0_12px_rgba(52,211,153,0.4)]" />
              <div className="text-xs font-semibold text-[#34D399]">--accent-3 (Emerald)</div>
              <div className="text-[11px] font-mono-data text-[var(--text-muted)]">#34D399</div>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-3">
            Domain Accent Mapping (Board 03)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <div className="p-4 rounded-xl border border-[#F472B6]/30 bg-[#F472B6]/5 text-left">
              <span className="h-3 w-3 rounded-full bg-[#F472B6] inline-block mb-2" />
              <div className="font-semibold text-sm text-[#F472B6]">Medicine & Bio</div>
              <div className="text-xs text-[var(--text-muted)]">#F472B6 · Genetics & Oncology</div>
            </div>
            <div className="p-4 rounded-xl border border-[#34D399]/30 bg-[#34D399]/5 text-left">
              <span className="h-3 w-3 rounded-full bg-[#34D399] inline-block mb-2" />
              <div className="font-semibold text-sm text-[#34D399]">Agriculture</div>
              <div className="text-xs text-[var(--text-muted)]">#34D399 · Hyperspectral Crop AI</div>
            </div>
            <div className="p-4 rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/5 text-left">
              <span className="h-3 w-3 rounded-full bg-[#22D3EE] inline-block mb-2" />
              <div className="font-semibold text-sm text-[#22D3EE]">Physics</div>
              <div className="text-xs text-[var(--text-muted)]">#22D3EE · Hamiltonian Dynamics</div>
            </div>
            <div className="p-4 rounded-xl border border-[#A78BFA]/30 bg-[#A78BFA]/5 text-left">
              <span className="h-3 w-3 rounded-full bg-[#A78BFA] inline-block mb-2" />
              <div className="font-semibold text-sm text-[#A78BFA]">Mathematics</div>
              <div className="text-xs text-[var(--text-muted)]">#A78BFA · Automated Reasoning</div>
            </div>
            <div className="p-4 rounded-xl border border-[#FBBF24]/30 bg-[#FBBF24]/5 text-left">
              <span className="h-3 w-3 rounded-full bg-[#FBBF24] inline-block mb-2" />
              <div className="font-semibold text-sm text-[#FBBF24]">Frontier Labs</div>
              <div className="text-xs text-[var(--text-muted)]">#FBBF24 · Quantum & Hybrid</div>
            </div>
          </div>
        </Container>

        {/* 2. Buttons & Interaction States */}
        <Container size="ultra">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
                <span className="text-[var(--accent)]">02.</span>
                <span>Buttons & Interaction States</span>
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Default, hover (brightness + glow), focus ring (2px cyan), disabled (40%), loading with fixed width.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setBtnLoading(!btnLoading)}
              className="self-start sm:self-auto"
            >
              Toggle Loading State ({btnLoading ? "Active" : "Inactive"})
            </Button>
          </div>

          <Card variant="standard" padding="lg">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-3">
                  Button Variants (md · 44px min touch target)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" isLoading={btnLoading}>
                    Primary Cyan
                  </Button>
                  <Button variant="violet" isLoading={btnLoading}>
                    Violet Synapse
                  </Button>
                  <Button variant="secondary" isLoading={btnLoading}>
                    Secondary Hairline
                  </Button>
                  <Button variant="ghost" isLoading={btnLoading}>
                    Ghost Button
                  </Button>
                  <Button variant="danger" isLoading={btnLoading}>
                    Danger Action
                  </Button>
                  <Button variant="outline" isLoading={btnLoading}>
                    Outline Button
                  </Button>
                  <Button variant="glass" isLoading={btnLoading}>
                    Glass Button
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled (40%)
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-3">
                  Sizes Scale
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="primary">
                    Small (36px)
                  </Button>
                  <Button size="md" variant="primary">
                    Medium (44px)
                  </Button>
                  <Button size="lg" variant="primary">
                    Large (48px)
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>

        {/* 3. Cards & Glass System */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">03.</span>
              <span>Cards, Glass & Stat Tickers</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Hairline standard cards, high-fidelity glass cards with 16px blur, and JetBrains Mono metric cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="standard">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="cyan">Standard Card</Badge>
                  <span className="text-xs text-[var(--text-muted)]">elev-1 + hairline</span>
                </div>
                <CardTitle className="mt-2">Algorithmic Synthesis</CardTitle>
                <CardDescription>
                  Standard card container with 1px border and elev-1 background elevation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Used across all regular dashboard panels, course listings, and research archives. Meets high contrast requirements.
                </p>
              </CardContent>
              <CardFooter className="justify-between text-xs text-[var(--text-muted)]">
                <span>Updated 2 hrs ago</span>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  Inspect <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="violet">Glass Card</Badge>
                  <span className="text-xs text-[var(--text-muted)]">blur(16) + sat(140%)</span>
                </div>
                <CardTitle className="mt-2">Synapse Neural Layer</CardTitle>
                <CardDescription>
                  Subtle translucency overlay with fallback for reduced transparency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Maximum 3 glass cards in view rule applied. Accentuates hero teasers, pricing highlights, and floating controls.
                </p>
              </CardContent>
              <CardFooter className="justify-between text-xs text-[var(--text-muted)]">
                <span>GPU Acceleration</span>
                <Badge variant="success">Active</Badge>
              </CardFooter>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Interactive Card</Badge>
                  <ExternalLink className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <CardTitle className="mt-2">Clickable Scope Item</CardTitle>
                <CardDescription>
                  Smooth hover scale, elevation shift, and cyan border glow on pointer hover.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Hover to preview state change. Used for course catalog cards, research paper links, and project configurators.
                </p>
              </CardContent>
              <CardFooter className="text-xs text-[var(--accent)] font-medium">
                Click to explore interactive details →
              </CardFooter>
            </Card>
          </div>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-3">
            Stat Cards (Mono Numbers · Board 03)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Active LLM Clusters"
              value="48"
              subValue="Distributed across 4 regions"
              trend={{ value: "12%", isPositive: true }}
              icon={<Cpu className="h-4 w-4" />}
            />
            <StatCard
              label="Published Papers"
              value="142"
              subValue="Peer-reviewed citations"
              trend={{ value: "8 this mo", isPositive: true }}
              icon={<Activity className="h-4 w-4" />}
            />
            <StatCard
              label="Median Latency"
              value="18.4ms"
              subValue="Global inference p99"
              trend={{ value: "3.2ms", isPositive: true }}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatCard
              label="Academy Learners"
              value="12,450"
              subValue="Verified certificate holders"
              trend={{ value: "24%", isPositive: true }}
              icon={<Shield className="h-4 w-4" />}
            />
          </div>
        </Container>

        {/* 4. Form Controls & Accessible Inputs */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">04.</span>
              <span>Form Controls & Accessible Inputs</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              48px input height, visible labels, inline validation, aria-describedby errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="standard" padding="lg" className="space-y-4">
              <h3 className="font-semibold text-base">Text Inputs & Validation</h3>

              <Input
                label="Full Name"
                placeholder="Dr. Alan Turing"
                helperText="Enter your official academic or corporate name"
                required
              />

              <Input
                label="Corporate Email"
                placeholder="name@enterprise.com"
                defaultValue="invalid-email-address@"
                error="Please enter a valid RFC-5322 compliant email address"
              />

              <Textarea
                label="Research Abstract / Project Brief"
                placeholder="Describe your research inquiry or project requirements..."
                helperText="Markdown syntax supported. Maximum 2000 characters."
              />
            </Card>

            <Card variant="standard" padding="lg" className="space-y-6">
              <h3 className="font-semibold text-base">Selection Primitives</h3>

              <div className="space-y-2">
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Research Domain Focus
                </label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medicine & Computational Biology</SelectItem>
                    <SelectItem value="agri">Precision Agriculture</SelectItem>
                    <SelectItem value="physics">Theoretical Physics</SelectItem>
                    <SelectItem value="math">Higher Mathematics</SelectItem>
                    <SelectItem value="frontier">Novel Algorithms & Frontier Labs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 border-t border-[var(--border)] space-y-3">
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Checkboxes & Toggles
                </label>
                <Checkbox
                  checked={checkedBox}
                  onCheckedChange={(c) => setCheckedBox(Boolean(c))}
                  label="Enable multi-step tool verification guardrails"
                  description="Ensures every autonomous tool execution passes cryptographic verification."
                />

                <Switch
                  checked={switchVal}
                  onCheckedChange={setSwitchVal}
                  label="High-throughput Streaming Mode"
                  description="Emits token streams via SSE with lower latency buffers."
                />
              </div>

              <div className="pt-2 border-t border-[var(--border)] space-y-3">
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Radio Group
                </label>
                <RadioGroup value={radioVal} onValueChange={setRadioVal}>
                  <RadioGroupItem
                    value="standard"
                    label="Standard Tier (Shared Cloud)"
                    description="Ideal for development and non-sensitive workloads."
                  />
                  <RadioGroupItem
                    value="pro"
                    label="Synapse Enterprise Pro (Dedicated VPC)"
                    description="Zero data retention, sovereign deployment, custom fine-tunes."
                  />
                </RadioGroup>
              </div>
            </Card>
          </div>
        </Container>

        {/* 5. Radix Primitives: Dialog, Tabs, Accordion, Toast */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">05.</span>
              <span>Modals, Tabs, Accordions & Toasts</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Radix accessible primitives with smooth animations and keyboard focus trapping.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Modal Dialog & Toasts */}
            <Card variant="standard" padding="lg" className="space-y-6">
              <div>
                <h3 className="font-semibold text-base mb-2">Accessible Modal Dialog</h3>
                <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                  Includes focus trap, backdrop blur, Escape key listener, and keyboard accessible actions.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="primary">Open Verification Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Project Specification</DialogTitle>
                      <DialogDescription>
                        You are initiating an enterprise research engagement for Hamiltonian Dynamics ML.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Estimated Timeline:</span>
                        <span className="font-mono-data font-semibold">6 Weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Security Clearance:</span>
                        <span className="text-[#34D399] font-semibold">SOC2 Type II</span>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="primary"
                        onClick={() => notify.success("Project proposal confirmed and sent to lead architect!")}
                      >
                        Confirm & Dispatch
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="pt-6 border-t border-[var(--border)]">
                <h3 className="font-semibold text-base mb-2">Notification Toasts (Sonner)</h3>
                <div className="flex flex-wrap gap-2.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => notify.success("Paper bookmarked successfully", "Saved to your research library.")}
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => notify.warning("Quota threshold at 85%", "Consider expanding your GPU allocation.")}
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => notify.error("Payment authorization failed", "Please verify your card details.")}
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      notify.withUndo(
                        "Course enrollment archived",
                        () => notify.info("Action undone. Course restored."),
                        "You can restore it anytime within 30 days."
                      )
                    }
                  >
                    Toast with Undo
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tabs & Accordion */}
            <Card variant="standard" padding="lg" className="space-y-6">
              <div>
                <h3 className="font-semibold text-base mb-2">Animated Tabs</h3>
                <Tabs defaultValue="overview">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Research Overview</TabsTrigger>
                    <TabsTrigger value="architecture">Architecture</TabsTrigger>
                    <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="p-4 rounded-xl bg-[var(--bg-elev-2)] text-xs leading-relaxed text-[var(--text-muted)]">
                    Softcapphyjas conducts foundational investigation at the intersection of continuous physical systems and discrete neural networks.
                  </TabsContent>
                  <TabsContent value="architecture" className="p-4 rounded-xl bg-[var(--bg-elev-2)] text-xs leading-relaxed text-[var(--text-muted)]">
                    Heterogeneous compute pipeline utilizing JAX, PyTorch, pgvector embeddings, and custom GPU acceleration kernels.
                  </TabsContent>
                  <TabsContent value="benchmarks" className="p-4 rounded-xl bg-[var(--bg-elev-2)] text-xs leading-relaxed text-[var(--text-muted)]">
                    Achieved 99.4% conservation on energy manifold invariants compared to standard Runge-Kutta numerical integrators.
                  </TabsContent>
                </Tabs>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="font-semibold text-base mb-2">Animated Accordion</h3>
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What guarantees does Synapse offer for research citations?</AccordionTrigger>
                    <AccordionContent>
                      Every Synapse synthesis embeds cryptographic trace IDs linked directly to source preprints, peer-reviewed journals, or local enterprise documents.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can client models be deployed on-premise?</AccordionTrigger>
                    <AccordionContent>
                      Yes. Our Sovereign AI service builds fully isolated, air-gapped model artifacts deployable to Kubernetes or bare-metal GPU clusters.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </div>
        </Container>

        {/* 6. Sortable Table & Skeletons */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">06.</span>
              <span>Sortable Table & Skeletons</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Keyboard accessible table rows, sorting headers, and shimmer loading placeholders (no spinners alone).
            </p>
          </div>

          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable sortDirection={sortDirection} onSort={handleSort}>
                    Model / Artifact Name
                  </TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Inference Latency</TableHead>
                  <TableHead>Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>
                      <Badge variant={row.domain as DomainId} size="sm">
                        {row.domain.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono-data text-xs">{row.latency}</TableCell>
                    <TableCell className="font-mono-data text-xs font-semibold text-[var(--accent)]">
                      {row.accuracy}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-3">
                Skeleton Loading State (Board 03)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </Container>

        {/* 7. Global Components & Portals Navigation (Board 04) */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">07.</span>
              <span>Global Navigation & Mobile Drawer (Board 04)</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Mega-menu hover intent, command palette, floating Concierge chatbot, cookie banner, and mobile bottom tab bar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="standard" padding="lg" className="space-y-4">
              <h3 className="font-semibold text-base">Mobile Portal Bottom Tab Bar</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Rendered on mobile screens and authenticated student/client dashboards with active indicator.
              </p>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
                <BottomTabBar
                  activeTab={activeBottomTab}
                  onTabSelect={(id) => {
                    setActiveBottomTab(id);
                    notify.info(`Switched to tab: ${id.toUpperCase()}`);
                  }}
                  className="static relative w-full shadow-none border-0"
                />
              </div>
            </Card>

            <Card variant="standard" padding="lg" className="space-y-4">
              <h3 className="font-semibold text-base">Interactive Platform Tools</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Test platform-wide shortcuts, cookie controls, and network state banners.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={() => setCommandOpen(true)}
                  leftIcon={<Sparkles className="h-4 w-4" />}
                >
                  Open Command Palette (⌘K)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowOfflineBanner(!showOfflineBanner)}
                >
                  {showOfflineBanner ? "Disable Offline Banner" : "Simulate Offline Mode"}
                </Button>
              </div>
            </Card>
          </div>
        </Container>

        {/* 8. UI State Library (Board 39) */}
        <Container size="ultra">
          <div className="mb-6">
            <h2 className="text-h2 text-[var(--text)] flex items-center gap-2.5">
              <span className="text-[var(--accent)]">08.</span>
              <span>UI State Library & Edge Boundaries (Board 39)</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Standardized states across all widgets: Empty, Error + Retry + Error ID, Permission Denied, Rate-Limit countdown, Form Validation summary.
            </p>
          </div>

          {/* Form Error Summary */}
          <FormErrorSummary
            errors={[
              { fieldId: "sample-email", message: "Email format is invalid (RFC-5322 violation)" },
              { fieldId: "sample-pwd", message: "Password must contain at least 12 characters" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Empty State */}
            <EmptyState
              title="No enrolled courses yet"
              description="Explore our specialized research curriculum to begin your frontier intelligence pathway."
              action={{
                label: "Browse Catalog",
                onClick: () => notify.info("Navigating to Academy Catalog..."),
              }}
              secondaryAction={{
                label: "View Pricing Plans",
                onClick: () => notify.info("Navigating to Pricing Plans..."),
              }}
            />

            {/* Error State with Retry & ID */}
            <ErrorState
              title="Couldn't load client orders"
              message="A temporary database timeout occurred while fetching encrypted invoice records."
              errorId="ERR-8F2A-POSTGRES"
              onRetry={() => notify.success("Retried request: Orders reloaded successfully!")}
            />

            {/* Permission Denied */}
            <PermissionDeniedState
              roleRequired="FINANCE"
              resourceName="Revenue & Invoice Reconciliation"
              onRequestAccess={() => notify.info("Access request sent to Super Admin.")}
            />

            {/* Rate Limited (429) */}
            <RateLimitedState
              retryAfterSeconds={42}
              onRetry={() => notify.success("Cooldown complete. Resuming requests.")}
            />
          </div>
        </Container>
      </main>

      {/* Global Command Palette (Board 04) */}
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onToggleTheme={() => {
          const isLight = document.documentElement.classList.contains("light");
          if (isLight) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
          }
        }}
      />

      {/* Concierge Chatbot Widget (Board 04) */}
      <ConciergeChatbot />

      {/* Cookie Consent Banner (Board 04) */}
      <CookieBanner
        onAccept={() => notify.success("Analytics preferences saved.")}
        onReject={() => notify.info("Strict minimal cookies applied.")}
      />
    </div>
  );
}
