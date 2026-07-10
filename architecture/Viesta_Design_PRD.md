# Viesta Design PRD

**Version:** 2.0  
**Date:** July 2026  
**Project:** Viesta Nutrition static storefront  
**Implementation:** Next.js App Router, TypeScript, Tailwind CSS  
**Architecture Reference:** `architecture/Architecture.md`

This document is the source of truth for Viesta's visual design, interaction model, responsive behavior, and content presentation. It intentionally does not define file structure; implementation structure belongs in `Architecture.md`.

## 1. Design Philosophy

Viesta should feel like a premium Kenyan wellness storefront: clinical enough to be trustworthy, warm enough for everyday health shoppers, and simple enough to move from product discovery to WhatsApp ordering without friction.

### Principles

| Principle             | Design Direction                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Clarity first         | CTAs, prices, delivery rules, and WhatsApp checkout should be unmistakable.                           |
| Trust through detail  | Use careful copy, visible warnings, product facts, delivery notes, and payment confirmation guidance. |
| Premium restraint     | Clean white/cream layouts, soft shadows, bright yellow accents, and generous spacing.                 |
| Kenya-first commerce  | KES, M-Pesa/Paybill/Till, Nairobi/Kiambu free delivery, and WhatsApp handoff are core UI elements.    |
| Mobile-first shopping | Product discovery, cart editing, and checkout must be easy on phones.                                 |
| Health-claim caution  | Wellness and supplement copy must remain educational and avoid disease-treatment promises.            |

## 2. Brand Tokens

### Colors

| Token          | Value     | Usage                                       |
| -------------- | --------- | ------------------------------------------- |
| Primary yellow | `#F6E206` | Primary CTAs, active filters, focus accents |
| Primary hover  | `#E5D105` | CTA hover                                   |
| Primary muted  | `#FEF9C3` | Soft backgrounds, icon wells, badges        |
| Accent gold    | `#FFD700` | Highlight details, star ratings             |
| Accent hover   | `#E6C200` | Gold hover states                           |
| Text charcoal  | `#1A1A1A` | Main text, headings                         |
| Muted text     | `#6B7280` | Supporting copy                             |
| Base white     | `#FFFFFF` | Main canvas                                 |
| Cream          | `#FFFBEA` | Section alternation                         |
| Light gray     | `#F5F5F5` | Forms, inactive chips                       |
| Dark charcoal  | `#1A1A1A` | Header/footer contrast                      |
| Border         | `#E5E7EB` | Dividers, cards, inputs                     |
| WhatsApp green | `#25D366` | WhatsApp action                             |
| Success        | `#2E7D32` | Positive shipping/payment states            |
| Warning        | `#F57C00` | Launch warnings, confirmation notes         |
| Danger         | `#DC2626` | Errors and destructive actions              |
| Info           | `#2563EB` | Informational notifications                 |

### Typography

- Heading font: Nunito Sans
- Body font: Open Sans
- Body copy: 16px default, relaxed line-height
- Hero heading: responsive `text-4xl` to `text-6xl`
- Section headings: `text-3xl` to `text-4xl`
- Product/card titles: bold, two-line clamp where needed
- Letter spacing: normal by default; uppercase labels may use modest tracking

### Spacing And Layout Tokens

Use a four-pixel spacing base. Components and sections should use the following scale rather than arbitrary one-off values:

| Token      | Value | Typical use                                            |
| ---------- | ----- | ------------------------------------------------------ |
| `space-1`  | 4px   | Icon/text separation, compact inline adjustment        |
| `space-2`  | 8px   | Tight control groups, badge internals                  |
| `space-3`  | 12px  | Compact card and field groups                          |
| `space-4`  | 16px  | Standard component padding and grid gaps               |
| `space-5`  | 20px  | Card padding where additional breathing room is needed |
| `space-6`  | 24px  | Form-section and larger component padding              |
| `space-8`  | 32px  | Related content groups                                 |
| `space-10` | 40px  | Major in-section separation                            |
| `space-12` | 48px  | Mobile section spacing                                 |
| `space-16` | 64px  | Desktop section spacing                                |
| `space-20` | 80px  | Hero or major desktop section spacing                  |

Rules:

- Use `space-4` to `space-6` for standard surface padding; use `space-3` only where density is intentionally compact.
- Use `space-12` on mobile and `space-16` to `space-20` on desktop between major homepage sections.
- Keep page content inside the shared constrained container. Full-width backgrounds may sit outside it, but readable text and interactive content should not.
- Use grid gaps from the scale consistently. Product grids may use a tighter mobile gap than desktop, but the change must be deliberate and breakpoint-based.

### Radius And Shadows

- Small radius: 6px for buttons and inputs
- Medium radius: 10px for compact surfaces
- Large radius: 16px for cards
- Extra large radius: 24px for hero/media panels
- Shadows are soft and low contrast; glow is reserved for primary CTA/focus emphasis

Rules:

- Buttons, inputs, selects, and textareas use the small radius.
- Compact surfaces and filter controls use the medium radius.
- Cards, summaries, alerts, accordion items, and drawers use the large radius.
- Hero and prominent media panels use the extra-large radius.
- Do not introduce additional radius sizes without a documented component need.
- Use a border or surface change as the default elevation cue. Reserve medium/large shadows for hoverable cards, drawers, and sticky purchase summaries; avoid stacked or nested strong shadows.

### Color, Contrast, And Semantic Feedback

- Use primary yellow with charcoal text for primary actions. Do not use white text on primary yellow.
- Use charcoal or white/cream surfaces behind body text. Muted text is for supporting information only, not essential instructions or errors.
- Success, warning, danger, and info states must pair a semantic foreground token with a sufficiently distinct tinted surface and border. Do not communicate state with color alone; pair it with clear copy and, where useful, an icon.
- A focus state must remain visible on white, cream, dark, and image-backed surfaces. A yellow outline may be paired with a dark offset, ring, or surface change; yellow alone is not sufficient on light surfaces.
- Reuse semantic tokens for badges, alerts, form messages, and toast notifications. Raw one-off color utilities should not define a new semantic meaning.

## 3. Motion

Motion should be minimal, purposeful, and respectful of `prefers-reduced-motion`.

### Core Animations

| Pattern        | Usage                                               |
| -------------- | --------------------------------------------------- |
| Fade up        | Hero text, section entrances, card entrances        |
| Scale in       | Hero media, modal/drawer content                    |
| Slide in right | Mobile nav and cart drawer                          |
| Shimmer        | Product/gallery image loading surfaces              |
| Soft pulse     | Notifications or subtle attention states, sparingly |

### Interaction Rules

- Buttons lift slightly on hover and scale down on press.
- Product cards lift, increase shadow, and zoom product imagery on hover.
- Product-card shopping actions should stay visible across mobile and desktop; hover effects can enhance them but should not hide the action.
- Drawers use dark translucent backdrop plus right-side slide-in panel.
- Reduced motion should remove long transitions and repeated animations.

## 4. Global Layout

### Top Bar

- Background: primary yellow
- Height: 40px minimum
- Content: announcement, phone, email, KES indicator where space allows
- Behavior: hides on downward scroll and returns on upward scroll

### Header

- Sticky at top.
- Background remains dark charcoal/95 with backdrop blur behind logo and navigation for brand contrast.
- Scrolled state adds stronger border and shadow.
- Desktop navigation uses horizontal links with primary yellow hover underline.
- Mobile header includes a dedicated product search trigger near cart/menu; it expands a compact search panel below the sticky header.
- Checkout route uses a simplified header with no nav/cart distractions.

### Mobile Navigation

- Hamburger trigger on tablet/mobile.
- Right-side drawer, white panel, dark backdrop.
- Includes product search, nav links, phone, email, and WhatsApp CTA.
- Closes on link click, backdrop click, close button, and Escape.

### Footer

- Dark charcoal background.
- Includes brand summary, quick links, categories, contact, and legal links.
- Links transition to primary yellow on hover.

## 5. Component Design

### Shared Component Rules

Repeated interface patterns must use shared component variants or documented shared class recipes. Avoid independently recreating the same button, card, field, chip, alert, or icon-button treatment in each route.

| Component     | Required baseline                                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button        | Primary, secondary, outline, ghost, WhatsApp; `sm`, `md`, `lg`, and icon sizes; visible hover, active, focus-visible, disabled, and loading states.   |
| Icon button   | Accessible name, at least a 40px touch target, visible focus state, and no meaning conveyed by icon shape alone.                                      |
| Field         | Persistent visible label, optional helper text, placeholder as an example only, valid/invalid messaging, disabled state, and focus-visible treatment. |
| Card          | Documented radius, border, padding, surface, and shadow level. Card hover treatment is used only when the whole card is interactive.                  |
| Chip/filter   | Clear selected state using more than color alone where practical, with appropriate radio, checkbox, or pressed semantics.                             |
| Alert         | Semantic icon, title or direct message, semantic surface/border/text, and an accessible announcement level appropriate to urgency.                    |
| Empty state   | Clear explanation, recovery action where one exists, and no dead-end content.                                                                         |
| Loading state | Reserve space to prevent layout shift. Use a spinner for short action feedback and a skeleton/shimmer for content that has a stable eventual layout.  |

### UI State Matrix

Every interactive component must define the relevant states below before implementation. States that do not apply should be explicitly omitted rather than left undefined.

| State         | Required behavior                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Default       | Clear hierarchy and affordance without relying on hover.                                                                 |
| Hover         | Desktop enhancement only; must not hide an action or required information.                                               |
| Focus-visible | High-contrast, keyboard-visible indicator on every interactive element.                                                  |
| Active        | Brief press feedback that does not impair readability or layout.                                                         |
| Selected      | Clear persistent distinction for filters, variants, steps, and thumbnails.                                               |
| Disabled      | Semantically disabled when possible; explain a blocked checkout or order action near the control.                        |
| Loading       | Prevent duplicate actions and retain the control's dimensions.                                                           |
| Empty         | Explain the condition and offer the next useful action.                                                                  |
| Error         | State the issue in text, connect it to the affected field/action, and use an assertive announcement for blocking errors. |
| Success       | Confirm the completed action without interrupting the customer unnecessarily.                                            |

### Buttons

- Primary: yellow background, charcoal text, glow shadow.
- Secondary: charcoal background, white text.
- Outline: white background, border, yellow hover treatment.
- WhatsApp: green background, white text.
- WhatsApp brand icon is used only for actions that directly open WhatsApp or for the checkout progress WhatsApp step. Intermediate navigation such as `Proceed to checkout` uses neutral navigation/cart icons.
- All buttons require visible focus state and disabled state.
- Button and link controls serving the same visual purpose must share the same variants and interaction rules.
- Actions that open WhatsApp must use the WhatsApp treatment and icon. Other navigation actions must use neutral or primary navigation treatments.
- When an action requires validation or asynchronous work, its loading/blocked state must remain understandable to keyboard and screen-reader users.

### Badges

- Rounded pills with uppercase small text.
- Variants: default, muted, success, warning, danger, info.
- Product/category badges should remain compact and scannable.

### Cards

- Use cards for repeated items, framed tools, drawers, and summaries.
- Avoid deeply nested card stacks.
- Standard card treatment: white/85 surface, subtle border, soft shadow, backdrop blur where useful.

### Product Cards

- Image ratio: 4:5.
- Image treatment: muted yellow background, white inset surface, object-contain product image.
- Loading: shimmer until image load.
- Hover: card lift, stronger shadow, image scale.
- Text: category badge, two-line product name, two-line short description, price.
- CTA: visible on mobile and desktop, with hover/focus enhancement only.
- Disabled state: use "Awaiting price" when price is unconfirmed.

### Product Gallery

- Main image: square, large, object-contain, muted yellow background.
- Loading: shimmer and crossfade.
- Hover: subtle zoom on desktop.
- Thumbnails: horizontal row, selected state uses yellow border/glow.

### Cart Drawer

- Triggered by header cart button and successful add-to-cart.
- Width: up to 420px, full-width on small phones.
- Includes item count, empty state, line items, quantity controls, remove buttons, subtotal, checkout CTA, cart page link, and continue shopping action.

### Toasts

- Fixed top-right.
- Max visible stack: three.
- Types: success, info, error.
- Auto-dismiss after a short delay and allow manual dismiss.
- Informational and success messages use a polite live region. Blocking errors use an assertive announcement and must not be the only indication of an error.

### Forms

- Use the shared field treatment for inputs, selects, checkboxes/radios, and textareas.
- Labels remain visible after entry; placeholders supplement labels and must not carry required instructions alone.
- Field errors use text plus semantic styling and are associated with the relevant field programmatically.
- Use native disabled controls where possible. If an action must remain focusable to explain why it is blocked, prevent the action safely and place the explanation adjacent to it.
- Radio and checkbox groups use `fieldset` and `legend`; selected cards must preserve the underlying native control semantics.

### Drawers, Dialogs, And Popovers

- Mobile navigation and cart panels are modal dialogs while open: use appropriate dialog semantics, a labelled title, backdrop click, Escape closing, scroll lock, focus trap, and focus restoration to the invoking control.
- Do not place essential actions behind hover-only or pointer-only interactions.
- Tooltips and popovers are supplementary only; essential information remains visible or reachable by keyboard and touch.

## 6. Page Blueprints

### Homepage

Order:

1. Hero section
2. Shop by Category
3. Best Sellers
4. Trust badges
5. Blog teasers
6. Newsletter signup

Hero:

- Split layout on desktop, stacked on mobile.
- White-to-cream gradient mesh background.
- Left: badge, large headline, supporting copy, primary/secondary CTAs, trust micro-row.
- Right: clear brand/product range imagery only. Do not add floating product cards or mini product cards in the hero; product discovery belongs in Best Sellers and Shop by Category.

Best Sellers:

- Six featured products.
- Horizontal scroll on mobile.
- Grid on desktop.

### Shop

- Page header with breadcrumb.
- Desktop: sticky category sidebar and product grid.
- Mobile: horizontal category chips above results.
- Sort select visible above product grid.
- Product grid: 2 columns mobile, 3 tablet, 4 at very wide screens where practical.
- Empty state explains how to reset or change category.

### Product Detail

- Breadcrumb: Home > Shop > Category > Product.
- Two-column desktop layout: gallery left, product info right.
- Product info includes category badge, featured badge, name, price/price-confirmation state, expandable description, trust micro-badges, delivery note, benefits, usage, ingredients, warnings, quantity selector, and add-to-cart.
- Related products use mobile horizontal scroll and desktop grid.
- Reviews/testimonials section uses quote, star row, name, role, and verified note.

### Cart

- Full cart review page remains available.
- Empty state uses icon, clear message, and shop CTA.
- Cart summary stays sticky on desktop.
- Shipping is estimated/confirmed during checkout.

### Checkout

- Simplified header.
- Progress indicator: Cart, Checkout, WhatsApp.
- Form sections:
  - Customer details
  - Delivery details
  - Optional order notes
- Order summary:
  - Compact products
  - Subtotal
  - Shipping
  - Grand total when available
  - Payment card with Paybill/Till instructions when final, or manual WhatsApp payment confirmation when pending
  - Copy button disabled until payment details are confirmed
  - WhatsApp order button
- WhatsApp button stays disabled until required fields are valid and prices are confirmed. Pending Paybill/Till details should not block WhatsApp order submission; instead, payment details are confirmed manually in the WhatsApp conversation before the customer pays.

### Blog

- Blog index uses category chips: All, Nutrition Tips, Fitness, Ingredients, Wellness.
- Cards use real blog imagery from `public/images/blog`.
- Blog posts use large image headers, centered title, metadata, readable article content, educational disclaimer, and related posts.

### About

- Hero explains Viesta's Kenya-first wellness storefront.
- Use real brand imagery.
- Value cards: clinical clarity, local convenience, trust before purchase.
- Launch notes remain visible until final business facts are confirmed.

### Contact

- Two-column desktop layout.
- Static mailto form.
- Contact cards for phone, email, address.
- WhatsApp CTA.
- Placeholder contact details must remain visibly unconfirmed until final values are provided.

### FAQs

- Search input.
- Category filters.
- Accordion list with one open item.
- Empty state when no question matches.

### Legal

- Centered readable layout.
- Last-updated metadata.
- Launch warning for draft legal text and missing confirmation items.

## 7. Responsive Behavior

| Surface          | Mobile                                  | Tablet                        | Desktop                 |
| ---------------- | --------------------------------------- | ----------------------------- | ----------------------- |
| Header           | Hamburger, cart trigger except checkout | Hamburger                     | Full nav                |
| Hero             | Stacked                                 | Stacked                       | Split                   |
| Shop filters     | Horizontal chips                        | Chips/sidebar depending width | Sticky sidebar          |
| Product grid     | 2 columns                               | 3 columns                     | 3 to 4 columns          |
| Product detail   | Stacked                                 | Stacked                       | Gallery/info two-column |
| Related products | Horizontal rail                         | Grid/rail                     | Grid                    |
| Blog cards       | 1 column                                | 2 columns                     | 3 columns               |
| Cart drawer      | Full width max 420px                    | Right drawer                  | Right drawer            |
| Checkout         | Stacked                                 | Stacked                       | Form + sticky summary   |

### Responsive QA Matrix

The source implementation must be visually checked before release at the following representative widths. Automated checks are useful but do not replace this review.

| Viewport           | Required checks                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 360–390px mobile   | No horizontal overflow; 44px-ish touch targets where practical; readable product-card CTA; drawer is full-width; filters and rails scroll intentionally; checkout order action and errors remain visible. |
| 768px tablet       | Header controls fit without collision; grids reflow as specified; drawers retain clear close controls; form groups remain readable.                                                                       |
| 1024–1280px laptop | Header nav, search, cart, and logo fit together; sidebar/sticky elements do not obscure content; product grid has balanced card widths.                                                                   |
| 1440px+ desktop    | Content remains constrained and balanced; four-column product grids are not overly dense; hero/media does not become disproportionately wide.                                                             |

At each viewport, check keyboard navigation, text wrapping at increased browser zoom, image cropping/loading, focus visibility, modal/drawer behavior, and an operating-system reduced-motion preference.

## 8. Accessibility

- All interactive elements need visible focus states.
- Icon-only controls need accessible labels.
- Product/blog images require meaningful alt text.
- Decorative icons should be `aria-hidden`.
- Forms must use labels, validation messages, and clear placeholders.
- Drawers should close on Escape and backdrop click.
- Reduced-motion preferences must be respected.
- Mobile navigation and cart drawers must trap focus and restore it to their invoking control on close before launch.
- Errors that block checkout must be announced assertively; informational feedback may use polite live announcements.
- Verify meaningful text contrast and focus-indicator contrast on light, dark, cream, and image-backed surfaces.
- Complete keyboard-only and browser/device accessibility QA using the responsive matrix before launch.

## 9. Content Standards

- Product and blog copy must be factual, cautious, and educational.
- Avoid treatment, cure, or disease reversal claims.
- Keep warnings visible for products that may intersect with medical conditions, pregnancy, medication use, allergies, or chronic care.
- Preserve confirmation flags for:
  - Product prices
  - Ingredients
  - Usage directions
  - Warnings
  - Health claims
  - Paybill/Till
  - Legal text

## 10. Performance Direction

- Use `next/image` for app images.
- Use `sizes` attributes for responsive images.
- Priority-load only true above-the-fold images.
- Product images should stay WebP or better.
- Blog and brand PNG assets should be converted to WebP or AVIF before launch.
- Avoid layout shift with stable aspect ratios.
- Keep animations transform/opacity based.

## 11. Currently Out Of Scope

The following patterns are not part of the current storefront and should not drive component work unless a product requirement introduces them:

- Data tables, sorting indicators, zebra striping, and table pagination.
- Video presentation.
- General-purpose modals beyond the existing cart and mobile-navigation drawers.
- Dropdown navigation menus.
- Social icons or links, until approved brand channels are supplied.

If introduced later, each pattern requires its own responsive, keyboard, focus, empty/loading, and error-state specification before implementation.

## 12. Current Launch Risks

- Product prices and price statuses are confirmed; product label facts, ingredients, usage, warnings, and claims still need business review.
- Product label facts, ingredients, usage, warnings, and claims need confirmation.
- Paybill/Till details are not final; WhatsApp orders can proceed with payment details confirmed manually in chat.
- Legal pages are draft content.
- Browser/device responsive QA and full accessibility audit are still required.
- Shared UI primitives are not yet fully consolidated; future visual work can drift unless Phase 2 standardizes the repeated patterns.
