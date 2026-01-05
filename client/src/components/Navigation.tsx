import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, LogOut, User, Bell, ChevronDown } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE } from '@/const';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const navLinks = [
    { href: "/learn", label: "Learning" },
    { href: "/consult", label: "Consulting" },
    { href: "/transform", label: "Transform" },
  ];

  const resourcesLinks = [
    { href: "/resources", label: "Resources Hub" },
    { href: "/blog", label: "Blog" },
    { href: "/resources/research", label: "Research" },
    { href: "/resources/events", label: "Events" },
    { href: "/community", label: "Community" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white z-50 py-6">
      <div className="flex justify-between px-8">
        <Link href="/">
          <img
            src="/logo.png"
            alt="UpskillinTech"
            className="h-30 w-auto"
          />
        </Link>

          {/* Desktop Navigation - Center/Left after logo */}
          <div className="hidden md:flex items-center gap-6 flex-1 ml-12">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-foreground/80 hover:text-foreground transition-colors font-medium cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
            
            {/* Resources Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors font-medium"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isResourcesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  {resourcesLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative" title="Notifications">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Badge>
                  )}
                </Button>
                <Link href="/profile">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user?.name || "Profile"}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                    Sign In
                  </Button>
                </a>
                <Link href="/onboarding">
                  <Button className="bg-black hover:bg-black/90 text-white border-2 border-black">
                    Book a demo
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border mt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 block cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              
              {/* Resources Submenu for Mobile */}
              <div className="border-t border-border pt-2">
                <span className="text-foreground/60 text-sm font-semibold px-2">Resources</span>
                {resourcesLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2 pl-4 block cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

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
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </a>
                  <Link href="/onboarding">
                    <Button className="bg-black hover:bg-black/90 text-white w-full">
                      Book a demo
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
