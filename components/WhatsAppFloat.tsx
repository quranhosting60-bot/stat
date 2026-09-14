import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Smart Printing, I'd like to ask about a print job."
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-pill bg-navy text-white shadow-[0_8px_24px_rgba(11,42,64,0.35)] transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.85 9.85 0 004.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.83 14.02c-.24.68-1.38 1.3-1.9 1.37-.5.07-1.09.1-1.75-.11-.4-.13-.92-.3-1.58-.6-2.78-1.2-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.02.97-2.3.24-.26.53-.32.7-.32.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.58.79 2 .86 2.14.07.14.11.3.02.49-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.26.13.44.19.5.3.07.11.07.63-.17 1.24z" />
      </svg>
    </a>
  );
}
