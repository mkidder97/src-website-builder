import { useParams, Link } from "react-router-dom";
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
  ArrowLeft,
  HardHat,
  Shield,
  DollarSign,
  ClipboardCheck,
  FileText,
  HeartHandshake,
} from "lucide-react";

interface ServiceData {
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  icon: typeof FileSearch;
  features: string[];
  process: { step: number; title: string; description: string }[];
  whyChoose?: { icon: typeof Shield; title: string; description: string }[];
  featured?: boolean;
}

const servicesData: Record<string, ServiceData> = {
  "construction-management": {
    title: "Construction Management",
    subtitle: "Your Advocate From Bid to Completion",
    description: "Full-service oversight of commercial roofing projects from bidding through final inspection.",
    longDescription:
      "We manage every aspect of your commercial roofing projects, ensuring competitive pricing, quality workmanship, and accountability. Our CM services protect your investment and eliminate the headaches of managing contractors directly.",
    icon: HardHat,
    featured: true,
    features: [
      "Pre-Construction Planning & Meetings",
      "Contractor Bidding & Selection",
      "Scope Development & Specifications",
      "In-Progress Quality Inspections",
      "Final Inspection & Punch List",
      "Warranty Documentation & Coordination",
    ],
    process: [
      { step: 1, title: "Project Assessment", description: "We evaluate the existing roof conditions, review any previous inspection reports, and define project requirements with your team." },
      { step: 2, title: "Scope Development", description: "Our team creates detailed specifications and scope documents that clearly define work requirements, materials, and quality standards." },
      { step: 3, title: "Competitive Bidding", description: "We solicit bids from pre-qualified contractors, analyze proposals, and provide recommendations based on price, capability, and track record." },
      { step: 4, title: "Pre-Construction Meeting", description: "Before work begins, we facilitate a meeting with the selected contractor to review scope, timeline, safety requirements, and communication protocols." },
      { step: 5, title: "In-Progress Inspections", description: "Throughout the project, our inspectors verify work quality, material compliance, and adherence to specifications. We document progress and address issues immediately." },
      { step: 6, title: "Final Inspection & Closeout", description: "We conduct a comprehensive final inspection, develop punch lists for any deficiencies, verify warranty documentation, and provide you with complete project records." },
    ],
    whyChoose: [
      { icon: Shield, title: "Vendor-Neutral Advocacy", description: "We don't install roofs, so our only interest is your best outcome" },
      { icon: DollarSign, title: "Cost Savings", description: "Competitive bidding typically saves 10-15% vs. single-source pricing" },
      { icon: ClipboardCheck, title: "Quality Assurance", description: "Multiple inspection touchpoints catch issues before they become problems" },
      { icon: FileText, title: "Documentation", description: "Complete records protect your warranties and support future planning" },
      { icon: HeartHandshake, title: "Peace of Mind", description: "One point of contact manages the entire process" },
    ],
  },
  "due-diligence": {
    title: "Due Diligence Inspections",
    description: "Comprehensive roof assessments for property acquisitions and portfolio analysis.",
    longDescription:
      "Our Due Diligence Inspections provide institutional investors with the detailed roof condition data needed to make informed acquisition decisions. We assess physical conditions, estimate remaining useful life, and forecast capital expenditures.",
    icon: FileSearch,
    features: [
      "Physical condition assessment with photo documentation",
      "Remaining useful life estimation based on industry standards",
      "Capital expenditure forecasting for 5, 10, and 15-year horizons",
      "Risk assessment and scoring for portfolio prioritization",
      "Detailed reports formatted for investor presentations",
      "Fast turnaround times to meet transaction deadlines",
    ],
    process: [
      { step: 1, title: "Scope Definition", description: "We work with you to define inspection scope and reporting requirements." },
      { step: 2, title: "Field Inspection", description: "Our certified inspectors conduct thorough on-site assessments." },
      { step: 3, title: "Report Delivery", description: "Receive comprehensive reports with actionable insights." },
    ],
  },
  survey: {
    title: "Survey Inspections",
    description: "Detailed condition surveys to establish baseline roof performance metrics.",
    longDescription:
      "Survey Inspections establish a comprehensive baseline of your roof system's current condition. This foundational assessment is essential for new acquisitions or before implementing a maintenance program.",
    icon: ClipboardList,
    features: [
      "Complete roof system documentation including all components",
      "Deficiency identification with severity ratings",
      "Comprehensive photo documentation",
      "Repair recommendations with priority levels",
      "CAD drawings and measurement data",
      "Integration with asset management systems",
    ],
    process: [
      { step: 1, title: "Pre-Survey Review", description: "Review existing documentation and define survey parameters." },
      { step: 2, title: "Comprehensive Survey", description: "Complete on-site survey with measurements and photos." },
      { step: 3, title: "Documentation Package", description: "Deliver complete survey documentation and recommendations." },
    ],
  },
  annual: {
    title: "Annual Inspections",
    description: "Routine maintenance inspections to maximize roof lifespan and prevent issues.",
    longDescription:
      "Our Annual Inspection program provides proactive maintenance oversight to extend roof life and prevent costly emergency repairs. Regular inspections catch small problems before they become major expenses.",
    icon: Calendar,
    features: [
      "Bi-annual inspection cycles (spring and fall)",
      "Preventive maintenance reports and tracking",
      "Warranty compliance verification",
      "Budget recommendations for upcoming repairs",
      "Trend analysis across inspection cycles",
      "Priority scheduling for identified issues",
    ],
    process: [
      { step: 1, title: "Program Setup", description: "Establish inspection schedule and baseline documentation." },
      { step: 2, title: "Regular Inspections", description: "Conduct scheduled inspections throughout the year." },
      { step: 3, title: "Continuous Reporting", description: "Ongoing reports and recommendations for maintenance." },
    ],
  },
  storm: {
    title: "Storm Inspections",
    description: "Rapid response assessments after severe weather events for insurance claims.",
    longDescription:
      "When severe weather strikes, our Storm Inspection team provides rapid response to document damage and support insurance claims. We help you navigate the claims process and prioritize repairs.",
    icon: CloudLightning,
    features: [
      "24-48 hour response time after weather events",
      "Insurance-ready documentation and reports",
      "Comprehensive damage assessment with photos",
      "Emergency repair coordination and oversight",
      "Claims support and adjuster coordination",
      "Post-repair verification inspections",
    ],
    process: [
      { step: 1, title: "Rapid Response", description: "Deploy inspection team within 24-48 hours of your call." },
      { step: 2, title: "Damage Documentation", description: "Thorough documentation for insurance purposes." },
      { step: 3, title: "Claims Support", description: "Ongoing support through the insurance claims process." },
    ],
  },
  "take-off": {
    title: "Take-off Inspections",
    description: "Accurate quantity takeoffs for budgeting, bidding, and project planning.",
    longDescription:
      "Take-off Inspections provide accurate quantity measurements essential for replacement projects, contractor bidding, and budget planning. Our detailed takeoffs ensure you have the data needed for informed decisions.",
    icon: Calculator,
    features: [
      "Detailed quantity measurements for all roof components",
      "Material specifications and recommendations",
      "Bid package preparation for contractor solicitation",
      "Cost estimation support and budget planning",
      "Comparison analysis for contractor bids",
      "Scope validation during project execution",
    ],
    process: [
      { step: 1, title: "Measurement Survey", description: "Conduct detailed measurements of all roof areas and components." },
      { step: 2, title: "Takeoff Report", description: "Deliver comprehensive quantity takeoff with specifications." },
      { step: 3, title: "Bid Support", description: "Provide support during contractor bidding and selection." },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = service.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient section-padding pt-32">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {service.longDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-secondary rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Our Process</h2>
            <div className={`grid grid-cols-1 ${service.process.length > 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-8`}>
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-6xl font-bold text-accent/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section (for featured services) */}
      {service.whyChoose && (
        <section className="bg-background section-padding">
          <div className="container-narrow mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Why Choose SRC for Construction Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.whyChoose.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-secondary rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-cta section-padding">
        <div className="container-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cta-foreground mb-4">
              {service.featured ? "Ready to take the stress out of your next roofing project?" : "Ready to Get Started?"}
            </h2>
            <p className="text-cta-foreground/80 mb-8 max-w-2xl mx-auto">
              {service.featured 
                ? "Contact us to discuss Construction Management services for your portfolio."
                : `Contact us today to discuss your ${service.title.toLowerCase()} needs.`}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-navy-light"
            >
              <Link to="/contact">
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
