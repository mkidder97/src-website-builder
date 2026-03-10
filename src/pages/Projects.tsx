import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  Warehouse,
  HeartPulse,
  GraduationCap,
  Landmark,
  Hotel,
  ShoppingBag,
  Building2,
  Snowflake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS, SECTOR_FILTERS } from "@/lib/projects-data";

const iconMap: Record<string, React.ElementType> = {
  Warehouse,
  HeartPulse,
  GraduationCap,
  Landmark,
  Hotel,
  ShoppingBag,
  Building2,
  Snowflake,
};

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="group relative overflow-hidden cursor-pointer" style={{ aspectRatio: "4/3" }}>
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
    </div>
  );
}

const Projects = () => {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const filtered = activeSector
    ? PROJECTS.filter((p) => p.sector === activeSector)
    : PROJECTS;

  return (
    <Layout>
      <SEO
        title="Featured Projects"
        description="Browse a selection of SRC's commercial roofing inspection and consulting projects across healthcare, industrial, government, retail, and mixed-use portfolios nationwide."
      />

      {/* Hero */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: "60vh" }}
      >
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600"
          alt="Commercial rooftop aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)" }}
        />
        <div className="relative z-[2] pl-16 pb-12 pr-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">
              Our Work
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-2">
            Southern Roof Consultants{" "}
            <span className="font-bold">Featured Projects</span>
          </h1>
          <p className="text-white/80 text-lg mb-4">Look What We've Done</p>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#F59E0B" }}>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Featured Projects</span>
          </div>
        </div>
      </section>

      {/* Sector Filter Bar */}
      <div className="relative overflow-hidden" style={{ background: "#0f1a0f" }}>
        {/* PORTFOLIO watermark */}
        <span
          className="absolute right-8 bottom-0 z-0 font-bold select-none pointer-events-none"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.07)",
            lineHeight: 1,
          }}
        >
          PORTFOLIO
        </span>

        <div className="relative z-[1] flex items-center justify-center gap-2 py-12 px-4 overflow-x-auto">
          {/* ALL pill */}
          <button
            onClick={() => setActiveSector(null)}
            className={cn(
              "shrink-0 px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] border transition-colors",
              activeSector === null
                ? "bg-accent border-accent text-white"
                : "bg-transparent border-white/60 text-white hover:border-accent hover:text-accent"
            )}
          >
            All
          </button>

          {SECTOR_FILTERS.map((filter) => {
            const Icon = iconMap[filter.icon];
            const isActive = activeSector === filter.label;
            return (
              <button
                key={filter.label}
                onClick={() =>
                  setActiveSector(isActive ? null : filter.label)
                }
                className="shrink-0 flex flex-col items-center gap-2.5 group"
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded transition-colors",
                    isActive
                      ? "bg-accent border-accent"
                      : "bg-transparent border-white/80 hover:border-accent"
                  )}
                  style={{
                    width: 90,
                    height: 90,
                    borderWidth: 1.5,
                    borderStyle: "solid",
                    borderRadius: 4,
                    borderColor: isActive ? "hsl(var(--accent))" : undefined,
                    backgroundColor: isActive ? "hsl(var(--accent))" : "transparent",
                  }}
                >
                  <Icon className="w-9 h-9 text-white" />
                </div>
                <span className="text-white text-[11px] font-semibold uppercase tracking-[0.12em] text-center max-w-[100px] leading-tight">
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {filtered.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Layout>
  );
};

export default Projects;
