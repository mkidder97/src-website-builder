import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGetStartedModal } from "@/hooks/use-get-started-modal";

export function Hero() {
  const { open: openGetStartedModal } = useGetStartedModal();
  return (
    <section className="relative h-screen flex items-center overflow-hidden -mt-20">
      {/* TODO: Replace src with actual SRC field footage file when available */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/videos/hero-construction.mp4"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)' }}
      />
      <div className="container-narrow mx-auto section-padding relative z-[2]">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Commercial Roof Consultants
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            Fiscal Stewards of Your{" "}
            <span className="text-gradient">Roofing Assets</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
          >
            We protect over $3 billion in commercial roofing assets for institutional investors,
            REITs, and property managers across the nation. Data-driven insights. Trusted
            expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="cta" size="lg" className="group" onClick={openGetStartedModal}>
              Request Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
              <Link to="/services">Explore Services</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-start gap-0 mt-12 pt-12 border-t border-white/10"
          >
            <div className="pr-10">
              <p
                className="text-white leading-none"
                style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.03em" }}
              >
                $3B<span className="text-accent" style={{ fontSize: 24 }}>+</span>
              </p>
              <p
                className="mt-2"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
              >
                Assets Protected
              </p>
            </div>
            <div
              className="hidden sm:block self-stretch"
              style={{ width: 1, background: "rgba(255,255,255,0.12)", marginRight: 40 }}
            />
            <div className="pr-10">
              <p
                className="text-white leading-none"
                style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.03em" }}
              >
                4,600<span className="text-accent" style={{ fontSize: 24 }}>+</span>
              </p>
              <p
                className="mt-2"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
              >
                Roofs Managed
              </p>
            </div>
            <div
              className="hidden sm:block self-stretch"
              style={{ width: 1, background: "rgba(255,255,255,0.12)", marginRight: 40 }}
            />
            <div>
              <p
                className="text-white leading-none"
                style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.03em" }}
              >
                28<span className="text-accent" style={{ fontSize: 24 }}>+</span>
              </p>
              <p
                className="mt-2"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
              >
                States Served
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
