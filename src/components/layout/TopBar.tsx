"use client";

import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { siteContent } from "@/data/site";
import { cn } from "@/lib/class-names";

import { Container } from "../ui/Container";

export function TopBar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      setIsHidden(nextScrollY > 80 && nextScrollY > lastScrollY);
      lastScrollY = nextScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "bg-brand-primary text-brand-charcoal transition-transform duration-300 ease-out-expo",
        isHidden && "-translate-y-full",
      )}
    >
      <Container className="flex min-h-10 items-center justify-between gap-4 py-2 text-xs font-bold sm:text-sm">
        <p className="min-w-0 break-words">{siteContent.announcement}</p>
        <div className="hidden items-center gap-4 md:flex">
          {siteContent.contact.needsConfirmation ? (
            <span>Contact details to be confirmed</span>
          ) : (
            <>
              <a
                className="inline-flex items-center gap-1.5 hover:underline"
                href={`tel:${siteContent.contact.phone}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {siteContent.contact.phone}
              </a>
              <a
                className="inline-flex items-center gap-1.5 hover:underline"
                href={`mailto:${siteContent.contact.email}`}
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {siteContent.contact.email}
              </a>
            </>
          )}
          <span>KES</span>
        </div>
      </Container>
    </div>
  );
}
