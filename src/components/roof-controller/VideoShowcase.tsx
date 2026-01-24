import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoShowcaseProps {
  videoUrl?: string; // YouTube or Vimeo embed URL
}

export function VideoShowcase({ videoUrl }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Placeholder state when no video URL is provided
  const showPlaceholder = !videoUrl || !isPlaying;

  return (
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
            Watch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            See Roof Controller in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our team walk through the platform and hear from portfolio managers 
            who use Roof Controller to manage their roofing assets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border shadow-xl"
        >
          {showPlaceholder ? (
            // Placeholder state
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => videoUrl && setIsPlaying(true)}
              style={{
                background: 'linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(222, 47%, 18%) 100%)',
              }}
            >
              {/* Decorative grid pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
              
              {/* Play button */}
              <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-accent ml-1" fill="currentColor" />
              </div>
              
              {/* Text */}
              <p className="relative z-10 mt-6 text-white/80 text-lg font-medium">
                {videoUrl ? "Click to play" : "Video coming soon"}
              </p>
              <p className="relative z-10 mt-2 text-white/50 text-sm">
                Platform walkthrough & client testimonials
              </p>
            </div>
          ) : (
            // Video embed
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Roof Controller Platform Overview"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
