export const metadata = { title: "Terms — Smart Printing" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-3xl font-semibold text-navy">Terms of service</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-navy/70">
        <p>
          These terms cover orders placed through the Smart Printing website and WhatsApp.
          Placing an order request does not create a binding contract — every job is
          confirmed with a fixed quote before production begins.
        </p>
        <p>
          <strong className="text-navy">Quotes and pricing.</strong> Prices shown on the
          website are starting prices for the listed specification. Final pricing is
          confirmed once artwork, exact quantity and delivery location are known.
        </p>
        <p>
          <strong className="text-navy">Artwork approval.</strong> Production starts only
          after you approve a digital proof. Smart Printing is not responsible for errors
          in artwork approved by the customer.
        </p>
        <p>
          <strong className="text-navy">Turnaround times.</strong> Turnaround times listed
          per category are estimates for standard order volumes and may vary for large or
          custom jobs, which will be confirmed at the time of quoting.
        </p>
        <p>
          <strong className="text-navy">Payment.</strong> Payment terms are agreed directly
          with our team during quote confirmation, ahead of production.
        </p>
      </div>
    </div>
  );
}
