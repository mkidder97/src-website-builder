import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save } from "lucide-react";

interface KPI {
  id: string;
  key: string;
  label: string;
  value: string;
  suffix: string;
  display_order: number;
}

export default function AdminKPIs() {
  const { toast } = useToast();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null);
  const [formData, setFormData] = useState({ label: "", value: "", suffix: "", display_order: 0 });

  useEffect(() => {
    fetchKPIs();
  }, []);

  async function fetchKPIs() {
    const { data, error } = await supabase
      .from("kpis")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setKpis(data);
    }
    setLoading(false);
  }

  const handleEdit = (kpi: KPI) => {
    setEditingKPI(kpi);
    setFormData({
      label: kpi.label,
      value: kpi.value,
      suffix: kpi.suffix,
      display_order: kpi.display_order,
    });
  };

  const handleSave = async () => {
    if (!editingKPI) return;

    setSaving(true);
    const { error } = await supabase
      .from("kpis")
      .update({
        label: formData.label,
        value: formData.value,
        suffix: formData.suffix,
        display_order: formData.display_order,
      })
      .eq("id", editingKPI.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update KPI. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "KPI updated successfully.",
      });
      fetchKPIs();
      setEditingKPI(null);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">KPI Management</h2>
        <p className="text-muted-foreground">
          Edit the statistics displayed on the homepage.
        </p>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Suffix</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kpis.map((kpi) => (
              <TableRow key={kpi.id}>
                <TableCell className="font-mono text-sm">{kpi.key}</TableCell>
                <TableCell>{kpi.label}</TableCell>
                <TableCell className="font-bold">{kpi.value}</TableCell>
                <TableCell>{kpi.suffix}</TableCell>
                <TableCell>{kpi.display_order}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(kpi)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingKPI} onOpenChange={() => setEditingKPI(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit KPI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="suffix">Suffix</Label>
              <Input
                id="suffix"
                value={formData.suffix}
                onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                placeholder="e.g., +, M+, B+"
              />
            </div>
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingKPI(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
