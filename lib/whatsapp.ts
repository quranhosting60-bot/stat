// Replace with the real business WhatsApp number (country code + digits, no + or spaces).
// Example for Saudi Arabia: "966501234567"
export const WHATSAPP_NUMBER = "966500000000";

export interface OrderLine {
  name: string;
  quantity: number;
  options: string;
  lineTotal: number;
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
        `${i + 1}. ${l.name}${l.options ? ` (${l.options})` : ""} × ${l.quantity} — SAR ${l.lineTotal.toFixed(2)}`
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
