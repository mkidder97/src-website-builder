import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Mail, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { CalculatorInputs, CalculatorResults } from "@/lib/calculator-constants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LeadCaptureFormProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function LeadCaptureForm({ inputs, results }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (action: "download" | "schedule") => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Check rate limit first
      const { data: isAllowed, error: rateLimitError } = await supabase
        .rpc('check_calculator_rate_limit', { p_email: email });

      if (rateLimitError) {
        if (import.meta.env.DEV) {
          console.error("Rate limit check error:", rateLimitError);
        }
        // Continue anyway if rate limit check fails
      } else if (!isAllowed) {
        setError("Too many submissions. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("calculator_leads")
        .insert({
          email,
          total_sqft: inputs.totalSqFt,
          property_count: inputs.propertyCount,
          avg_roof_age: inputs.avgRoofAge,
          planned_replacements: inputs.plannedReplacements,
          current_approach: inputs.currentApproach,
          total_savings: results.totalSavings,
          value_impact: results.valueImpact,
          roi: results.roi,
        });

      if (insertError) throw insertError;

      setSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");

      if (action === "schedule") {
        setTimeout(() => {
          navigate("/contact?source=calculator");
        }, 1500);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Failed to save lead:", err);
      }
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-accent/30 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We've received your information and will send your personalized analysis shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Want a Detailed Analysis?</h3>
          <p className="text-sm text-muted-foreground">
            Get a personalized report with property-by-property projections
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`pl-10 ${error ? "border-destructive" : ""}`}
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <Button
          onClick={() => handleSubmit("download")}
          disabled={isSubmitting}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <FileText className="w-4 h-4 mr-2" />
          )}
          Download Custom Report (PDF)
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          onClick={() => handleSubmit("schedule")}
          disabled={isSubmitting}
          variant="outline"
          className="w-full"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Calendar className="w-4 h-4 mr-2" />
          )}
          Schedule a Portfolio Review
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          We respect your privacy. Your information will only be used to send your analysis.
        </p>
      </div>
    </motion.div>
  );
}
