import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalculatorTeaser() {
  return (
    <section className="bg-secondary section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary to-navy-light rounded-2xl p-8 md:p-12 border border-navy-light"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Calculator className="w-10 h-10 text-accent" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                What Could You Save?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Our clients typically see 10-15x ROI on their partnership with SRC. 
                Calculate your potential savings in 2 minutes.
              </p>
            </div>
            <Button asChild variant="cta" size="lg" className="flex-shrink-0">
              <Link to="/savings-calculator">
                Calculate My Savings
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
