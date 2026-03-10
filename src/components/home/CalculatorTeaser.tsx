import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalculatorTeaser() {
  return (
    <section
      className="section-padding"
      style={{ background: "hsl(var(--warm-gray))" }}
    >
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Value prop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-accent" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "hsl(var(--accent))",
                }}
              >
                ROI Calculator
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              See What You're Overspending
            </h2>

            <p className="text-muted-foreground mb-8 max-w-lg" style={{ fontSize: 15, lineHeight: 1.7 }}>
              Most institutional owners overpay on roof replacements by 15–25% without independent
              consulting oversight. Our clients typically recover 10–15x the cost of our services in
              the first year alone.
            </p>

            <Button asChild variant="cta" size="lg">
              <Link to="/savings-calculator">
                Get Your Portfolio Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Right — Large ROI visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div
              className="text-accent"
              style={{
                fontSize: "clamp(80px, 12vw, 140px)",
                fontWeight: 200,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              10–15×
            </div>
            <div
              className="mt-3"
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Typical Client ROI
            </div>
            <div
              className="mt-6 w-full max-w-sm rounded-lg p-5"
              style={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}>Avg. savings per property</span>
                <span className="text-foreground font-semibold" style={{ fontSize: 15 }}>$47K</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}>Avoided replacements</span>
                <span className="text-foreground font-semibold" style={{ fontSize: 15 }}>23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}>Portfolio of 100 roofs</span>
                <span className="text-accent font-bold" style={{ fontSize: 15 }}>$847K saved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
