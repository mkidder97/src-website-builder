import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Real-time condition data across your entire portfolio",
  "Capital planning forecasts & budget modeling",
  "Automated inspection reporting & documentation",
];

export function PlatformTeaser() {
  return (
    <section className="bg-primary section-padding">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-accent" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "hsl(var(--accent))",
                }}
              >
                Roof Controller
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4" style={{ letterSpacing: "-0.02em" }}>
              Your Entire Portfolio.
              <br />
              One Dashboard.
            </h2>

            <p className="text-muted-foreground mb-8 max-w-lg" style={{ fontSize: 15, lineHeight: 1.7 }}>
              Purpose-built for institutional owners managing hundreds of roofs across multiple states. Replace spreadsheets with a single source of truth.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="mt-2 flex-shrink-0 rounded-full"
                    style={{ width: 6, height: 6, background: "hsl(var(--accent))" }}
                  />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.70)", lineHeight: 1.5 }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">
              <Link to="/roof-controller">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right — Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              className="rounded-xl overflow-hidden shadow-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "hsl(var(--navy-dark))",
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                </div>
                <div
                  className="ml-3 flex-1 rounded px-3 py-1 text-center"
                  style={{ background: "rgba(255,255,255,0.05)", fontSize: 11, color: "rgba(255,255,255,0.30)" }}
                >
                  portal.roofcontroller.com
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="p-6 space-y-5">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Roofs", val: "4,612" },
                    { label: "Pending Actions", val: "38" },
                    { label: "Capital Budget", val: "$12.4M" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-lg p-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                        {card.label}
                      </div>
                      <div className="text-accent mt-1" style={{ fontSize: 20, fontWeight: 600 }}>
                        {card.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coverage map placeholder */}
                <div
                  className="rounded-lg flex items-center justify-center"
                  style={{
                    height: 140,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="text-center">
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                      Portfolio Coverage Map
                    </div>
                    <div className="flex justify-center gap-1 mt-3">
                      {["AL", "FL", "GA", "TX", "NC", "OH", "PA", "IL"].map((st) => (
                        <span
                          key={st}
                          className="rounded px-1.5 py-0.5"
                          style={{ fontSize: 9, background: "hsl(var(--accent) / 0.15)", color: "hsl(var(--accent) / 0.7)" }}
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Table rows */}
                <div className="space-y-0">
                  {[
                    ["Prologis — Tampa DC", "TPO", "Good", "$42K"],
                    ["Sealy — Memphis WH", "EPDM", "Fair", "$118K"],
                    ["EastGroup — Dallas", "Modified Bitumen", "Good", "$67K"],
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2.5"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{row[0]}</span>
                      <div className="flex items-center gap-4">
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.30)" }}>{row[1]}</span>
                        <span
                          className="rounded-full px-2 py-0.5"
                          style={{
                            fontSize: 10,
                            background: row[2] === "Good" ? "hsl(var(--accent) / 0.15)" : "rgba(245,158,11,0.15)",
                            color: row[2] === "Good" ? "hsl(var(--accent))" : "rgb(245,158,11)",
                          }}
                        >
                          {row[2]}
                        </span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{row[3]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
