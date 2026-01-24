import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { X, MapPin, Building2, Calendar, TrendingUp, SquareStack, DollarSign } from "lucide-react";

interface KPI {
  id: string;
  key: string;
  label: string;
  value: string;
  suffix: string;
  display_order: number;
}

interface KPIDetail {
  icon: typeof Building2;
  lines: string[];
}

const kpiDetails: Record<string, KPIDetail> = {
  "sqft_managed": {
    icon: SquareStack,
    lines: [
      "Across industrial, warehouse, retail, and multi-family properties",
      "Equivalent to 7,900 football fields"
    ]
  },
  "asset_value": {
    icon: DollarSign,
    lines: [
      "Combined roof asset value under our management",
      "Average property value: $12M"
    ]
  },
  "properties": {
    icon: Building2,
    lines: [
      "Since 2010",
      "Averaging 400+ inspections annually"
    ]
  },
  "states": {
    icon: MapPin,
    lines: [
      "Nationwide coverage with regional expertise",
      "AL, AR, FL, GA, IL, IN, KY, LA, MD, MI, MO, MS, NC, NJ, NY, OH, OK, PA, SC, TN, TX, VA, WI, and more"
    ]
  },
  "years": {
    icon: Calendar,
    lines: [
      "Founded in 2010",
      "Industry leaders in commercial roof consulting"
    ]
  },
  "inspections": {
    icon: TrendingUp,
    lines: [
      "Current year pace",
      "98% client retention rate"
    ]
  },
};

function AnimatedNumber({ value, suffix, delay = 0 }: { value: string; suffix: string; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    const startDelay = delay * 150;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), numericValue);
        setDisplayValue(current);

        if (step >= steps) {
          clearInterval(timer);
          setDisplayValue(numericValue);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [isInView, numericValue, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function KPICard({ kpi, index, onClick }: { kpi: KPI; index: number; onClick: () => void }) {
  const detail = kpiDetails[kpi.key];
  const Icon = detail?.icon || Building2;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={onClick}
      className="text-center group cursor-pointer relative p-6 rounded-xl transition-all duration-300 hover:bg-navy-light/50 hover:shadow-lg hover:shadow-accent/10"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-300" />
      
      <div className="relative z-10">
        {/* Icon appears on hover */}
        <div className="h-8 mb-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2 group-hover:text-accent transition-colors">
          <AnimatedNumber value={kpi.value} suffix={kpi.suffix} delay={index} />
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-primary-foreground transition-colors">
          {kpi.label}
        </p>
        
        {/* Hint text on hover */}
        <p className="text-xs text-accent/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click for details
        </p>
      </div>
    </motion.div>
  );
}

function KPIModal({ kpi, onClose }: { kpi: KPI; onClose: () => void }) {
  const detail = kpiDetails[kpi.key];
  const Icon = detail?.icon || Building2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
            <Icon className="w-8 h-8 text-accent" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
          {kpi.value}{kpi.suffix}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {kpi.label}
        </h3>
        
        {detail && (
          <ul className="space-y-3">
            {detail.lines.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}

export function KPISection() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchKPIs() {
      const { data, error } = await supabase
        .from("kpis")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        setKpis(data);
      }
      setLoading(false);
    }

    fetchKPIs();
  }, []);

  if (loading) {
    return (
      <section className="bg-primary py-20">
        <div className="container-narrow mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-12 bg-navy-light rounded mb-2" />
                <div className="h-4 bg-navy-light rounded w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section ref={sectionRef} className="bg-primary py-20 overflow-hidden">
        <div className="container-narrow mx-auto section-padding py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our track record speaks for itself. We've built lasting relationships with the
              nation's largest commercial property owners.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {kpis.map((kpi, index) => (
              <KPICard 
                key={kpi.id} 
                kpi={kpi} 
                index={index} 
                onClick={() => setSelectedKPI(kpi)}
              />
            ))}
          </div>
          
          {/* Subtle pulse animation indicator */}
          {isInView && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center text-xs text-muted-foreground/50 mt-8"
            >
              Click any stat for more details
            </motion.p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedKPI && (
          <KPIModal kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
        )}
      </AnimatePresence>
    </>
  );
}