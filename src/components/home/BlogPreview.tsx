import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  published_at: string | null;
}

// Fallback images for blog posts when no cover image is set
const fallbackImages: Record<string, string> = {
  "Maintenance": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "Storm Preparedness": "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&q=80",
  "Due Diligence": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "default": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
};

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, category, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const getImageForPost = (post: BlogPost): string => {
    if (post.cover_image_url) return post.cover_image_url;
    if (post.category && fallbackImages[post.category]) return fallbackImages[post.category];
    return fallbackImages.default;
  };

  if (loading) {
    return (
      <section className="bg-secondary section-padding">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6">
                  <div className="h-4 w-24 bg-muted rounded mb-4" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="bg-secondary section-padding">
        <div className="container-narrow mx-auto text-center">
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            Insights & Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            From Our Blog
          </h2>
          <p className="text-muted-foreground mb-8">
            Check back soon for expert insights on commercial roof management.
          </p>
        </div>
      </section>
    );
  }

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
            Insights & Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            From Our Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert perspectives on commercial roof management, industry trends, and best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={getImageForPost(post)}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    {post.category && (
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                        {post.category}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {estimateReadTime(post.excerpt || "")} min read
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
