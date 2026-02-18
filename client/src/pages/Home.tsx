// ============================================================
// Home — Sealcoating Price Calculator Main Page
// Design: Gold Standard — Premium Dark Dashboard
// Asymmetric two-panel: form (left) + sticky results (right)
// ============================================================

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Users,
  Truck,
  Building2,
  Landmark,
  UserCircle,
  BarChart3,
  Calculator,
  RotateCcw,
} from "lucide-react";
import CostSection from "@/components/CostSection";
import CurrencyInput from "@/components/CurrencyInput";
import ResultsPanel from "@/components/ResultsPanel";
import MobileResultsBar from "@/components/MobileResultsBar";
import MarginAdjuster from "@/components/MarginAdjuster";
import {
  type CalculatorInputs,
  DEFAULT_INPUTS,
  calculateBreakdown,
} from "@/lib/calculator";

const HERO_IMAGE = "https://private-us-east-1.manuscdn.com/sessionFile/KEqTjLbbXvvmRu9u7TNTIP/sandbox/G8EJMX4GUBdySSN94VM8AS-img-1_1771364017000_na1fn_aGVyby1hc3BoYWx0.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS0VxVGpMYmJYdnZtUnU5dTdUTlRJUC9zYW5kYm94L0c4RUpNWDRHVUJkeVNTTjk0Vk04QVMtaW1nLTFfMTc3MTM2NDAxNzAwMF9uYTFmbl9hR1Z5YnkxaGMzQm9ZV3gwLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JWGsBG6ielpyTo-mbCulgCmgevYHBYW5Rl5t3~~fW~0qsHHzZlb6ka5HHtBULd3bR4KJAAcTeGBMwuYnKnnq3sIBvRpvm6bP3RtWMcikqwX0yegQ00z1VA~Szku7OY1ABbmWzYOxJonewfJtZv9Ql4qc4r2-lz8eYlNhQt8NynVPx4YQgsgPY9CfOe57jyAJ6O1g2lvykvMS6o96yxIWL-qIAEBsD6ggELu-k7uOE8iTZ2-OGDpv9m7xIRYTIMxmcSHPPN3ks~AyDyq0G2-T6AVJ5c16tlviM1KH7GmSZ3dmbUkDgjfvLwLG5p2zoSJjWiRuEgxC4xMs9ssjaBGuYA__";

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>(
    () => structuredClone(DEFAULT_INPUTS)
  );
  const [targetMargin, setTargetMargin] = useState(0.40); // 40% default

  // Deep updater helper
  const updateField = useCallback(
    <K extends keyof CalculatorInputs>(
      section: K,
      field: keyof CalculatorInputs[K],
      value: number
    ) => {
      setInputs((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    },
    []
  );

  // Keep labor avgJobSqFt and volume avgJobSqFt in sync
  const updateAvgJobSqFt = useCallback((value: number) => {
    setInputs((prev) => ({
      ...prev,
      labor: { ...prev.labor, avgJobSqFt: value },
      volume: { ...prev.volume, avgJobSqFt: value },
    }));
  }, []);

  const breakdown = useMemo(() => calculateBreakdown(inputs, targetMargin), [inputs, targetMargin]);

  // Section subtotals for badges
  const materialSubtotal = useMemo(() => {
    const perSqFt = breakdown.materialCostPerSqFt;
    return perSqFt * breakdown.monthlySqFt;
  }, [breakdown]);

  const laborSubtotal = useMemo(() => {
    return breakdown.laborCostPerSqFt * breakdown.monthlySqFt;
  }, [breakdown]);

  const equipmentSubtotal = useMemo(() => {
    const e = inputs.equipment;
    return e.truckPayment + e.sprayRigPayment + e.otherEquipmentPayment + e.maintenanceBudget;
  }, [inputs.equipment]);

  const overheadSubtotal = useMemo(() => {
    const o = inputs.overhead;
    return (
      o.generalLiabilityInsurance + o.autoInsurance + o.workersCompInsurance +
      o.fuelCosts + o.marketingBudget + o.phoneSoftwareOffice +
      o.uniformsSafetyGear + o.storageYardRental
    );
  }, [inputs.overhead]);

  const loanSubtotal = useMemo(() => {
    const l = inputs.loans;
    return l.sbaLoanPayment + l.equipmentFinancing + l.lineOfCreditPayment + l.otherDebtService;
  }, [inputs.loans]);

  const resetToDefaults = useCallback(() => {
    setInputs(structuredClone(DEFAULT_INPUTS));
    setTargetMargin(0.40);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO HEADER ===== */}
      <header className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
        </div>

        <div className="relative container py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                <Calculator className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Anthony's Asphalt
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-2xl">
              Sealcoating Price
              <span className="text-gold"> Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-[oklch(0.75_0_0)] mt-3 max-w-xl leading-relaxed">
              Input your real costs. Get the exact price per square foot you need to charge to protect a{" "}
              <span className="text-gold font-semibold">40% net margin</span> after every expense.
            </p>

            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-2 text-xs text-[oklch(0.55_0_0)]">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Real-time calculations
              </div>
              <div className="flex items-center gap-2 text-xs text-[oklch(0.55_0_0)]">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                Industry defaults included
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="container py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* LEFT — Form Sections */}
          <div className="flex-1 lg:max-w-[58%] space-y-4">
            {/* Reset button */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Fill in your costs below. Defaults are pre-loaded as a starting point.
              </p>
              <button
                type="button"
                onClick={resetToDefaults}
                className="flex items-center gap-1.5 text-xs text-[oklch(0.55_0_0)] hover:text-gold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* ===== SECTION 1: Job Volume ===== */}
            <CostSection
              icon={<BarChart3 className="w-5 h-5" />}
              title="Job Volume"
              description="How much work do you expect each month?"
              stepNumber={1}
              subtotal={breakdown.monthlySqFt}
              subtotalLabel=" sqft/mo"
              defaultOpen={true}
            >
              <CurrencyInput
                label="Jobs Per Month"
                value={inputs.volume.monthlyJobCount}
                onChange={(v) => updateField("volume", "monthlyJobCount", v)}
                tooltip="How many sealcoating jobs do you expect to complete each month? Start conservative — 15-25 is typical for a new crew."
                prefix=""
                suffix="jobs"
                step={1}
                min={1}
                max={200}
                decimals={0}
              />
              <CurrencyInput
                label="Average Job Size"
                value={inputs.volume.avgJobSqFt}
                onChange={updateAvgJobSqFt}
                tooltip="Average square footage per job. Residential driveways: 800-2,000 sqft. Small commercial lots: 3,000-10,000 sqft. Large commercial: 10,000+ sqft."
                prefix=""
                suffix="sqft"
                step={500}
                min={100}
                max={500000}
                decimals={0}
              />
            </CostSection>

            {/* ===== SECTION 2: Materials ===== */}
            <CostSection
              icon={<Droplets className="w-5 h-5" />}
              title="Materials"
              description="Sealer, additives, crack filler, and line paint"
              stepNumber={2}
              subtotal={materialSubtotal}
            >
              <CurrencyInput
                label="Sealer Cost Per Gallon"
                value={inputs.materials.sealerCostPerGallon}
                onChange={(v) => updateField("materials", "sealerCostPerGallon", v)}
                tooltip="Cost per gallon of sealcoat material. Coal tar: $12-18/gal. Asphalt emulsion: $10-15/gal. Buying in bulk (275-gal totes or drums) is cheaper."
                step={0.5}
              />
              <CurrencyInput
                label="Coverage Rate"
                value={inputs.materials.coverageRatePerGallon}
                onChange={(v) => updateField("materials", "coverageRatePerGallon", v)}
                tooltip="Square feet covered per gallon of sealer. Typical: 60-100 sqft/gal depending on surface condition and application method. Rough surfaces use more material."
                prefix=""
                suffix="sqft/gal"
                step={5}
                min={10}
                max={200}
                decimals={0}
              />
              <CurrencyInput
                label="Additives Cost Per Gallon"
                value={inputs.materials.additivesCostPerGallon}
                onChange={(v) => updateField("materials", "additivesCostPerGallon", v)}
                tooltip="Cost of additives (sand, latex, polymer) per gallon of sealer mixed. Sand adds traction and durability. Typical: $2-5/gallon of sealer."
                step={0.25}
              />
              <CurrencyInput
                label="Crack Filler Cost"
                value={inputs.materials.crackFillerCostPerLinearFt}
                onChange={(v) => updateField("materials", "crackFillerCostPerLinearFt", v)}
                tooltip="Cost of hot or cold pour crack filler per linear foot. Hot pour: $0.30-0.75/ft. Cold pour: $0.15-0.40/ft."
                suffix="/lin ft"
                step={0.05}
              />
              <CurrencyInput
                label="Avg Crack Feet Per Job"
                value={inputs.materials.avgCrackFtPerJob}
                onChange={(v) => updateField("materials", "avgCrackFtPerJob", v)}
                tooltip="Average linear feet of cracks to fill per job. Varies widely: 50-500+ ft depending on lot condition. Set to 0 if you don't offer crack filling."
                prefix=""
                suffix="lin ft"
                step={25}
                min={0}
                max={5000}
                decimals={0}
              />
              <CurrencyInput
                label="Line Paint Per Job"
                value={inputs.materials.linePaintCostPerJob}
                onChange={(v) => updateField("materials", "linePaintCostPerJob", v)}
                tooltip="Average cost of line striping materials per job. Includes paint and stencils. Set to 0 if you sub this out or don't offer striping."
                step={5}
              />
            </CostSection>

            {/* ===== SECTION 3: Labor ===== */}
            <CostSection
              icon={<Users className="w-5 h-5" />}
              title="Labor"
              description="Crew wages, payroll taxes, and workers comp"
              stepNumber={3}
              subtotal={laborSubtotal}
            >
              <CurrencyInput
                label="Crew Size"
                value={inputs.labor.crewSize}
                onChange={(v) => updateField("labor", "crewSize", v)}
                tooltip="Number of workers on a typical job (including yourself if you work on the crew). Most crews run 2-4 people."
                prefix=""
                suffix="workers"
                step={1}
                min={1}
                max={20}
                decimals={0}
              />
              <CurrencyInput
                label="Hourly Wage Per Worker"
                value={inputs.labor.hourlyWagePerWorker}
                onChange={(v) => updateField("labor", "hourlyWagePerWorker", v)}
                tooltip="Average hourly pay per crew member. Entry level: $14-16/hr. Experienced: $18-25/hr. Foreman: $22-30/hr."
                suffix="/hr"
                step={0.5}
              />
              <CurrencyInput
                label="Average Job Time"
                value={inputs.labor.avgJobTimehours}
                onChange={(v) => updateField("labor", "avgJobTimehours", v)}
                tooltip="Average hours to complete one job (including setup and cleanup). Residential: 2-3 hrs. Small commercial: 3-6 hrs. Large commercial: 6-10+ hrs."
                prefix=""
                suffix="hours"
                step={0.5}
                min={0.5}
                max={24}
              />
              <div /> {/* spacer for grid alignment */}
              <CurrencyInput
                label="Payroll Tax Rate"
                value={inputs.labor.payrollTaxRate}
                onChange={(v) => updateField("labor", "payrollTaxRate", v)}
                tooltip="Employer's share of payroll taxes (Social Security, Medicare, FUTA, SUTA). Typically 12-18% of gross wages."
                prefix=""
                suffix="%"
                step={0.5}
                min={0}
                max={30}
              />
              <CurrencyInput
                label="Workers Comp Rate"
                value={inputs.labor.workersCompRate}
                onChange={(v) => updateField("labor", "workersCompRate", v)}
                tooltip="Workers compensation insurance rate as % of payroll. Sealcoating is considered high-risk: typically 5-12% depending on state and claims history."
                prefix=""
                suffix="%"
                step={0.5}
                min={0}
                max={25}
              />
            </CostSection>

            {/* ===== SECTION 4: Equipment ===== */}
            <CostSection
              icon={<Truck className="w-5 h-5" />}
              title="Equipment & Truck Payments"
              description="Monthly payments for trucks, rigs, and gear"
              stepNumber={4}
              subtotal={equipmentSubtotal}
            >
              <CurrencyInput
                label="Truck Payment"
                value={inputs.equipment.truckPayment}
                onChange={(v) => updateField("equipment", "truckPayment", v)}
                tooltip="Monthly truck payment. Used work trucks: $300-600/mo. New trucks: $600-1,200/mo. Set to 0 if paid off."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Spray Rig / Squeegee Machine"
                value={inputs.equipment.sprayRigPayment}
                onChange={(v) => updateField("equipment", "sprayRigPayment", v)}
                tooltip="Monthly payment for your spray system or squeegee machine. New spray rigs: $300-800/mo financed. Set to 0 if paid off or using squeegees."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Other Equipment"
                value={inputs.equipment.otherEquipmentPayment}
                onChange={(v) => updateField("equipment", "otherEquipmentPayment", v)}
                tooltip="Monthly payments for blowers, edgers, crack fill machines, line stripers, and other tools. Estimate total monthly cost."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Maintenance Budget"
                value={inputs.equipment.maintenanceBudget}
                onChange={(v) => updateField("equipment", "maintenanceBudget", v)}
                tooltip="Monthly budget for equipment repairs, replacement parts, oil changes, etc. Rule of thumb: 5-10% of equipment value per year, divided by 12."
                suffix="/mo"
                step={25}
              />
            </CostSection>

            {/* ===== SECTION 5: Overhead ===== */}
            <CostSection
              icon={<Building2 className="w-5 h-5" />}
              title="Overhead"
              description="Insurance, fuel, marketing, and operating expenses"
              stepNumber={5}
              subtotal={overheadSubtotal}
            >
              <CurrencyInput
                label="General Liability Insurance"
                value={inputs.overhead.generalLiabilityInsurance}
                onChange={(v) => updateField("overhead", "generalLiabilityInsurance", v)}
                tooltip="Monthly general liability insurance premium. Most sealcoating businesses: $150-400/mo for $1M/$2M policy. Required by most commercial clients."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Auto Insurance"
                value={inputs.overhead.autoInsurance}
                onChange={(v) => updateField("overhead", "autoInsurance", v)}
                tooltip="Monthly commercial auto insurance for your work vehicles. Typically $150-350/mo per vehicle depending on coverage and driving record."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Workers Comp Insurance"
                value={inputs.overhead.workersCompInsurance}
                onChange={(v) => updateField("overhead", "workersCompInsurance", v)}
                tooltip="Monthly workers compensation insurance premium (separate from the payroll % rate above). This is your fixed monthly premium payment."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Fuel Costs"
                value={inputs.overhead.fuelCosts}
                onChange={(v) => updateField("overhead", "fuelCosts", v)}
                tooltip="Monthly fuel for trucks and equipment. Depends on service area size. Typical: $400-1,000/mo during season."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Marketing & Advertising"
                value={inputs.overhead.marketingBudget}
                onChange={(v) => updateField("overhead", "marketingBudget", v)}
                tooltip="Monthly marketing spend: Google Ads, door hangers, yard signs, vehicle wraps (amortized), website, social media ads. Critical for new businesses."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Phone / Software / Office"
                value={inputs.overhead.phoneSoftwareOffice}
                onChange={(v) => updateField("overhead", "phoneSoftwareOffice", v)}
                tooltip="Monthly costs for business phone, CRM software, estimating tools, accounting software, office supplies, etc."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Uniforms & Safety Gear"
                value={inputs.overhead.uniformsSafetyGear}
                onChange={(v) => updateField("overhead", "uniformsSafetyGear", v)}
                tooltip="Monthly budget for crew uniforms, boots, gloves, safety glasses, hard hats, and other PPE. Amortize annual costs monthly."
                suffix="/mo"
                step={10}
              />
              <CurrencyInput
                label="Storage / Yard Rental"
                value={inputs.overhead.storageYardRental}
                onChange={(v) => updateField("overhead", "storageYardRental", v)}
                tooltip="Monthly rent for equipment storage, material yard, or shop space. Set to 0 if you operate from home."
                suffix="/mo"
                step={25}
              />
            </CostSection>

            {/* ===== SECTION 6: Loans ===== */}
            <CostSection
              icon={<Landmark className="w-5 h-5" />}
              title="Business Loans & Financing"
              description="Monthly debt service payments"
              stepNumber={6}
              subtotal={loanSubtotal}
            >
              <CurrencyInput
                label="SBA Loan Payment"
                value={inputs.loans.sbaLoanPayment}
                onChange={(v) => updateField("loans", "sbaLoanPayment", v)}
                tooltip="Monthly SBA loan payment. Common for startup businesses. Set to 0 if you don't have one."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Equipment Financing"
                value={inputs.loans.equipmentFinancing}
                onChange={(v) => updateField("loans", "equipmentFinancing", v)}
                tooltip="Monthly equipment financing payments not already counted in the Equipment section above. Avoid double-counting."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Line of Credit Payments"
                value={inputs.loans.lineOfCreditPayment}
                onChange={(v) => updateField("loans", "lineOfCreditPayment", v)}
                tooltip="Monthly payments on business line of credit. Useful for managing cash flow during slow months."
                suffix="/mo"
                step={25}
              />
              <CurrencyInput
                label="Other Debt Service"
                value={inputs.loans.otherDebtService}
                onChange={(v) => updateField("loans", "otherDebtService", v)}
                tooltip="Any other monthly business debt payments: credit cards, personal loans used for business, etc."
                suffix="/mo"
                step={25}
              />
            </CostSection>

            {/* ===== MARGIN ADJUSTMENT ===== */}
            <MarginAdjuster value={targetMargin} onChange={setTargetMargin} />

            {/* ===== SECTION 7: Owner Salary ===== */}
            <CostSection
              icon={<UserCircle className="w-5 h-5" />}
              title="Owner's Salary"
              description="What you want to pay yourself each month"
              stepNumber={7}
              subtotal={inputs.ownerSalary.monthlySalary}
            >
              <div className="sm:col-span-2">
                <CurrencyInput
                  label="Monthly Owner's Salary"
                  value={inputs.ownerSalary.monthlySalary}
                  onChange={(v) => updateField("ownerSalary", "monthlySalary", v)}
                  tooltip="What you want to take home each month as the business owner. This is a real cost that must be covered. Be honest — $4,000-10,000/mo is typical depending on your area and experience."
                  suffix="/mo"
                  step={250}
                  min={0}
                  max={100000}
                />
              </div>
            </CostSection>

            {/* Bottom spacer for mobile results bar */}
            <div className="h-24 lg:hidden" />
          </div>

          {/* RIGHT — Sticky Results Panel (desktop only) */}
          <div className="hidden lg:block lg:w-[40%]">
            <div className="sticky top-6">
              <ResultsPanel breakdown={breakdown} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.2_0.005_250)] py-8 mt-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gold flex items-center justify-center">
                <Calculator className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="text-sm font-semibold text-[oklch(0.6_0_0)]">
                Anthony's Asphalt
              </span>
            </div>
            <p className="text-xs text-[oklch(0.45_0_0)] text-center">
              This calculator provides estimates based on your inputs. Actual costs may vary by region, season, and job conditions.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile floating results bar */}
      <MobileResultsBar breakdown={breakdown} />
    </div>
  );
}
