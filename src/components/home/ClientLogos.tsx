import { motion } from "framer-motion";

const clients = [
  { name: "Prologis" },
  { name: "Realty Income" },
  { name: "GLP" },
  { name: "DCT Industrial" },
  { name: "CBRE" },
  { name: "JLL" },
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
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by Industry Leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center justify-center h-16 px-4"
            >
              <div className="text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
                {client.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
