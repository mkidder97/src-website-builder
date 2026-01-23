import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Roofing is the largest capital expense on a building. We have full confidence in SRC to protect our investments and provide accurate, actionable data.",
    author: "Jim Van Sickle",
    title: "Sr. VP, Global Logistics Properties",
  },
];

export function Testimonials() {
  return (
    <section className="bg-warm-gray section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Quote className="w-16 h-16 text-accent/30 mx-auto mb-8" />
          
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-primary-foreground font-semibold text-lg">
                    {testimonial.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <cite className="not-italic">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-muted-foreground">{testimonial.title}</p>
                </cite>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
