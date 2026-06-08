import { useState } from "react";
import { 
  Sparkles, 
  ShoppingBag, 
  HelpCircle, 
  ShieldAlert, 
  Check, 
  Info,
  BadgeAlert
} from "lucide-react";

interface SouvenirItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  priceRange: string;
  testMethodName: string;
  testSteps: string[];
  driverTip: string;
  warning: string;
}

const SOUVENIR_DATA: SouvenirItem[] = [
  {
    id: "saffron",
    name: "Pure Kashmiri Kesar (Saffron)",
    emoji: "🌸",
    description: "Hand-picked saffron strands from Pampore fields. Extremely rich aroma and deep coloring property.",
    priceRange: "₹250 - ₹350 per gram",
    testMethodName: "Cold Water Test",
    testSteps: [
      "Drop a few saffron strands into cold water.",
      "Pure saffron will slowly release a golden-yellow hue, taking 10-15 minutes.",
      "The thread itself will retain its red color.",
      "If the water turns red/orange instantly or threads dissolve, it is artificial dye."
    ],
    driverTip: "Aalim says: Buy directly from farmers at Pampore while on the way to Pahalgam, rather than tourist hubs.",
    warning: "Avoid extremely cheap saffron sold in plastic boxes by street vendors — it is usually dyed corn silk."
  },
  {
    id: "pashmina",
    name: "Handloom Pashmina Shawls",
    emoji: "🧣",
    description: "Authentic Cashmere wool spun from the soft undercoat of Changthangi goats. Pure warmth and luxury.",
    priceRange: "₹8,000 - ₹25,000+",
    testMethodName: "Burn & Ring Test",
    testSteps: [
      "Pure Pashmina can easily glide through a metallic wedding ring (if the fabric is lightweight).",
      "Single strand burn test: Burn a single loose thread. It should smell like burnt hair and turn to ash.",
      "If it smells like plastic or forms a hard bead, it is mixed with synthetic nylon/viscose."
    ],
    driverTip: "Umair says: Pure pashmina has irregular handloom weave margins. Avoid sellers claiming 100% pure pashmina for ₹1,500.",
    warning: "Machines spin mixed poly-wool ('semi-pashmina') which looks identical but has no warmth. Always check weave irregularities."
  },
  {
    id: "walnut-wood",
    name: "Walnut Wood Carvings",
    emoji: "🪵",
    description: "Carved from solid walnut trees native to Kashmir. Highly durable furniture, bowls, and showpieces.",
    priceRange: "₹500 (small bowls) to ₹15,000+ (boxes/tables)",
    testMethodName: "Grain & Weight Check",
    testSteps: [
      "True walnut wood is heavy and has natural dark brown color bands.",
      "Check the carving depth. Real hand-carved wood has slight imperfections and deep undercuts.",
      "Ensure there is no chemical vanish smell — pure walnut is finished with natural oils/wax rub."
    ],
    driverTip: "Aalim says: Check the underside of boxes. Cheap pine/board wood is often stained brown to mimic walnut.",
    warning: "Look out for composite MDF wood covered in thin walnut veneers which will warp in humid climates."
  },
  {
    id: "dry-fruits",
    name: "Kashmiri Almonds & Walnuts",
    emoji: "🌰",
    description: "Mamra almonds (high oil content) and paper-shell walnuts (Kagzi) that crack open easily by hand.",
    priceRange: "₹350 - ₹900 per Kg",
    testMethodName: "Paper-Shell Kagzi Test",
    testSteps: [
      "Press two walnuts together in your palm. True Kagzi walnuts crack instantly with light pressure.",
      "Rub Mamra almonds on paper. Authentic Mamra has high natural oil content that leaves a faint grease spot.",
      "Taste: Raw walnuts should taste sweet and buttery, not bitter or stale."
    ],
    driverTip: "Umair says: Buy nuts in shell. Shelled kernels lose their natural oils and flavor within weeks.",
    warning: "Avoid pre-packaged bags in heavily touristed bus stops where lower grade imported nuts are mixed in."
  }
];

export function SouvenirGuide() {
  const [selectedId, setSelectedId] = useState("saffron");

  const currentItem = SOUVENIR_DATA.find(s => s.id === selectedId) || SOUVENIR_DATA[0];

  return (
    <div className="surface-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-foreground">Kashmiri Souvenirs &amp; Anti-Scam Guide</h3>
          <p className="text-sm text-muted-foreground">Vetted by Aalim &amp; Umair. Learn how to verify authentic local products and check fair prices.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr] pt-2">
        {/* Left Side: Buttons */}
        <div className="flex flex-col gap-2">
          {SOUVENIR_DATA.map(item => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "bg-panel/40 border-border/80 text-muted-foreground hover:border-border hover:bg-panel"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{item.emoji}</span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                      {item.name}
                    </p>
                    <p className={`text-[10px] truncate ${isSelected ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                      {item.priceRange}
                    </p>
                  </div>
                </div>
                {isSelected && <Check className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Right Side: Details & Tests */}
        <div className="rounded-2xl border border-border/80 bg-panel/30 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-primary/5 px-2 py-0.5 rounded">
                Authenticity Advisor
              </span>
              <h4 className="text-lg font-bold text-foreground mt-2">{currentItem.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{currentItem.description}</p>
            </div>

            {/* Test Steps */}
            <div className="rounded-xl border border-border/60 bg-white dark:bg-card p-4 space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <HelpCircle className="h-4.5 w-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider">How to test: {currentItem.testMethodName}</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground pl-1">
                {currentItem.testSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-2 leading-relaxed">
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3 border-t border-border/60 pt-4">
            {/* Driver Tip */}
            <div className="flex gap-2.5 items-start text-xs text-muted-foreground leading-relaxed bg-primary/5 p-3.5 rounded-xl border border-primary/10">
              <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-foreground block mb-0.5">Driver's Advice</span>
                {currentItem.driverTip}
              </div>
            </div>

            {/* Warning Box */}
            <div className="flex gap-2 items-start text-[11px] text-red-800 dark:text-red-300 leading-relaxed bg-red-500/5 p-3 rounded-lg border border-red-500/10">
              <ShieldAlert className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <span>{currentItem.warning}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
