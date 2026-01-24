import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Monitor, FileText, ArrowRight, Phone, Calculator } from "lucide-react";
import { useGetStartedModal } from "@/hooks/use-get-started-modal";
import { useSampleReportsModal } from "@/components/SampleReportsModal";

const options = [
  {
    id: "calculator",
    title: "Calculate Your Savings",
    description: "See your projected ROI in 2 minutes",
    icon: Calculator,
    iconBg: "bg-cta/20",
    iconColor: "text-cta",
    hoverBorder: "hover:border-cta",
    hoverBg: "hover:bg-cta/5",
    link: "/savings-calculator",
    external: false,
    badge: "New",
    endIcon: ArrowRight,
  },
  {
    id: "consultation",
    title: "Request a Consultation",
    description: "Schedule a call to discuss your portfolio",
    icon: Calendar,
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    hoverBorder: "hover:border-accent",
    hoverBg: "hover:bg-accent/5",
    link: "/contact",
    external: false,
    badge: null,
    endIcon: ArrowRight,
  },
  {
    id: "platform",
    title: "See Roof Controller in Action",
    description: "Explore our platform managing 4,600+ roofs",
    icon: Monitor,
    iconBg: "bg-teal/20",
    iconColor: "text-teal",
    hoverBorder: "hover:border-teal",
    hoverBg: "hover:bg-teal/5",
    link: "/roof-controller",
    external: false,
    badge: "Interactive",
    endIcon: ArrowRight,
  },
  {
    id: "sample-report",
    title: "View Sample Reports",
    description: "Download examples of our inspection deliverables",
    icon: FileText,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    hoverBorder: "hover:border-primary",
    hoverBg: "hover:bg-primary/5",
    link: "sample-reports-modal",
    external: false,
    badge: null,
    endIcon: ArrowRight,
    isModal: true,
  },
];

export function GetStartedModal() {
  const { isOpen, close } = useGetStartedModal();
  const { open: openSampleReportsModal } = useSampleReportsModal();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-lg md:inset-x-auto"
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-navy-light p-6 relative">
                <button
                  onClick={close}
                  className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
                <h2 className="text-2xl font-bold text-primary-foreground">Get Started</h2>
                <p className="text-primary-foreground/70 mt-1">Choose how you'd like to proceed</p>
              </div>

              {/* Options */}
              <div className="p-4 md:p-6 space-y-3">
                {options.map((option) => {
                  const Icon = option.icon;
                  const EndIcon = option.endIcon;

                  const content = (
                    <div
                      className={`flex items-center gap-4 p-4 rounded-xl border border-border transition-all duration-200 ${option.hoverBorder} ${option.hoverBg} cursor-pointer group`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${option.iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-6 h-6 ${option.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{option.title}</h3>
                          {option.badge && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-teal/10 text-teal rounded-full">
                              {option.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                      </div>
                      <EndIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>
                  );

                  if (option.external) {
                    return (
                      <a
                        key={option.id}
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                      >
                        {content}
                      </a>
                    );
                  }

                  if ('isModal' in option && option.isModal) {
                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          close();
                          openSampleReportsModal();
                        }}
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <Link key={option.id} to={option.link} onClick={close}>
                      {content}
                    </Link>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-2">
                <p className="text-center text-sm text-muted-foreground">
                  Questions?{" "}
                  <a
                    href="tel:+17273620116"
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    Call us at (727) 362-0116
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
