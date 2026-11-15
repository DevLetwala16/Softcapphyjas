import { describe, it } from "node:test";
import assert from "node:assert";
import { calculateEmiPlans, isEligibleForEmi, getMinEmiEstimate } from "../index";

describe("EMI Calculation Engine (Board 25 & Board 10)", () => {
  it("correctly identifies courses eligible for EMI", () => {
    assert.strictEqual(isEligibleForEmi(299900), false); // ₹2,999 is below ₹3,000 threshold
    assert.strictEqual(isEligibleForEmi(300000), true); // ₹3,000 threshold
    assert.strictEqual(isEligibleForEmi(2499900), true); // ₹24,999
  });

  it("calculates 12-month zero-cost EMI correctly", () => {
    const plans = calculateEmiPlans(2499900); // ₹24,999
    const twelveMonthPlan = plans.find((p) => p.tenureMonths === 12);

    assert.ok(twelveMonthPlan, "12-month tenure plan should exist");
    assert.strictEqual(twelveMonthPlan.isZeroCost, true);
    assert.strictEqual(twelveMonthPlan.interestRateAnnual, 0);
    assert.strictEqual(twelveMonthPlan.totalInterestPaise, 0);
    assert.strictEqual(twelveMonthPlan.monthlyAmountPaise, Math.round(2499900 / 12));
    assert.strictEqual(twelveMonthPlan.formattedMonthly, "₹2,083");
  });

  it("calculates interest bearing tenures with standard reducing balance formula", () => {
    const plans = calculateEmiPlans(2499900);
    const sixMonthPlan = plans.find((p) => p.tenureMonths === 6);

    assert.ok(sixMonthPlan);
    assert.strictEqual(sixMonthPlan.isZeroCost, false);
    assert.strictEqual(sixMonthPlan.interestRateAnnual, 0.14);
    assert.strictEqual(sixMonthPlan.totalInterestPaise > 0, true);
  });

  it("returns human-readable minimum EMI estimate", () => {
    const minEstimate = getMinEmiEstimate(2499900);
    assert.strictEqual(typeof minEstimate, "string");
    assert.match(minEstimate, /from ₹[\d,]+\/mo/);
  });
});
