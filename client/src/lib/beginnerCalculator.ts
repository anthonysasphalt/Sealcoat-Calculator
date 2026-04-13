/**
 * Beginner Mode Calculator
 * Simplified job-based pricing for new sealcoating operators
 * Inputs: Square footage, material cost, labor (hourly rate + hours)
 * Output: Price per sq ft and total job price with 50% margin target
 */

export interface BeginnerJobInputs {
  squareFootage: number;
  materialCost: number; // Total material cost for the job
  laborHourlyRate: number;
  laborHours: number;
}

export interface BeginnerJobResult {
  totalCost: number;
  costPerSqFt: number;
  targetMargin: number; // 50% = 0.5
  pricePerSqFt: number;
  totalJobPrice: number;
  actualMarginPercent: number;
  isLowMargin: boolean; // true if margin < 50%
}

/**
 * Calculate job pricing with 50% margin target
 * Formula: Price = Cost ÷ (1 - Margin)
 * For 50% margin: Price = Cost ÷ 0.5 = Cost × 2
 */
export function calculateBeginnerJob(inputs: BeginnerJobInputs): BeginnerJobResult {
  const { squareFootage, materialCost, laborHourlyRate, laborHours } = inputs;

  // Validate inputs
  if (squareFootage <= 0 || materialCost < 0 || laborHourlyRate < 0 || laborHours < 0) {
    return {
      totalCost: 0,
      costPerSqFt: 0,
      targetMargin: 0.5,
      pricePerSqFt: 0,
      totalJobPrice: 0,
      actualMarginPercent: 0,
      isLowMargin: true,
    };
  }

  // Calculate total cost
  const laborCost = laborHourlyRate * laborHours;
  const totalCost = materialCost + laborCost;

  // Cost per square foot
  const costPerSqFt = totalCost / squareFootage;

  // Target margin: 50%
  const targetMargin = 0.5;

  // Calculate price needed for 50% margin
  // If margin = 50%, then profit = 50% of price
  // Price = Cost / (1 - margin) = Cost / 0.5 = Cost × 2
  const pricePerSqFt = costPerSqFt / (1 - targetMargin);
  const totalJobPrice = pricePerSqFt * squareFootage;

  // Calculate actual margin if they charge this price
  const profit = totalJobPrice - totalCost;
  const actualMarginPercent = (profit / totalJobPrice) * 100;

  // Alert if margin is below 50%
  const isLowMargin = actualMarginPercent < 50;

  return {
    totalCost,
    costPerSqFt,
    targetMargin,
    pricePerSqFt,
    totalJobPrice,
    actualMarginPercent,
    isLowMargin,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with 2 decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
