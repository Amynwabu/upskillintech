import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
      setIsSubmitting(false);
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    subscribeMutation.mutate({ email });
  };

  const footerSections = [
    {
      title: "Learning",
      links: [
        { label: "All Courses", href: "/courses" },
        { label: "AI for Business", href: "/courses" },
        { label: "AI for Education", href: "/courses" },
        { label: "Mentorship Programs", href: "/courses" },
        { label: "Certifications", href: "/courses" },
      ],
    },
    {
      title: "Consulting",
      links: [
        { label: "Business Consulting", href: "/consulting" },
        { label: "AI Strategy", href: "/consulting" },
        { label: "Implementation Support", href: "/consulting" },
        { label: "Training Programs", href: "/consulting" },
      ],
    },
    {
      title: "Transform",
      links: [
        { label: "Career Transformation", href: "/transform" },
        { label: "Skills Assessment", href: "/" },
        { label: "Learning Paths", href: "/courses" },
        { label: "Success Stories", href: "/transform" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Research", href: "/resources/research" },
        { label: "Events", href: "/resources/events" },
        { label: "Community", href: "/community" },
        { label: "Resource Hub", href: "/resources" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/about" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container py-12">
        {/* Top Section - Logo, Newsletter & Social */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 pb-8 border-b border-gray-200">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-black cursor-pointer">
                {APP_TITLE}
              </span>
            </Link>
          </div>

          {/* Newsletter Signup */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-black">Stay Updated</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest AI insights, course updates, and exclusive content delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                disabled={isSubmitting}
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-black hover:bg-gray-800"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Social Icons & CTA */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <div className="flex gap-4 items-center">
              <a
                href="https://linkedin.com/company/upskillintech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@upskillintech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Contact us
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-black mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <a className="text-gray-600 hover:text-black transition-colors text-sm">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} {APP_TITLE}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy">
              <a className="text-sm text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-gray-600 hover:text-black transition-colors">
                Terms of Service
              </a>
            </Link>
            <Link href="/cookies">
              <a className="text-sm text-gray-600 hover:text-black transition-colors">
                Cookie Policy
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
