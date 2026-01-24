import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

const services = [
  {
    slug: "construction-management",
    title: "Construction Management",
    description:
      "Full-service oversight of commercial roofing projects from bidding through final inspection. We act as your advocate throughout the entire process, ensuring quality workmanship and competitive pricing.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    features: [
      "Pre-construction meetings and planning",
      "Contractor bidding and selection",
      "Detailed scope development",
      "In-progress quality inspections",
      "Final inspection and sign-off",
      "Warranty coordination",
    ],
    featured: true,
  },
  {
    slug: "due-diligence",
    title: "Due Diligence Inspections",
    description:
      "Comprehensive roof assessments designed for property acquisitions, dispositions, and portfolio analysis. We provide detailed reports that help you make informed investment decisions.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    features: [
      "Physical condition assessment",
      "Remaining useful life estimation",
      "Capital expenditure forecasting",
      "Risk assessment and scoring",
    ],
  },
  {
    slug: "survey",
    title: "Survey Inspections",
    description:
      "Detailed condition surveys to establish baseline roof performance metrics. Ideal for new property acquisitions or establishing a maintenance baseline.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    features: [
      "Complete roof system documentation",
      "Deficiency identification",
      "Photo documentation",
      "Repair recommendations",
    ],
  },
  {
    slug: "annual",
    title: "Annual Inspections",
    description:
      "Routine maintenance inspections designed to maximize roof lifespan and prevent costly emergency repairs. Proactive care for your roofing assets.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    features: [
      "Bi-annual inspection cycles",
      "Preventive maintenance reports",
      "Warranty compliance verification",
      "Budgeting recommendations",
    ],
  },
  {
    slug: "storm",
    title: "Storm Inspections",
    description:
      "Rapid response assessments after severe weather events. We help document damage for insurance claims and prioritize repairs.",
    imageUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&q=80",
    features: [
      "24-48 hour response time",
      "Insurance-ready documentation",
      "Damage assessment reports",
      "Emergency repair coordination",
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-[400px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container-narrow mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
              Comprehensive Roof Consulting Solutions
            </h1>
            <p className="text-lg text-gray-300">
              From acquisition due diligence to ongoing maintenance programs, we provide
              institutional-grade roof consulting services tailored to your portfolio needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-background section-padding">
        <div className="container-narrow mx-auto">
          <div className="space-y-16">
            {services.map((service, index) => {
              const isFeatured = 'featured' in service && service.featured;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isFeatured ? "p-8 bg-accent/5 rounded-2xl border border-accent/20" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    {isFeatured && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/20 px-3 py-1 rounded-full mb-4">
                        <Star className="w-3 h-3 fill-current" />
                        FEATURED SERVICE
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="cta">
                      <Link to={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                  {/* Photo instead of gradient placeholder */}
                  <div
                    className={`aspect-video lg:aspect-square max-h-96 rounded-2xl overflow-hidden ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <img 
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cta section-padding">
        <div className="container-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cta-foreground mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-cta-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team will assess your portfolio and recommend the right solution for your
              specific requirements.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light"
            >
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
