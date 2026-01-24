import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  FileSearch,
  ClipboardList,
  Calendar,
  CloudLightning,
  Calculator,
  ArrowRight,
  CheckCircle,
  HardHat,
  Star,
} from "lucide-react";

const services = [
  {
    slug: "construction-management",
    title: "Construction Management",
    description:
      "Full-service oversight of commercial roofing projects from bidding through final inspection. We act as your advocate throughout the entire process, ensuring quality workmanship and competitive pricing.",
    icon: HardHat,
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
    icon: FileSearch,
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
    icon: ClipboardList,
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
    icon: Calendar,
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
    icon: CloudLightning,
    features: [
      "24-48 hour response time",
      "Insurance-ready documentation",
      "Damage assessment reports",
      "Emergency repair coordination",
    ],
  },
  {
    slug: "take-off",
    title: "Take-off Inspections",
    description:
      "Accurate quantity takeoffs for budgeting, bidding, and project planning. Essential for replacement projects and contractor evaluations.",
    icon: Calculator,
    features: [
      "Detailed quantity measurements",
      "Material specifications",
      "Bid package preparation",
      "Cost estimation support",
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient section-padding pt-32">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-6">
              Comprehensive Roof Consulting Solutions
            </h1>
            <p className="text-lg text-muted-foreground">
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
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  } ${isFeatured ? "p-8 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl border border-accent/20" : ""}`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    {isFeatured && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/20 px-3 py-1 rounded-full mb-4">
                        <Star className="w-3 h-3 fill-current" />
                        FEATURED SERVICE
                      </span>
                    )}
                    <div className={`w-16 h-16 rounded-xl ${isFeatured ? 'bg-accent/20' : 'bg-accent/10'} flex items-center justify-center mb-6`}>
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
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
                  <div
                    className={`aspect-square max-h-96 rounded-2xl bg-gradient-to-br ${isFeatured ? 'from-accent/20 to-teal-dark' : 'from-navy to-teal-dark'} flex items-center justify-center ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <service.icon className={`w-24 h-24 ${isFeatured ? 'text-accent/40' : 'text-primary-foreground/20'}`} />
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
