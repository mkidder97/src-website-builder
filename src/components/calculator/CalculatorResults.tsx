import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, Shield, ClipboardList, Wrench, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { CalculatorResults as Results } from "@/lib/calculator-constants";

interface CalculatorResultsProps {
  results: Results;
}

function AnimatedCurrency({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.floor(increment * step), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${prefix}${(val / 1000000).toFixed(2)}M`;
    }
    return `${prefix}${val.toLocaleString()}`;
  };

  return <span ref={ref}>{formatValue(displayValue)}</span>;
}

const savingsCards = [
  {
    key: "extendedLifeSavings",
    icon: DollarSign,
    title: "Extended Roof Life",
    description: "Delay replacements by 6+ years",
  },
  {
    key: "emergencyAvoidanceSavings",
    icon: Shield,
    title: "Emergency Avoidance",
    description: "Fewer catastrophic failures",
  },
  {
    key: "cmSavings",
    icon: ClipboardList,
    title: "CM Bidding Savings",
    description: "12% avg savings on replacement projects",
  },
  {
    key: "maintenanceSavings",
    icon: Wrench,
    title: "Maintenance Savings",
    description: "Proactive vs reactive cost reduction",
  },
];

export function CalculatorResults({ results }: CalculatorResultsProps) {
  const [showAssumptions, setShowAssumptions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Savings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savingsCards.map((card, index) => {
          const Icon = card.icon;
          const value = results[card.key as keyof Results] as number;
          
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-2xl md:text-3xl font-bold text-accent">
                    <AnimatedCurrency value={value} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total Savings Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border-2 border-accent/30 rounded-2xl p-6 md:p-8 text-center"
      >
        <p className="text-sm uppercase tracking-wider text-accent mb-2">5-Year Projected Savings</p>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent">
          <AnimatedCurrency value={results.totalSavings} />
        </p>
      </motion.div>

      {/* Property Value Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Impact on Portfolio Value</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-secondary rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Annual NOI Improvement</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              <AnimatedCurrency value={results.noiImpact} />
            </p>
          </div>
          <div className="p-4 bg-secondary rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Portfolio Value Increase</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              +<AnimatedCurrency value={results.valueImpact} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">(at 6% cap rate)</p>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground mb-4">Your ROI with SRC</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex-1 w-full p-4 bg-secondary rounded-xl text-center">
              <p className="text-xs text-muted-foreground mb-1">Investment</p>
              <p className="text-xl font-semibold text-foreground">
                <AnimatedCurrency value={results.totalInvestment} />
              </p>
              <p className="text-xs text-muted-foreground">(5-year est.)</p>
            </div>
            <div className="hidden sm:block text-2xl text-muted-foreground">→</div>
            <div className="flex-1 w-full p-4 bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 rounded-xl text-center">
              <p className="text-xs text-accent mb-1">Return</p>
              <motion.p
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, delay: 1, repeat: results.roi > 10 ? 2 : 0 }}
                className="text-3xl font-bold text-accent"
              >
                {results.roi}x
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Assumptions Disclosure */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          View assumptions
        </button>
        
        {showAssumptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 bg-secondary rounded-lg text-sm text-muted-foreground space-y-2"
          >
            <p className="font-medium text-foreground">Calculations based on:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Roof replacement cost: $7.50/sq ft (industry average)</li>
              <li>Standard roof lifespan: 18 years → 24 years with proactive management</li>
              <li>Emergency repair multiplier: 5x preventive repair costs</li>
              <li>Competitive bidding savings: 12% average</li>
              <li>Cap rate for valuation: 6%</li>
            </ul>
            <p className="text-xs mt-4 border-t border-border pt-4">
              These are estimates based on industry data and SRC client results. 
              Actual results vary based on roof conditions, geography, and other factors.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
