import { motion } from "framer-motion";

// Import logos
import prologisLogo from "@/assets/clients/prologis.png";
import cushmanLogo from "@/assets/clients/cushman-wakefield.svg";

interface Client {
  name: string;
  logo?: string;
}

const clients: Client[] = [
  { name: "Prologis", logo: prologisLogo },
  { name: "Realty Income" },
  { name: "CBRE" },
  { name: "Sealy & Company" },
  { name: "Colliers International" },
  { name: "Cushman & Wakefield", logo: cushmanLogo },
  { name: "Link Logistics" },
  { name: "EastGroup Properties" },
];

export function ClientLogos() {
  return (
    <section className="bg-background section-padding py-16">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Our track record speaks for itself.
          </h2>
          <p className="text-muted-foreground text-lg">
            We've built lasting relationships with the nation's largest commercial property owners.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center justify-center h-16 px-4 w-full"
            >
              {client.logo ? (
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`}
                  className="h-10 md:h-12 max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <div className="text-base md:text-lg font-semibold text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors text-center">
                  {client.name}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
