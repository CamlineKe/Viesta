"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cardClassName } from "@/components/ui/Card";
import {
  FormField,
  getFieldControlClassName,
} from "@/components/ui/FormField";
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

export function WhatsAppInquiryForm({
  whatsappNumber,
}: WhatsAppInquiryFormProps) {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] =
    useState<(typeof inquiryTypes)[number]>("Product inquiry");
  const [message, setMessage] = useState("");
  const [hasAttemptedSend, setHasAttemptedSend] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const canSend = trimmedName.length > 0 && trimmedMessage.length > 0;
  const nameError =
    hasAttemptedSend && trimmedName.length === 0
      ? "Enter your full name."
      : undefined;
  const messageError =
    hasAttemptedSend && trimmedMessage.length === 0
      ? "Enter a message for the Viesta team."
      : undefined;
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
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand-lg bg-brand-botanical text-brand-success">
          <WhatsAppIcon aria-hidden="true" className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-success">
            Prepared in your browser
          </p>
          <h2 className="mt-1 break-words font-heading text-xl font-extrabold sm:text-2xl">
            Send an inquiry on WhatsApp
          </h2>
        </div>
      </div>
      <p className="mt-2 text-sm leading-6 text-brand-muted">
        Fill in the required details, then open WhatsApp with your inquiry
        prepared for Viesta.
      </p>
      <p className="mt-3 text-xs leading-5 text-brand-muted">
        Your entries stay in this browser until you open WhatsApp. WhatsApp and
        Meta may then process the prepared content; Viesta receives it when you
        send the message. Read the{" "}
        <Link
          className="font-bold underline underline-offset-2"
          href="/privacy-policy"
          rel="noopener noreferrer"
          target="_blank"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <form
        className="mt-6 space-y-5"
        noValidate
        onSubmit={(event) => event.preventDefault()}
      >
        <FormField
          error={nameError}
          id="whatsapp-inquiry-name"
          label="Full name (required)"
        >
          {({ describedBy, id, invalid }) => (
            <input
              ref={nameInputRef}
              required
              aria-describedby={describedBy}
              aria-invalid={invalid}
              autoComplete="name"
              className={getFieldControlClassName({ invalid })}
              id={id}
              name="name"
              placeholder="Jane Doe"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          )}
        </FormField>

        <FormField id="whatsapp-inquiry-type" label="Inquiry type">
          {({ describedBy, id, invalid }) => (
            <select
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={getFieldControlClassName({ invalid })}
              id={id}
              name="subject"
              value={inquiryType}
              onChange={(event) =>
                setInquiryType(
                  event.target.value as (typeof inquiryTypes)[number],
                )
              }
            >
              {inquiryTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          )}
        </FormField>

        <FormField
          error={messageError}
          id="whatsapp-inquiry-message"
          label="Message (required)"
        >
          {({ describedBy, id, invalid }) => (
            <textarea
              ref={messageInputRef}
              required
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={getFieldControlClassName({
                className: "min-h-36 py-3",
                invalid,
              })}
              id={id}
              name="message"
              placeholder="How can Viesta help?"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          )}
        </FormField>

        <p
          id="whatsapp-inquiry-requirements"
          className="text-xs font-semibold leading-5 text-brand-muted"
        >
          Enter your full name and message before opening WhatsApp.
        </p>

        <a
          aria-describedby="whatsapp-inquiry-requirements"
          aria-disabled={!canSend || undefined}
          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-4 text-center font-heading font-extrabold shadow-soft transition duration-200 ease-out-expo focus-visible:outline-brand-charcoal sm:w-auto sm:px-6 ${
            canSend
              ? "bg-brand-whatsapp text-white hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.97]"
              : "cursor-not-allowed bg-neutral-300 text-neutral-600"
          }`}
          href={canSend ? whatsAppUrl : "#"}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(event) => {
            if (!canSend) {
              event.preventDefault();
              setHasAttemptedSend(true);

              if (trimmedName.length === 0) {
                nameInputRef.current?.focus();
              } else {
                messageInputRef.current?.focus();
              }
            }
          }}
        >
          <WhatsAppIcon aria-hidden="true" className="h-5 w-5" />
          Open WhatsApp inquiry
        </a>
      </form>
    </section>
  );
}
