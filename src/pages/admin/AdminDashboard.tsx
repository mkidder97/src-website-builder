import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    kpiCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [postsRes, kpisRes] = await Promise.all([
        supabase.from("blog_posts").select("id, is_published"),
        supabase.from("kpis").select("id"),
      ]);

      if (postsRes.data) {
        setStats((prev) => ({
          ...prev,
          totalPosts: postsRes.data.length,
          publishedPosts: postsRes.data.filter((p) => p.is_published).length,
          draftPosts: postsRes.data.filter((p) => !p.is_published).length,
        }));
      }

      if (kpisRes.data) {
        setStats((prev) => ({
          ...prev,
          kpiCount: kpisRes.data.length,
        }));
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Blog Posts",
      value: stats.totalPosts,
      icon: FileText,
      link: "/admin/blog",
      color: "text-accent",
    },
    {
      title: "Published Posts",
      value: stats.publishedPosts,
      icon: Eye,
      link: "/admin/blog",
      color: "text-teal",
    },
    {
      title: "Draft Posts",
      value: stats.draftPosts,
      icon: TrendingUp,
      link: "/admin/blog",
      color: "text-cta",
    },
    {
      title: "KPIs Configured",
      value: stats.kpiCount,
      icon: BarChart3,
      link: "/admin/kpis",
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">
          Here's an overview of your website content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.title} to={card.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{card.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              to="/admin/blog/new"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground">Create New Blog Post</span>
              <p className="text-sm text-muted-foreground">
                Write and publish a new article
              </p>
            </Link>
            <Link
              to="/admin/kpis"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground">Update KPIs</span>
              <p className="text-sm text-muted-foreground">
                Modify homepage statistics
              </p>
            </Link>
            <Link
              to="/"
              target="_blank"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground">View Live Site</span>
              <p className="text-sm text-muted-foreground">Opens in a new tab</p>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-accent">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Update Your KPIs</p>
                <p className="text-sm text-muted-foreground">
                  Customize the statistics shown on the homepage
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-accent">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Create Blog Content</p>
                <p className="text-sm text-muted-foreground">
                  Publish articles to engage your audience
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-accent">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Review & Publish</p>
                <p className="text-sm text-muted-foreground">
                  Preview changes before making them live
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
