import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-narrow mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-bold">
                SRC <span className="text-muted-foreground font-normal">|</span>{" "}
                <span className="font-normal text-muted-foreground text-sm">
                  Southern Roof Consultants
                </span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Protecting over $3B in commercial roofing assets across the nation. We provide
              comprehensive roof inspection and consulting services for institutional investors and
              property managers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-accent" />
                <a href="tel:+17273620116" className="hover:text-accent transition-colors">(727) 362-0116</a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:info@southernroof.biz" className="hover:text-accent transition-colors">info@southernroof.biz</a>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>875 Pasadena Ave S, Suite A<br />South Pasadena, FL 33707</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services/construction-management"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Construction Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services/due-diligence"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Due Diligence
                </Link>
              </li>
              <li>
                <Link
                  to="/services/survey"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Survey Inspections
                </Link>
              </li>
              <li>
                <Link
                  to="/services/annual"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Annual Inspections
                </Link>
              </li>
              <li>
                <Link
                  to="/services/storm"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Storm Inspections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Southern Roof Consultants. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
