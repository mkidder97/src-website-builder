import { Leaf, Anchor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
        "border border-border/50 hover:border-accent/50",
        theme === "navy" 
          ? "bg-navy-light/50 text-primary-foreground" 
          : "bg-forest-light/20 text-primary-foreground",
        className
      )}
      aria-label={`Switch to ${theme === "navy" ? "warm" : "navy"} theme`}
    >
      {theme === "navy" ? (
        <>
          <Anchor className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline">Navy</span>
        </>
      ) : (
        <>
          <Leaf className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline">Forest</span>
        </>
      )}
    </button>
  );
}
