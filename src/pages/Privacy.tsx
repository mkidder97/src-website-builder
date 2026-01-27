import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy"
        description="Southern Roof Consultants privacy policy. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, personal information"
      />
      
      <section className="bg-muted section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg">
                <strong>Effective Date:</strong> January 1, 2025
              </p>
              
              <p>
                Southern Roof Consultants ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out contact forms or request quotes</li>
                <li>Subscribe to our newsletter</li>
                <li>Use our savings calculator</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p>This information may include your name, email address, phone number, company name, and details about your roofing portfolio.</p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you relevant information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:info@southernroof.biz" className="text-accent hover:underline">info@southernroof.biz</a><br />
                <strong>Phone:</strong> <a href="tel:+17273620116" className="text-accent hover:underline">(727) 362-0116</a><br />
                <strong>Address:</strong> 875 Pasadena Ave S, Suite A, South Pasadena, FL 33707
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
