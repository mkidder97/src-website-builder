import { motion } from "framer-motion";
import { Target, ShieldCheck, BarChart3 } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To be the fiscal stewards of our clients' roofing assets—providing the data, insights, and expertise they need to make confident investment decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity First",
    description:
      "We don't sell roofs or repairs. Our only job is to give you the truth about your assets—even when that truth is uncomfortable.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    description:
      "Every recommendation we make is backed by comprehensive inspection data, industry benchmarks, and years of portfolio intelligence.",
  },
];

export function MissionValues() {
  return (
    <section className="bg-secondary section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold uppercase tracking-wide text-sm">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Our Mission & Values
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-xl shadow-sm card-hover"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
