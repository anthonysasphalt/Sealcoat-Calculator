import { useState, useMemo } from "react";
import { AlertCircle, Zap } from "lucide-react";
import {
  calculateBeginnerJob,
  formatCurrency,
  formatNumber,
  type BeginnerJobInputs,
} from "@/lib/beginnerCalculator";

export default function BeginnerCalculator() {
  const [inputs, setInputs] = useState<BeginnerJobInputs>({
    squareFootage: 2000,
    materialCost: 400,
    laborHourlyRate: 25,
    laborHours: 8,
  });

  const result = useMemo(() => calculateBeginnerJob(inputs), [inputs]);

  const handleInputChange = (key: keyof BeginnerJobInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: Math.max(0, value),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-background/50 border border-border/50 rounded-lg p-6 space-y-5">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5 text-gold" />
          Job Details
        </h3>

        {/* Square Footage */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Square Footage
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputs.squareFootage}
              onChange={(e) =>
                handleInputChange("squareFootage", parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Enter job size"
              min="1"
              step="100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              sqft
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total area to be sealed
          </p>
        </div>

        {/* Material Cost */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Material Cost
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <input
              type="number"
              value={inputs.materialCost}
              onChange={(e) =>
                handleInputChange("materialCost", parseFloat(e.target.value) || 0)
              }
              className="w-full pl-8 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="0.00"
              min="0"
              step="10"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total material cost for this job (sealer, additives, etc.)
          </p>
        </div>

        {/* Labor Hourly Rate */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Labor Hourly Rate
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <input
              type="number"
              value={inputs.laborHourlyRate}
              onChange={(e) =>
                handleInputChange("laborHourlyRate", parseFloat(e.target.value) || 0)
              }
              className="w-full pl-8 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="0.00"
              min="0"
              step="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              /hr
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Your hourly rate (including yourself + crew)
          </p>
        </div>

        {/* Labor Hours */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Labor Hours
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputs.laborHours}
              onChange={(e) =>
                handleInputChange("laborHours", parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Enter hours"
              min="0"
              step="0.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              hrs
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total labor hours for this job
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-3">
        {/* Low Margin Alert */}
        {result.isLowMargin && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-400">
                ⚠️ Margin Below 50%
              </p>
              <p className="text-xs text-red-300 mt-1">
                Your margin is only {formatNumber(result.actualMarginPercent)}%. Consider increasing your price or reducing costs.
              </p>
            </div>
          </div>
        )}

        {/* Cost Breakdown */}
        <div className="bg-background/50 border border-border/50 rounded-lg p-4 space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Cost Breakdown
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Material Cost:</span>
              <span className="text-foreground font-mono">
                {formatCurrency(inputs.materialCost)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Labor Cost:</span>
              <span className="text-foreground font-mono">
                {formatCurrency(inputs.laborHourlyRate * inputs.laborHours)}
              </span>
            </div>
            <div className="h-px bg-border/50 my-2" />
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-foreground">Total Cost:</span>
              <span className="text-gold font-mono">
                {formatCurrency(result.totalCost)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Cost per sq ft:</span>
              <span className="font-mono">{formatCurrency(result.costPerSqFt)}</span>
            </div>
          </div>
        </div>

        {/* Pricing for 50% Margin */}
        <div
          className={`rounded-lg p-4 space-y-2 ${
            result.isLowMargin
              ? "bg-red-900/20 border border-red-500/50"
              : "bg-gold/10 border border-gold/30"
          }`}
        >
          <p className="text-xs uppercase tracking-wider font-semibold">
            {result.isLowMargin ? "Recommended Pricing" : "Pricing for 50% Margin"}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per sq ft:</span>
              <span
                className={`font-mono font-semibold ${
                  result.isLowMargin ? "text-red-400" : "text-gold"
                }`}
              >
                {formatCurrency(result.pricePerSqFt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Job Price:</span>
              <span
                className={`font-mono text-lg font-bold ${
                  result.isLowMargin ? "text-red-400" : "text-gold"
                }`}
              >
                {formatCurrency(result.totalJobPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Margin Info */}
        <div className="bg-background/50 border border-border/50 rounded-lg p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Margin Analysis
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Profit:</span>
              <span className="text-foreground font-mono">
                {formatCurrency(result.totalJobPrice - result.totalCost)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Margin %:</span>
              <span
                className={`font-mono font-semibold ${
                  result.isLowMargin ? "text-red-400" : "text-success"
                }`}
              >
                {formatNumber(result.actualMarginPercent)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
