import {
  PrismaClient,
  Role,
  OrderStatus,
  PaymentMethod,
  PublishStatus,
  ProjectStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Softcapphyjas database seed...");

  // Clean existing test data safely if re-running
  await prisma.auditLog.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.lessonProgress.deleteMany({});
  await prisma.quizAttempt.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.installment.deleteMany({});
  await prisma.installmentPlan.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.plan.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.projectFile.deleteMany({});
  await prisma.milestone.deleteMany({});
  await prisma.meeting.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.jobPosting.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.leaveRequest.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.performanceReview.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.postVersion.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.chunk.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.betaSignup.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.featureFlag.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // ── 1. USERS (5 Core Personas per Spec & Board 26) ──────────────────
  console.log("👤 Seeding Users & Staff...");

  // TODO(brand): Update production emails and names
  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@softcapphyjas.com",
      name: "Dr. Dev Lead (Super Admin)",
      passwordHash,
      roles: [Role.SUPER_ADMIN, Role.ADMIN],
      mfaEnabled: true,
      mfaSecret: "JBSWY3DPEHPK3PXP", // Demo Base32 TOTP secret
      locale: "en",
    },
  });

  const instructor = await prisma.user.create({
    data: {
      email: "instructor@softcapphyjas.com",
      name: "Prof. Elena Vance (Lead Instructor)",
      passwordHash,
      roles: [Role.INSTRUCTOR],
      mfaEnabled: true,
      mfaSecret: "JBSWY3DPEHPK3PXP",
      locale: "en",
    },
  });

  const researcher = await prisma.user.create({
    data: {
      email: "researcher@softcapphyjas.com",
      name: "Dr. Marcus Thorne (Principal Scientist)",
      passwordHash,
      roles: [Role.RESEARCHER],
      mfaEnabled: true,
      mfaSecret: "JBSWY3DPEHPK3PXP",
      locale: "en",
    },
  });

  const client = await prisma.user.create({
    data: {
      email: "client@acmecorp.com",
      name: "Sarah Connor (VP of Tech, Acme Corp)",
      passwordHash,
      roles: [Role.CLIENT],
      mfaEnabled: false,
      locale: "en",
    },
  });

  const student = await prisma.user.create({
    data: {
      email: "student@learner.org",
      name: "Alex Mercer (AI Scholar)",
      passwordHash,
      roles: [Role.STUDENT],
      mfaEnabled: false,
      locale: "en",
    },
  });

  // Employees for staff
  await prisma.employee.create({
    data: {
      userId: superAdmin.id,
      code: "EMP-001",
      department: "Executive Leadership",
      title: "Chief Research Officer & Co-Founder",
      joinedOn: new Date("2024-01-01"),
    },
  });

  await prisma.employee.create({
    data: {
      userId: researcher.id,
      code: "EMP-002",
      department: "Frontier Labs",
      title: "Principal Research Scientist",
      joinedOn: new Date("2024-03-15"),
    },
  });

  await prisma.employee.create({
    data: {
      userId: instructor.id,
      code: "EMP-003",
      department: "Academy Faculty",
      title: "Lead Curriculum Fellow",
      joinedOn: new Date("2024-06-01"),
    },
  });

  // ── 2. ACADEMY COURSES (3 Courses with Modules, Lessons & Quizzes) ──
  console.log("🎓 Seeding Academy Courses, Lessons & Quizzes...");

  // Course 1: ML Foundations
  const course1 = await prisma.course.create({
    data: {
      slug: "machine-learning-foundations",
      title: "Machine Learning Foundations & Mathematical Rigor",
      subtitle: "From linear algebra and convex optimization to modern gradient architectures",
      description:
        "Master the foundational mathematics that govern deep representations: vector spaces, spectral theorem, stochastic approximation, and information geometry.",
      level: "BEGINNER",
      category: "ML",
      priceInPaise: 499900, // ₹4,999
      compareAtPaise: 899900, // ₹8,999
      emiEligible: true,
      durationMinutes: 1920, // 32 hours
      status: PublishStatus.PUBLISHED,
      instructorId: instructor.id,
    },
  });

  const m1 = await prisma.module.create({
    data: {
      courseId: course1.id,
      title: "Module 1: Vector Spaces & High-Dimensional Geometry",
      position: 1,
    },
  });

  const l1 = await prisma.lesson.create({
    data: {
      moduleId: m1.id,
      title: "Spectral Decompositions & Principal Component Manifolds",
      position: 1,
      type: "VIDEO",
      muxPlaybackId: "mock-mux-playback-001",
      durationSec: 1800,
      isPreview: true,
    },
  });

  const l2 = await prisma.lesson.create({
    data: {
      moduleId: m1.id,
      title: "Convex Duals & Karush-Kuhn-Tucker Optimality",
      position: 2,
      type: "ARTICLE",
      contentMd:
        "# Karush-Kuhn-Tucker Conditions\n\nIn mathematical optimization, the KKT conditions provide first derivative tests for a solution in nonlinear programming to be optimal.",
      durationSec: 900,
      isPreview: false,
    },
  });

  const quiz1 = await prisma.quiz.create({
    data: {
      lessonId: l2.id,
      passMark: 70,
      maxAttempts: 3,
      timeLimitSec: 900,
    },
  });

  await prisma.question.create({
    data: {
      quizId: quiz1.id,
      kind: "MCQ",
      prompt:
        "Under which condition do KKT conditions become necessary and sufficient for global optimality?",
      options: [
        "When the objective is convex and inequality constraints are affine",
        "When the objective is strictly non-convex",
        "Whenever gradient descent converges in finite iterations",
        "Only when the Hessian determinant is negative",
      ],
      answer: 0,
      explanation:
        "Slater's condition ensures strong duality for convex optimization problems with affine constraints.",
      points: 2,
    },
  });

  // Course 2: Agentic AI
  const course2 = await prisma.course.create({
    data: {
      slug: "agentic-ai-architectures",
      title: "Agentic AI Systems: Orchestration, Memory & Multi-Agent Swarms",
      subtitle: "Design autonomous cognitive loops, tool-calling graphs, and hierarchical memory",
      description:
        "Construct production-ready multi-agent swarms using reactive reflection, tree-of-thought exploration, and deterministic guardrail layers.",
      level: "INTERMEDIATE",
      category: "AGENTIC",
      priceInPaise: 899900, // ₹8,999
      compareAtPaise: 1499900, // ₹14,999
      emiEligible: true,
      durationMinutes: 2400, // 40 hours
      status: PublishStatus.PUBLISHED,
      instructorId: instructor.id,
    },
  });

  const m2 = await prisma.module.create({
    data: {
      courseId: course2.id,
      title: "Module 1: Cognitive Loop Topologies & Reflection",
      position: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: m2.id,
      title: "ReAct, Reflexion & Self-Correcting Execution Trajectories",
      position: 1,
      type: "VIDEO",
      muxPlaybackId: "mock-mux-playback-002",
      durationSec: 2400,
      isPreview: true,
    },
  });

  // Course 3: Frontier LLMOps
  await prisma.course.create({
    data: {
      slug: "frontier-llmops-and-alignment",
      title: "Frontier LLMOps, DPO & Mechanistic Interpretability",
      subtitle:
        "Production fine-tuning, activation steering, RLHF, and automated safety evaluation",
      description:
        "Learn direct preference optimization (DPO), representation engineering, sparse autoencoders (SAE), and continuous canary evaluation.",
      level: "ADVANCED",
      category: "LLMOPS",
      priceInPaise: 1299900, // ₹12,999
      compareAtPaise: 1999900,
      emiEligible: true,
      durationMinutes: 2880,
      status: PublishStatus.PUBLISHED,
      instructorId: instructor.id,
    },
  });

  // ── 3. COMMERCE: PLANS, COUPONS, ORDERS & ENROLLMENTS ─────────────
  console.log("💳 Seeding Commerce, Plans, Coupons & Orders...");

  await prisma.plan.create({
    data: {
      code: "MONTHLY_PRO",
      name: "Academy Pro Monthly",
      interval: "MONTHLY",
      amountInPaise: 199900, // ₹1,999/mo
      features: [
        "Unlimited access to all foundational courses",
        "Interactive GPU code sandboxes",
        "Direct Q&A in discussion forums",
      ],
      seats: 1,
      active: true,
    },
  });

  await prisma.plan.create({
    data: {
      code: "ANNUAL_ALL_ACCESS",
      name: "Annual All-Access Fellow",
      interval: "YEARLY",
      amountInPaise: 1799900, // ₹17,999/yr
      features: [
        "Everything in Monthly Pro",
        "1-on-1 monthly research office hours",
        "Verified cryptographic certificates",
        "Early access to Frontier Lab papers",
      ],
      seats: 1,
      active: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: "LAUNCH2026",
      percentOff: 20,
      maxRedemptions: 500,
      redeemed: 14,
      validUntil: new Date("2026-12-31"),
    },
  });

  await prisma.coupon.create({
    data: {
      code: "STUDENT50",
      percentOff: 50,
      maxRedemptions: 1000,
      redeemed: 32,
      validUntil: new Date("2026-12-31"),
    },
  });

  // Seed sample order and enrollment for the student
  const studentOrder = await prisma.order.create({
    data: {
      number: "SCP-ORD-000101",
      userId: student.id,
      status: OrderStatus.PAID,
      subtotalPaise: 499900,
      discountPaise: 99980,
      gstPaise: 71985,
      totalPaise: 471905,
      currency: "INR",
      razorpayOrderId: "order_mock_test_101",
      items: {
        create: [
          {
            courseId: course1.id,
            title: course1.title,
            pricePaise: 499900,
          },
        ],
      },
      payments: {
        create: [
          {
            razorpayPaymentId: "pay_mock_test_101",
            method: PaymentMethod.CARD,
            amountPaise: 471905,
            status: "captured",
          },
        ],
      },
    },
  });

  const studentEnrollment = await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course1.id,
      source: "PURCHASE",
      orderId: studentOrder.id,
      progressPct: 50,
    },
  });

  await prisma.lessonProgress.create({
    data: {
      enrollmentId: studentEnrollment.id,
      lessonId: l1.id,
      positionSec: 1800,
      completed: true,
    },
  });

  // ── 4. ENTERPRISE PROJECTS & CLIENT PORTAL ────────────────────────
  console.log("🏢 Seeding Enterprise Projects...");

  await prisma.project.create({
    data: {
      ref: "SCP-2026-0001",
      clientId: client.id,
      title: "Autonomous Knowledge Discovery & Multi-Agent Mesh",
      services: ["Enterprise Intelligence", "Custom Agent Swarms", "Secure RAG Infrastructure"],
      status: ProjectStatus.ACTIVE,
      estimateLowPaise: 250000000, // ₹25,00,000
      estimateHighPaise: 350000000, // ₹35,00,000
      depositPaise: 50000000, // ₹5,00,000
      depositPaid: true,
      timelineWeeks: 12,
      startDate: new Date("2026-01-10"),
      brief:
        "Architecting an enterprise-grade sovereign AI pipeline combining pgvector RAG, local reasoning agents, and automated red-teaming guardrails.",
      milestones: {
        create: [
          {
            title: "Phase 1: Architecture Blueprint & Threat Model",
            dueDate: new Date("2026-02-01"),
            status: "COMPLETED",
            amountPaise: 75000000,
          },
          {
            title: "Phase 2: Data Vectorization & Hybrid RAG Engine",
            dueDate: new Date("2026-03-01"),
            status: "IN_PROGRESS",
            amountPaise: 125000000,
          },
        ],
      },
      files: {
        create: [
          {
            name: "Softcapphyjas_Architecture_Whitepaper_v1.pdf",
            key: "projects/scp-2026-0001/Softcapphyjas_Architecture_Whitepaper_v1.pdf",
            version: 1,
            uploadedById: superAdmin.id,
            scanStatus: "CLEAN",
          },
        ],
      },
    },
  });

  // ── 5. RESEARCH PAPERS & BLOG POSTS ────────────────────────────────
  console.log("🔬 Seeding Research Papers & Posts...");

  await prisma.post.create({
    data: {
      kind: "PAPER",
      slug: "neuro-symbolic-reasoning-clinical-triage",
      title: "Neuro-Symbolic Reasoning in Multi-Modal Clinical Triage",
      excerpt:
        "Integrating formal first-order logic verifiers with dense transformer representations for provably compliant emergency triage.",
      bodyJson: {
        abstract:
          "Emergency department triage demands high diagnostic velocity under stringent safety constraints. We demonstrate a hybrid neuro-symbolic engine...",
        sections: [
          {
            heading: "Introduction",
            content: "Clinical decision support often fails due to hallucination risks...",
          },
          {
            heading: "Formal Verification Layer",
            content: "By translating medical protocols into SMT constraints...",
          },
        ],
      },
      domain: "medical",
      doi: "10.1016/j.softcap.2026.01.004",
      status: PublishStatus.PUBLISHED,
      publishAt: new Date("2026-01-15"),
      authorId: researcher.id,
    },
  });

  await prisma.post.create({
    data: {
      kind: "PAPER",
      slug: "quantum-classical-hybrid-optimization",
      title: "Variational Quantum-Classical Hybrids for Discrete High-Dimensional Manifolds",
      excerpt:
        "Benchmarking parameter-shift gradient estimators against classical simulated bifurcation machines in quantum chemistry.",
      bodyJson: {
        abstract:
          "We present an empirical study of parameterized quantum circuits (PQCs) interfaced with classical tensor networks...",
      },
      domain: "physics",
      doi: "10.1016/j.softcap.2026.02.011",
      status: PublishStatus.PUBLISHED,
      publishAt: new Date("2026-02-01"),
      authorId: researcher.id,
    },
  });

  await prisma.post.create({
    data: {
      kind: "BLOG",
      slug: "accelerating-speculative-decoding-enterprise",
      title: "Accelerating Speculative Decoding: 3.8x Throughput Gains in Enterprise Inference",
      excerpt:
        "How draft-model speculative verification reduces latency without altering mathematical output probability distributions.",
      bodyJson: {
        content:
          "High-throughput inference is the primary bottleneck in scaling conversational reasoning agents. In this article, we outline...",
      },
      domain: "frontier",
      status: PublishStatus.PUBLISHED,
      publishAt: new Date("2026-02-10"),
      authorId: superAdmin.id,
    },
  });

  // ── 6. CAREERS & JOB POSTINGS ──────────────────────────────────────
  console.log("💼 Seeding Careers & Job Postings...");

  await prisma.jobPosting.create({
    data: {
      slug: "senior-ai-research-scientist-reasoning",
      title: "Senior AI Research Scientist (Frontier Reasoning & Alignment)",
      team: "Frontier Labs",
      type: "Full-time",
      location: "Bengaluru, India / Hybrid",
      descriptionMd: `### Role Overview\nJoin Softcapphyjas Frontier Labs to pioneer neuro-symbolic reasoning models and alignment verification.\n\n### Key Responsibilities\n- Design novel cognitive loop architectures\n- Publish peer-reviewed findings in top venues (NeurIPS, ICML, ICLR)\n- Collaborate with enterprise teams to deploy provably safe models.`,
      status: PublishStatus.PUBLISHED,
    },
  });

  await prisma.jobPosting.create({
    data: {
      slug: "lead-systems-engineer-agentic-infrastructure",
      title: "Lead Systems Engineer (Agentic Compute & Distributed Inference)",
      team: "Core Platform",
      type: "Full-time",
      location: "Remote / Global",
      descriptionMd: `### Role Overview\nBuild the backbone of Softcapphyjas Synapse: low-latency KV-cache orchestration, vLLM / SGLang clusters, and BullMQ worker meshes.\n\n### Requirements\n- 5+ years with distributed systems in Go/Rust/TypeScript\n- Deep knowledge of CUDA kernels and streaming inference protocols`,
      status: PublishStatus.PUBLISHED,
    },
  });

  // ── 7. RAG DOCUMENTS & SYSTEM HEALTH ───────────────────────────────
  console.log("🧠 Seeding RAG Knowledge Chunks & Feature Flags...");

  const doc = await prisma.document.create({
    data: {
      source: "PAPER",
      title: "Softcapphyjas Synapse Cognitive Engine Architecture",
      url: "https://softcapphyjas.com/research/papers/synapse-architecture",
    },
  });

  await prisma.chunk.create({
    data: {
      documentId: doc.id,
      text: "Softcapphyjas Synapse is a frontier cognitive platform engineered for enterprise intelligence, combining neuro-symbolic verification with dynamic multi-agent topologies.",
    },
  });

  await prisma.featureFlag.create({
    data: {
      key: "ENABLE_SYNAPSE_BETA_DEMO",
      enabled: true,
      rules: { maxDailyTokens: 500000 },
    },
  });

  await prisma.featureFlag.create({
    data: {
      key: "ENABLE_RAZORPAY_CARDLESS_EMI",
      enabled: true,
    },
  });

  console.log("✅ Softcapphyjas database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
