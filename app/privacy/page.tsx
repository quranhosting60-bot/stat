export const metadata = { title: "Privacy — Smart Printing" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-3xl font-semibold text-navy">Privacy policy</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-navy/70">
        <p>
          Smart Printing collects only the information needed to quote and fulfil your
          order: your name, phone number, city and the details of the job you send us.
        </p>
        <p>
          <strong className="text-navy">Cart data.</strong> Items you add to your cart are
          stored in your browser only and are not sent to us until you submit the
          checkout form.
        </p>
        <p>
          <strong className="text-navy">Order requests.</strong> Submitting the checkout or
          contact form opens WhatsApp with your details pre-filled, which is then sent
          directly to our team's WhatsApp number — the same way it would if you typed the
          message yourself.
        </p>
        <p>
          <strong className="text-navy">Sharing.</strong> We do not sell or share your
          information with third parties outside of what's needed to deliver your order
          (for example, a courier partner's name and address for shipping).
        </p>
      </div>
    </div>
  );
}
