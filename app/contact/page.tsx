import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Contact — Smart Printing" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="text-sm font-medium text-cyan-deep">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
            Tell us about the job
          </h1>
          <p className="mt-4 max-w-md text-navy/70">
            Fill in a few details and we'll reply the same working day with pricing and
            a realistic turnaround — or message us directly on WhatsApp.
          </p>

          <div className="mt-8 space-y-4 text-sm text-navy/70">
            <p><span className="font-medium text-navy">Phone / WhatsApp:</span> +966 50 000 0000</p>
            <p><span className="font-medium text-navy">Email:</span> hello@smartprinting.sa</p>
            <p><span className="font-medium text-navy">Address:</span> Al Olaya District, Riyadh, Saudi Arabia</p>
            <p><span className="font-medium text-navy">Hours:</span> Sunday–Thursday, 9am–6pm</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
