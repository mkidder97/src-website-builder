import { motion } from "framer-motion";

const clients = [
  { name: "Prologis" },
  { name: "Realty Income" },
  { name: "CBRE" },
  { name: "Sealy & Company" },
  { name: "Colliers International" },
  { name: "Cushman & Wakefield" },
  { name: "Link Logistics" },
  { name: "EastGroup Properties" },
];

export function ClientLogos() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-14"
      style={{ background: "hsl(var(--warm-gray))" }}
    >
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "hsl(var(--muted-foreground) / 0.6)",
            }}
          >
            Trusted by the nation's largest property owners
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <span
                className="whitespace-nowrap select-none"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "hsl(var(--foreground) / 0.28)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--foreground) / 0.55)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--foreground) / 0.28)")}
              >
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
