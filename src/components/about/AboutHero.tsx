import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section
      className="relative h-[400px] md:h-[450px] flex items-center bg-cover bg-center hero-gradient"
      role="img"
      aria-label="Professional office building interior"
      style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--navy-dark) / 0.95), hsl(var(--navy) / 0.8)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`,
      }}
    >
      <div className="container-narrow mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold uppercase tracking-wide text-sm">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4">
            Protecting Commercial Roofing Assets Since 2002
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We're the trusted partner for institutional investors who demand
            data-driven insights and uncompromising expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
