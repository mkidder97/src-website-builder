import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import annualInspectionsImage from "@/assets/annual-inspections.jpg";
import constructionManagementImage from "@/assets/construction-management.jpg";
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
import { useSampleReportsModal } from "@/components/SampleReportsModal";

// SEO data for each service
const serviceSEO: Record<string, { title: string; description: string; keywords: string }> = {
  "construction-management": {
    title: "Commercial Roof Construction Management",
    description: "Full-service oversight of commercial roofing projects from bidding through final inspection. We manage contractors, ensure quality, and protect your investment.",
    keywords: "roof construction management, commercial roofing oversight, contractor management, roof project management, quality assurance"
  },
  "due-diligence": {
    title: "Due Diligence Roof Inspections",
    description: "Pre-acquisition roof assessments for commercial property buyers. Get detailed condition reports, remaining useful life estimates, and capital expenditure forecasts before closing.",
    keywords: "due diligence inspection, pre-acquisition roof assessment, commercial property inspection, roof condition report, capital expenditure forecast"
  },
  "survey": {
    title: "Commercial Roof Survey Inspections",
    description: "Detailed condition surveys to establish baseline roof performance metrics. Comprehensive documentation with photo evidence and maintenance recommendations.",
    keywords: "roof survey inspection, roof condition assessment, commercial roof documentation, baseline roof inspection"
  },
  "annual": {
    title: "Annual Roof Inspection Programs",
    description: "Routine maintenance inspections to maximize roof lifespan and maintain warranty compliance. Proactive issue detection saves money and prevents emergencies.",
    keywords: "annual roof inspection, preventative roof maintenance, warranty compliance inspection, routine roof inspection"
  },
  "storm": {
    title: "Storm Damage Roof Inspections",
    description: "24-48 hour emergency mobilization after severe weather. Rapid damage assessment and complete insurance documentation to support your claims.",
    keywords: "storm damage inspection, emergency roof inspection, hurricane roof damage, hail damage assessment, insurance documentation"
  },
  "take-off": {
    title: "Take-off Roof Inspections",
    description: "Accurate quantity takeoffs for budgeting, bidding, and project planning. Detailed measurements for all roof components and materials.",
    keywords: "roof takeoff inspection, quantity measurement, roof bidding, project planning, material specifications"
  }
};

interface ServiceData {
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  icon: typeof FileSearch;
  heroImage: string;
  features: string[];
  process: { step: number; title: string; description: string; image?: string }[];
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
    heroImage: constructionManagementImage,
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
      { step: 1, title: "Project Assessment", description: "We evaluate the existing roof conditions, review any previous inspection reports, and define project requirements with your team.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80" },
      { step: 2, title: "Scope Development", description: "Our team creates detailed specifications and scope documents that clearly define work requirements, materials, and quality standards.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" },
      { step: 3, title: "Competitive Bidding", description: "We solicit bids from pre-qualified contractors, analyze proposals, and provide recommendations based on price, capability, and track record.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80" },
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
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
    features: [
      "Physical condition assessment with photo documentation",
      "Remaining useful life estimation based on industry standards",
      "Capital expenditure forecasting for 5, 10, and 15-year horizons",
      "Risk assessment and scoring for portfolio prioritization",
      "Detailed reports formatted for investor presentations",
      "Fast turnaround times to meet transaction deadlines",
    ],
    process: [
      { step: 1, title: "Scope Definition", description: "We work with you to define inspection scope and reporting requirements.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" },
      { step: 2, title: "Field Inspection", description: "Our certified inspectors conduct thorough on-site assessments.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80" },
      { step: 3, title: "Report Delivery", description: "Receive comprehensive reports with actionable insights.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80" },
    ],
  },
  survey: {
    title: "Survey Inspections",
    description: "Detailed condition surveys to establish baseline roof performance metrics.",
    longDescription:
      "Survey Inspections establish a comprehensive baseline of your roof system's current condition. This foundational assessment is essential for new acquisitions or before implementing a maintenance program.",
    icon: ClipboardList,
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    features: [
      "Complete roof system documentation including all components",
      "Deficiency identification with severity ratings",
      "Comprehensive photo documentation",
      "Repair recommendations with priority levels",
      "CAD drawings and measurement data",
      "Integration with asset management systems",
    ],
    process: [
      { step: 1, title: "Pre-Survey Review", description: "Review existing documentation and define survey parameters.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" },
      { step: 2, title: "Comprehensive Survey", description: "Complete on-site survey with measurements and photos.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80" },
      { step: 3, title: "Documentation Package", description: "Deliver complete survey documentation and recommendations.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80" },
    ],
  },
  annual: {
    title: "Annual Inspections",
    description: "Routine maintenance inspections to maximize roof lifespan and prevent issues.",
    longDescription:
      "Our Annual Inspection program provides proactive maintenance oversight to extend roof life and prevent costly emergency repairs. Regular inspections catch small problems before they become major expenses.",
    icon: Calendar,
    heroImage: annualInspectionsImage,
    features: [
      "Bi-annual inspection cycles (spring and fall)",
      "Preventive maintenance reports and tracking",
      "Warranty compliance verification",
      "Budget recommendations for upcoming repairs",
      "Trend analysis across inspection cycles",
      "Priority scheduling for identified issues",
    ],
    process: [
      { step: 1, title: "Program Setup", description: "Establish inspection schedule and baseline documentation.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" },
      { step: 2, title: "Regular Inspections", description: "Conduct scheduled inspections throughout the year.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80" },
      { step: 3, title: "Continuous Reporting", description: "Ongoing reports and recommendations for maintenance.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80" },
    ],
  },
  storm: {
    title: "Storm Inspections",
    description: "Rapid response assessments after severe weather events for insurance claims.",
    longDescription:
      "When severe weather strikes, our Storm Inspection team provides rapid response to document damage and support insurance claims. We help you navigate the claims process and prioritize repairs.",
    icon: CloudLightning,
    heroImage: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&q=80",
    features: [
      "24-48 hour response time after weather events",
      "Insurance-ready documentation and reports",
      "Comprehensive damage assessment with photos",
      "Emergency repair coordination and oversight",
      "Claims support and adjuster coordination",
      "Post-repair verification inspections",
    ],
    process: [
      { step: 1, title: "Rapid Response", description: "Deploy inspection team within 24-48 hours of your call.", image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=200&q=80" },
      { step: 2, title: "Damage Documentation", description: "Thorough documentation for insurance purposes.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80" },
      { step: 3, title: "Claims Support", description: "Ongoing support through the insurance claims process.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80" },
    ],
  },
  "take-off": {
    title: "Take-off Inspections",
    description: "Accurate quantity takeoffs for budgeting, bidding, and project planning.",
    longDescription:
      "Take-off Inspections provide accurate quantity measurements essential for replacement projects, contractor bidding, and budget planning. Our detailed takeoffs ensure you have the data needed for informed decisions.",
    icon: Calculator,
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    features: [
      "Detailed quantity measurements for all roof components",
      "Material specifications and recommendations",
      "Bid package preparation for contractor solicitation",
      "Cost estimation support and budget planning",
      "Comparison analysis for contractor bids",
      "Scope validation during project execution",
    ],
    process: [
      { step: 1, title: "Measurement Survey", description: "Conduct detailed measurements of all roof areas and components.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80" },
      { step: 2, title: "Takeoff Report", description: "Deliver comprehensive quantity takeoff with specifications.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80" },
      { step: 3, title: "Bid Support", description: "Provide support during contractor bidding and selection.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;
  const { open: openSampleReportsModal } = useSampleReportsModal();

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

  const seo = slug ? serviceSEO[slug] : null;

  return (
    <Layout>
      {seo && (
        <SEO 
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
        />
      )}
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-[450px] flex items-center bg-cover bg-center"
        role="img"
        aria-label={`${service.title} service hero image`}
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--navy-dark) / 0.92), hsl(var(--navy-dark) / 0.65)), url('${service.heroImage}')`,
        }}
      >
        <div className="container-narrow mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center text-gray-400 hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Inspection Services
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                {service.longDescription}
              </p>
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

      {/* Process with Photos */}
      <section className="bg-muted section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Our Process</h2>
            <div className={`grid grid-cols-1 ${service.process.length > 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-8`}>
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  {step.image ? (
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-accent/20">
                      <img 
                        src={step.image} 
                        alt={`${step.title} - process step illustration`}
                        loading="lazy"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4 ring-4 ring-accent/20">
                      <span className="text-3xl font-bold text-accent">{step.step}</span>
                    </div>
                  )}
                  <span className="text-accent font-bold text-lg">Step {step.step}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables Section with Report Preview */}
      <section className="bg-background section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What You'll Receive</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Executive summary with key findings</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Detailed condition assessment with photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Capital expenditure forecasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Repair recommendations and prioritization</span>
                </li>
              </ul>
              <Button variant="cta" onClick={openSampleReportsModal}>
                Request Sample Report
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80" 
                alt="Sample roof inspection report showing condition ratings and findings"
                loading="lazy"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                Sample Report
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section (for featured services) */}
      {service.whyChoose && (
        <section className="bg-secondary section-padding">
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
                    className="p-6 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
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
