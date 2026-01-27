import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import annualInspectionsImage from "@/assets/annual-inspections.jpg";
import constructionManagementImage from "@/assets/construction-management.jpg";

const services = [
  {
    slug: "construction-management",
    title: "Construction Management",
    description: "Full-service oversight of commercial roofing projects from bidding through final inspection.",
    imageUrl: constructionManagementImage,
    featured: true,
  },
  {
    slug: "due-diligence",
    title: "Due Diligence",
    description: "Comprehensive roof assessments for property acquisitions and portfolio analysis.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
  },
  {
    slug: "survey",
    title: "Survey Inspections",
    description: "Detailed condition surveys to establish baseline roof performance metrics.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    slug: "annual",
    title: "Annual Inspections",
    description: "Routine maintenance inspections to maximize roof lifespan and prevent issues.",
    imageUrl: annualInspectionsImage,
  },
  {
    slug: "storm",
    title: "Storm Inspections",
    description: "Rapid response assessments after severe weather events for insurance claims.",
    imageUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&q=80",
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
                  className={`group block h-full rounded-xl overflow-hidden border transition-shadow hover:shadow-lg ${
                    isFeatured 
                      ? 'border-accent/30 shadow-md' 
                      : 'bg-card border-border'
                  }`}
                >
                  {/* Image Header */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.imageUrl} 
                      alt={`${service.title} - commercial roof inspection service`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isFeatured && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold text-white bg-accent px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-card">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <span className="inline-flex items-center text-accent text-sm font-medium">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
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
            <p className="text-gray-400 mb-6">
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
