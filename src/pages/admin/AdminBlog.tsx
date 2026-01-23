import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminBlog() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, category, is_published, published_at, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  const handleTogglePublish = async (post: BlogPost) => {
    const newPublishedState = !post.is_published;
    const { error } = await supabase
      .from("blog_posts")
      .update({
        is_published: newPublishedState,
        published_at: newPublishedState ? new Date().toISOString() : null,
      })
      .eq("id", post.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    } else {
      toast({
        title: newPublishedState ? "Published" : "Unpublished",
        description: `Post has been ${newPublishedState ? "published" : "unpublished"}.`,
      });
      fetchPosts();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", deletingId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete post.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Post has been deleted.",
      });
      fetchPosts();
    }
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content.</p>
        </div>
        <Button asChild variant="cta">
          <Link to="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground mb-4">No blog posts yet.</p>
          <Button asChild variant="cta">
            <Link to="/admin/blog/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-muted-foreground">/blog/{post.slug}</div>
                  </TableCell>
                  <TableCell>{post.category || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={post.is_published}
                        onCheckedChange={() => handleTogglePublish(post)}
                      />
                      <span
                        className={
                          post.is_published ? "text-teal text-sm" : "text-muted-foreground text-sm"
                        }
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(post.published_at || post.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {post.is_published && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${post.slug}`} target="_blank">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/blog/edit/${post.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingId(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
