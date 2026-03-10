import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useGetStartedModal } from "@/hooks/use-get-started-modal";
import { useIsMobile } from "@/hooks/use-mobile";

const services = [
  { name: "Construction Management", to: "/services/construction-management", dot: true },
  { name: "Due Diligence", to: "/services/due-diligence" },
  { name: "Survey Inspections", to: "/services/survey" },
  { name: "Annual Inspections", to: "/services/annual" },
  { name: "Storm Inspections", to: "/services/storm" },
];

const navLinks = [
  { label: "Featured Projects", to: "/projects" },
  { label: "Platform", to: "/roof-controller" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const mobileLinks = [
  { label: "Services", to: "/services" },
  { label: "Featured Projects", to: "/projects" },
  { label: "Platform", to: "/roof-controller" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
  { label: "Calculator", to: "/savings-calculator" },
  { label: "Clients", to: "https://portal.roofcontroller.com", external: true },
];

const linkStyle =
  "text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { open: openGetStartedModal } = useGetStartedModal();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith("/services");

  const headerBg =
    isMobile || isScrolled ? "rgba(10,20,14,0.97)" : "transparent";
  const headerBorder =
    isMobile || isScrolled
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid transparent";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: headerBg,
        borderBottom: headerBorder,
        transition: "background-color 0.4s ease, border-color 0.4s ease",
      }}
    >
      <nav className="max-w-7xl mx-auto px-8" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <span
              className="text-white"
              style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}
            >
              SRC
            </span>
            <span
              className="inline-block align-middle"
              style={{
                width: 1,
                height: 18,
                background: "rgba(255,255,255,0.3)",
                margin: "0 10px",
              }}
            />
            <span
              style={{
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Southern Roof Consultants
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Services dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className={`${linkStyle} ${
                  isServicesActive
                    ? "nav-link-active"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Services
              </button>
              {servicesOpen && (
                <div
                  className="absolute"
                  style={{
                    top: "calc(100% + 16px)",
                    left: -16,
                    background: "rgba(10,20,14,0.98)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 4,
                    padding: 8,
                    minWidth: 220,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block rounded-[3px] transition-colors duration-150 hover:bg-white/[0.06]"
                      style={{
                        padding: "10px 16px",
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.70)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
                      }
                    >
                      {s.dot && (
                        <span className="text-accent mr-2 text-[10px]">●</span>
                      )}
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${linkStyle} ${
                  isActive(link.to)
                    ? "nav-link-active"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Clients — external */}
            <a
              href="https://portal.roofcontroller.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkStyle} text-white/80 hover:text-white`}
            >
              Clients
            </a>
          </div>

          {/* Right side — desktop */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={openGetStartedModal}
              className="uppercase transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                padding: "8px 18px",
                borderRadius: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#0a140e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              Request Consultation
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden mt-4"
            style={{
              background: "rgba(10,20,14,0.99)",
              borderRadius: 4,
              marginLeft: -32,
              marginRight: -32,
              padding: "8px 32px 24px",
            }}
          >
            {mobileLinks.map((link) =>
              link.external ? (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkStyle} block text-white/80 hover:text-white`}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${linkStyle} block ${
                    isActive(link.to)
                      ? "nav-link-active"
                      : "text-white/80 hover:text-white"
                  }`}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
            <button
              onClick={openGetStartedModal}
              className="w-full mt-6 uppercase transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                padding: "12px 18px",
                borderRadius: 2,
              }}
            >
              Request Consultation
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
