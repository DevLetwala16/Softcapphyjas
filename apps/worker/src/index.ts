import { env } from "@softcapphyjas/config";
import { WORKER_JOBS } from "./jobs";

console.log("⚡ [Worker] Initializing Softcapphyjas BullMQ Worker Service...");
console.log(`📦 [Worker] Registered Job Handlers: ${WORKER_JOBS.join(", ")}`);
console.log(`🔌 [Worker] Redis Connection URL: ${env.REDIS_URL}`);
