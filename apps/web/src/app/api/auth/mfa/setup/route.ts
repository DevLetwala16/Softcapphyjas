import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@softcapphyjas/db";
import { generateMfaSecret, generateMfaQrCode, generateBackupCodes, isStaff } from "@softcapphyjas/auth";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure user is staff
  if (!isStaff(session.user)) {
    return NextResponse.json({ error: "MFA is only configured for staff accounts" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const secret = generateMfaSecret();
  const { uri, qrDataUrl } = await generateMfaQrCode(user.email, secret, "Softcapphyjas");
  const backupCodes = generateBackupCodes(8);

  // Save the pending secret to the user record
  await prisma.user.update({
    where: { id: user.id },
    data: {
      mfaSecret: secret,
      // Keep mfaEnabled false until they verify a code
    },
  });

  return NextResponse.json({
    success: true,
    secret,
    qrDataUrl,
    uri,
    backupCodes,
  });
}
