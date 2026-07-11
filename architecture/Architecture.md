# Viesta Architecture

**Version:** 1.1
**Date:** July 2026

This document is the source of truth for implementation structure. Product requirements live in `Viesta_PRD.md`; visual and interaction direction lives in `Viesta_Design_PRD.md` version 2.3 or later.

## Platform

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS plus global CSS tokens in `src/app/globals.css`
- Rendering: Static generation where practical, including product and blog detail routes via `generateStaticParams`
- State: React Context for cart state, persisted to `localStorage`
- Checkout: Browser-side checkout that builds a WhatsApp order handoff URL
- Data: Local typed files under `src/data`
- Deployment target: Vercel/static-friendly Next.js deployment

## Design-System Implementation

Visual requirements and responsive acceptance criteria are owned by `Viesta_Design_PRD.md`. Their shared implementation is split between:

- `tailwind.config.ts`: brand colors, typography, radius, shadows, motion, and timing tokens.
- `src/app/globals.css`: matching CSS custom properties, global focus and reduced-motion behavior, background utilities, drawer safe-area utilities, the intentional hero glass surface, and image-loading shimmer.
- `src/components/ui`: shared buttons, cards, badges, alerts, form fields, containers, and section headings.

The warm botanical background system exposes these shared utilities:

- `section-canvas`: default warm editorial canvas.
- `section-botanical`: trust, education, category, and brand-story wash.
- `section-sun-wash`: promotional, reassurance, and selected-information wash.
- `surface-flat`: solid white surface with a soft border.
- `surface-raised`: solid white surface with a soft border and restrained shadow.

`Card.tsx` owns the `default`, `flat`, `raised`, `interactive`, and `featured` surface variants. Marketing routes may use restrained background decoration, while shop, cart, checkout, drawers, forms, legal reading surfaces, prices, and validation remain on quiet high-contrast surfaces. Route-level visual composition stays in page and feature components; shared tokens and repeated surface behavior must not be redefined independently.

## Core Flow

```text
Homepage -> Shop -> Product detail -> Add to cart -> Cart drawer/cart page -> Checkout -> WhatsApp
```

The cart drawer exists for fast shopping feedback. The `/cart` page remains the full review surface before checkout.

## Source Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── shop/page.tsx
│   ├── products/[slug]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faqs/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── returns-refund-policy/page.tsx
│   └── terms-of-service/page.tsx
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── CartView.tsx
│   │   ├── EmptyCartState.tsx
│   │   └── QuantityControls.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── CheckoutView.tsx
│   │   ├── DeliverySelector.tsx
│   │   ├── OrderSummary.tsx
│   │   └── WhatsAppOrderButton.tsx
│   ├── contact/
│   │   └── WhatsAppInquiryForm.tsx
│   ├── content/
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── LegalPageLayout.tsx
│   │   └── TestimonialCard.tsx
│   ├── icons/
│   │   └── WhatsAppIcon.tsx
│   ├── layout/
│   │   ├── FloatingWhatsAppButton.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MobileNavigation.tsx
│   │   ├── NavigationSearch.tsx
│   │   ├── TopBar.tsx
│   │   └── navigation-state.ts
│   ├── product/
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── RelatedProducts.tsx
│   │   └── TrustBadges.tsx
│   ├── shop/
│   │   ├── CategoryFilter.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SortSelect.tsx
│   └── ui/
│       ├── Alert.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── FormField.tsx
│       └── SectionHeader.tsx
├── context/
│   ├── CartContext.tsx
│   └── ToastContext.tsx
├── data/
│   ├── blog-posts.ts
│   ├── categories.ts
│   ├── faqs.ts
│   ├── legal.ts
│   ├── products.ts
│   ├── shipping-zones.ts
│   ├── site.ts
│   └── testimonials.ts
├── hooks/
│   ├── useCart.ts
│   └── useFocusTrap.ts
├── lib/
│   ├── cart-drawer-events.ts
│   ├── cart.ts
│   ├── class-names.ts
│   ├── currency.ts
│   ├── product-pricing.ts
│   ├── shipping.ts
│   ├── slug.ts
│   ├── validation.ts
│   └── whatsapp.ts
├── types/
│   ├── blog.ts
│   ├── cart.ts
│   ├── checkout.ts
│   ├── content.ts
│   └── product.ts
└── __tests__/
    ├── cart.test.ts
    ├── currency.test.ts
    ├── focus-trap.test.tsx
    ├── home-categories.test.tsx
    ├── mobile-navigation.test.tsx
    ├── product-pricing.test.ts
    ├── products.test.ts
    ├── shipping.test.ts
    ├── ui-primitives.test.tsx
    ├── validation.test.ts
    └── whatsapp.test.ts

public/
├── favicon.ico
├── icons/logo.svg
└── images/
    ├── blog/*.webp
    ├── brand/
    │   ├── about_1.webp
    │   └── hero.webp
    ├── categories/*.webp
    └── products/*.webp
```

## Root Configuration

```text
package.json            # Scripts and dependencies
next.config.mjs         # Next.js configuration
tailwind.config.ts      # Tailwind theme tokens and content paths
postcss.config.js       # PostCSS/Tailwind pipeline
eslint.config.mjs       # Linting configuration
tsconfig.json           # TypeScript configuration
vitest.config.ts        # Unit test configuration
```

## Routing

- `/` is the storefront homepage.
- `/shop` contains category filtering, sorting, and product discovery.
- `/products/[slug]` statically generates product detail pages from `src/data/products.ts`.
- `/cart` is the full cart review page.
- `/checkout` is the browser-side order form and WhatsApp handoff surface.
- `/blog` contains category-filtered educational content.
- `/blog/[slug]` statically generates blog detail pages from `src/data/blog-posts.ts`.
- Legal pages are generated from local legal content through page-specific routes.

## Data Ownership

- Product catalog: `src/data/products.ts`
- Categories: `src/data/categories.ts`
- Blog posts: `src/data/blog-posts.ts`
- FAQs: `src/data/faqs.ts`
- Testimonials: `src/data/testimonials.ts`
- Legal content: `src/data/legal.ts`
- Shipping zones: `src/data/shipping-zones.ts`
- Site identity, contacts, payment, SEO: `src/data/site.ts`

Data is intentionally local and typed. Until launch facts are confirmed, product claims, legal text, and payment details should remain flagged as unconfirmed rather than silently treated as final. All catalog product prices are confirmed in `src/data/products.ts`. Business phone, WhatsApp, email, and physical address are confirmed in `src/data/site.ts`.

## State And Client Boundaries

Server components are used by default for pages and static content. Client components are used where browser interaction is required:

- Cart persistence: `CartContext.tsx`
- Toast notifications: `ToastContext.tsx`
- Cart drawer: `CartDrawer.tsx`
- Product filters and sorting: `ProductGrid.tsx`, `CategoryFilter.tsx`, `SortSelect.tsx`
- Product gallery: `ProductGallery.tsx`
- Add-to-cart interactions: `ProductCard.tsx`, `ProductInfo.tsx`
- Checkout form and summary: `CheckoutView.tsx`, `CheckoutForm.tsx`, `DeliverySelector.tsx`, `OrderSummary.tsx`
- FAQ accordion and blog filters: `FAQAccordion.tsx`, `BlogGrid.tsx`
- Header and top-bar scroll state: `Header.tsx`, `TopBar.tsx`
- Navigation search and active-link state: `NavigationSearch.tsx`, `navigation-state.ts`
- Mobile navigation and focus management: `MobileNavigation.tsx`, `useFocusTrap.ts`
- Floating WhatsApp inquiry CTA: `FloatingWhatsAppButton.tsx`

Navigation search is product-only and routes into `/shop` using the `q` query parameter. It is exposed through the desktop header, mobile header search panel, and mobile navigation drawer. `ProductGrid.tsx` treats URL search params as the source of truth for category, sort, and query state.

## Responsive And Overlay Architecture

Visual breakpoint rules and browser QA criteria are owned by `Viesta_Design_PRD.md`. This document records the shared implementation mechanisms that enforce them:

- `Container.tsx` provides the shared constrained layout and responsive gutters.
- `globals.css` provides global visual tokens plus drawer viewport and safe-area utilities. Drawers use `100dvh` with a `100vh` fallback, and floating actions account for bottom/right safe-area insets.
- `Header.tsx` owns the header search state and cart drawer state. Opening mobile navigation closes the expanded header search so the two overlays cannot remain open together.
- `MobileNavigation.tsx` and `CartDrawer.tsx` use a right-side, 420px-maximum drawer pattern. Each locks background scrolling, supports Escape and backdrop close, and uses `useFocusTrap.ts` to contain keyboard focus and restore it to the invoking control.
- The mobile navigation keeps its link/contact region independently scrollable, preserving reachable close and WhatsApp controls in short visual viewports.
- `cart-drawer-events.ts` decouples add-to-cart controls from the header-owned cart drawer through the `viesta:cart-drawer-open` browser event.
- Sticky cart, checkout, FAQ, and shop panels use the shared desktop `top-24` offset to clear the header.

Any new modal, drawer, fixed action, or sticky panel should reuse these mechanisms or document why it cannot.

## Commerce Architecture

### Cart

- Stored in React Context.
- Persisted to `localStorage` under `viesta-cart`.
- Supports add, remove, quantity update, clear, subtotal, and item count.
- Cart drawer can be opened by header cart trigger or add-to-cart events.
- Add-to-cart controls dispatch `viesta:cart-drawer-open`; the header listens for that event and owns the drawer open state.
- Cart page remains available for full review.

### Checkout

Checkout collects:

- Full name
- Kenyan phone number
- Delivery location
- Optional delivery address or landmark
- Optional order notes

Checkout displays:

- Compact order summary
- Subtotal
- Shipping fee
- Grand total when available
- M-Pesa payment guidance
- WhatsApp order button

The WhatsApp order button can still be used while Paybill/Till details are pending, as long as required checkout fields are valid and product prices are confirmed. In that state, payment details are confirmed manually in the WhatsApp conversation before the customer pays. Copying payment details remains disabled until final Paybill/Till information is provided.

### Shipping

Shipping rules are implemented in `src/data/shipping-zones.ts` and `src/lib/shipping.ts`:

- Nairobi: free
- Kiambu: free
- Mombasa, Kisumu, Nakuru, Eldoret: KES 500
- Other/rest of Kenya: contact for fee

### WhatsApp Handoff

`src/lib/whatsapp.ts` builds a message containing:

- Products and quantities
- Customer contact details
- Delivery location and address
- Optional order notes
- Subtotal, shipping, and total
- Payment guidance or confirmation instruction

The final URL is built with `https://wa.me/{phone}?text={encodedMessage}`.

A floating WhatsApp inquiry CTA is rendered from the root layout for general product, pricing, and delivery enquiries. It uses the same `buildWhatsAppUrl` helper and is hidden on `/checkout` so it does not compete with the order-specific WhatsApp checkout button.

The real WhatsApp icon should be reserved for actions that directly open WhatsApp or represent the WhatsApp step itself. Intermediate navigation such as `Proceed to checkout` should use neutral navigation/cart icons instead.

## Tests

Current unit and component tests cover:

- Cart helper behavior
- KES currency formatting
- Shipping fee calculation
- Checkout validation
- WhatsApp message and URL generation
- Product data and pricing helpers
- Shared UI primitive variants
- Homepage category counts and category query links
- Focus trapping and focus restoration
- Mobile navigation opening, scroll locking, and Escape close behavior

Run:

```bash
npm run test
npm run type-check
npm run lint
npm run format:check
npm run build
```

## Asset Strategy

- Product images live in `public/images/products`.
- Blog images live in `public/images/blog`.
- Brand imagery lives in `public/images/brand`.
- Category imagery lives in `public/images/categories` and is referenced from `src/data/categories.ts`.
- Current product, category, blog, and brand imagery uses WebP. New raster assets should use WebP or AVIF unless a documented compatibility requirement prevents it.
- Decorative background treatments are CSS-based; no large raster texture layer is required.

## Launch Blockers

Production build, automated checks, browser QA, and accessibility verification remain pending user-run validation. These business and release facts also remain required before launch:

- Final product labels, usage directions, ingredients, warnings, and compliant claims.
- Final Paybill/Till details.
- Final legal copy.
- Browser/device responsive and accessibility pass.
