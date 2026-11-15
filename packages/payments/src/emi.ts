export interface EmiPlan {
  tenureMonths: number;
  monthlyAmountPaise: number;
  totalAmountPaise: number;
  interestRateAnnual: number;
  totalInterestPaise: number;
  isZeroCost: boolean;
  formattedMonthly: string;
  formattedTotal: string;
}

/**
 * Calculates indicative EMI installment schedules across standard tenures (3, 6, 9, 12, 18, 24 months).
 * Standard bank EMI uses reducing-balance formula; 12-month tenure features zero-cost promo pricing.
 */
export function calculateEmiPlans(amountPaise: number): EmiPlan[] {
  const tenures = [3, 6, 9, 12, 18, 24];
  return tenures.map((months) => {
    // 12-month tenure is zero-cost promotional EMI
    const isZeroCost = months === 12;
    const annualRate = isZeroCost ? 0 : 0.14; // 14% p.a. standard indicative

    let monthlyAmountPaise: number;
    let totalAmountPaise: number;
    let totalInterestPaise: number;

    if (annualRate === 0) {
      monthlyAmountPaise = Math.round(amountPaise / months);
      totalAmountPaise = amountPaise;
      totalInterestPaise = 0;
    } else {
      const monthlyRate = annualRate / 12;
      const emi =
        (amountPaise * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      monthlyAmountPaise = Math.round(emi);
      totalAmountPaise = monthlyAmountPaise * months;
      totalInterestPaise = totalAmountPaise - amountPaise;
    }

    return {
      tenureMonths: months,
      monthlyAmountPaise,
      totalAmountPaise,
      interestRateAnnual: annualRate,
      totalInterestPaise,
      isZeroCost,
      formattedMonthly: `₹${Math.round(monthlyAmountPaise / 100).toLocaleString("en-IN")}`,
      formattedTotal: `₹${Math.round(totalAmountPaise / 100).toLocaleString("en-IN")}`,
    };
  });
}

/**
 * Returns minimum monthly installment estimate string (e.g. "from ₹833/mo")
 */
export function getMinEmiEstimate(amountPaise: number): string {
  const plans = calculateEmiPlans(amountPaise);
  // Pick 12 month or 24 month lowest
  const lowest = plans.reduce((prev, curr) =>
    curr.monthlyAmountPaise < prev.monthlyAmountPaise ? curr : prev
  );
  return `from ${lowest.formattedMonthly}/mo`;
}
