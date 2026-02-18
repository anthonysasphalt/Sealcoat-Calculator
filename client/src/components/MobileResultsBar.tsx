// ============================================================
// MobileResultsBar — Floating bottom bar on mobile with expand
// Design: Gold Standard — gold price, expandable drawer
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type CostBreakdown, formatCurrency, formatCurrencyWhole } from "@/lib/calculator";
import { ChevronUp, Shield, TrendingUp } from "lucide-react";

interface MobileResultsBarProps {
  breakdown: CostBreakdown;
}

export default function MobileResultsBar({ breakdown }: MobileResultsBarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Backdrop */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom sheet */}
      <motion.div
        className="relative bg-[oklch(0.14_0.005_250)] border-t border-gold/30 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)]"
        animate={{ height: expanded ? "auto" : "auto" }}
      >
        {/* Collapsed bar — always visible */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-4 gap-3"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              Your Price
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-extrabold font-mono text-gold">
                {formatCurrency(breakdown.recommendedPricePerSqFt, 2)}
              </span>
              <span className="text-xs font-mono text-gold/50">/sqft</span>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-5 h-5 text-gold/60" />
            </motion.div>
          </div>
        </button>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-6 space-y-4 border-t border-[oklch(0.22_0.005_250)]">
                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="rounded-lg bg-[oklch(0.18_0.005_250)] p-3">
                    <span className="text-xs text-[oklch(0.55_0_0)]">Total Cost</span>
                    <div className="font-mono text-base font-bold text-foreground mt-0.5">
                      {formatCurrency(breakdown.totalCostPerSqFt, 2)}/sqft
                    </div>
                  </div>
                  <div className="rounded-lg bg-[oklch(0.18_0.005_250)] p-3">
                    <span className="text-xs text-[oklch(0.55_0_0)]">Margin</span>
                    <div className="font-mono text-base font-bold text-success mt-0.5">
                      {formatCurrency(breakdown.marginPerSqFt, 2)}/sqft
                    </div>
                  </div>
                </div>

                {/* Monthly summary */}
                <div className="rounded-lg bg-[oklch(0.18_0.005_250)] p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[oklch(0.6_0_0)]">Monthly Sq Ft</span>
                    <span className="font-mono text-foreground">
                      {breakdown.monthlySqFt.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[oklch(0.6_0_0)]">Monthly Revenue</span>
                    <span className="font-mono text-foreground">
                      {formatCurrencyWhole(breakdown.monthlyRevenue)}
                    </span>
                  </div>
                  <div className="border-t border-[oklch(0.25_0.005_250)] pt-2 flex justify-between text-sm">
                    <span className="font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-success" />
                      <span className="text-success">Monthly Profit</span>
                    </span>
                    <span className="font-mono font-bold text-success">
                      {formatCurrencyWhole(breakdown.monthlyProfit)}
                    </span>
                  </div>
                </div>

                {/* Cost bars */}
                <div className="space-y-2">
                  {[
                    { label: "Materials", value: breakdown.materialCostPerSqFt, color: "#F5C518" },
                    { label: "Labor", value: breakdown.laborCostPerSqFt, color: "#3B82F6" },
                    { label: "Equipment", value: breakdown.equipmentCostPerSqFt, color: "#8B5CF6" },
                    { label: "Overhead", value: breakdown.overheadCostPerSqFt, color: "#EF4444" },
                    { label: "Loans", value: breakdown.loanCostPerSqFt, color: "#F97316" },
                    { label: "Owner Pay", value: breakdown.ownerSalaryCostPerSqFt, color: "#10B981" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[oklch(0.65_0_0)]">{item.label}</span>
                      </div>
                      <span className="font-mono text-foreground">
                        {formatCurrency(item.value, 4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
