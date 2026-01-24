import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Monitor,
  MapPin,
  ClipboardList,
  DollarSign,
  BarChart3,
  FolderOpen,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Portfolio Overview",
    description: "See all roofs and key metrics at a glance. Real-time status updates, condition ratings, and priority alerts.",
  },
  {
    icon: MapPin,
    title: "Geographic Mapping",
    description: "Interactive map showing coverage by state. Drill down to individual properties and roof details.",
  },
  {
    icon: ClipboardList,
    title: "Work Order Management",
    description: "Track repairs, maintenance, and project status. Automated scheduling and contractor coordination.",
  },
  {
    icon: DollarSign,
    title: "Capital Planning",
    description: "Forecast replacement costs and timing. Budget scenarios and prioritization tools.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Custom reports and trend analysis. Export to Excel, PDF, or integrate with your systems.",
  },
  {
    icon: FolderOpen,
    title: "Document Storage",
    description: "All inspection reports, photos, and warranties in one place. Secure cloud storage with version history.",
  },
];

const screenshots = [
  {
    title: "US Coverage Map",
    description: "See your entire portfolio at a glance with our interactive geographic view.",
  },
  {
    title: "Work Order Dashboard",
    description: "Track all maintenance activities, repairs, and projects in real-time.",
  },
  {
    title: "Capital Expense Planning",
    description: "Forecast and plan major expenditures with our budgeting tools.",
  },
];

export default function RoofController() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        
        <div className="container-narrow mx-auto section-padding relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4"
            >
              Roof Controller
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl md:text-2xl text-accent font-medium mb-4"
            >
              Your Portfolio Command Center
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mb-8"
            >
              Real-time visibility into your entire roof portfolio. Track conditions, manage work orders, 
              forecast capital expenses—all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild variant="cta" size="lg" className="group">
                <Link to="/contact?request=roof-controller-demo">
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20"
              >
                <a href="https://roofmind.lovable.app" target="_blank" rel="noopener noreferrer">
                  View Sample Dashboard
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Everything You Need to Manage Your Portfolio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Roof Controller gives you complete visibility and control over your roofing assets, 
              from daily maintenance to long-term capital planning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Interface
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Designed for Portfolio Managers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Intuitive dashboards that give you the insights you need, when you need them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-video bg-gradient-to-br from-navy to-teal-dark rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-accent/10 transition-shadow">
                  <Monitor className="w-16 h-16 text-primary-foreground/20" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{screenshot.title}</h3>
                <p className="text-sm text-muted-foreground">{screenshot.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-background section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Why Roof Controller
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Manage 4,600+ Roofs From One Dashboard
              </h2>
              <p className="text-muted-foreground mb-8">
                Our clients use Roof Controller to consolidate data, streamline operations, and make 
                better decisions about their roofing assets. Here's what you get:
              </p>
              
              <ul className="space-y-4">
                {[
                  "Real-time condition monitoring across all properties",
                  "Automated work order tracking and contractor management",
                  "Capital expense forecasting with scenario planning",
                  "Custom reporting for stakeholders and board presentations",
                  "Integration with your existing property management systems",
                  "Secure cloud access from anywhere, any device",
                ].map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-square max-h-96 rounded-2xl bg-gradient-to-br from-accent/20 to-teal-dark flex items-center justify-center"
            >
              <Monitor className="w-24 h-24 text-accent/40" />
            </motion.div>
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
              Ready to Take Control of Your Portfolio?
            </h2>
            <p className="text-cta-foreground/80 mb-8 max-w-2xl mx-auto">
              Schedule a personalized demo and see how Roof Controller can transform your 
              roof asset management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-navy-light"
              >
                <Link to="/contact?request=roof-controller-demo">
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cta-foreground/50 text-cta-foreground hover:bg-cta-foreground/10"
              >
                <a href="https://roofmind.lovable.app" target="_blank" rel="noopener noreferrer">
                  Try Sample Dashboard
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
