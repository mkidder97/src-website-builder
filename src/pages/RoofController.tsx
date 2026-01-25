import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { VideoShowcase } from "@/components/roof-controller/VideoShowcase";
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

export default function RoofController() {
  return (
    <Layout>
      <SEO 
        title="Roof Controller - Portfolio Management Platform"
        description="Real-time visibility into your entire roof portfolio. Track conditions, manage work orders, and forecast capital expenses with our proprietary software platform."
        keywords="roof management software, portfolio management platform, roof tracking system, capital planning software, work order management"
      />
      {/* Hero Section with Dashboard Screenshot */}
      <section 
        className="relative min-h-[70vh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, hsl(222, 47%, 8%) 0%, hsl(222, 47%, 11%) 50%, hsl(222, 47%, 14%) 100%)',
        }}
      >
        <div className="container-narrow mx-auto section-padding relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
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
                className="text-lg text-gray-400 max-w-xl mb-8"
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
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20"
                >
                  <a href="https://portal.roofcontroller.com" target="_blank" rel="noopener noreferrer">
                    Client Portal Login
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Dashboard Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" 
                alt="Roof Controller Dashboard"
                className="rounded-xl shadow-2xl border border-white/10"
              />
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

      {/* Video Showcase Section */}
      {/* TODO: Replace with actual YouTube/Vimeo embed URL when video is ready */}
      <VideoShowcase videoUrl="" />

      {/* Screenshot Gallery with Photos */}
      <section className="bg-background section-padding">
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
            {[
              { title: "US Coverage Map", description: "See your entire portfolio at a glance with our interactive geographic view.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
              { title: "Work Order Dashboard", description: "Track all maintenance activities, repairs, and projects in real-time.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
              { title: "Capital Expense Planning", description: "Forecast and plan major expenditures with our budgeting tools.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80" },
            ].map((screenshot, index) => (
              <motion.div
                key={screenshot.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-video rounded-xl overflow-hidden mb-4 group-hover:shadow-lg group-hover:shadow-accent/10 transition-shadow">
                  <img 
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                  />
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
              className="rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Commercial buildings"
                className="w-full h-full object-cover"
              />
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
                <a href="https://portal.roofcontroller.com" target="_blank" rel="noopener noreferrer">
                  Client Portal Login
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
