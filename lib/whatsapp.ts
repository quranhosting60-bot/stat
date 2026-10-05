// Replace with the real business WhatsApp number (country code + digits, no + or spaces).
// Example for Saudi Arabia: "966501234567"
export const WHATSAPP_NUMBER = "966550746600";
export const SALES_EMAIL = "info@smartprintsa.com";
export const CONTACT_PHONE = "+966 55 074 6600";

export interface OrderLine {
  name: string;
  quantity: number;
  options: string;
  lineTotal: number;
  artworkFileName?: string;
  artworkLink?: string;
}

export function buildWhatsAppOrderLink(params: {
  customerName: string;
  phone: string;
  city: string;
  notes: string;
  lines: OrderLine[];
  total: number;
}) {
  const { customerName, phone, city, notes, lines, total } = params;

  const itemsText = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.name}${l.options ? ` (${l.options})` : ""} × ${l.quantity} — SAR ${l.lineTotal.toFixed(2)}` +
        (l.artworkFileName ? ` [artwork file: ${l.artworkFileName} — will attach separately]` : "") +
        (l.artworkLink ? ` [artwork link: ${l.artworkLink}]` : "")
    )
    .join("\n");

  const message = [
    "New order request — Smart Printing website",
    "",
    `Name: ${customerName}`,
    `Phone: ${phone}`,
    `City: ${city}`,
    "",
    "Items:",
    itemsText,
    "",
    `Estimated total: SAR ${total.toFixed(2)}`,
    notes ? `\nNotes: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
