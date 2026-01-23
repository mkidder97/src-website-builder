import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface KPI {
  id: string;
  key: string;
  label: string;
  value: string;
  suffix: string;
  display_order: number;
}

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;

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
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function KPISection() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

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
    <section className="bg-primary py-20">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">
                <AnimatedNumber value={kpi.value} suffix={kpi.suffix} />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground transition-colors">
                {kpi.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
