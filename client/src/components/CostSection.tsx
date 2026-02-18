// ============================================================
// CostSection — Collapsible section with gold accent icon
// Design: Gold Standard — card with subtle border, gold badge
// ============================================================

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatCurrencyWhole } from "@/lib/calculator";

interface CostSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  subtotal?: number;
  subtotalLabel?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function CostSection({
  icon,
  title,
  description,
  stepNumber,
  subtotal,
  subtotalLabel = "/mo",
  children,
  defaultOpen = false,
}: CostSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-[oklch(0.25_0.005_250)] bg-card overflow-hidden transition-colors hover:border-[oklch(0.3_0.005_250)]">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 sm:p-5 text-left group"
      >
        {/* Step badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold-dim flex items-center justify-center text-gold">
          {icon}
        </div>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gold/60 uppercase tracking-wider">
              Step {stepNumber}
            </span>
          </div>
          <h3 className="text-base font-semibold text-foreground leading-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {description}
          </p>
        </div>

        {/* Subtotal badge */}
        {subtotal !== undefined && subtotal > 0 && (
          <div className="hidden sm:flex flex-shrink-0 items-baseline gap-0.5 mr-2">
            <span className="text-sm font-mono font-bold text-gold">
              {subtotalLabel.includes("sqft") ? subtotal.toLocaleString() : formatCurrencyWhole(subtotal)}
            </span>
            <span className="text-xs font-mono text-[oklch(0.5_0_0)]">
              {subtotalLabel}
            </span>
          </div>
        )}

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[oklch(0.5_0_0)] group-hover:text-gold transition-colors" />
        </motion.div>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[oklch(0.22_0.005_250)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mt-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
