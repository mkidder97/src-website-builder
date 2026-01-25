import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

// Placeholder team data - replace with real information
const teamMembers = [
  {
    name: "Michael Kidder",
    title: "Director of Operations",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "15+ years in commercial roofing and construction management. Leads our inspection teams and client relationships.",
    linkedin: null,
  },
  {
    name: "Team Member",
    title: "Senior Consultant",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Extensive experience in roof asset management and capital planning for institutional portfolios.",
    linkedin: null,
  },
  {
    name: "Team Member",
    title: "Technical Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Expert in commercial roofing systems with certifications across all major manufacturers.",
    linkedin: null,
  },
];

export function MeetTheTeam() {
  return (
    <section className="bg-background section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold uppercase tracking-wide text-sm">
            Our Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Meet The Team
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our experienced team brings decades of combined expertise in
            commercial roofing, construction management, and institutional asset
            management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-secondary group-hover:ring-accent/30 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {member.name}
              </h3>
              <p className="text-accent font-medium">{member.title}</p>
              <p className="text-muted-foreground mt-3 text-sm max-w-xs mx-auto">
                {member.bio}
              </p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent mt-3 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
