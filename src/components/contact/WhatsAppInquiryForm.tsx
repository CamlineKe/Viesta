"use client";

import { useState } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cardClassName } from "@/components/ui/Card";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppInquiryFormProps = {
  whatsappNumber: string;
};

const inquiryTypes = [
  "Product inquiry",
  "Shipping question",
  "Payment confirmation",
  "Returns and refund",
] as const;

export function WhatsAppInquiryForm({ whatsappNumber }: WhatsAppInquiryFormProps) {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState<(typeof inquiryTypes)[number]>("Product inquiry");
  const [message, setMessage] = useState("");

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const canSend = trimmedName.length > 0 && trimmedMessage.length > 0;
  const whatsAppMessage = [
    "Hello Viesta, I have an inquiry.",
    "",
    `Name: ${trimmedName || "Not provided"}`,
    `Inquiry type: ${inquiryType}`,
    `Message: ${trimmedMessage || "Not provided"}`,
  ].join("\n");
  const whatsAppUrl = buildWhatsAppUrl(whatsappNumber, whatsAppMessage);

  return (
    <section
      className={cardClassName({
        className: "min-w-0 p-4 sm:p-5",
        variant: "raised",
      })}
    >
      <h2 className="break-words font-heading text-xl font-extrabold sm:text-2xl">Send an inquiry on WhatsApp</h2>
      <p className="mt-2 text-sm leading-6 text-brand-muted">
        Fill in the details, then open WhatsApp with your inquiry prepared for Viesta.
      </p>

      <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="text-sm font-bold">Full name</span>
          <input
            className="mt-2 min-h-12 w-full rounded-md border border-neutral-200 bg-white px-4 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
            name="name"
            placeholder="Jane Doe"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold">Inquiry type</span>
          <select
            className="mt-2 min-h-12 w-full rounded-md border border-neutral-200 bg-white px-4 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
            name="subject"
            value={inquiryType}
            onChange={(event) => setInquiryType(event.target.value as (typeof inquiryTypes)[number])}
          >
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold">Message</span>
          <textarea
            className="mt-2 min-h-36 w-full rounded-md border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
            name="message"
            placeholder="How can Viesta help?"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <a
          aria-disabled={!canSend}
          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-4 text-center font-heading font-extrabold shadow-soft transition sm:w-auto sm:px-6 ${
            canSend
              ? "bg-brand-whatsapp text-white hover:brightness-95"
              : "cursor-not-allowed bg-neutral-300 text-neutral-600"
          }`}
          href={canSend ? whatsAppUrl : "#"}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(event) => {
            if (!canSend) {
              event.preventDefault();
            }
          }}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Open WhatsApp inquiry
        </a>
      </form>
    </section>
  );
}
