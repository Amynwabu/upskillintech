import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, LogOut, User } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: "/learn", label: "Learn" },
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
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user?.name || "Profile"}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="outline">
                    Login
                  </Button>
                </a>
                <Link href="/onboarding">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Your Journey
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User size={18} />
                      {user?.name || "Profile"}
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={() => logout()}>
                    <LogOut size={18} />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()} className="w-full">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </a>
                  <Link href="/onboarding">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                      Start Your Journey
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
