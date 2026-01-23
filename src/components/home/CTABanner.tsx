import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="bg-cta section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cta-foreground mb-2">
              Ready to Protect Your Investment?
            </h2>
            <p className="text-cta-foreground/80">
              Get a comprehensive assessment of your roofing portfolio today.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-navy-light whitespace-nowrap"
          >
            <Link to="/contact">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
