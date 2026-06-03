import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/91917006109912?text=" +
  encodeURIComponent("Hi Al Madaan Ventures! I'd like to book a taxi in Kashmir.");

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-[#1ebe57] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
