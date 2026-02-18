// MarginAdjuster — Net Margin Target Slider
// Design: Gold Standard — Premium Dark Dashboard
// ============================================================

import { motion } from "framer-motion";

interface MarginAdjusterProps {
  value: number; // 0-1 (e.g., 0.40 = 40%)
  onChange: (value: number) => void;
}

export default function MarginAdjuster({ value, onChange }: MarginAdjusterProps) {
  const percentValue = Math.round(value * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[oklch(0.15_0.005_250)] border border-[oklch(0.2_0.005_250)] rounded-lg p-5 space-y-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white mb-1">Net Margin Target</h3>
          <p className="text-sm text-[oklch(0.55_0_0)]">
            Adjust for competitive bids or premium pricing
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gold font-mono">
            {percentValue}%
          </div>
          <p className="text-xs text-[oklch(0.45_0_0)] mt-1">of revenue</p>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="10"
        max="60"
        step="1"
        value={percentValue}
        onChange={(e) => onChange(parseInt(e.target.value) / 100)}
        className="w-full h-2 bg-[oklch(0.2_0.005_250)] rounded-lg appearance-none cursor-pointer accent-gold"
      />

      {/* Range labels */}
      <div className="flex justify-between text-xs text-[oklch(0.45_0_0)]">
        <span>10% (aggressive)</span>
        <span>60% (premium)</span>
      </div>

      {/* Help text */}
      <p className="text-xs text-[oklch(0.5_0_0)] pt-2 border-t border-[oklch(0.2_0.005_250)]">
        Lower margins for competitive bids. Higher margins for premium markets or experienced crews.
      </p>
    </motion.div>
  );
}
