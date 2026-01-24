import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalculatorTeaser() {
  return (
    <section 
      className="section-padding relative"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.88)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-narrow mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image instead of icon */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80"
                alt="Financial analysis"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                What Could You Save?
              </h2>
              <p className="text-gray-400 max-w-xl">
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
