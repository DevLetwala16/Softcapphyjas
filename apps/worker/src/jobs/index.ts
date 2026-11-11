export const WORKER_JOBS = [
  "email.send",
  "invoice.pdf",
  "certificate.pdf",
  "resume.parse",
  "embeddings.index",
  "dunning.run",
  "av.scan",
] as const;

export type WorkerJobType = (typeof WORKER_JOBS)[number];
