import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CalculatorInputs } from "@/lib/calculator-constants";

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
  isCalculating: boolean;
}

function formatNumber(value: string): string {
  const num = value.replace(/[^0-9]/g, "");
  return num ? parseInt(num, 10).toLocaleString() : "";
}

function formatCurrency(value: string): string {
  const num = value.replace(/[^0-9]/g, "");
  return num ? "$" + parseInt(num, 10).toLocaleString() : "";
}

function parseFormattedNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
}

export function CalculatorForm({ onCalculate, isCalculating }: CalculatorFormProps) {
  const [totalSqFt, setTotalSqFt] = useState("");
  const [propertyCount, setPropertyCount] = useState("");
  const [avgRoofAge, setAvgRoofAge] = useState(12);
  const [plannedReplacements, setPlannedReplacements] = useState("");
  const [currentApproach, setCurrentApproach] = useState<"reactive" | "basic" | "none">("reactive");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const sqFt = parseFormattedNumber(totalSqFt);
    const count = parseFormattedNumber(propertyCount);

    if (sqFt < 100000) {
      newErrors.totalSqFt = "Minimum 100,000 sq ft for institutional portfolios";
    }
    if (count < 1) {
      newErrors.propertyCount = "At least 1 property required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onCalculate({
      totalSqFt: parseFormattedNumber(totalSqFt),
      propertyCount: parseFormattedNumber(propertyCount),
      avgRoofAge,
      plannedReplacements: parseFormattedNumber(plannedReplacements),
      currentApproach,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Portfolio Details</h2>
          <p className="text-sm text-muted-foreground">Enter your portfolio information</p>
        </div>
      </div>

      {/* Total Square Footage */}
      <div className="space-y-2">
        <Label htmlFor="totalSqFt">Total Portfolio Square Footage</Label>
        <Input
          id="totalSqFt"
          type="text"
          inputMode="numeric"
          placeholder="e.g., 5,000,000"
          value={totalSqFt}
          onChange={(e) => setTotalSqFt(formatNumber(e.target.value))}
          className={errors.totalSqFt ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">Combined roof area across all properties</p>
        {errors.totalSqFt && <p className="text-xs text-destructive">{errors.totalSqFt}</p>}
      </div>

      {/* Number of Properties */}
      <div className="space-y-2">
        <Label htmlFor="propertyCount">Number of Properties</Label>
        <Input
          id="propertyCount"
          type="text"
          inputMode="numeric"
          placeholder="e.g., 25"
          value={propertyCount}
          onChange={(e) => setPropertyCount(formatNumber(e.target.value))}
          className={errors.propertyCount ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">Total properties in portfolio</p>
        {errors.propertyCount && <p className="text-xs text-destructive">{errors.propertyCount}</p>}
      </div>

      {/* Average Roof Age */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="avgRoofAge">Average Roof Age (Years)</Label>
          <span className="text-lg font-semibold text-accent">{avgRoofAge} years</span>
        </div>
        <Slider
          id="avgRoofAge"
          min={1}
          max={30}
          step={1}
          value={[avgRoofAge]}
          onValueChange={(value) => setAvgRoofAge(value[0])}
          className="py-2"
        />
        <p className="text-xs text-muted-foreground">Approximate average across portfolio</p>
      </div>

      {/* Planned Replacements */}
      <div className="space-y-2">
        <Label htmlFor="plannedReplacements">Planned Roof Replacements (Next 5 Years)</Label>
        <Input
          id="plannedReplacements"
          type="text"
          inputMode="numeric"
          placeholder="$0"
          value={plannedReplacements}
          onChange={(e) => setPlannedReplacements(formatCurrency(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">Estimated replacement/major repair budget</p>
      </div>

      {/* Current Maintenance Approach */}
      <div className="space-y-2">
        <Label htmlFor="currentApproach">Current Maintenance Approach</Label>
        <Select value={currentApproach} onValueChange={(v) => setCurrentApproach(v as typeof currentApproach)}>
          <SelectTrigger id="currentApproach" className="bg-background">
            <SelectValue placeholder="Select your current approach" />
          </SelectTrigger>
          <SelectContent className="bg-card border border-border">
            <SelectItem value="reactive">Reactive - We fix issues as they arise</SelectItem>
            <SelectItem value="basic">Basic - Annual inspections, some maintenance</SelectItem>
            <SelectItem value="none">None - No formal program</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="w-full"
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Calculating...
          </>
        ) : (
          "Calculate My Savings"
        )}
      </Button>
    </motion.form>
  );
}
