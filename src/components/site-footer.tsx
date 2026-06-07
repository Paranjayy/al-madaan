import { Instagram, MapPin, Phone, ShieldCheck } from "lucide-react";

interface SiteFooterProps {
  t: {
    footerTagline: string;
    footerNote: string;
    destinations: string[];
  };
}

export function SiteFooter({ t }: SiteFooterProps) {
  return (
    <footer className="border-t border-border/60 bg-footer text-footer-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-contrast/80">
              Al Madaan Ventures
            </p>
            <h2 className="max-w-lg text-2xl font-semibold text-footer-foreground sm:text-3xl">
              {t.footerTagline}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-footer-muted">{t.footerNote}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-contrast/80">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-footer-muted">
              <a
                href="tel:0917006109912"
                className="flex items-center gap-3 transition-colors hover:text-footer-foreground"
              >
                <Phone className="h-4 w-4" />
                <span>0917006109912</span>
              </a>
              <a
                href="https://www.instagram.com/al_madaan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-footer-foreground"
              >
                <Instagram className="h-4 w-4" />
                <span>@al_madaan</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>Srinagar, Kashmir</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-contrast/80">
              Routes
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.destinations.map((destination) => (
                <span
                  key={destination}
                  className="rounded-full border border-brand-contrast/15 bg-footer-elevated px-3 py-1 text-sm text-footer-foreground"
                >
                  {destination}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-brand-contrast/10 pt-6 text-sm text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-contrast" />
            <span>Trusted local support for Kashmir journeys</span>
          </div>
          <span>© {new Date().getFullYear()} Al Madaan Ventures</span>
        </div>
      </div>
    </footer>
  );
}
