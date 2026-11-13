import { prisma } from "./index";
import { Prisma } from "@prisma/client";

export interface AuditLogParams {
  actorId?: string | null;
  action: string;
  entity: string;
  entityId: string;
  diff?: Record<string, unknown> | Prisma.InputJsonValue | null;
  ip?: string | null;
  ua?: string | null;
}

/**
 * Audit Logging Engine (Master Spec §7.3 & Excalidraw Board 26)
 * Writes an immutable audit log record for sensitive operations.
 */
export async function createAuditLog(params: AuditLogParams) {
  try {
    const data: Prisma.AuditLogCreateInput = {
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      ...(params.diff ? { diff: params.diff as Prisma.InputJsonValue } : {}),
      ...(params.ip ? { ip: params.ip } : {}),
      ...(params.ua ? { ua: params.ua } : {}),
      ...(params.actorId ? { actor: { connect: { id: params.actorId } } } : {}),
    };

    return await prisma.auditLog.create({ data });
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return null;
  }
}
