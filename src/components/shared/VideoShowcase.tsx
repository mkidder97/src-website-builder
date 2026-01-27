import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoShowcaseProps {
  videoUrl?: string;
  eyebrow?: string;
  title: string;
  description: string;
  placeholderSubtitle?: string;
  thumbnailUrl?: string;
  iframeTitle?: string;
  className?: string;
}

export function VideoShowcase({ 
  videoUrl,
  eyebrow = "Watch",
  title,
  description,
  placeholderSubtitle = "Video coming soon",
  thumbnailUrl,
  iframeTitle = "Video",
  className = "bg-secondary"
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const showPlaceholder = !videoUrl || !isPlaying;

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
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
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => videoUrl && setIsPlaying(true)}
              style={{
                background: thumbnailUrl 
                  ? undefined 
                  : 'linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(222, 47%, 18%) 100%)',
              }}
            >
              {/* Optional thumbnail image */}
              {thumbnailUrl && (
                <>
                  <img 
                    src={thumbnailUrl} 
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                </>
              )}

              {/* Decorative grid pattern (only when no thumbnail) */}
              {!thumbnailUrl && (
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
              )}
              
              {/* Play button */}
              <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-accent ml-1" fill="currentColor" />
              </div>
              
              {/* Text */}
              <p className="relative z-10 mt-6 text-white/80 text-lg font-medium">
                {videoUrl ? "Click to play" : placeholderSubtitle}
              </p>
            </div>
          ) : (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={iframeTitle}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
