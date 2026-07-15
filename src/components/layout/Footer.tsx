import Link from "next/link";

import { categories } from "@/data/categories";
import { navItems, siteContent } from "@/data/site";

import { Container } from "../ui/Container";

const legalLinks = [
  { href: "/returns-refund-policy", label: "Returns & Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16">
        <div className="min-w-0">
          <p className="font-heading text-2xl font-extrabold">{siteContent.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{siteContent.description}</p>
          <p className="mt-5 text-sm font-bold text-brand-primary">{siteContent.announcement}</p>
        </div>

        <div className="min-w-0">
          <h2 className="font-heading text-sm font-extrabold uppercase tracking-wide text-white">Quick links</h2>
          <nav className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            {navItems.map((item) => (
              <Link key={item.href} href={{ pathname: item.href }} className="transition hover:text-brand-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="min-w-0">
          <h2 className="font-heading text-sm font-extrabold uppercase tracking-wide text-white">Categories</h2>
          <nav className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={{ pathname: "/shop", query: { category: category.slug } }}
                className="transition hover:text-brand-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="min-w-0">
          <h2 className="font-heading text-sm font-extrabold uppercase tracking-wide text-white">Contact</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            {siteContent.contact.needsConfirmation ? (
              <span className="font-bold text-brand-primary">Contact details to be confirmed</span>
            ) : null}
            <a className="break-words transition hover:text-brand-primary" href={`tel:${siteContent.contact.phone}`}>
              {siteContent.contact.phone}
            </a>
            <a className="break-all transition hover:text-brand-primary" href={`mailto:${siteContent.contact.email}`}>
              {siteContent.contact.email}
            </a>
            <span className="break-words">{siteContent.contact.address}</span>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {siteContent.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={{ pathname: link.href }} className="transition hover:text-brand-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
