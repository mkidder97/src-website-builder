import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetStartedModal } from "@/hooks/use-get-started-modal";

const services = [
  { name: "Construction Management", slug: "construction-management", featured: true },
  { name: "Due Diligence", slug: "due-diligence" },
  { name: "Survey Inspections", slug: "survey" },
  { name: "Annual Inspections", slug: "annual" },
  { name: "Storm Inspections", slug: "storm" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { open: openGetStartedModal } = useGetStartedModal();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-navy-light">
      <nav className="container-narrow mx-auto section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-foreground">
              SRC <span className="text-muted-foreground font-normal">|</span>{" "}
              <span className="font-normal text-muted-foreground text-sm">
                Southern Roof Consultants
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isActive("/") ? "text-accent" : "text-primary-foreground hover:text-accent"
              )}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                onBlur={() => setTimeout(() => setServicesOpen(false), 200)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  location.pathname.includes("/services")
                    ? "text-accent"
                    : "text-primary-foreground hover:text-accent"
                )}
              >
                Services
                <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-lg shadow-xl border border-border p-2 animate-scale-in">
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                  >
                    All Services
                  </Link>
                  <div className="h-px bg-border my-2" />
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                        'featured' in service && service.featured 
                          ? 'text-accent font-medium hover:bg-accent/10' 
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      {service.name}
                      {'featured' in service && service.featured && (
                        <span className="ml-2 text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">Popular</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/roof-controller"
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isActive("/roof-controller") ? "text-accent" : "text-primary-foreground hover:text-accent"
              )}
            >
              Platform
            </Link>

            <Link
              to="/savings-calculator"
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isActive("/savings-calculator") ? "text-accent" : "text-primary-foreground hover:text-accent"
              )}
            >
              Calculator
            </Link>

            <Link
              to="/blog"
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isActive("/blog") ? "text-accent" : "text-primary-foreground hover:text-accent"
              )}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isActive("/about") ? "text-accent" : "text-primary-foreground hover:text-accent"
              )}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isActive("/contact") ? "text-accent" : "text-primary-foreground hover:text-accent"
              )}
            >
              Contact
            </Link>
          </div>

          {/* Client Login & CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://portal.roofcontroller.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary-foreground transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Client Login
            </a>
            <Button variant="cta" onClick={openGetStartedModal}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary-foreground p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-navy-light animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                Services
              </Link>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-accent transition-colors pl-4"
                >
                  {service.name}
                </Link>
              ))}
              <Link
                to="/roof-controller"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                Platform
              </Link>
              <Link
                to="/savings-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                Calculator
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <a
                href="https://portal.roofcontroller.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Client Login
              </a>
              <Button
                variant="cta"
                className="w-full mt-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openGetStartedModal();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
