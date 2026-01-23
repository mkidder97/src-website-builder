import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  author: string;
  is_published: boolean;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    category: "Industry Insights",
    author: "SRC Team",
    is_published: false,
  });

  const isEditing = !!id;

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, postRes] = await Promise.all([
        supabase.from("blog_categories").select("*").order("display_order"),
        id ? supabase.from("blog_posts").select("*").eq("id", id).maybeSingle() : null,
      ]);

      if (categoriesRes.data) {
        setCategories(categoriesRes.data);
      }

      if (postRes?.data) {
        setFormData({
          title: postRes.data.title,
          slug: postRes.data.slug,
          excerpt: postRes.data.excerpt || "",
          content: postRes.data.content,
          cover_image_url: postRes.data.cover_image_url || "",
          category: postRes.data.category || "Industry Insights",
          author: postRes.data.author || "SRC Team",
          is_published: postRes.data.is_published,
        });
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleSave = async (publish = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing Fields",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const postData = {
      ...formData,
      is_published: publish ? true : formData.is_published,
      published_at: publish ? new Date().toISOString() : undefined,
    };

    let error;
    if (isEditing) {
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("blog_posts").insert([postData]);
      error = insertError;
    }

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: isEditing ? "Updated" : "Created",
        description: `Post has been ${isEditing ? "updated" : "created"}${publish ? " and published" : ""}.`,
      });
      navigate("/admin/blog");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded animate-pulse w-1/4" />
        <div className="h-10 bg-muted rounded animate-pulse" />
        <div className="h-40 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/blog")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-foreground">
          {isEditing ? "Edit Post" : "New Post"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title..."
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">/blog/</span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: generateSlug(e.target.value) })
                  }
                  placeholder="post-slug"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the post (2-3 sentences)..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content here... (HTML supported)"
                rows={15}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                HTML is supported for formatting.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold text-foreground">Settings</h3>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="cover">Cover Image URL</Label>
              <Input
                id="cover"
                value={formData.cover_image_url}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                placeholder="https://..."
              />
              {formData.cover_image_url && (
                <img
                  src={formData.cover_image_url}
                  alt="Cover preview"
                  className="mt-2 rounded-lg w-full aspect-video object-cover"
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="published">Published</Label>
              <Switch
                id="published"
                checked={formData.is_published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_published: checked })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            {formData.slug && formData.is_published && (
              <Button variant="outline" className="w-full" asChild>
                <a href={`/blog/${formData.slug}`} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              variant="cta"
              className="w-full"
              onClick={() => handleSave(true)}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save & Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
