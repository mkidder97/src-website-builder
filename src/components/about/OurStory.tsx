import { motion } from "framer-motion";

export function OurStory() {
  return (
    <section className="bg-background section-padding">
      <div className="container-narrow mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold uppercase tracking-wide text-sm">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Built on Expertise, Driven by Results
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Southern Roof Consultants was founded with a simple mission:
                bring transparency and accountability to commercial roof
                management. What started as a small inspection firm has grown
                into the trusted partner for some of the nation's largest REITs
                and institutional investors.
              </p>
              <p>
                Our founder recognized that property owners were often flying
                blind when it came to their roofing assets—making decisions
                based on incomplete information from contractors with misaligned
                incentives. We set out to change that.
              </p>
              <p>
                Today, we protect over $3 billion in commercial roofing assets
                across 28 states. Our proprietary Roof Controller platform gives
                clients real-time visibility into their entire portfolio, while
                our boots-on-the-ground inspection teams provide the detailed
                assessments that drive smart capital decisions.
              </p>
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
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="SRC team inspecting commercial roof"
              loading="lazy"
              className="rounded-xl shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
