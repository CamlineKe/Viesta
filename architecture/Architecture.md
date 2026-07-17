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
- Checkout: Browser-side checkout that validates and builds a WhatsApp order-request handoff URL
- Data: Local typed files under `src/data`
- Deployment target: Vercel/static-friendly Next.js deployment. Operational setup, validation, release, and rollback instructions live in the [Viesta Deployment Guide](../infrastructure/Viesta_Deployment.md).

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
    ├── cart-page.test.tsx
    ├── cart.test.ts
    ├── checkout-page.test.tsx
    ├── commerce-responsive.test.tsx
    ├── currency.test.ts
    ├── editorial-responsive.test.tsx
    ├── focus-trap.test.tsx
    ├── home-categories.test.tsx
    ├── mobile-navigation.test.tsx
    ├── product-pricing.test.ts
    ├── product-retail-offers.test.tsx
    ├── products.test.ts
    ├── responsive-foundations.test.tsx
    ├── shipping.test.ts
    ├── shop-category-filter.test.tsx
    ├── shop-page.test.tsx
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
- `/checkout` is the browser-side order-request form and WhatsApp handoff surface. A required acknowledgement links to the Terms of Service and Privacy Policy before the request can continue.
- `/blog` contains category-filtered educational content.
- `/blog/[slug]` statically generates blog detail pages from `src/data/blog-posts.ts`.
- Legal pages are generated from structured local content through page-specific routes and a shared accessible layout. They remain `noindex` while qualified Kenyan legal review and effective dates are pending.

## Data Ownership

- Product catalog: `src/data/products.ts`
- Categories: `src/data/categories.ts`
- Blog posts: `src/data/blog-posts.ts`
- FAQs: `src/data/faqs.ts`
- Testimonials: `src/data/testimonials.ts`
- Legal content: `src/data/legal.ts`
- Shipping zones: `src/data/shipping-zones.ts`
- Public brand, registered legal name, contacts, payment, SEO: `src/data/site.ts`

Data is intentionally local and typed. Product claims and payment details remain flagged where business confirmation is pending. Legal policy content reflects approved business rules but remains visibly marked as pending qualified Kenyan legal review and has no effective date. Five products have confirmed retail promotional offers in `src/data/products.ts`; the remaining thirteen products stay visible with unconfirmed prices and cannot be added to the cart. The public brand, registered legal name, business phone, WhatsApp, email, and physical address are confirmed in `src/data/site.ts`.

`Viesta_Inventory.md` is the business inventory and pricing-status source. `Viesta_Retail.md` is the confirmed promotional price source for the five purchasable products. `src/data/products.ts` mirrors those contracts as typed storefront data.

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

- `Container.tsx` provides the shared constrained layout, responsive gutters, and `min-w-0` containment required by nested flex/grid layouts.
- `globals.css` provides global visual tokens plus drawer viewport, toast, and safe-area utilities. Drawers use `100dvh` with a `100vh` fallback; floating actions and toasts account for device safe-area insets.
- `Header.tsx` owns the header search state and cart drawer state. Opening mobile navigation closes the expanded header search so the two overlays cannot remain open together.
- `MobileNavigation.tsx` and `CartDrawer.tsx` use a right-side, 420px-maximum drawer pattern. Each locks background scrolling, supports Escape and backdrop close, and uses `useFocusTrap.ts` to contain keyboard focus and restore it to the invoking control.
- The mobile-navigation overlay is portalled to `document.body`. Viewport-fixed overlays must not remain descendants of the sticky, backdrop-filtered header because that ancestor can establish a containing and stacking context for fixed descendants on mobile browsers.
- The mobile navigation keeps its link/contact region independently scrollable, preserving reachable close and WhatsApp controls in short visual viewports.
- `cart-drawer-events.ts` decouples add-to-cart controls from the header-owned cart drawer through the `viesta:cart-drawer-open` browser event.
- Sticky cart, checkout, FAQ, and shop panels use the shared desktop `top-24` offset to clear the header.
- Mobile shop categories use an inline disclosure rather than a horizontal control rail. The sticky category sidebar begins at `lg`; URL search parameters remain the source of filter, search, and sort state.
- Intentional product, article, and thumbnail rails declare local horizontal overflow, overscroll containment, scroll snapping, an accessible label, and an expanded width that matches the shared base gutter. They switch back to ordinary grids at their documented breakpoint.
- Commerce and editorial grids use `minmax(0, ...)` tracks and `min-w-0` children where long names, prices, contact details, or validation feedback could otherwise establish an oversized minimum content width.

Any new modal, drawer, fixed action, or sticky panel should reuse these mechanisms or document why it cannot.

Responsive regression coverage is split across `mobile-navigation.test.tsx`, `shop-category-filter.test.tsx`, `shop-page.test.tsx`, `cart-page.test.tsx`, `checkout-page.test.tsx`, `commerce-responsive.test.tsx`, `editorial-responsive.test.tsx`, and `responsive-foundations.test.tsx`. These tests cover route hierarchy, interaction semantics, and shared containment contracts; they do not replace the manual browser/device matrix in `Viesta_Design_PRD.md`.

## Commerce Architecture

### Cart

- Stored in React Context.
- Persisted to `localStorage` under `viesta-cart-v3`. Hydration removes the incompatible `viesta-cart-v2` wholesale cart.
- Stores the selected offer identity, paid and free quantities, packs per bundle, individual pack format, and total offer price.
- Treats cart quantity as the number of complete offer bundles. Totals separately track physical packs, offer bundles, and subtotal.
- Supports add, remove, bundle-quantity update, clear, subtotal, pack count, and bundle count.
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
- Required Terms of Service agreement and Privacy Policy acknowledgement

Checkout displays:

- Compact order summary
- Subtotal
- Shipping fee
- Grand total when available
- M-Pesa payment guidance
- Policy links and browser-to-WhatsApp privacy notice
- WhatsApp order-request button

The WhatsApp order-request button can still be used while Paybill/Till details are pending, as long as required checkout fields, policy acknowledgement, and product prices are valid. In that state, payment details are confirmed manually in the WhatsApp conversation before the customer pays. Copying payment details remains disabled until final Paybill/Till information is provided.

Sending the prepared message is an order request, not an accepted order. Viesta confirms availability, the final total, delivery terms, payment instructions, and acceptance through WhatsApp.

### Shipping

Shipping rules are implemented in `src/data/shipping-zones.ts` and `src/lib/shipping.ts`:

- Nairobi: free
- Kiambu: free
- Mombasa, Kisumu, Nakuru, Eldoret: KES 500
- Other/rest of Kenya: contact for fee

### WhatsApp Handoff

`src/lib/whatsapp.ts` builds a message containing:

- Products, selected offers, offer-bundle quantities, and total physical packs
- Customer contact details
- Delivery location and address
- Optional order notes
- Policy acknowledgement
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
- Legal content structure and legal-page rendering
- Checkout policy acknowledgement and policy links
- Product data and pricing helpers
- Retail offer selection and product confirmation states
- Offer-aware cart, checkout, and WhatsApp totals
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
- Final retail prices and stock status for products that remain unconfirmed before their purchase actions are enabled.
- Final Paybill/Till details.
- Qualified Kenyan legal review, effective dates, and removal of temporary legal-page `noindex` directives.
- Browser/device responsive and accessibility pass.
