import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  {
    title: "No Conflicts of Interest",
    description:
      "We don't sell roofs or repairs. Our recommendations are 100% objective.",
  },
  {
    title: "Institutional-Grade Reporting",
    description:
      "Detailed documentation that meets the standards of REITs, lenders, and institutional investors.",
  },
  {
    title: "National Coverage, Local Expertise",
    description:
      "Teams in 28 states who understand regional weather patterns and building codes.",
  },
  {
    title: "Technology-Enabled",
    description:
      "Our Roof Controller platform provides real-time portfolio visibility and data-driven insights.",
  },
  {
    title: "Rapid Response",
    description:
      "24-48 hour emergency mobilization for storm events. We move when you need us.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-secondary section-padding">
      <div className="container-narrow mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold uppercase tracking-wide text-sm">
              The SRC Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Why Institutional Clients Choose Us
            </h2>

            <div className="space-y-4">
              {reasons.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Commercial building"
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
