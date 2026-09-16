import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Chatbot from "@/components/Chatbot";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Smart Printing — Business & Commercial Printing in Saudi Arabia",
  description:
    "Business cards, marketing materials, large format, packaging and branded apparel — printed to spec and delivered on time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <LanguageProvider>
          <CartProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
            <Chatbot />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
