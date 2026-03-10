import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#060f09" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center">
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
            </div>
            <p
              className="mb-6 max-w-md"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
            >
              Protecting over $3B in commercial roofing assets across the nation. We provide
              comprehensive roof inspection and consulting services for institutional investors and
              property managers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+17273620116"
                  className="transition-colors"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  (727) 362-0116
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@southernroof.biz"
                  className="transition-colors"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  info@southernroof.biz
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                  875 Pasadena Ave S, Suite A<br />South Pasadena, FL 33707
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.40)",
                marginBottom: 20,
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "Featured Projects", to: "/projects" },
                { label: "Blog", to: "/blog" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.40)",
                marginBottom: 20,
              }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Construction Management", to: "/services/construction-management" },
                { label: "Due Diligence", to: "/services/due-diligence" },
                { label: "Survey Inspections", to: "/services/survey" },
                { label: "Annual Inspections", to: "/services/annual" },
                { label: "Storm Inspections", to: "/services/storm" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            background: "rgba(0,0,0,0.25)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 24px",
            marginLeft: -16,
            marginRight: -16,
            borderRadius: "0 0 0 0",
          }}
        >
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            © {new Date().getFullYear()} Southern Roof Consultants. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy Policy", to: "/privacy" },
              { label: "Terms of Service", to: "/terms" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.40)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
