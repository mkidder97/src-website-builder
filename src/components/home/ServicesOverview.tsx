import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSearch, ClipboardList, Calendar, CloudLightning, Calculator, ArrowRight, HardHat, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    slug: "construction-management",
    title: "Construction Management",
    description: "Full-service oversight of commercial roofing projects from bidding through final inspection.",
    icon: HardHat,
    featured: true,
  },
  {
    slug: "due-diligence",
    title: "Due Diligence",
    description: "Comprehensive roof assessments for property acquisitions and portfolio analysis.",
    icon: FileSearch,
  },
  {
    slug: "survey",
    title: "Survey Inspections",
    description: "Detailed condition surveys to establish baseline roof performance metrics.",
    icon: ClipboardList,
  },
  {
    slug: "annual",
    title: "Annual Inspections",
    description: "Routine maintenance inspections to maximize roof lifespan and prevent issues.",
    icon: Calendar,
  },
  {
    slug: "storm",
    title: "Storm Inspections",
    description: "Rapid response assessments after severe weather events for insurance claims.",
    icon: CloudLightning,
  },
  {
    slug: "take-off",
    title: "Take-off Inspections",
    description: "Accurate quantity takeoffs for budgeting, bidding, and project planning.",
    icon: Calculator,
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-background section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From acquisition due diligence to ongoing maintenance programs, we provide
            comprehensive roof consulting services tailored to institutional investors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isFeatured = 'featured' in service && service.featured;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className={`group block h-full p-8 rounded-xl card-hover ${
                    isFeatured 
                      ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30' 
                      : 'bg-card border border-border'
                  }`}
                >
                  {isFeatured && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/20 px-2 py-1 rounded-full mb-4">
                      <Star className="w-3 h-3 fill-current" />
                      FEATURED
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-lg ${isFeatured ? 'bg-accent/20' : 'bg-accent/10'} flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors`}>
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <span className="inline-flex items-center text-accent text-sm font-medium">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-8 bg-primary rounded-xl flex flex-col justify-center"
          >
            <h3 className="text-xl font-semibold text-primary-foreground mb-3">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team will assess your portfolio and recommend the right solution.
            </p>
            <Button asChild variant="cta" className="w-full">
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
