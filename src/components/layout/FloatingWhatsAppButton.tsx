"use client";

import { usePathname } from "next/navigation";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteContent } from "@/data/site";
import { buildWhatsAppInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  const pathname = usePathname();

  if (pathname === "/checkout") {
    return null;
  }

  const message = buildWhatsAppInquiryMessage({ siteName: siteContent.name });
  const whatsappUrl = buildWhatsAppUrl(siteContent.contact.whatsapp, message);

  return (
    <a
      aria-label="Ask Viesta on WhatsApp"
      className="fixed bottom-5 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-brand-xl transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-brand-primary active:translate-y-0 active:scale-[0.97] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
      title="Ask Viesta on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="sr-only">Ask Viesta on WhatsApp</span>
    </a>
  );
}
