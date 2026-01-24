import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, FileText, ClipboardCheck, TrendingUp, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { create } from "zustand";

interface SampleReportsModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSampleReportsModal = create<SampleReportsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

const reports = [
  {
    id: "due-diligence",
    title: "Due Diligence Report",
    description: "Comprehensive pre-acquisition assessment",
    icon: FileText,
  },
  {
    id: "annual-inspection",
    title: "Annual Inspection Report",
    description: "Detailed condition assessment with photos",
    icon: ClipboardCheck,
  },
  {
    id: "capex-forecast",
    title: "CapEx Forecast Report",
    description: "10-year capital planning projection",
    icon: TrendingUp,
  },
];

export function SampleReportsModal() {
  const { isOpen, close } = useSampleReportsModal();
  const { toast } = useToast();

  const handleDownload = (reportTitle: string) => {
    toast({
      title: "Download Starting...",
      description: `${reportTitle} sample will be available shortly. We're preparing your download.`,
    });
    // For demo purposes - would trigger actual download in production
    setTimeout(() => {
      toast({
        title: "Sample Reports Coming Soon",
        description: "Full sample reports will be available in the next update.",
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Sample Reports</h2>
                      <p className="text-sm text-muted-foreground">
                        Download samples to see our work
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Report Options */}
              <div className="p-6 space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <report.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(report.title)}
                      className="shrink-0"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border bg-secondary/30">
                <p className="text-sm text-muted-foreground mb-3">
                  Want a custom sample for your portfolio?
                </p>
                <Link
                  to="/contact?request=custom-sample"
                  onClick={close}
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Request Custom Sample
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
