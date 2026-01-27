import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <Layout>
      <SEO 
        title="Terms of Service"
        description="Southern Roof Consultants terms of service. Review the terms and conditions for using our website and services."
        keywords="terms of service, terms and conditions, legal terms"
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
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg">
                <strong>Effective Date:</strong> January 1, 2025
              </p>
              
              <p>
                Welcome to Southern Roof Consultants. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Services</h2>
              <p>
                Southern Roof Consultants provides commercial roof inspection, consulting, and construction management services. All services are subject to individual service agreements and may have additional terms specific to the scope of work.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Website Use</h2>
              <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Infringe upon the rights of others</li>
                <li>Restrict or inhibit anyone else's use of the website</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful code or interfere with website operations</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Southern Roof Consultants or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Limitation of Liability</h2>
              <p>
                Southern Roof Consultants shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our website or services.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes acceptance of those changes.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at:
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
