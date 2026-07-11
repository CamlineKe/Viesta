# Viesta Design PRD

**Version:** 2.2
**Date:** July 2026  
**Project:** Viesta Nutrition static storefront  
**Implementation:** Next.js App Router, TypeScript, Tailwind CSS  
**Architecture Reference:** `architecture/Architecture.md`

This document is the source of truth for Viesta's visual design, interaction model, responsive behavior, and content presentation. It intentionally does not define file structure; implementation structure belongs in `Architecture.md`.

## 1. Design Philosophy

Viesta should feel like a premium Kenyan wellness storefront: clinical enough to be trustworthy, warm enough for everyday health shoppers, and simple enough to move from product discovery to WhatsApp ordering without friction.

### Visual Direction: Warm Botanical Editorial

Viesta uses a warm botanical editorial language rather than a generic white-and-cream storefront. The system combines quiet natural color, restrained organic decoration, image-led storytelling, and clear commerce surfaces. Decoration supports hierarchy but never competes with product information, prices, forms, or actions.

- Warm ivory is the default page canvas; pure white is reserved for focused reading, product, and form surfaces.
- Pale botanical green supports education, trust, categories, and brand storytelling.
- Pale yellow supports highlights and promotional emphasis without replacing primary CTA yellow.
- Charcoal anchors global chrome and strong conversion sections.
- Botanical line work, dots, grain, contours, and organic gradients remain low contrast and decorative.
- Dense commerce, checkout, drawer, and legal surfaces stay quiet and prioritize legibility.

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
| Warm canvas    | `#FFFDF5` | Default editorial page and section canvas   |
| Botanical wash | `#F1F7EE` | Trust, education, and category backgrounds  |
| Sun wash       | `#FFF8D7` | Promotional and highlighted backgrounds     |
| Light gray     | `#F5F5F5` | Forms, inactive chips                       |
| Dark charcoal  | `#1A1A1A` | Header/footer contrast                      |
| Border         | `#E5E7EB` | Dividers, cards, inputs                     |
| Soft border    | `#E6E8DF` | Warm canvas and editorial surface borders   |
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

### Background And Surface Roles

| Role             | Purpose                                                    | Decoration allowance                                      |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| Warm canvas      | Default marketing and editorial background                 | Subtle organic gradients or fine dot texture               |
| Botanical wash   | Categories, trust, education, and brand-story sections     | One botanical or contour motif per section                 |
| Sun wash         | Promotions, selected highlights, and important reassurance | Soft yellow glow; never reduce CTA contrast                 |
| White surface    | Products, forms, summaries, and focused reading            | None behind dense information                              |
| Charcoal anchor  | Header, footer, and strong conversion sections             | Low-contrast glow only when it does not affect readability |

Rules:

- A page may use multiple background roles, but adjacent sections need a clear purpose for changing surface.
- Decorative layers are `aria-hidden`, ignore pointer events, and stay behind content.
- Texture should normally remain below 10% perceived opacity and be reduced or removed on small screens.
- Do not place grain, botanical line work, or contour patterns behind form controls, prices, warnings, legal copy, or checkout progress.
- Prefer CSS gradients and lightweight SVG line work over raster background textures.
- Pure white should communicate focus or elevation rather than serving as the automatic page background.

### Surface Hierarchy

| Surface     | Treatment                                                        | Usage                                             |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| Flat        | Soft border, solid or lightly translucent surface, no lift       | Content on an already contrasting section         |
| Raised      | White surface, soft border, restrained shadow                    | Forms, summaries, and important grouped content   |
| Interactive | Flat/raised baseline plus focus, border, and slight hover change | Product, category, article, and navigable cards    |
| Featured    | Tinted or image-led surface with stronger hierarchy              | A small number of promotional or editorial blocks |

Glass blur is optional rather than the default. Avoid nested shadows and multiple inset surfaces when one clear boundary is sufficient.

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
- Warm-canvas gradient mesh with a restrained botanical line motif on desktop.
- Left: badge, large headline, supporting copy, primary/secondary CTAs, trust micro-row.
- Right: clear brand/product range imagery only. Do not add floating product cards or mini product cards in the hero; product discovery belongs in Best Sellers and Shop by Category.

Background rhythm:

- Hero: warm canvas with organic yellow and botanical green accents.
- Categories and trust: botanical wash or another quiet education/trust surface.
- Product and editorial grids: clean warm canvas or white, selected according to card contrast.
- Final conversion section: charcoal anchor.
- Do not alternate white and cream mechanically; every surface change should communicate a content-role change.

Best Sellers:

- Six featured products.
- Horizontal scroll on mobile.
- Grid on desktop.

### Shop

- Page header with breadcrumb.
- Use a warm editorial introduction followed by a quiet warm-canvas product area.
- Desktop: sticky category sidebar and product grid.
- Mobile: horizontal category chips above results.
- Sort select visible above product grid.
- Product grid: 2 columns mobile, 3 tablet, 4 at very wide screens where practical.
- Empty state explains how to reset or change category.
- Filters, search, sorting, and empty states use solid flat/raised surfaces without decorative texture.

### Product Detail

- Breadcrumb: Home > Shop > Category > Product.
- Two-column desktop layout: gallery left, product info right.
- Product info includes category badge, featured badge, name, price/price-confirmation state, expandable description, trust micro-badges, delivery note, benefits, usage, ingredients, warnings, quantity selector, and add-to-cart.
- The gallery uses one solid image surface over a restrained botanical-to-sun wash; avoid nested translucent panels.
- Supporting delivery, usage, and trust information may use sun or botanical washes, but price and purchase controls remain on quiet high-contrast surfaces.
- Related products use mobile horizontal scroll and desktop grid.
- Reviews/testimonials section uses quote, star row, name, role, and verified note.

### Cart

- Full cart review page remains available.
- Empty state uses icon, clear message, and shop CTA.
- Cart summary stays sticky on desktop.
- Shipping is estimated/confirmed during checkout.
- Use a quiet warm canvas, flat line-item cards, and a raised summary; cart controls and totals stay on solid white surfaces.

### Checkout

- Simplified header.
- Progress indicator: Cart, Checkout, WhatsApp.
- Use a quiet warm canvas with solid raised form and summary surfaces; do not place decorative texture behind fields, validation, totals, or payment instructions.
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
- Blog index and article routes use the warm canvas; long-form article copy sits on a solid, bordered reading surface.
- Related articles remain visually secondary and use the shared interactive editorial card.

### About

- Hero explains Viesta's health, beauty, and wellness purpose.
- Use real brand imagery.
- Value cards: clinical clarity, local convenience, trust before purchase.
- Launch notes remain visible until final business facts are confirmed.
- Use warm canvas for the introduction, botanical wash for values, sun wash for launch notes, and a quiet canvas for testimonials.

### Contact

- Two-column desktop layout.
- Static mailto form.
- Contact cards for phone, email, address.
- WhatsApp CTA.
- Placeholder contact details must remain visibly unconfirmed until final values are provided.
- Use a botanical page wash with a solid raised form surface and clear flat/interactive contact cards.

### FAQs

- Search input.
- Category filters.
- Accordion list with one open item.
- Empty state when no question matches.
- Use a warm canvas, raised filter/search surface, and solid accordion cards; open answers may use the botanical wash.

### Legal

- Centered readable layout.
- Last-updated metadata.
- Launch warning for draft legal text and missing confirmation items.
- Use a warm canvas with one solid raised reading surface; separate sections with quiet dividers rather than individual tinted cards.

### Utility Surfaces

- Cart and mobile-navigation drawers remain solid white, high-contrast modal panels.
- Drawer line items use flat borders without unnecessary elevation; summary or contact areas may use sun or botanical washes.
- Mobile product search uses a solid input on a restrained botanical surface.
- Header search retains its dark translucent treatment because it sits inside the charcoal header.
- Semantic alerts keep their success, warning, danger, or information colors and are not recolored as decorative brand surfaces.

## 7. Responsive Behavior

### Responsive Contract

The storefront uses mobile-first CSS. Components should use normal document flow, fluid widths,
CSS grid/flex reflow, intrinsic image ratios, and the breakpoint rules below. Do not add
device-specific JavaScript for ordinary layout changes.

| Range       | Tailwind boundary | Layout contract                                                                                                                                                                                                                                   |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 320–639px   | Base              | One-column reading flow unless a two-column product grid is explicitly specified. Header uses icon controls and the hamburger drawer. Horizontal rails and filter chips may scroll intentionally; the page itself must not overflow horizontally. |
| 640–767px   | `sm`              | Preserve the mobile navigation mode. Buttons may sit side-by-side when their labels remain readable. Content gutters increase, and repeated content may move to two columns where specified.                                                      |
| 768–1023px  | `md`              | Retain the hamburger navigation. Use tablet-friendly grids: two blog cards, three shop product cards, and stacked product detail/checkout layouts. Drawers remain operable with clear close controls.                                             |
| 1024–1279px | `lg`              | Enable the full header navigation, desktop search, sticky sidebars, and two-column detail/checkout layouts. Grids should prioritise readable cards over maximum density.                                                                          |
| 1280–1535px | `xl`              | Increase desktop breathing room. Blog grids may use three columns and sidebars may widen where this improves scanning.                                                                                                                            |
| 1536px+     | `2xl`             | Keep page content constrained by the shared container. Product grids may use four columns only when card content remains comfortably readable.                                                                                                    |

#### Global responsive rules

- Use the shared `Container` gutters: 16px at base, 24px from `sm`, and 32px from `lg`.
- Treat 360–390px-wide phones and a short visual viewport as supported baselines. Drawers and fixed controls must account for browser chrome and safe-area insets.
- A component must be usable at 200% browser zoom and when text wraps. Do not depend on fixed combined header heights for primary content sizing.
- Fixed or sticky UI must not cover a close control, primary form action, validation feedback, or the last drawer action.
- Horizontal scrolling is permitted only for deliberately labelled rails/chip rows; use scroll snapping and ensure the containing page has no horizontal overflow.
- Image regions must reserve their final space with an aspect ratio or explicit dimensions. Use responsive `sizes` values that match the rendered layout.
- Motion is progressive enhancement only and must continue to respect the global reduced-motion preference.

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

#### Page and component acceptance contract

| Area                        | Required behaviour                                                                                                                                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global chrome               | At widths below 1024px, search, cart, and menu controls remain visible without collision. At 1024px and above, logo, full navigation, search, and cart remain on one readable row.                                                     |
| Mobile navigation           | The panel opens from the right, closes by link/backdrop/close/Escape, traps and restores focus, locks background scroll, and remains vertically scrollable on short viewports. Its close control and WhatsApp action remain reachable. |
| Hero and calls to action    | Hero stacks below `lg`; action buttons stack at base and may share a row from `sm` only if labels fit. Decorative media must not cause page overflow.                                                                                  |
| Product discovery           | Shop products are two columns at base, three from `md`, and may become four only from `2xl`. Category filters use a deliberate horizontal chip rail below `lg`, then a sticky sidebar.                                                 |
| Product and blog rails      | A rail displays one substantial card at base. Related products become a two-column grid from `sm`; blog cards become two columns from `md` and three from `xl`.                                                                        |
| Detail, cart, and checkout  | Product detail, cart, and checkout are stacked below `lg`; desktop columns begin at `lg`. Sticky summaries/sidebars must use an offset that clears the sticky header.                                                                  |
| Forms and feedback          | Form fields remain full-width and labels/errors do not clip or overlap. Two-field groups begin at `sm`; controls retain practical touch targets.                                                                                       |
| Footer and floating actions | Footer progresses from one column to two at `md` and four at `lg`. Floating WhatsApp control respects mobile safe areas and does not obscure an essential action.                                                                      |

### Responsive QA Matrix

The source implementation must be visually checked before release at the following representative widths. Automated checks are useful but do not replace this review.

| Viewport           | Required checks                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 360–390px mobile   | No horizontal overflow; 44px-ish touch targets where practical; readable product-card CTA; drawer is full-width; filters and rails scroll intentionally; checkout order action and errors remain visible. |
| 768px tablet       | Header controls fit without collision; grids reflow as specified; drawers retain clear close controls; form groups remain readable.                                                                       |
| 1024–1280px laptop | Header nav, search, cart, and logo fit together; sidebar/sticky elements do not obscure content; product grid has balanced card widths.                                                                   |
| 1440px+ desktop    | Content remains constrained and balanced; four-column product grids are not overly dense; hero/media does not become disproportionately wide.                                                             |

At each viewport, check keyboard navigation, text wrapping at increased browser zoom, image cropping/loading, focus visibility, modal/drawer behavior, and an operating-system reduced-motion preference.

### Manual browser QA handoff

Run this checklist in browser responsive mode and on available physical devices before release. Browser configuration is intentionally owned by the release reviewer; this checklist does not require application code changes.

1. At 360px and 390px, visit Home, Shop, a product page, Cart, Checkout, Blog, FAQs, and Contact. Confirm there is no page-level horizontal scroll, card CTAs remain readable, and filter/related-content rails scroll only within their intended rows.
2. At 768px, confirm the hamburger, search, and cart controls fit on one header row; product grids use three columns; blog grids use two columns; and product detail/cart/checkout remain stacked.
3. At 1024px and 1280px, confirm the desktop header has no collision between logo, navigation, search, and cart; sidebars and summaries remain below the sticky header; and product detail/cart/checkout become two-column layouts.
4. At 1440px and wider, confirm content remains constrained, hero media remains balanced, blog cards use three columns, and only the intended wide product grids use four columns.
5. On a short mobile viewport, open the hamburger and cart drawers. Verify the close control and WhatsApp/checkout actions remain reachable, drawer content scrolls independently, backdrop click and Escape close the drawer, and focus returns to the triggering control.
6. At 200% browser zoom and with increased system text size, verify announcement text, buttons, form labels/errors, cart totals, and checkout actions wrap without clipping or overlap.
7. Enable reduced motion and keyboard-only navigation. Verify focus is visible, Tab remains within an open drawer, and motion does not impede use.

Record any failure with its route, viewport width/height, browser/device, zoom or text-size setting, reproduction steps, and a screenshot. This makes responsive regressions reproducible without relying on a specific tester's browser setup.

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
- Prefer CSS gradients and reusable SVG line art to raster textures.
- Do not add decorative assets that cause layout shift or compete with above-the-fold image loading.
- Simplify or remove nonessential background decoration on small screens.

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
- Paybill/Till details are not final; WhatsApp orders can proceed with payment details confirmed manually in chat.
- Legal pages are draft content.
- Browser/device responsive QA and full accessibility audit are still required.
- The five-phase visual migration is implemented but still requires user-run tests, static checks, production build, and browser review.

## 13. Visual-System Migration

The warm botanical editorial redesign is delivered in five separately reviewable phases. Each phase requires visual approval before the next begins.

Implementation status: all five phases are implemented. Final acceptance remains pending user-run automated verification and the responsive browser QA matrix.

| Phase | Scope                                   | Acceptance checkpoint                                                                 |
| ----- | --------------------------------------- | ------------------------------------------------------------------------------------- |
| 1     | PRD, tokens, background utilities       | Palette, texture strength, and one homepage reference section are approved            |
| 2     | Shared cards and reusable surfaces      | Product and editorial card references are approved in isolation and in a grid         |
| 3     | Marketing and editorial routes          | Home, About, Blog, Contact, and FAQs are reviewed across mobile and desktop            |
| 4     | Shop, product, cart, and checkout routes | Browse-to-WhatsApp flow retains clear hierarchy, validation, and conversion actions   |
| 5     | Legal, utility, consistency, and cleanup | All routes pass the visual audit and obsolete visual patterns are safely removed       |

Migration rules:

- Do not remove a legacy token or utility until every consumer has migrated.
- Keep phase changes independently reviewable and avoid unrelated content or behavior changes.
- Validate representative mobile, tablet, laptop, and wide-desktop layouts after each phase.
- Transactional pages receive quieter decoration than marketing pages.
- The implemented result, rather than an unshipped proposal, becomes the final PRD baseline at the end of Phase 5.
