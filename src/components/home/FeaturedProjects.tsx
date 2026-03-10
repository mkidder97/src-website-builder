import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects-data";

const HOMEPAGE_PROJECTS = PROJECTS.slice(0, 4);

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-primary">
      <div className="container-narrow mx-auto section-padding mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">
              Our Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Featured Projects
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {HOMEPAGE_PROJECTS.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden cursor-pointer"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 z-[2] p-6">
              <span
                className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.1em] font-semibold border"
                style={{
                  background: "hsl(var(--accent) / 0.2)",
                  borderColor: "hsl(var(--accent))",
                  color: "hsl(var(--accent))",
                }}
              >
                {project.sector}
              </span>
              <h3 className="text-white font-bold text-xl mt-2">{project.name}</h3>
              <p className="text-gray-300 text-[13px] mt-1">{project.stat}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded border border-white/30 text-primary-foreground text-sm font-medium transition-colors hover:bg-white hover:text-primary"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
