// ============================================================
// Sealcoating Price Calculator — Data Model & Calculation Engine
// Design: Gold Standard — Premium Dark Dashboard
// All monetary values in USD, rates in sq ft
// ============================================================

export interface MaterialsCosts {
  sealerCostPerGallon: number;
  coverageRatePerGallon: number; // sq ft per gallon
  additivesCostPerGallon: number; // sand, latex, etc. per gallon of sealer
  crackFillerCostPerLinearFt: number;
  avgCrackFtPerJob: number;
  linePaintCostPerJob: number;
}

export interface LaborCosts {
  crewSize: number;
  hourlyWagePerWorker: number;
  avgJobTimehours: number;
  avgJobSqFt: number;
  payrollTaxRate: number; // percentage (e.g., 15 = 15%)
  workersCompRate: number; // percentage
}

export interface EquipmentCosts {
  truckPayment: number; // monthly
  sprayRigPayment: number; // monthly
  otherEquipmentPayment: number; // monthly (blower, edger, etc.)
  maintenanceBudget: number; // monthly
}

export interface OverheadCosts {
  generalLiabilityInsurance: number; // monthly
  autoInsurance: number; // monthly
  workersCompInsurance: number; // monthly
  fuelCosts: number; // monthly
  marketingBudget: number; // monthly
  phoneSoftwareOffice: number; // monthly
  uniformsSafetyGear: number; // monthly
  storageYardRental: number; // monthly
}

export interface LoanCosts {
  sbaLoanPayment: number; // monthly
  equipmentFinancing: number; // monthly
  lineOfCreditPayment: number; // monthly
  otherDebtService: number; // monthly
}

export interface OwnerSalary {
  monthlySalary: number;
}

export interface VolumeEstimate {
  monthlyJobCount: number;
  avgJobSqFt: number; // duplicated from labor for convenience
}

export interface CalculatorInputs {
  materials: MaterialsCosts;
  labor: LaborCosts;
  equipment: EquipmentCosts;
  overhead: OverheadCosts;
  loans: LoanCosts;
  ownerSalary: OwnerSalary;
  volume: VolumeEstimate;
}

export interface CostBreakdown {
  materialCostPerSqFt: number;
  laborCostPerSqFt: number;
  equipmentCostPerSqFt: number;
  overheadCostPerSqFt: number;
  loanCostPerSqFt: number;
  ownerSalaryCostPerSqFt: number;
  totalCostPerSqFt: number;
  marginPerSqFt: number;
  recommendedPricePerSqFt: number;
  monthlySqFt: number;
  monthlyRevenue: number;
  monthlyProfit: number;
  marginPercent: number;
}

// Industry-standard defaults for a new sealcoating business
export const DEFAULT_INPUTS: CalculatorInputs = {
  materials: {
    sealerCostPerGallon: 15.0,
    coverageRatePerGallon: 80,
    additivesCostPerGallon: 3.0,
    crackFillerCostPerLinearFt: 0.5,
    avgCrackFtPerJob: 200,
    linePaintCostPerJob: 75,
  },
  labor: {
    crewSize: 3,
    hourlyWagePerWorker: 18,
    avgJobTimehours: 4,
    avgJobSqFt: 5000,
    payrollTaxRate: 15,
    workersCompRate: 8,
  },
  equipment: {
    truckPayment: 650,
    sprayRigPayment: 400,
    otherEquipmentPayment: 150,
    maintenanceBudget: 200,
  },
  overhead: {
    generalLiabilityInsurance: 250,
    autoInsurance: 200,
    workersCompInsurance: 300,
    fuelCosts: 600,
    marketingBudget: 500,
    phoneSoftwareOffice: 200,
    uniformsSafetyGear: 75,
    storageYardRental: 300,
  },
  loans: {
    sbaLoanPayment: 0,
    equipmentFinancing: 0,
    lineOfCreditPayment: 0,
    otherDebtService: 0,
  },
  ownerSalary: {
    monthlySalary: 6000,
  },
  volume: {
    monthlyJobCount: 20,
    avgJobSqFt: 5000,
  },
};

export const TARGET_MARGIN = 0.40; // 40% net margin (default)

export function calculateBreakdown(inputs: CalculatorInputs, targetMargin: number = TARGET_MARGIN): CostBreakdown {
  const { materials, labor, equipment, overhead, loans, ownerSalary, volume } = inputs;

  // Monthly square footage
  const monthlySqFt = volume.monthlyJobCount * volume.avgJobSqFt;

  // === VARIABLE COSTS (per sq ft) ===

  // Material cost per sq ft
  const sealerPerSqFt = materials.sealerCostPerGallon / materials.coverageRatePerGallon;
  const additivesPerSqFt = materials.additivesCostPerGallon / materials.coverageRatePerGallon;
  const crackFillerPerJob = materials.crackFillerCostPerLinearFt * materials.avgCrackFtPerJob;
  const crackFillerPerSqFt = crackFillerPerJob / volume.avgJobSqFt;
  const linePaintPerSqFt = materials.linePaintCostPerJob / volume.avgJobSqFt;
  const materialCostPerSqFt = sealerPerSqFt + additivesPerSqFt + crackFillerPerSqFt + linePaintPerSqFt;

  // Labor cost per sq ft
  const baseLaborPerJob = labor.crewSize * labor.hourlyWagePerWorker * labor.avgJobTimehours;
  const taxMultiplier = 1 + (labor.payrollTaxRate / 100) + (labor.workersCompRate / 100);
  const totalLaborPerJob = baseLaborPerJob * taxMultiplier;
  const laborCostPerSqFt = totalLaborPerJob / labor.avgJobSqFt;

  // === FIXED COSTS (monthly → per sq ft) ===
  const safeMonthly = Math.max(monthlySqFt, 1); // prevent division by zero

  const totalEquipmentMonthly =
    equipment.truckPayment +
    equipment.sprayRigPayment +
    equipment.otherEquipmentPayment +
    equipment.maintenanceBudget;
  const equipmentCostPerSqFt = totalEquipmentMonthly / safeMonthly;

  const totalOverheadMonthly =
    overhead.generalLiabilityInsurance +
    overhead.autoInsurance +
    overhead.workersCompInsurance +
    overhead.fuelCosts +
    overhead.marketingBudget +
    overhead.phoneSoftwareOffice +
    overhead.uniformsSafetyGear +
    overhead.storageYardRental;
  const overheadCostPerSqFt = totalOverheadMonthly / safeMonthly;

  const totalLoanMonthly =
    loans.sbaLoanPayment +
    loans.equipmentFinancing +
    loans.lineOfCreditPayment +
    loans.otherDebtService;
  const loanCostPerSqFt = totalLoanMonthly / safeMonthly;

  const ownerSalaryCostPerSqFt = ownerSalary.monthlySalary / safeMonthly;

  // === TOTALS ===
  const totalCostPerSqFt =
    materialCostPerSqFt +
    laborCostPerSqFt +
    equipmentCostPerSqFt +
    overheadCostPerSqFt +
    loanCostPerSqFt +
    ownerSalaryCostPerSqFt;

  // Price = Cost / (1 - margin)  → protects desired net margin
  const recommendedPricePerSqFt = totalCostPerSqFt / (1 - targetMargin);
  const marginPerSqFt = recommendedPricePerSqFt - totalCostPerSqFt;

  const monthlyRevenue = recommendedPricePerSqFt * monthlySqFt;
  const monthlyProfit = marginPerSqFt * monthlySqFt;

  return {
    materialCostPerSqFt,
    laborCostPerSqFt,
    equipmentCostPerSqFt,
    overheadCostPerSqFt,
    loanCostPerSqFt,
    ownerSalaryCostPerSqFt,
    totalCostPerSqFt,
    marginPerSqFt,
    recommendedPricePerSqFt,
    monthlySqFt,
    monthlyRevenue,
    monthlyProfit,
    marginPercent: targetMargin * 100,
  };
}

// Format helpers
export function formatCurrency(value: number, decimals = 2): string {
  return `$${value.toFixed(decimals)}`;
}

export function formatCurrencyWhole(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}
