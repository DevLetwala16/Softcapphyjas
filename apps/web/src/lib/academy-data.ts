import { signCertificatePayload, generateCertificateId } from "@softcapphyjas/auth";

export interface QuestionData {
  id: string;
  kind: "MCQ" | "MULTI_SELECT" | "CODE";
  prompt: string;
  options: string[];
  answer: number | number[];
  explanation: string;
  points: number;
}

export interface QuizData {
  id: string;
  title: string;
  passMark: number;
  maxAttempts: number;
  timeLimitSec: number;
  questions: QuestionData[];
}

export interface LessonData {
  id: string;
  title: string;
  position: number;
  type: "VIDEO" | "ARTICLE" | "QUIZ" | "PDF";
  durationSec: number;
  isPreview: boolean;
  videoUrl?: string;
  muxPlaybackId?: string;
  contentMd?: string;
  quiz?: QuizData;
  resources?: { title: string; url: string; type: string }[];
}

export interface ModuleData {
  id: string;
  title: string;
  position: number;
  lessons: LessonData[];
}

export interface CourseReview {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  code: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "RESEARCH_GRADE";
  category: "ML" | "AGENTIC" | "LLMOPS" | "SECURITY" | "SYSTEM_DESIGN" | "PHYSICS";
  domain: "medical" | "agri" | "physics" | "math" | "frontier";
  priceInPaise: number;
  compareAtPaise?: number;
  emiEligible: boolean;
  durationMinutes: number;
  durationWeeks: string;
  hoursPerWeek: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    credentials: string[];
  };
  outcomes: string[];
  requirements: string[];
  previewVideoUrl: string;
  modules: ModuleData[];
  reviews: CourseReview[];
}

export interface PathwayData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  domain: "medical" | "agri" | "physics" | "math" | "frontier";
  totalDurationWeeks: number;
  totalHours: number;
  courses: string[]; // course slugs
  careerRoles: string[];
  avgSalaryInr: string;
  bundlePricePaise: number;
  originalPricePaise: number;
  savingsPercent: number;
  keySkills: string[];
}

export interface SubscriptionPlanData {
  id: string;
  code: string;
  name: string;
  interval: "MONTHLY" | "YEARLY" | "ENTERPRISE";
  pricePaise: number;
  priceDisplay: string;
  periodDisplay: string;
  popular?: boolean;
  description: string;
  features: string[];
  seats: number;
}

export const ACADEMY_PLANS: SubscriptionPlanData[] = [
  {
    id: "plan-monthly-pro",
    code: "MONTHLY_PRO",
    name: "Academy Pro Monthly",
    interval: "MONTHLY",
    pricePaise: 199900,
    priceDisplay: "₹1,999",
    periodDisplay: "/month",
    description: "Full access to our core curriculum, GPU sandboxes, and discussion mesh.",
    features: [
      "Access to all 6 foundational and advanced courses",
      "50 monthly GPU compute credits (A100 instances)",
      "Interactive code sandboxes & Jupyter notebooks",
      "Direct Q&A in faculty research forums",
      "Self-paced curriculum with completion badges",
      "Standard community support SLA (24 hrs)",
    ],
    seats: 1,
  },
  {
    id: "plan-annual-fellow",
    code: "ANNUAL_ALL_ACCESS",
    name: "Annual All-Access Fellow",
    interval: "YEARLY",
    pricePaise: 1799900,
    priceDisplay: "₹17,999",
    periodDisplay: "/year",
    popular: true,
    description: "The complete frontier education. 25% savings + 1-on-1 research mentorship.",
    features: [
      "Everything in Academy Pro Monthly",
      "Unlimited access to ALL courses & future releases",
      "250 monthly GPU compute credits (H100/A100)",
      "Cryptographically signed Ed25519 digital certificates",
      "Monthly 1-on-1 research office hours with faculty",
      "Early pre-print access to Softcapphyjas Frontier Lab papers",
      "Priority resume referrals to AI partner labs",
    ],
    seats: 1,
  },
  {
    id: "plan-enterprise-cohort",
    code: "ENTERPRISE_COHORT",
    name: "Enterprise Research Cohort",
    interval: "ENTERPRISE",
    pricePaise: 4999900,
    priceDisplay: "₹49,999",
    periodDisplay: "/seat/yr",
    description: "Custom team curriculum, private on-prem deployment, and dedicated faculty.",
    features: [
      "All Annual All-Access Fellow benefits",
      "Team analytics dashboard & manager progress reporting",
      "Dedicated Slack/Discord private faculty war-room",
      "Custom domain-specific Capstone project tailored to your tech stack",
      "Bi-weekly live bespoke masterclasses for your engineering team",
      "GST invoicing, consolidated billing, and enterprise PO support",
    ],
    seats: 10,
  },
];

export const ACADEMY_COURSES: CourseData[] = [
  {
    id: "autonomous-agents-arch",
    slug: "autonomous-agents-arch",
    title: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
    code: "ACA-501",
    subtitle: "Production cognitive agent loops, tool-call graphs, persistent vector memory, and self-healing execution",
    description:
      "Master production-grade cognitive agent loops, Monte Carlo tree search over tool call graphs, persistent memory vector fabrics, and self-healing execution sandboxes. Built for engineers deploying autonomous systems in high-reliability environments.",
    level: "ADVANCED",
    category: "AGENTIC",
    domain: "frontier",
    priceInPaise: 2499900,
    compareAtPaise: 3499900,
    emiEligible: true,
    durationMinutes: 2880, // 48 hours
    durationWeeks: "8 Weeks",
    hoursPerWeek: "6-8 hrs/week",
    rating: 4.95,
    reviewCount: 324,
    studentCount: 1420,
    instructor: {
      name: "Dr. Siddharth Iyer",
      title: "Chief AI Architect & Founding Fellow",
      bio: "Former Principal Research Engineer at DeepMind and leading contributor to neuro-symbolic reasoning frameworks. Authored 18+ papers in NeurIPS and ICML.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      credentials: ["PhD Computer Science, Stanford", "18 NeurIPS/ICML Publications", "Author of AgentMesh framework"],
    },
    outcomes: [
      "Architect multi-agent swarms with dynamic delegation, supervisor consensus, and debate protocols",
      "Deploy deterministic safety guards and sandboxed code execution kernels with sub-millisecond overhead",
      "Integrate persistent RAG with hybrid semantic, BM25, and graph knowledge bases",
      "Implement self-healing execution loops with automated error diagnosis and plan backtracking",
      "Benchmark agent trajectories against AgentBench, SWE-bench, and GAIA benchmarks",
    ],
    requirements: [
      "Strong proficiency in modern Python 3.11+ and async programming",
      "Familiarity with transformer architectures and LLM API parameters (temperature, top_p, logprobs)",
      "Basic understanding of vector embeddings and cosine distance metrics",
    ],
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Cognitive Loop Topologies & ReAct Formalisms",
        position: 1,
        lessons: [
          {
            id: "les-1-1",
            title: "ReAct, Reflexion & Self-Correcting Execution Trajectories",
            position: 1,
            type: "VIDEO",
            durationSec: 2100,
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            contentMd: `### ReAct & Reflexion Formalisms

The fundamental challenge in single-step LLM completion is the lack of test-time search and environmental grounding. 
ReAct (*Reasoning + Acting*) bridges this by interleaving thought steps with action calls:

$$\\tau_t = (o_1, a_1, o_2, a_2, \\dots, o_t, a_t)$$

where each step $a_t$ is chosen conditioned on the prompt and past observations $o_{1:t}$.

#### Key Architectural Components
1. **Thought State Generator**: Translates the global objective into an immediate sub-goal.
2. **Deterministic Tool Schema**: JSON Schema validation ensuring zero malformed payloads.
3. **Execution Sandbox**: Isolated environment providing stdout, stderr, and return codes.
4. **Reflexion Buffer**: Ephemeral memory storing failed trajectories to prevent circular loops.

\`\`\`python
class AgentLoop:
    def __init__(self, model, tools, memory):
        self.model = model
        self.tools = tools
        self.memory = memory

    async def step(self, state: AgentState) -> StepResult:
        thought = await self.model.generate_thought(state)
        action = await self.model.select_action(state, thought)
        observation = await self.tools.execute(action)
        return StepResult(thought=thought, action=action, observation=observation)
\`\`\`
`,
            resources: [
              { title: "Yao et al. - ReAct Paper (ICLR 2023)", url: "https://arxiv.org/abs/2210.03629", type: "PDF" },
              { title: "Multi-Agent Loop Reference Notebook", url: "#", type: "JUPYTER" },
            ],
          },
          {
            id: "les-1-2",
            title: "Deterministic Tool-Call Graphs & JSON Schema Validation",
            position: 2,
            type: "ARTICLE",
            durationSec: 1500,
            isPreview: false,
            contentMd: `### Deterministic Tool Validation

When autonomous agents interact with external APIs, databases, or terminal shells, non-deterministic outputs can cause cascading failures.

#### Zod / Pydantic Verification Pipeline
- Every tool parameter must be strictly typed.
- Constrained generation prevents hallucinations of invalid arguments.
- Any validation failure triggers an automatic corrective reflection loop with the exact schema violation error delivered back to the planner.
`,
          },
          {
            id: "les-1-3",
            title: "Module 1 Mastery Quiz: Agent Loops & Reasoning",
            position: 3,
            type: "QUIZ",
            durationSec: 900,
            isPreview: false,
            quiz: {
              id: "quiz-mod-1",
              title: "Module 1 Mastery Assessment: Cognitive Loops",
              passMark: 70,
              maxAttempts: 3,
              timeLimitSec: 600,
              questions: [
                {
                  id: "q-1-1",
                  kind: "MCQ",
                  prompt: "In the ReAct framework, what is the primary purpose of generating an explicit 'Thought' step before executing an 'Action'?",
                  options: [
                    "To decompose complex multi-step reasoning and ground future tool arguments",
                    "To reduce the number of tokens sent to the API provider",
                    "To prevent the model from using external APIs",
                    "To encrypt the conversation history against injection",
                  ],
                  answer: 0,
                  explanation:
                    "Generating explicit thoughts allows the model to perform test-time chain-of-thought search, track intermediate goals, and synthesize accurate arguments for downstream tool execution.",
                  points: 25,
                },
                {
                  id: "q-1-2",
                  kind: "MCQ",
                  prompt: "Which mechanism prevents an agent from entering infinite retry loops when a tool consistently throws a 500 server error?",
                  options: [
                    "A finite Reflexion retry counter paired with plan backtracking",
                    "Increasing the temperature parameter to 2.0",
                    "Removing system prompt instructions",
                    "Ignoring the error and marking the task as successful",
                  ],
                  answer: 0,
                  explanation:
                    "A capped retry policy combined with episodic reflexion allows the agent to diagnose failure, mark the tool path as dead, and backtrack to alternative sub-plans.",
                  points: 25,
                },
                {
                  id: "q-1-3",
                  kind: "MULTI_SELECT",
                  prompt: "Select ALL essential elements of a production-grade Agent Sandbox (select 2):",
                  options: [
                    "Ephemeral filesystem isolation with strict network and CPU limits",
                    "Unlimited root access to the host operating system",
                    "Deterministic timeout gates on all child process executions",
                    "Disabling all logging and audit trails",
                  ],
                  answer: [0, 2],
                  explanation:
                    "Production sandboxes require strict isolation (filesystem, network, compute quotas) and deterministic execution timeouts to prevent denial of service.",
                  points: 25,
                },
                {
                  id: "q-1-4",
                  kind: "CODE",
                  prompt: "When validating a tool call parameter schema, which approach guarantees zero runtime type failures?",
                  options: [
                    "Pre-executing strict schema validation (Zod/Pydantic) before calling the underlying binary",
                    "Using Python eval() on the string representation",
                    "Assuming the LLM never produces syntax errors",
                    "Converting all parameters to raw strings and ignoring errors",
                  ],
                  answer: 0,
                  explanation:
                    "Strict pre-flight schema parsing guarantees that only structurally valid, type-safe arguments reach the execution runtime.",
                  points: 25,
                },
              ],
            },
          },
        ],
      },
      {
        id: "mod-2",
        title: "Module 2: Multi-Agent Consensus, Swarms & Supervisor Patterns",
        position: 2,
        lessons: [
          {
            id: "les-2-1",
            title: "Hierarchical Supervisor vs Peer-to-Peer Consensus",
            position: 1,
            type: "VIDEO",
            durationSec: 2400,
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            contentMd: `### Hierarchical Swarm Orchestration

In complex software engineering or scientific discovery tasks, a single agent often exceeds its effective context budget.
We structure swarms into:
1. **Supervisor Agent**: Maintains high-level task DAG and assigns slices to specialist workers.
2. **Worker Agents**: Specialized with dedicated tools (e.g., Code Writer, Tester, Security Auditor).
3. **Consensus Evaluator**: Runs deterministic unit tests and verifiers to gate transitions.
`,
          },
          {
            id: "les-2-2",
            title: "Shared Message Board & Non-Blocking Reactive Wakeup",
            position: 2,
            type: "ARTICLE",
            durationSec: 1800,
            isPreview: false,
            contentMd: `### Reactive Swarm Messaging Architecture

Rather than synchronous blocking polls, modern swarm agents communicate through an append-only event bus.
Agents wake up reactively when messages addressed to them are delivered.
`,
          },
        ],
      },
      {
        id: "mod-3",
        title: "Module 3: Capstone Swarm Implementation & Production Deployment",
        position: 3,
        lessons: [
          {
            id: "les-3-1",
            title: "Deploying Autonomous Code Review Swarms on Kubernetes",
            position: 1,
            type: "VIDEO",
            durationSec: 2700,
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          {
            id: "les-3-2",
            title: "Capstone Project Evaluation & Certification Criteria",
            position: 2,
            type: "PDF",
            durationSec: 1200,
            isPreview: false,
            contentMd: "### Capstone Project: Production Autonomous Coding Swarm\n\nSubmit your GitHub repository demonstrating a 3-agent swarm solving SWE-bench test issues with >= 60% pass rate.",
          },
        ],
      },
    ],
    reviews: [
      {
        id: "rev-1",
        name: "Arunava Mukherjee",
        title: "Staff AI Engineer, Tier 1 Fintech",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Easily the most rigorous course on autonomous agents available anywhere. Dr. Iyer cuts through the hype and focuses on production invariants, sandboxing, and deterministic verification. We migrated our entire internal tool-use stack based on Module 2.",
      },
      {
        id: "rev-2",
        name: "Jessica Chen",
        title: "Principal ML Research Engineer",
        rating: 5,
        date: "1 month ago",
        comment:
          "The interactive quiz engine and code assignments forced me to deeply understand why naive agent loops fail in production. The Ed25519 verifiable certificate is proudly showcased on my team profile.",
      },
      {
        id: "rev-3",
        name: "Vikram Malhotra",
        title: "Founding Engineer, Generative AI Startup",
        rating: 5,
        date: "2 months ago",
        comment:
          "The zero-cost EMI made this an instant yes for me. Completed all 3 modules in 4 weeks and built our company's core agent orchestration engine.",
      },
    ],
  },
  {
    id: "quantum-ml-variational",
    slug: "quantum-ml-variational",
    title: "Quantum Machine Learning & Variational Algorithms",
    code: "ACA-602",
    subtitle: "Parameterized quantum circuits (PQCs), VQE, and hybrid quantum-classical neural networks on CUDA-Q",
    description:
      "Bridge quantum computing theory with production PyTorch pipelines. Formulate parameterized quantum circuits (PQCs), variational quantum eigensolvers (VQE), and simulate molecular Hamiltonians on NVIDIA CUDA-Q and PennyLane.",
    level: "RESEARCH_GRADE",
    category: "PHYSICS",
    domain: "physics",
    priceInPaise: 2999900,
    compareAtPaise: 3999900,
    emiEligible: true,
    durationMinutes: 3600, // 60 hours
    durationWeeks: "10 Weeks",
    hoursPerWeek: "8-10 hrs/week",
    rating: 4.98,
    reviewCount: 189,
    studentCount: 680,
    instructor: {
      name: "Dr. Elena Rostova",
      title: "Senior Quantum Research Fellow",
      bio: "Former researcher at CERN and Max Planck Institute for Quantum Optics. Specializes in variational quantum algorithms for material simulation.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      credentials: ["PhD Quantum Physics, ETH Zurich", "CERN Quantum Technology Initiative", "14 Physical Review Letters"],
    },
    outcomes: [
      "Program variational quantum circuits with PennyLane and Qiskit",
      "Execute hybrid quantum-classical neural networks on GPU simulators via CUDA-Q",
      "Implement quantum kernel estimation for high-dimensional drug discovery datasets",
      "Mitigate quantum barren plateaus using layerwise training and identity initialization",
      "Calculate ground state energies of molecular Hamiltonians using VQE",
    ],
    requirements: [
      "Solid foundation in linear algebra (eigenvalues, unitary operators, Hilbert spaces)",
      "Intermediate PyTorch or JAX experience",
      "Basic understanding of quantum mechanics concepts (qubits, superposition, entanglement)",
    ],
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    modules: [
      {
        id: "qmod-1",
        title: "Module 1: Mathematical Foundations of Qubits & Unitary Gates",
        position: 1,
        lessons: [
          {
            id: "qles-1-1",
            title: "State Vectors, Bloch Sphere & Unitary Operators",
            position: 1,
            type: "VIDEO",
            durationSec: 2400,
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          {
            id: "qles-1-2",
            title: "Entanglement, Bell States & Density Matrices",
            position: 2,
            type: "ARTICLE",
            durationSec: 1800,
            isPreview: false,
          },
        ],
      },
      {
        id: "qmod-2",
        title: "Module 2: Parameterized Quantum Circuits & Hybrid Gradients",
        position: 2,
        lessons: [
          {
            id: "qles-2-1",
            title: "Parameter Shift Rule vs Finite Differences",
            position: 1,
            type: "VIDEO",
            durationSec: 2700,
            isPreview: false,
          },
          {
            id: "qles-2-2",
            title: "Barren Plateaus & Gradient Vanishing in Quantum Manifolds",
            position: 2,
            type: "QUIZ",
            durationSec: 900,
            isPreview: false,
            quiz: {
              id: "quiz-q-1",
              title: "Quantum Circuit Gradients & Optimization",
              passMark: 70,
              maxAttempts: 3,
              timeLimitSec: 600,
              questions: [
                {
                  id: "qq-1",
                  kind: "MCQ",
                  prompt: "Why is the Parameter Shift Rule superior to numerical finite differences on quantum hardware?",
                  options: [
                    "It computes exact analytical gradients without introducing discretization bias $\\epsilon$",
                    "It requires zero quantum circuit executions",
                    "It only works on classical computers",
                    "It converts quantum circuits into linear regressions",
                  ],
                  answer: 0,
                  explanation:
                    "The parameter-shift rule leverages the trigonometric structure of quantum gates to evaluate exact analytical partial derivatives without floating-point discretization errors.",
                  points: 50,
                },
                {
                  id: "qq-2",
                  kind: "MCQ",
                  prompt: "What causes barren plateaus in deep random parameterized quantum circuits?",
                  options: [
                    "Concentration of measure over the Haar measure leading to exponentially vanishing variance of the gradient",
                    "Underfitting due to too few qubits",
                    "High CPU memory utilization",
                    "Excessive floating point precision",
                  ],
                  answer: 0,
                  explanation:
                    "According to McClean et al., as random quantum circuits grow deeper, the gradient variance decays exponentially with the number of qubits due to Haar measure concentration.",
                  points: 50,
                },
              ],
            },
          },
        ],
      },
    ],
    reviews: [
      {
        id: "qrev-1",
        name: "Devendra Patil",
        title: "Senior Quantum Algorithms Researcher",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Unbelievable depth. The CUDA-Q integration labs allowed our lab to run 30-qubit simulations directly in PyTorch workflows. Recommended without reservation.",
      },
    ],
  },
  {
    id: "neuro-symbolic-verification",
    slug: "neuro-symbolic-verification",
    title: "Neuro-Symbolic AI & Automated Formal Verification",
    code: "ACA-703",
    subtitle: "Connect deep neural networks with SMT constraint solvers (Z3) and interactive theorem provers (Lean 4)",
    description:
      "Eliminate hallucinations in safety-critical medical, financial, and avionics domains. Connect continuous deep neural representations with discrete symbolic constraint solvers (Z3, CVC5) and machine-checked theorem provers (Lean 4).",
    level: "ADVANCED",
    category: "SECURITY",
    domain: "medical",
    priceInPaise: 3499900,
    compareAtPaise: 4499900,
    emiEligible: true,
    durationMinutes: 4320, // 72 hours
    durationWeeks: "12 Weeks",
    hoursPerWeek: "8-10 hrs/week",
    rating: 4.97,
    reviewCount: 142,
    studentCount: 490,
    instructor: {
      name: "Pranav Nair",
      title: "Head of Formal Reasoning & Safety",
      bio: "Pioneer in neural network verification and SMT-guided constraint learning. Co-developed safety specifications for autonomous clinical decision systems.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      credentials: ["MSc Mathematics, Cambridge", "Founding Engineer at Softcapphyjas Formal Labs", "Certified Lean 4 Master"],
    },
    outcomes: [
      "Formulate invariant specifications and safety contracts for neural network outputs",
      "Embed Z3 and CVC5 constraint solvers directly into PyTorch differentiable loss loops",
      "Synthesize machine-checked mathematical proofs in Lean 4",
      "Deploy certified robust classification boundaries for medical diagnostics",
      "Perform automated counterexample-guided abstraction refinement (CEGAR)",
    ],
    requirements: [
      "Familiarity with first-order predicate logic and propositional calculus",
      "Python programming fluency with basic PyTorch experience",
      "Desire for mathematical rigor and absolute correctness",
    ],
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    modules: [
      {
        id: "nsmod-1",
        title: "Module 1: Formal Logic, SAT/SMT Solvers & Z3 PyTorch Bindings",
        position: 1,
        lessons: [
          {
            id: "nsles-1-1",
            title: "Propositional Logic, DPLL & Modern SMT Theories",
            position: 1,
            type: "VIDEO",
            durationSec: 2500,
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          {
            id: "nsles-1-2",
            title: "Formulating Invariant Contracts in Medical Diagnostics",
            position: 2,
            type: "ARTICLE",
            durationSec: 1900,
            isPreview: false,
          },
        ],
      },
    ],
    reviews: [
      {
        id: "nsrev-1",
        name: "Dr. Ananya Ray",
        title: "Director of Computational Medicine",
        rating: 5,
        date: "1 month ago",
        comment:
          "For anyone working in healthcare AI where a hallucination has real human consequences, this course is mandatory reading. Pranav's formulation of SMT loss functions is breathtaking.",
      },
    ],
  },
  {
    id: "machine-learning-foundations",
    slug: "machine-learning-foundations",
    title: "Machine Learning Foundations & Mathematical Rigor",
    code: "ACA-101",
    subtitle: "From linear algebra and convex optimization to modern gradient architectures",
    description:
      "Master the foundational mathematics that govern deep representations: vector spaces, spectral theorem, stochastic approximation, and information geometry. Build an unshakable theoretical foundation.",
    level: "BEGINNER",
    category: "ML",
    domain: "math",
    priceInPaise: 499900,
    compareAtPaise: 899900,
    emiEligible: true,
    durationMinutes: 1920,
    durationWeeks: "6 Weeks",
    hoursPerWeek: "5-6 hrs/week",
    rating: 4.92,
    reviewCount: 450,
    studentCount: 2800,
    instructor: {
      name: "Prof. Elena Vance",
      title: "Lead Curriculum Fellow & Emeritus Chair",
      bio: "Former Professor of Applied Mathematics at IIT Bombay. Dedicated 20+ years to pedagogical excellence in computational optimization.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      credentials: ["PhD Mathematics, Princeton", "Author of Modern Convex Analysis", "3-time Outstanding Educator Award"],
    },
    outcomes: [
      "Decompose high-dimensional manifolds using SVD, PCA, and spectral clustering",
      "Formulate constrained optimization problems using KKT optimality and Lagrange duality",
      "Derive backpropagation and stochastic gradient dynamics from first principles",
      "Implement deep neural architectures from scratch in NumPy without autodiff libraries",
    ],
    requirements: [
      "High-school calculus and introductory algebra",
      "Basic familiarity with Python syntax",
    ],
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    modules: [
      {
        id: "mlmod-1",
        title: "Module 1: Vector Spaces & High-Dimensional Geometry",
        position: 1,
        lessons: [
          {
            id: "mlles-1-1",
            title: "Spectral Decompositions & Principal Component Manifolds",
            position: 1,
            type: "VIDEO",
            durationSec: 1800,
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          {
            id: "mlles-1-2",
            title: "Convex Duals & Karush-Kuhn-Tucker Optimality",
            position: 2,
            type: "ARTICLE",
            durationSec: 900,
            isPreview: false,
          },
        ],
      },
    ],
    reviews: [
      {
        id: "mlrev-1",
        name: "Rahul Verma",
        title: "Junior Data Scientist",
        rating: 5,
        date: "2 months ago",
        comment:
          "The clearest explanation of SVD and Lagrange multipliers I have ever encountered. Every engineer should take this course.",
      },
    ],
  },
  {
    id: "frontier-llmops-and-alignment",
    slug: "frontier-llmops-and-alignment",
    title: "Frontier LLMOps, DPO & Mechanistic Interpretability",
    code: "ACA-505",
    subtitle: "Production fine-tuning, direct preference optimization, sparse autoencoders, and continuous safety canary deployment",
    description:
      "Learn direct preference optimization (DPO), representation engineering, sparse autoencoders (SAE), continuous canary evaluation, and high-throughput vLLM/TensorRT-LLM cluster deployment.",
    level: "ADVANCED",
    category: "LLMOPS",
    domain: "frontier",
    priceInPaise: 1299900,
    compareAtPaise: 1999900,
    emiEligible: true,
    durationMinutes: 2880,
    durationWeeks: "8 Weeks",
    hoursPerWeek: "6-8 hrs/week",
    rating: 4.96,
    reviewCount: 215,
    studentCount: 890,
    instructor: {
      name: "Dr. Siddharth Iyer",
      title: "Chief AI Architect",
      bio: "Former Principal Research Engineer at DeepMind and leading contributor to high-throughput inference engines.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      credentials: ["PhD Stanford", "vLLM Contributor", "Author of Production Alignment Guide"],
    },
    outcomes: [
      "Fine-tune 70B models using LoRA, QLoRA, and FlashAttention-3",
      "Align models using Direct Preference Optimization (DPO) and KTO",
      "Probe inner activations using Sparse Autoencoders (SAE) for mechanistic interpretability",
      "Deploy scalable distributed inference clusters with continuous canary health monitoring",
    ],
    requirements: [
      "Fluency in PyTorch and Hugging Face Transformers",
      "Familiarity with Linux terminal and CUDA GPU environments",
    ],
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    modules: [
      {
        id: "llmmod-1",
        title: "Module 1: High-Performance Distributed Training & PEFT",
        position: 1,
        lessons: [
          {
            id: "llmles-1-1",
            title: "FSDP, DeepSpeed ZeRO-3 & LoRA Math",
            position: 1,
            type: "VIDEO",
            durationSec: 2400,
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
        ],
      },
    ],
    reviews: [
      {
        id: "llmrev-1",
        name: "Karan Johar",
        title: "MLOps Lead, SaaS Unicorn",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "The sparse autoencoder and mechanistic interpretability module alone is worth ten times the tuition.",
      },
    ],
  },
  {
    id: "distributed-system-design-ai",
    slug: "distributed-system-design-ai",
    title: "Distributed Systems Design for AI & Vector Meshes",
    code: "ACA-404",
    subtitle: "High-scale vector indexing (HNSW, DiskANN), distributed caching, and sub-10ms cognitive retrieval architectures",
    description:
      "Design and operate planet-scale vector storage fabrics, hybrid BM25+dense retrieval pipelines, and distributed asynchronous task queues. Learn how to handle millions of queries per second with sub-10ms P99 latency.",
    level: "INTERMEDIATE",
    category: "SYSTEM_DESIGN",
    domain: "frontier",
    priceInPaise: 999900,
    compareAtPaise: 1599900,
    emiEligible: true,
    durationMinutes: 2160,
    durationWeeks: "6 Weeks",
    hoursPerWeek: "5-7 hrs/week",
    rating: 4.91,
    reviewCount: 310,
    studentCount: 1100,
    instructor: {
      name: "Dr. Marcus Thorne",
      title: "Principal Scientist & Distributed Systems Fellow",
      bio: "15+ years architecting global distributed databases and vector indexing protocols.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      credentials: ["Former Lead Architect at AWS DynamoDB", "12 Patents in Distributed Data Structures"],
    },
    outcomes: [
      "Build custom HNSW and Product Quantization indices from first principles",
      "Implement multi-region active-active vector replication with Raft consensus",
      "Deploy low-latency RAG caching fabrics using Redis, Milvus, and pgvector",
      "Benchmark P99 query latency under adversarial load using locust and k6",
    ],
    requirements: [
      "Solid knowledge of OS primitives, networking (TCP, HTTP/2, gRPC), and data structures",
      "Experience with concurrent programming in Go, Rust, or Python",
    ],
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    modules: [
      {
        id: "sysmod-1",
        title: "Module 1: Vector Indexing Primitives & Quantization",
        position: 1,
        lessons: [
          {
            id: "sysles-1-1",
            title: "HNSW Graphs, Skip Lists & Metric Space Traversal",
            position: 1,
            type: "VIDEO",
            durationSec: 2200,
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
        ],
      },
    ],
    reviews: [
      {
        id: "sysrev-1",
        name: "Shreya Gupta",
        title: "Senior Backend Architect",
        rating: 5,
        date: "1 month ago",
        comment:
          "Clear, rigorous, and completely practical. We reduced our vector search P99 latency from 85ms to 8ms by applying Dr. Thorne's DiskANN caching pattern.",
      },
    ],
  },
];

export const ACADEMY_PATHWAYS: PathwayData[] = [
  {
    slug: "agentic-ai-developer",
    title: "Agentic AI Developer & Autonomous Swarms",
    tagline: "From cognitive loops to enterprise multi-agent meshes",
    description:
      "Become a specialist in autonomous agent engineering: cognitive loop topologies (ReAct, Reflexion), deterministic tool-calling graphs, tree-of-thought search, persistent vector memory, and self-healing execution kernels.",
    domain: "frontier",
    totalDurationWeeks: 14,
    totalHours: 72,
    courses: ["autonomous-agents-arch", "distributed-system-design-ai"],
    careerRoles: ["Lead Agentic AI Engineer", "Autonomous Systems Architect", "Cognitive Mesh Engineer"],
    avgSalaryInr: "₹38 LPA - ₹65 LPA",
    bundlePricePaise: 2999900,
    originalPricePaise: 3499800,
    savingsPercent: 14,
    keySkills: ["Multi-Agent Swarms", "Tool Call Graphs", "ReAct Loops", "Vector Meshes", "Sandboxed Execution"],
  },
  {
    slug: "ml-engineer",
    title: "Machine Learning Engineer & Mathematical Rigor",
    tagline: "Unshakable theoretical foundations & production PyTorch",
    description:
      "Master the rigorous mathematics that govern machine intelligence: high-dimensional geometry, convex optimization, Lagrange duality, and foundational deep learning representations.",
    domain: "math",
    totalDurationWeeks: 16,
    totalHours: 80,
    courses: ["machine-learning-foundations", "frontier-llmops-and-alignment"],
    careerRoles: ["Senior Machine Learning Engineer", "Mathematical Research Scientist", "Deep Learning Architect"],
    avgSalaryInr: "₹32 LPA - ₹55 LPA",
    bundlePricePaise: 1499900,
    originalPricePaise: 1799800,
    savingsPercent: 17,
    keySkills: ["Spectral Decompositions", "Convex Optimization", "Deep Representations", "PyTorch Internal Autograd"],
  },
  {
    slug: "llmops-engineer",
    title: "Frontier MLOps & LLM Alignment Architect",
    tagline: "Fine-tuning, Direct Preference Optimization & Mechanistic Interpretability",
    description:
      "Master post-training alignment (DPO, KTO, RLHF), sparse autoencoders for internal representation steering, and continuous canary deployment across distributed GPU clusters.",
    domain: "frontier",
    totalDurationWeeks: 14,
    totalHours: 70,
    courses: ["frontier-llmops-and-alignment", "distributed-system-design-ai"],
    careerRoles: ["Staff LLMOps Architect", "Model Alignment Engineer", "AI Infrastructure Lead"],
    avgSalaryInr: "₹40 LPA - ₹70 LPA",
    bundlePricePaise: 1899900,
    originalPricePaise: 2299800,
    savingsPercent: 17,
    keySkills: ["DPO Alignment", "LoRA / QLoRA", "Sparse Autoencoders", "vLLM Inference Meshes", "Continuous Safety Canaries"],
  },
  {
    slug: "ai-security-specialist",
    title: "AI Safety, Formal Verification & Red Teaming",
    tagline: "Eliminate hallucinations with SMT solvers and Lean 4 proofs",
    description:
      "Specialize in high-reliability and mission-critical AI: neuro-symbolic reasoning, SMT constraint solving (Z3, CVC5), formal invariant guarantees, and automated red-teaming.",
    domain: "medical",
    totalDurationWeeks: 20,
    totalHours: 120,
    courses: ["neuro-symbolic-verification", "autonomous-agents-arch"],
    careerRoles: ["AI Safety Officer", "Formal Verification Fellow", "Critical Systems AI Auditor"],
    avgSalaryInr: "₹45 LPA - ₹80 LPA",
    bundlePricePaise: 4999900,
    originalPricePaise: 5999800,
    savingsPercent: 17,
    keySkills: ["SMT Solvers (Z3)", "Lean 4 Proofs", "Neural Invariants", "Adversarial Robustness", "Regulatory Compliance"],
  },
  {
    slug: "system-design-architect",
    title: "Distributed AI Systems & High-Scale Infrastructure",
    tagline: "Sub-10ms vector retrieval fabrics and planet-scale AI systems",
    description:
      "Build high-throughput vector search fabrics, distributed GPU training clusters, caching hierarchies, and resilient low-latency API gateways for AI-native software.",
    domain: "frontier",
    totalDurationWeeks: 12,
    totalHours: 60,
    courses: ["distributed-system-design-ai", "autonomous-agents-arch"],
    careerRoles: ["Principal Distributed Systems Engineer", "Vector Database Architect", "Chief AI Infrastructure Officer"],
    avgSalaryInr: "₹42 LPA - ₹75 LPA",
    bundlePricePaise: 2899900,
    originalPricePaise: 3499800,
    savingsPercent: 17,
    keySkills: ["HNSW / DiskANN", "Raft Consensus", "Distributed Caching", "gRPC Streaming", "P99 Optimization"],
  },
];

// Sample verified certificates for demonstration and verification
export const SAMPLE_VERIFIED_CERTIFICATES = [
  {
    publicId: "SCP-CERT-2026-A91F2B",
    enrollmentId: "enr_demo_alex_mercer_01",
    studentName: "Alex Mercer",
    courseTitle: "Autonomous Multi-Agent Systems & Tool-Use Architecture",
    courseCode: "ACA-501",
    issueDate: "2026-10-15",
    grade: "Grade: Distinction (98.4%)",
    issuedBy: "Softcapphyjas Academy Faculty Senate",
    signatory: "Dr. Siddharth Iyer · Chief Architect",
    signature: "e9b2849c9a00821c172d8a4365823ab9f9024f0c609594411d33ca7289d3fbc9",
    valid: true,
  },
  {
    publicId: "SCP-CERT-2026-F4401C",
    enrollmentId: "enr_demo_sarah_connor_02",
    studentName: "Sarah Connor",
    courseTitle: "Quantum Machine Learning & Variational Algorithms",
    courseCode: "ACA-602",
    issueDate: "2026-09-28",
    grade: "Grade: Mastery (95.0%)",
    issuedBy: "Softcapphyjas Academy Faculty Senate",
    signatory: "Dr. Elena Rostova · Research Fellow",
    signature: "7a83d994ef00192a838bc8392100843dfac99201402930219484839281a8c8e2",
    valid: true,
  },
  {
    publicId: "SCP-CERT-2026-B8820E",
    enrollmentId: "enr_demo_pranav_03",
    studentName: "Vikram Malhotra",
    courseTitle: "Machine Learning Foundations & Mathematical Rigor",
    courseCode: "ACA-101",
    issueDate: "2026-11-01",
    grade: "Grade: High Honors (92.5%)",
    issuedBy: "Softcapphyjas Academy Faculty Senate",
    signatory: "Prof. Elena Vance · Lead Curriculum Fellow",
    signature: "39201a88b8849f82901c0029384819a893021849182938019284910293849182",
    valid: true,
  },
];
