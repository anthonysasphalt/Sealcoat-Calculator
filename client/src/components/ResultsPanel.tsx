// ============================================================
// ResultsPanel — Sticky results dashboard with price breakdown
// Design: Gold Standard — gold glow on final price, donut chart
// ============================================================

import { useMemo } from "react";
import { motion } from "framer-motion";
import { type CostBreakdown, formatCurrency, formatCurrencyWhole } from "@/lib/calculator";
import { TrendingUp, Shield, DollarSign, BarChart3 } from "lucide-react";

interface ResultsPanelProps {
  breakdown: CostBreakdown;
}

interface CostBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

function CostBar({ label, value, total, color }: CostBarProps) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[oklch(0.7_0_0)]">{label}</span>
        <span className="font-mono text-foreground">
          {formatCurrency(value, 4)}<span className="text-[oklch(0.5_0_0)]">/sqft</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[oklch(0.2_0.005_250)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function ResultsPanel({ breakdown }: ResultsPanelProps) {
  const costItems = useMemo(
    () => [
      { label: "Materials", value: breakdown.materialCostPerSqFt, color: "#F5C518" },
      { label: "Labor", value: breakdown.laborCostPerSqFt, color: "#3B82F6" },
      { label: "Equipment", value: breakdown.equipmentCostPerSqFt, color: "#8B5CF6" },
      { label: "Overhead", value: breakdown.overheadCostPerSqFt, color: "#EF4444" },
      { label: "Loans", value: breakdown.loanCostPerSqFt, color: "#F97316" },
      { label: "Owner Pay", value: breakdown.ownerSalaryCostPerSqFt, color: "#10B981" },
    ],
    [breakdown]
  );

  const maxCost = Math.max(...costItems.map((c) => c.value));

  return (
    <div className="space-y-5">
      {/* Final Price — Hero */}
      <div className="relative rounded-xl border border-gold/30 bg-[oklch(0.14_0.01_85)] p-5 overflow-hidden">
        {/* Gold glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.84_0.15_85/0.08),transparent_70%)]" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              Recommended Price
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-2">
            <motion.span
              key={breakdown.recommendedPricePerSqFt.toFixed(4)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-extrabold font-mono text-gold tracking-tight"
            >
              {formatCurrency(breakdown.recommendedPricePerSqFt, 2)}
            </motion.span>
            <span className="text-base font-mono text-gold/50">/sqft</span>
          </div>

          <p className="text-xs text-[oklch(0.6_0_0)] mt-2">
            This price protects a <span className="text-gold font-semibold">40% net margin</span> after all costs
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-[oklch(0.25_0.005_250)] bg-card p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-[oklch(0.5_0_0)]" />
            <span className="text-xs text-[oklch(0.55_0_0)]">Total Cost</span>
          </div>
          <div className="font-mono text-lg font-bold text-foreground">
            {formatCurrency(breakdown.totalCostPerSqFt, 2)}
            <span className="text-xs text-[oklch(0.45_0_0)]">/sqft</span>
          </div>
        </div>
        <div className="rounded-lg border border-[oklch(0.25_0.005_250)] bg-card p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-success" />
            <span className="text-xs text-[oklch(0.55_0_0)]">Margin</span>
          </div>
          <div className="font-mono text-lg font-bold text-success">
            {formatCurrency(breakdown.marginPerSqFt, 2)}
            <span className="text-xs text-[oklch(0.45_0_0)]">/sqft</span>
          </div>
        </div>
        <div className="rounded-lg border border-[oklch(0.25_0.005_250)] bg-card p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-[oklch(0.5_0_0)]" />
            <span className="text-xs text-[oklch(0.55_0_0)]">Monthly Revenue</span>
          </div>
          <div className="font-mono text-base font-bold text-foreground">
            {formatCurrencyWhole(breakdown.monthlyRevenue)}
          </div>
        </div>
        <div className="rounded-lg border border-success/30 bg-[oklch(0.14_0.02_155)] p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-success" />
            <span className="text-xs text-[oklch(0.55_0_0)]">Monthly Profit</span>
          </div>
          <div className="font-mono text-base font-bold text-success">
            {formatCurrencyWhole(breakdown.monthlyProfit)}
          </div>
        </div>
      </div>

      {/* Cost Breakdown Bars */}
      <div className="rounded-xl border border-[oklch(0.25_0.005_250)] bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">Cost Breakdown</h4>
        <div className="space-y-3">
          {costItems.map((item) => (
            <CostBar
              key={item.label}
              label={item.label}
              value={item.value}
              total={maxCost}
              color={item.color}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[oklch(0.25_0.005_250)] my-4" />

        {/* Total line */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Total Cost</span>
          <span className="font-mono font-bold text-foreground">
            {formatCurrency(breakdown.totalCostPerSqFt, 4)}/sqft
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-semibold text-gold">+ 40% Margin</span>
          <span className="font-mono font-bold text-gold">
            {formatCurrency(breakdown.marginPerSqFt, 4)}/sqft
          </span>
        </div>
      </div>

      {/* Volume Summary */}
      <div className="rounded-xl border border-[oklch(0.25_0.005_250)] bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Monthly Volume</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[oklch(0.6_0_0)]">Total Sq Ft</span>
            <span className="font-mono text-foreground">
              {breakdown.monthlySqFt.toLocaleString()} sqft
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.6_0_0)]">Revenue</span>
            <span className="font-mono text-foreground">
              {formatCurrencyWhole(breakdown.monthlyRevenue)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.6_0_0)]">All Costs</span>
            <span className="font-mono text-foreground">
              {formatCurrencyWhole(breakdown.totalCostPerSqFt * breakdown.monthlySqFt)}
            </span>
          </div>
          <div className="border-t border-[oklch(0.22_0.005_250)] pt-2 flex justify-between">
            <span className="font-semibold text-success">Net Profit</span>
            <span className="font-mono font-bold text-success">
              {formatCurrencyWhole(breakdown.monthlyProfit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
