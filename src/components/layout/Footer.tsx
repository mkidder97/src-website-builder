import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Featured Projects", to: "/projects" },
];

const serviceLinks = [
  { label: "Construction Management", to: "/services/construction-management" },
  { label: "Due Diligence", to: "/services/due-diligence" },
  { label: "Survey Inspections", to: "/services/survey" },
  { label: "Annual Inspections", to: "/services/annual" },
  { label: "Storm Inspections", to: "/services/storm" },
];

const resourceLinks = [
  { label: "Blog", to: "/blog" },
  { label: "Savings Calculator", to: "/savings-calculator" },
  { label: "Roof Controller", to: "/roof-controller" },
];

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="transition-colors"
        style={{ fontSize: 13, color: "rgba(255,255,255,0.50)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
      >
        {label}
      </Link>
    </li>
  );
}

function ColumnHeading({ children }: { children: string }) {
  return (
    <h3
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        marginBottom: 20,
      }}
    >
      {children}
    </h3>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#060f09" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info — spans wider */}
          <div className="lg:col-span-5">
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
                  background: "rgba(255,255,255,0.25)",
                  margin: "0 10px",
                }}
              />
              <span
                style={{
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Southern Roof Consultants
              </span>
            </div>
            <p
              className="mb-6 max-w-md"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
            >
              Protecting over $3B in commercial roofing assets across the nation. Comprehensive
              roof consulting for institutional investors and property managers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--accent) / 0.7)" }} />
                <a
                  href="tel:+17273620116"
                  className="transition-colors"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.50)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
                >
                  (727) 362-0116
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--accent) / 0.7)" }} />
                <a
                  href="mailto:info@southernroof.biz"
                  className="transition-colors"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.50)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
                >
                  info@southernroof.biz
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--accent) / 0.7)" }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                  875 Pasadena Ave S, Suite A<br />South Pasadena, FL 33707
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2">
            <ColumnHeading>Resources</ColumnHeading>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-14 flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p style={{ fontSize: 12, letterSpacing: "0.04em", color: "rgba(255,255,255,0.30)" }}>
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
                style={{ fontSize: 12, color: "rgba(255,255,255,0.30)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.30)")}
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
