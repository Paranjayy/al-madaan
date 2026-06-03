import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: Array<{ code: string; label: string }>;
}

export function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
  languages,
}: LanguageSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-panel text-muted-foreground">
        <Languages className="h-4 w-4" />
      </span>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <Button
            key={language.code}
            type="button"
            size="sm"
            variant={currentLanguage === language.code ? "pillActive" : "pill"}
            onClick={() => onLanguageChange(language.code)}
          >
            {language.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
