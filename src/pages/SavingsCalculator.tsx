import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { LeadCaptureForm } from "@/components/calculator/LeadCaptureForm";
import { calculateSavings, CalculatorInputs, CalculatorResults as Results } from "@/lib/calculator-constants";

export default function SavingsCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (formInputs: CalculatorInputs) => {
    setIsCalculating(true);
    setInputs(formInputs);
    
    // Brief delay for effect
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const calculatedResults = calculateSavings(formInputs);
    setResults(calculatedResults);
    setIsCalculating(false);

    // Scroll to results on mobile
    setTimeout(() => {
      const resultsElement = document.getElementById("calculator-results");
      if (resultsElement && window.innerWidth < 1024) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient section-padding pt-32">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              ROI Calculator
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-6">
              Calculate Your Portfolio Savings
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              See how proactive roof management impacts your bottom line.
            </p>
            <p className="text-muted-foreground">
              Our calculator uses industry benchmarks and SRC client data to project your potential savings 
              from extended roof life, avoided emergencies, and competitive bidding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="bg-background section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CalculatorForm onCalculate={handleCalculate} isCalculating={isCalculating} />
            </div>

            {/* Results */}
            <div id="calculator-results" className="space-y-8">
              {!results && !isCalculating ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-secondary/50 border border-border/50 rounded-2xl p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-accent/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Your Results Will Appear Here
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Enter your portfolio details on the left to see your projected savings, 
                    NOI impact, and property value increase.
                  </p>
                </motion.div>
              ) : isCalculating ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
                  <p className="text-lg text-foreground">Calculating your savings...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analyzing portfolio data
                  </p>
                </div>
              ) : results && inputs ? (
                <>
                  <CalculatorResults results={results} />
                  <LeadCaptureForm inputs={inputs} results={results} />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Trusted by Portfolio Managers Nationwide
            </h2>
            <p className="text-muted-foreground mb-8">
              Our clients typically see 10-15x ROI on their partnership with SRC. 
              These projections are based on real client outcomes across 2,500+ properties.
            </p>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-accent">455M+</p>
                <p className="text-sm text-muted-foreground">Sq Ft Managed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">$3B+</p>
                <p className="text-sm text-muted-foreground">Assets Protected</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">15+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
