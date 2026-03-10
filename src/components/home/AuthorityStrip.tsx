import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 3, prefix: "$", suffix: "B+", label: "Assets Protected" },
  { value: 4600, prefix: "", suffix: "+", label: "Roofs Managed" },
  { value: 28, prefix: "", suffix: "", label: "States" },
  { value: 23, prefix: "", suffix: "+", label: "Years" },
];

function AnimatedNumber({ value, prefix, suffix, isInView }: { value: number; prefix: string; suffix: string; isInView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 50;
    const inc = value / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.min(Math.round(inc * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export function AuthorityStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-primary">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-wrap justify-center gap-y-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div
                  className="hidden md:block h-12 mx-8 lg:mx-12"
                  style={{ width: 1, background: "rgba(255,255,255,0.12)" }}
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-4 md:px-0"
              >
                <div
                  className="text-accent mb-1"
                  style={{ fontSize: 38, fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isInView={isInView} />
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
