import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import type { LanguageCode } from "@/lib/site-content";
import { translations } from "@/lib/site-content";
import { allDriversBusy } from "@/lib/driver-status";

interface SiteLayoutProps {
  children: ReactNode;
  language?: LanguageCode;
}

export function SiteLayout({ children, language = "en" }: SiteLayoutProps) {
  const t = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {allDriversBusy && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-center text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2 flex-wrap">
          <span>⚡ Both Aalim & Umair are currently on trips.</span>
          <span className="opacity-80">
            You can still plan your custom itinerary or pre-book for future dates!
          </span>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-accent-strong text-accent-strong-foreground shadow-soft overflow-hidden">
                <img
                  src="/images/logo.png?v=2"
                  alt="Al Madaan Ventures Logo"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="absolute text-sm sm:text-base font-bold">A</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-primary truncate max-w-[140px] sm:max-w-none">
                  Al Madaan Ventures
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[140px] sm:max-w-none">
                  Kashmir taxi & local travel support
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-sm">
              <Link
                to="/"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Home
              </Link>
              <Link
                to="/services"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Services
              </Link>
              <Link
                to="/packages"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Packages
              </Link>
              <Link
                to="/destinations"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Destinations
              </Link>
              <Link
                to="/destinations"
                search={{ view: "map" }}
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Kashmir Map
              </Link>
              <Link
                to="/team"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Team
              </Link>
              <Link
                to="/guide"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Guide
              </Link>
              <Link
                to="/contact"
                activeProps={{ className: "nav-link nav-link-active" }}
                className="nav-link"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <ThemeToggle />
              <a
                href="tel:0917006109912"
                aria-label="Call Al Madaan Ventures"
                className="inline-flex"
              >
                <Button
                  variant="pill"
                  size="sm"
                  className="h-9 w-9 sm:w-auto p-0 sm:px-4 shrink-0 flex items-center justify-center"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2 text-xs font-medium">Call</span>
                </Button>
              </a>
              <a
                href="https://wa.me/91917006109912"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex"
              >
                <Button
                  variant="hero"
                  size="sm"
                  className="h-9 w-9 sm:w-auto p-0 sm:px-4 shrink-0 flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2 text-xs font-medium">WhatsApp</span>
                </Button>
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex lg:hidden items-center justify-center p-2 rounded-xl border border-border/80 bg-panel hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                aria-label="Toggle Navigation Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="lg:hidden mt-3 border-t border-border/50 pt-3 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
              <nav className="grid grid-cols-2 gap-2 text-sm">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Services
                </Link>
                <Link
                  to="/packages"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Packages
                </Link>
                <Link
                  to="/destinations"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Destinations
                </Link>
                <Link
                  to="/destinations"
                  search={{ view: "map" }}
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Kashmir Map
                </Link>
                <Link
                  to="/team"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Team
                </Link>
                <Link
                  to="/guide"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Guide
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "nav-link nav-link-active" }}
                  className="nav-link text-center py-2.5"
                >
                  Contact
                </Link>
              </nav>

              <div className="flex flex-col gap-3 border-t border-border/50 pt-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Srinagar, Kashmir
                  </span>
                  <a
                    href="https://www.instagram.com/al_madaan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline transition-colors font-medium"
                  >
                    <Instagram className="h-3.5 w-3.5" /> @al_madaan
                  </a>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    2 taxis • local & outstation
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border/70 bg-panel px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    EN • HI • UR support
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="hidden lg:flex flex-col gap-3 border-t border-border/50 pt-3 mt-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Srinagar, Kashmir
              </span>
              <a
                href="https://www.instagram.com/al_madaan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline transition-colors font-medium"
              >
                <Instagram className="h-4 w-4" /> @al_madaan
              </a>
              <span>2 taxis • local & outstation</span>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-border/70 bg-panel px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              EN • HI • UR support
            </span>
          </div>
        </div>
      </header>

      <main>{children}</main>
      <SiteFooter t={t} />
      <FloatingWhatsApp />
    </div>
  );
}
