import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { WhatsAppInquiryForm } from "@/components/contact/WhatsAppInquiryForm";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Contact Viesta Nutrition in Kenya.",
} satisfies Metadata;

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteContent.contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <main className="bg-brand-cream py-12 text-brand-charcoal lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Talk to Viesta"
          description="Use direct contact details for product questions, delivery coordination, and WhatsApp order support."
          align="center"
        />

        {siteContent.contact.needsConfirmation ? (
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-orange-200 bg-orange-50 p-4 text-center text-sm font-semibold leading-6 text-orange-800">
            Contact details are placeholders until launch. Use this page to confirm the intended support
            experience, then replace the phone, email, WhatsApp, and address before publishing.
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <WhatsAppInquiryForm whatsappNumber={siteContent.contact.whatsapp} />

          <aside className="space-y-4">
            {[
              { label: "Phone", value: siteContent.contact.phone, href: `tel:${siteContent.contact.phone}`, icon: Phone },
              { label: "Email", value: siteContent.contact.email, href: `mailto:${siteContent.contact.email}`, icon: Mail },
              { label: "Address", value: siteContent.contact.address, href: null, icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex gap-4 rounded-2xl border border-neutral-200/70 bg-white/90 p-5 shadow-sm transition hover:border-brand-primary">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary-muted">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">{item.label}</p>
                    <p className="mt-1 font-heading font-extrabold">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
            <a
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-whatsapp px-6 font-heading font-extrabold text-white shadow-soft transition hover:brightness-95"
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </aside>
        </div>
      </Container>
    </main>
  );
}
