import { APP_CONFIG } from "@softcapphyjas/config";

export function calculateGst(amountPaise: number): {
  subtotalPaise: number;
  gstPaise: number;
  totalPaise: number;
} {
  const gstPaise = Math.round(amountPaise * APP_CONFIG.gstRate);
  return {
    subtotalPaise: amountPaise,
    gstPaise,
    totalPaise: amountPaise + gstPaise,
  };
}

export function isEligibleForEmi(amountPaise: number): boolean {
  return amountPaise >= APP_CONFIG.minEmiAmountPaise;
}
