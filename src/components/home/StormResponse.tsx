import { motion } from "framer-motion";
import { Phone, MapPin, ClipboardCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Phone,
    title: "24/7 Hotline",
    description: "Immediate response",
  },
  {
    icon: MapPin,
    title: "28 States",
    description: "Nationwide coverage",
  },
  {
    icon: ClipboardCheck,
    title: "Insurance Docs",
    description: "Full documentation",
  },
];

export function StormResponse() {
  return (
    <section 
      className="relative section-padding"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-narrow mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Alert Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/20 text-destructive mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Storm Response
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            24-48 Hour Emergency Mobilization
          </h2>

          <p className="text-lg text-gray-300 mb-10">
            When severe weather hits your portfolio, time is critical. Our storm response team 
            deploys within 24-48 hours to document damage and support your insurance claims.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <Button
            asChild
            variant="destructive"
            size="lg"
            className="font-semibold"
          >
            <a href="tel:+17273620116">
              <Phone className="w-5 h-5 mr-2" />
              Call Storm Hotline: (727) 362-0116
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
