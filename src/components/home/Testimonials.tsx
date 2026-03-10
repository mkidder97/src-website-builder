import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Southern Roof Consultants are the Easy Button. They aggressively get bids from quality contractors to ensure we are getting the best for our investors.",
    author: "Pete Hoffman",
    title: "VP Construction, Sealy & Company",
    tenure: "Client since 2015",
  },
];

export function Testimonials() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--navy-dark)) 0%, hsl(var(--navy)) 50%, hsl(var(--navy-light)) 100%)",
      }}
    >
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          {/* Large typographic quotation mark */}
          <div
            className="select-none pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2"
            style={{
              fontSize: 160,
              lineHeight: 1,
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "rgba(255,255,255,0.06)",
              fontWeight: 400,
            }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Horizontal rule above */}
          <div className="w-16 h-px mx-auto mb-12" style={{ background: "hsl(var(--accent) / 0.4)" }} />

          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <blockquote
                className="relative z-10 mb-10"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 2.25rem)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.92)",
                  letterSpacing: "-0.01em",
                }}
              >
                "{testimonial.quote}"
              </blockquote>

              {/* Horizontal rule below */}
              <div className="w-16 h-px mx-auto mb-8" style={{ background: "hsl(var(--accent) / 0.4)" }} />

              <div className="flex flex-col items-center gap-2">
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.90)",
                  }}
                >
                  {testimonial.author}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.50)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
