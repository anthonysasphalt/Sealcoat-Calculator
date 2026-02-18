// ============================================================
// CurrencyInput — Formatted number input with $ prefix
// Design: Gold Standard — dark input with gold focus ring
// ============================================================

import { useCallback, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  decimals?: number;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  tooltip,
  prefix = "$",
  suffix,
  step = 1,
  min = 0,
  max = 999999,
  decimals = 2,
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-") {
        onChange(0);
        return;
      }
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        onChange(Math.min(Math.max(parsed, min), max));
      }
    },
    [onChange, min, max]
  );

  const increment = useCallback(() => {
    const newVal = Math.min(value + step, max);
    onChange(parseFloat(newVal.toFixed(decimals)));
  }, [value, step, max, onChange, decimals]);

  const decrement = useCallback(() => {
    const newVal = Math.max(value - step, min);
    onChange(parseFloat(newVal.toFixed(decimals)));
  }, [value, step, min, onChange, decimals]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-[oklch(0.75_0_0)]">
          {label}
        </label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-3.5 h-3.5 text-[oklch(0.5_0_0)] hover:text-gold transition-colors" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-[260px] bg-[oklch(0.22_0.005_250)] border-[oklch(0.32_0.005_250)] text-[oklch(0.85_0_0)] text-xs leading-relaxed"
            >
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-0">
        {/* Decrement button */}
        <button
          type="button"
          onClick={decrement}
          className="h-9 w-8 flex items-center justify-center rounded-l-md bg-[oklch(0.2_0.005_250)] border border-r-0 border-[oklch(0.3_0.005_250)] text-[oklch(0.6_0_0)] hover:text-gold hover:bg-[oklch(0.24_0.005_250)] transition-colors text-sm font-mono"
        >
          −
        </button>

        {/* Input field */}
        <div className="relative flex-1">
          {prefix && (
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[oklch(0.5_0_0)]">
              {prefix}
            </span>
          )}
          <input
            ref={inputRef}
            type="number"
            value={value}
            onChange={handleChange}
            step={step}
            min={min}
            max={max}
            className={`
              h-9 w-full bg-[oklch(0.15_0.005_250)] border-y border-[oklch(0.3_0.005_250)]
              text-sm font-mono text-foreground
              focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20
              transition-all
              ${prefix ? "pl-7" : "pl-3"}
              ${suffix ? "pr-12" : "pr-3"}
            `}
          />
          {suffix && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[oklch(0.5_0_0)]">
              {suffix}
            </span>
          )}
        </div>

        {/* Increment button */}
        <button
          type="button"
          onClick={increment}
          className="h-9 w-8 flex items-center justify-center rounded-r-md bg-[oklch(0.2_0.005_250)] border border-l-0 border-[oklch(0.3_0.005_250)] text-[oklch(0.6_0_0)] hover:text-gold hover:bg-[oklch(0.24_0.005_250)] transition-colors text-sm font-mono"
        >
          +
        </button>
      </div>
    </div>
  );
}
