import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container py-12">
        {/* Top Section - Logo, Social, CTAs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-200">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <span className="text-2xl font-bold text-black cursor-pointer">
                {APP_TITLE}
              </span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mb-6 md:mb-0">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/onboarding">
              <Button className="bg-black hover:bg-black/90 text-white">
                Get a demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-black text-black hover:bg-black/5">
                Contact us
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Company */}
          <div>
            <h4 className="font-semibold text-black mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Why {APP_TITLE}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Customers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Newsroom
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Careers
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-black mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    LMS
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    LXP
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Academies
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Skills
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Use cases and trends */}
          <div>
            <h4 className="font-semibold text-black mb-4">Use cases and trends</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Collaborative learning
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/transform">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Employee onboarding
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Compliance training
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/learn">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Sales enablement
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Community */}
          <div>
            <h4 className="font-semibold text-black mb-4">Resources & Community</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/resources">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Ebooks, guides, tools
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    The L&D Collective
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    {APP_TITLE} Brand Center
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/resources/events">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Meetups and events
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h4 className="font-semibold text-black mb-4">Customers</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/login" 
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Login
                </a>
              </li>
              <li>
                <Link href="/help">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Knowledge base
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Release notes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <span className="text-gray-600 hover:text-black transition-colors cursor-pointer text-sm">
                    Events and webinars
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} {APP_TITLE}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy">
                <span className="text-sm text-gray-600 hover:text-black transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-sm text-gray-600 hover:text-black transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </Link>
              <Link href="/cookies">
                <span className="text-sm text-gray-600 hover:text-black transition-colors cursor-pointer">
                  Cookie Policy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
