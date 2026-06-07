import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";

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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-strong text-accent-strong-foreground shadow-soft">
                  A
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Al Madaan Ventures
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kashmir taxi & local travel support
                  </p>
                </div>
              </Link>
            </div>

            <nav className="grid grid-cols-3 gap-2 text-sm sm:flex sm:flex-wrap sm:items-center">
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

            <div className="flex flex-wrap items-center gap-2">
              <ThemeToggle />
              <a href="tel:0917006109912" aria-label="Call Al Madaan Ventures">
                <Button variant="pill" size="sm">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              </a>
              <a
                href="https://wa.me/91917006109912"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <Button variant="hero" size="sm">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border/50 pt-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Srinagar, Kashmir
              </span>
              <a
                href="https://www.instagram.com/al_madaan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Instagram className="h-4 w-4 text-primary" /> @al_madaan
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
