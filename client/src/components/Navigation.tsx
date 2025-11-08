import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#learn", label: "Learn" },
    { href: "#apply", label: "Apply" },
    { href: "#consult", label: "Consult" },
    { href: "#community", label: "Community" },
    { href: "#marketplace", label: "Marketplace" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent cursor-pointer">
              {APP_TITLE}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Your Journey
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Start Your Journey
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
