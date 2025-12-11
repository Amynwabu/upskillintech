import { useState } from "react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Mail, Linkedin, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  
  const subscribeNewsletter = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "Please try again later");
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    subscribeNewsletter.mutate({ email });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-4">
              {APP_TITLE}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transform Skills. Power Growth. Live AI. Your bridge from AI awareness to AI integration.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-foreground">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get the latest course updates and AI insights delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeNewsletter.isPending}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={subscribeNewsletter.isPending}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                >
                  {subscribeNewsletter.isPending ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

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
              <li><a href="#learn" className="text-muted-foreground hover:text-foreground transition-colors">Learning</a></li>
              <li><a href="#transform" className="text-muted-foreground hover:text-foreground transition-colors">Transform</a></li>
              <li><a href="#consult" className="text-muted-foreground hover:text-foreground transition-colors">Consult</a></li>
              <li><a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link></li>
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
