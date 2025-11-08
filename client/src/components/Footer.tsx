import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Mail, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-4">
              {APP_TITLE}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transform Skills. Power Growth. Live AI. Your bridge from AI awareness to AI integration.
            </p>
            <div className="flex gap-4">
              <a href="mailto:contact@upskillintech.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#learn" className="text-muted-foreground hover:text-foreground transition-colors">Learn</a></li>
              <li><a href="#apply" className="text-muted-foreground hover:text-foreground transition-colors">Apply</a></li>
              <li><a href="#consult" className="text-muted-foreground hover:text-foreground transition-colors">Consult</a></li>
              <li><a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</a></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} {APP_TITLE}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
