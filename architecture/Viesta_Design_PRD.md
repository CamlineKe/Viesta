# Viesta Design PRD

**Version:** 2.6
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
| Premium restraint     | Warm ivory canvases, solid white surfaces, restrained botanical washes, soft shadows, and generous spacing. |
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
| Base white     | `#FFFFFF` | Focused reading, product, form, and drawer surfaces |
| Cream          | `#FFFBEA` | Legacy-compatible soft surface; prefer purpose-specific washes for new work |
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
- Hero heading: responsive `text-3xl` at the narrowest baseline through `text-6xl` on desktop
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

Implemented shared utilities:

- `section-canvas`: warm editorial canvas with restrained yellow and green gradients.
- `section-botanical`: botanical wash with low-contrast organic glow and dot texture.
- `section-sun-wash`: pale yellow reassurance or promotional surface.
- `surface-flat`: solid white surface with a soft border.
- `surface-raised`: solid white surface with a soft border and restrained shadow.

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
- Use charcoal, warm canvas, or solid white surfaces behind body text. Muted text is for supporting information only, not essential instructions or errors.
- Success, warning, danger, and info states must pair a semantic foreground token with a sufficiently distinct tinted surface and border. Do not communicate state with color alone; pair it with clear copy and, where useful, an icon.
- A focus state must remain visible on warm, botanical, sun-wash, white, dark, and image-backed surfaces. A yellow outline may be paired with a dark offset, ring, or surface change; yellow alone is not sufficient on light surfaces.
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
| Selected      | Clear persistent distinction for filters, retail offers, steps, and thumbnails.                                          |
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
- Supported variants are `default`, `flat`, `raised`, `interactive`, and `featured`.
- `default` and `raised` use a solid white surface, soft border, and restrained medium shadow.
- `flat` removes elevation, `interactive` adds focus and slight hover elevation, and `featured` uses the botanical surface.
- Backdrop blur is reserved for intentional image-backed or header treatments and is not the default card treatment.

### Product Cards

- Image ratio: 4:5.
- Image treatment: botanical-to-canvas-to-sun gradient with one solid white inset surface and an object-contain product image.
- Loading: shimmer until image load.
- Hover: restrained card lift, border/shadow emphasis, and slight image scale.
- Text: category badge, pricing-status badge, two-line product name, two-line short description, starting price, and compact retail-offer summary when confirmed.
- CTA: confirmed products use "Choose offer" on mobile and desktop, with hover/focus enhancement only.
- Disabled state: use "Price unconfirmed" and do not expose a cart action.

### Product Gallery

- Main image: square, large, object-contain, with one solid white surface over a restrained botanical-to-sun gradient.
- Loading: shimmer and crossfade.
- Hover: subtle zoom on desktop; avoid nested translucent image panels.
- Thumbnails: horizontal row, selected state uses yellow border/glow.

### Cart Drawer

- Triggered by header cart button and successful add-to-cart.
- Width: up to 420px, full-width on small phones.
- Includes physical pack count, offer-bundle count, selected offers, bundle quantity controls, remove buttons, subtotal, checkout CTA, cart page link, and continue shopping action.

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
- Categories: botanical wash.
- Best Sellers: clean warm canvas.
- Trust badges: sun wash.
- Journal: botanical wash with solid editorial cards.
- Final conversion section: charcoal anchor.
- Do not alternate white and cream mechanically; every surface change should communicate a content-role change.

Best Sellers:

- Six featured products.
- Horizontal scroll on mobile.
- Grid on desktop.

### Shop

- Page header with breadcrumb.
- Use one semantic page-level heading in a compact warm editorial introduction followed by a quiet warm-canvas product area.
- The introduction may use fine dot texture, one lightweight contour or botanical line motif, and low-opacity yellow/green glows. It must remain shallower and less decorative than the About, Contact, and FAQ heroes.
- Do not duplicate product cards, category controls, result counts, search, or sorting inside the introduction.
- Desktop: sticky category sidebar and product grid.
- Mobile and tablet: a compact filter disclosure expands category radio options above results.
- Sort select visible above product grid.
- Product grid: 1 column at base, 2 from `sm`, 3 from `md`, and 4 from `2xl`.
- Empty state explains how to reset or change category.
- Filters, search, sorting, and empty states use solid flat/raised surfaces without decorative texture.
- Product prices, purchase actions, selected filters, and result feedback remain on quiet high-contrast surfaces.

### Product Detail

- Breadcrumb: Home > Shop > Category > Product.
- Two-column desktop layout: gallery left, product info right.
- Product info includes category badge, featured badge, pricing status, name, selected offer price, optional previous price, offer selector, included pack count, expandable description, trust micro-badges, delivery note, benefits, usage, ingredients, warnings, bundle quantity selector, and add-to-cart.
- Confirmed products expose Buy 1, Buy 2 Get 1 Free, and Buy 3 Get 2 Free as complete retail bundles. Unconfirmed products show no offer selector and remain non-purchasable.
- The gallery uses one solid image surface over a restrained botanical-to-sun wash; avoid nested translucent panels.
- Supporting delivery, usage, and trust information may use sun or botanical washes, but price and purchase controls remain on quiet high-contrast surfaces.
- Related products use mobile horizontal scroll and desktop grid.
- Reviews/testimonials section uses quote, star row, name, role, and verified note.

### Cart

- Full cart review page remains available.
- Introduce the route with one semantic page-level heading in a compact warm-canvas header. Decoration is limited to low-opacity gradients, fine dots, or one lightweight line motif outside the cart workspace.
- Empty state uses icon, clear message, and shop CTA.
- Cart summary stays sticky on desktop.
- Shipping is estimated/confirmed during checkout.
- Use a quiet warm canvas, flat line-item cards, and a raised summary; cart controls and totals stay on solid white surfaces.
- Keep offer prices, bundle quantities, pack counts, removal controls, subtotal, estimated total, and checkout actions free from page-level texture or line art.
- Botanical and sun-wash treatments are contained reassurance surfaces only; they do not replace the white item or summary boundaries.

### Checkout

- Simplified header.
- Introduce the route with one semantic page-level heading in a compact, minimally decorated warm-canvas header.
- Progress indicator: Cart, Checkout, WhatsApp.
- Use a quiet warm canvas with solid raised form and summary surfaces; do not place decorative texture behind fields, validation, totals, or payment instructions.
- Page-level dots, line art, and glows stop before the progress and transaction workspace. Checkout uses the lowest decorative intensity of the three commerce routes.
- Form sections:
  - Customer details
  - Delivery details
  - Optional order notes
  - Required Terms agreement, Privacy acknowledgement, policy links, and data-handoff notice
- Order summary:
  - Compact products with selected offer, bundle quantity, and physical pack count
  - Subtotal
  - Shipping
  - Grand total when available
  - Payment card with Paybill/Till instructions when final, or manual WhatsApp payment confirmation when pending
  - Copy button disabled until payment details are confirmed
  - WhatsApp order-request button
- WhatsApp button stays disabled until required fields, policy acknowledgement, and prices are valid. Pending Paybill/Till details should not block the order request; instead, availability, final total, delivery, acceptance, and payment details are confirmed manually in the WhatsApp conversation before the customer pays.
- A blocked WhatsApp action remains understandable to keyboard and screen-reader users through adjacent requirements, connected validation feedback, and a predictable route to the first blocking field.

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
- Introduce the route with a warm-canvas editorial hero before the functional contact workspace.
- The hero uses a clear eyebrow, one page-level heading, a concise support promise, and a primary jump action to the contact options.
- Hero decoration may use the shared fine dot texture, restrained botanical SVG line art, and low-opacity yellow/green glows. All decorative layers remain behind content, ignore pointer events, and are hidden from assistive technology.
- A featured hero panel may summarize available contact channels, but it must not duplicate full contact details or compete with the primary contact actions.
- Client-side inquiry form that prepares and opens a WhatsApp message.
- Contact cards for phone, email, address.
- WhatsApp CTA.
- Contact details must remain visibly flagged whenever their `needsConfirmation` state is true.
- Use a warm canvas for the introduction, a botanical wash for the contact workspace, and a restrained sun wash for supporting reassurance where introduced.
- Keep the inquiry form on a solid raised white surface and contact methods on clear flat/interactive surfaces. Texture, line art, and glows must not sit behind form controls or contact values.
- Stack the hero and contact workspace at widths below `lg`; use balanced split layouts from `lg` while preserving `min-w-0` containment for long contact values.

### FAQs

- Introduce the route with a warm-canvas editorial hero containing the single page-level heading, a concise answer-finding promise, and an in-page action to the FAQ browser.
- The hero may use the shared fine dot texture, restrained botanical SVG line art, low-opacity yellow/green glows, and a concise topic overview for Products, Shipping, Orders, and Returns.
- Search input.
- Category filters.
- Accordion list with one open item.
- Empty state when no question matches.
- Use a warm canvas for the introduction, a botanical wash for the discovery workspace, and a restrained sun wash for the support handoff where introduced.
- Keep search, filters, questions, and answers on quiet high-contrast surfaces; open answers may use the botanical wash inside their solid accordion boundary.
- Stack the hero below `lg`; use a balanced split hero from `lg` and preserve `min-w-0` containment throughout the discovery workspace.

### Legal

- Botanical legal header with one page-level heading, summary, effective-date state, last-updated metadata, and Kenya scope.
- Visible business-approved/pending-legal-review warning until qualified review is complete.
- Collapsible table of contents on mobile and a bounded sticky table of contents on desktop.
- One solid raised reading surface with numbered, anchored sections and quiet dividers rather than individual tinted cards.
- Approved contact channels and related-policy navigation after the reading surface.
- Legal routes remain `noindex, follow` until qualified review and effective dates are complete.

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
| 320–639px   | Base              | One-column reading and shop-product flow. Header uses icon controls and the hamburger drawer. Deliberately labelled product/article rails and blog-category chips may scroll locally; shop filters expand vertically and the page itself must not overflow horizontally. |
| 640–767px   | `sm`              | Preserve the mobile navigation mode. Buttons may sit side-by-side when their labels remain readable. Content gutters increase, and repeated content may move to two columns where specified.                                                      |
| 768–1023px  | `md`              | Retain the hamburger navigation. Use tablet-friendly grids: two blog cards, three shop product cards, and stacked product detail/checkout layouts. Drawers remain operable with clear close controls.                                             |
| 1024–1279px | `lg`              | Enable the full header navigation, desktop search, sticky sidebars, and two-column detail/checkout layouts. Grids should prioritise readable cards over maximum density.                                                                          |
| 1280–1535px | `xl`              | Increase desktop breathing room. Blog grids may use three columns and sidebars may widen where this improves scanning.                                                                                                                            |
| 1536px+     | `2xl`             | Keep page content constrained by the shared container. Product grids may use four columns only when card content remains comfortably readable.                                                                                                    |

#### Global responsive rules

- Use the shared `Container` gutters: 16px at base, 24px from `sm`, and 32px from `lg`.
- Treat 320px as the minimum layout baseline, with 360–390px phones and a short visual viewport as primary supported baselines. Drawers and fixed controls must account for browser chrome and safe-area insets.
- A component must be usable at 200% browser zoom and when text wraps. Do not depend on fixed combined header heights for primary content sizing.
- Fixed or sticky UI must not cover a close control, primary form action, validation feedback, or the last drawer action.
- Horizontal scrolling is permitted only for deliberately labelled rails/chip rows; use scroll snapping and ensure the containing page has no horizontal overflow.
- Image regions must reserve their final space with an aspect ratio or explicit dimensions. Use responsive `sizes` values that match the rendered layout.
- Motion is progressive enhancement only and must continue to respect the global reduced-motion preference.

| Surface          | Mobile                                  | Tablet                        | Desktop                 |
| ---------------- | --------------------------------------- | ----------------------------- | ----------------------- |
| Header           | Hamburger, cart trigger except checkout | Hamburger                     | Full nav                |
| Hero             | Stacked                                 | Stacked                       | Split                   |
| Shop filters     | Collapsible category disclosure         | Collapsible disclosure        | Sticky sidebar          |
| Product grid     | 1 column; 2 from `sm`                   | 3 columns                     | 3 columns; 4 from `2xl` |
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
| Product discovery           | Shop products are one column at base, two from `sm`, three from `md`, and four from `2xl`. Category filters use a compact disclosure below `lg`, then a sticky sidebar.                                                                  |
| Product and blog rails      | A rail displays one substantial card at base. Related products become a two-column grid from `sm`; blog cards become two columns from `md` and three from `xl`.                                                                        |
| Detail, cart, and checkout  | Product detail, cart, and checkout are stacked below `lg`; desktop columns begin at `lg`. Sticky summaries/sidebars must use an offset that clears the sticky header.                                                                  |
| Forms and feedback          | Form fields remain full-width and labels/errors do not clip or overlap. Two-field groups begin at `sm`; controls retain practical touch targets.                                                                                       |
| Footer and floating actions | Footer progresses from one column to two at `md` and four at `lg`. Floating WhatsApp control respects mobile safe areas and does not obscure an essential action.                                                                      |

### Responsive QA Matrix

The source implementation must be visually checked before release at the following representative widths. Automated checks are useful but do not replace this review.

| Viewport           | Required checks                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 320px minimum      | One-column product cards; no page-level horizontal overflow; long names, prices, contact values, and actions wrap without clipping.                                                                                                      |
| 360–390px mobile   | No horizontal overflow; 44px-ish touch targets where practical; readable product-card CTA; drawer is full-width; shop filters expand vertically; intentional content rails remain locally contained; checkout order action and errors remain visible. |
| 768px tablet       | Header controls fit without collision; grids reflow as specified; drawers retain clear close controls; form groups remain readable.                                                                       |
| 1024–1280px laptop | Header nav, search, cart, and logo fit together; sidebar/sticky elements do not obscure content; product grid has balanced card widths.                                                                   |
| 1440px+ desktop    | Content remains constrained and balanced; four-column product grids are not overly dense; hero/media does not become disproportionately wide.                                                             |

At each viewport, check keyboard navigation, text wrapping at increased browser zoom, image cropping/loading, focus visibility, modal/drawer behavior, and an operating-system reduced-motion preference.

### Manual browser QA handoff

Run this checklist in browser responsive mode and on available physical devices before release. Browser configuration is intentionally owned by the release reviewer; this checklist does not require application code changes.

1. At 320px, 360px, and 390px, visit Home, Shop, a product page, Cart, Checkout, About, Blog, a blog article, FAQs, Contact, and a legal page. Confirm there is no page-level horizontal scroll, card CTAs remain readable, shop filters expand vertically, and related-content rails scroll only within their intended rows.
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
- Verify meaningful text contrast and focus-indicator contrast on warm, botanical, sun-wash, white, dark, and image-backed surfaces.
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

- Retail promotional prices are confirmed for five products. Thirteen products remain visible with unconfirmed prices and are non-purchasable; product label facts, ingredients, usage, warnings, stock status, and claims still need business review.
- Paybill/Till details are not final; WhatsApp orders can proceed with payment details confirmed manually in chat.
- Legal pages contain business-approved policy drafts but still require qualified Kenyan legal review, effective dates, and removal of temporary `noindex` directives.
- Browser/device responsive QA and full accessibility audit are still required.
- The five-phase visual migration is implemented but still requires user-run tests, static checks, production build, and browser review.

## 13. Visual-System Migration

The warm botanical editorial redesign was implemented in five separately reviewable phases. Each phase used a review checkpoint before work progressed.

Implementation status: all five phases are implemented. Final acceptance remains pending user-run automated verification and the responsive browser QA matrix.

| Phase | Scope                                   | Implementation | Remaining acceptance check                                                        |
| ----- | --------------------------------------- | -------------- | --------------------------------------------------------------------------------- |
| 1     | PRD, tokens, background utilities       | Complete       | Confirm palette and texture strength during responsive browser review             |
| 2     | Shared cards and reusable surfaces      | Complete       | Confirm product and editorial cards in isolation and representative grids         |
| 3     | Marketing and editorial routes          | Complete       | Review Home, About, Blog, Contact, and FAQs across required viewports              |
| 4     | Shop, product, cart, and checkout routes | Complete       | Verify the complete browse-to-WhatsApp journey and transactional hierarchy        |
| 5     | Legal, utility, consistency, and cleanup | Complete       | Run the final site-wide visual, accessibility, static, test, and production checks |

Migration rules:

- Do not remove a legacy token or utility until every consumer has migrated.
- Keep phase changes independently reviewable and avoid unrelated content or behavior changes.
- Validate representative mobile, tablet, laptop, and wide-desktop layouts after each phase.
- Transactional pages receive quieter decoration than marketing pages.
- This version documents the implemented Phase 5 baseline. Future visual changes must update this PRD with the corresponding component and responsive contracts.

## 14. Contact Page Editorial Alignment

The Contact route is being aligned with the visual pattern established by the About route while retaining the Contact page's stronger functional and accessibility constraints. Consistency comes from shared surface roles, typography, spacing, restrained organic decoration, and editorial hierarchy. Form controls and full contact details remain on quiet high-contrast surfaces.

| Phase | Scope                                            | Implementation status               | Review checkpoint                                                                                                                                                           |
| ----- | ------------------------------------------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Design contract and page foundation              | Complete                            | Confirmed for progression to Phase 2; final responsive browser acceptance remains part of Phase 3                                                                           |
| 2     | Contact workspace and form refinement            | Complete                            | Confirmed for progression to Phase 3; final interaction and browser acceptance remains part of Phase 3                                                                     |
| 3     | Reassurance, regression coverage, and QA handoff | Implemented; awaiting verification | Run targeted automated coverage and confirm factual support content, responsive containment, reduced motion, 200% zoom, and the manual browser matrix                      |

### Phase 1 contract

- Use `section-canvas` for a dedicated editorial hero and `section-botanical` for the functional contact workspace.
- Reuse the About route's fine dot texture, lightweight botanical line art, low-opacity glows, eyebrow pill, responsive hero typography, and framed featured-panel language without copying its image-led composition.
- Keep one `h1`; the contact workspace begins with a shared `SectionHeader` using an `h2`.
- Provide an in-page jump action to the contact workspace and a matching scroll offset below the sticky header.
- Use normal document flow and a stacked base layout. The hero becomes a split layout at `lg` and remains constrained by the shared `Container`.
- Reduce visual competition by keeping the featured panel concise and reserving full phone, email, address, WhatsApp, warning, and form content for the functional section.
- Preserve the existing contact data source, confirmation flag, WhatsApp URL construction, and inquiry-form behavior during this phase.

### Phase 2 contract

- Refine the inquiry form with the shared field treatment and explicit accessible relationships for labels, guidance, invalid state, and blocked-action explanation.
- Preserve client-side WhatsApp message preparation; do not introduce a backend submission path or additional personal-data storage.
- Organize phone, email, address, and WhatsApp into a clear channel hierarchy using existing card and action variants.
- Keep long contact values shrinkable and wrappable at the 320px baseline and 200% browser zoom.
- Retain a visible semantic warning whenever `siteContent.contact.needsConfirmation` is true.

### Phase 3 contract

- Add a restrained supporting section only with factual, already-approved inquiry categories; do not invent operating hours, response times, service guarantees, or new contact channels.
- Add targeted coverage for contact links, form labels, blocked-action behavior, prepared WhatsApp inquiries, confirmation messaging, and responsive containment contracts.
- Complete the Contact route checks in the existing responsive QA matrix, including keyboard-only use, reduced motion, increased text size, and representative mobile, tablet, laptop, and wide-desktop widths.
- Update implementation status here after each review checkpoint. Architecture documentation changes only if component ownership or shared responsibilities change.

Phase 3 implementation includes the restrained sun-wash inquiry-support section and targeted Contact route coverage. Final acceptance remains pending user-run tests, static checks, production build, and the responsive browser QA matrix. No new component ownership or shared architectural responsibility was introduced, so `Architecture.md` does not require a corresponding structural update.

## 15. FAQ Page Editorial Alignment

The FAQ route is being aligned with the About and Contact editorial pattern while retaining a quieter, scan-focused discovery workspace. The hero and support handoff carry the strongest brand expression; repeated questions, answers, search, and filters remain on clear high-contrast surfaces.

| Phase | Scope                                            | Implementation status               | Review checkpoint                                                                                                                                          |
| ----- | ------------------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Design contract and editorial foundation        | Complete                            | Confirmed for progression to Phase 2; final responsive browser acceptance remains part of Phase 3                                                          |
| 2     | Discovery and accordion refinement              | Complete                            | Confirmed for progression to Phase 3; final interaction and browser acceptance remains part of Phase 3                                                    |
| 3     | Support handoff, regression coverage, and QA    | Implemented; awaiting verification | Run targeted automated coverage and confirm factual support actions, responsive containment, reduced motion, 200% zoom, and the manual browser matrix     |

### Phase 1 contract

- Use `section-canvas` for a dedicated editorial hero and `section-botanical` for the FAQ discovery workspace.
- Reuse the About and Contact routes' fine dot texture, lightweight botanical line art, low-opacity glows, eyebrow pill, responsive hero typography, and framed featured-panel language.
- Keep one `h1`; the topic panel and discovery workspace use subordinate headings.
- Summarize only the four established FAQ categories: Products, Shipping, Orders, and Returns.
- Provide an in-page jump action to the FAQ browser and a matching scroll offset below the sticky header.
- Use normal document flow and a stacked base layout. The hero becomes a split layout at `lg` and remains constrained by the shared `Container`.
- Preserve the existing FAQ data, initial open question, search, category filtering, accordion behavior, and empty state during this phase.

### Phase 2 contract

- Move the search control to the shared field treatment and provide a labelled filter group with a selected indication that does not rely on color alone.
- Use a concise result-count status rather than placing the entire question list in a live region.
- Give each accordion trigger and answer panel stable IDs with explicit `aria-controls` and labelling relationships.
- Reconcile the open question when filtering removes it from the visible result set while retaining a predictable one-question-open interaction.
- Add a recovery action that clears search and category state when no FAQs match.
- Preserve practical touch targets, visible keyboard focus, long-copy wrapping, and shrinkable layout at the 320px baseline and 200% browser zoom.

### Phase 3 contract

- Add a restrained sun-wash support handoff using only the established Contact route and direct WhatsApp channel; do not invent response times, availability claims, or new support channels.
- Add targeted coverage for surface roles, the single page-level heading, search, category selection, result feedback, accordion relationships, empty-state recovery, support links, and responsive containment contracts.
- Complete the FAQ route checks in the existing responsive QA matrix, including keyboard-only use, reduced motion, increased text size, and representative mobile, tablet, laptop, and wide-desktop widths.
- Update implementation status here after each review checkpoint. Architecture documentation changes only if component ownership or shared responsibilities change.

Phase 3 implementation includes the restrained sun-wash support handoff and targeted FAQ route and interaction coverage. Final acceptance remains pending user-run tests, static checks, production build, and the responsive browser QA matrix. No new component ownership or shared architectural responsibility was introduced, so `Architecture.md` does not require a corresponding structural update.

## 16. Commerce Route Visual Consistency

Shop, Cart, and Checkout already use the correct warm-canvas tokens and solid commerce surfaces. This migration addresses their weaker route-level hierarchy, missing page-level headings, and inconsistent introduction-to-workspace transitions without applying marketing-page decoration to transactional content.

### Commerce decoration hierarchy

| Route    | Decorative intensity | Introduction role                                                                 | Protected workspace                                                                                                                   |
| -------- | -------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Shop     | Moderate             | Compact editorial entry with breadcrumb, one `h1`, restrained dots/line art/glow | Search, category filters, sorting, result feedback, prices, purchase actions, empty states, and product cards                         |
| Cart     | Restrained           | Compact warm-canvas header with one `h1` and low-opacity decoration               | Item cards, offer prices, bundle quantities, pack counts, removal controls, subtotal, estimated total, checkout action, and empty-cart recovery |
| Checkout | Minimal              | Compact warm-canvas header with one `h1`; decoration stops before progress        | Progress, navigation, form fields, validation, legal acknowledgement, prices, totals, shipping, payment instructions, and WhatsApp CTA |

Protected workspace rules:

- Pure white communicates focus and elevation across commerce tools, line items, forms, summaries, and actions.
- Fine dots, botanical line work, contour motifs, and page-level glows remain outside protected workspaces and are hidden from assistive technology.
- Botanical and sun-wash treatments are allowed only as contained reassurance, delivery, payment, or support surfaces where text contrast remains clear.
- A background transition must communicate a content-role change. Do not alternate canvas, botanical, sun, and white mechanically.
- Product images retain their documented botanical-to-canvas-to-sun treatment; this exception is bounded inside the product-card or gallery image region.
- All three routes use one page-level `h1`, normal document flow, shared `Container` gutters, `min-w-0` containment, and stacked base layouts.
- Sticky Shop, Cart, and Checkout panels retain the shared `top-24` desktop offset.
- Route decoration is simplified or removed at the narrowest baseline and must not cause page-level horizontal overflow.

### Six-phase implementation plan

| Phase | Scope                                           | Implementation status         | Review checkpoint                                                                                                                                                            |
| ----- | ----------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Commerce design contract and shared rules       | Complete                      | Confirmed for progression to Phase 2; final responsive browser acceptance remains part of Phase 6                                                                            |
| 2     | Shop route foundation                           | Complete                      | Confirmed for progression to Phase 3; final responsive browser acceptance remains part of Phase 6                                                                            |
| 3     | Shop discovery refinement                       | Complete                      | Confirmed for progression to Phase 4; final responsive browser acceptance remains part of Phase 6                                                                            |
| 4     | Cart hierarchy and state consistency            | Complete                      | Confirmed for progression to Phase 5; final responsive browser acceptance remains part of Phase 6                                                                            |
| 5     | Checkout hierarchy and transactional clarity    | Complete                      | Confirmed for progression to Phase 6; final responsive browser acceptance remains part of Phase 6                                                                            |
| 6     | Cross-route regression coverage and QA handoff | Implemented; awaiting manual review | Complete keyboard-only and real-browser 200% zoom review; reconcile the existing repository-wide Prettier baseline                                                           |

### Phase 1 contract

- Document the shared commerce background vocabulary and route-specific intensity before changing route code.
- Treat the missing Shop, Cart, and Checkout page-level headings as semantic defects to be corrected in their route phases.
- Preserve existing product data, cart persistence, URL search parameters, pricing, shipping, validation, legal acknowledgement, payment, and WhatsApp construction throughout the migration.
- Keep phase changes independently reviewable; do not combine unrelated product, cart, checkout, or business-content changes.
- Prefer route-level composition with existing shared tokens and primitives. Do not introduce a configurable commerce-hero abstraction unless repeated implementation proves a stable shared contract.

### Phase 2 contract

- Replace the Shop route's heading-only introduction with a compact semantic `h1` composition while preserving its breadcrumb and metadata.
- Use `section-canvas` with restrained dots, one lightweight line motif, and low-opacity glows; keep its height materially below the editorial-route heroes.
- Retain a quiet warm-canvas product workspace, the existing `Suspense` boundary, and URL-driven category, sort, and query state.
- Do not place product previews or duplicated discovery controls in the Shop introduction.

### Phase 3 contract

- Align Shop search and sort controls with shared field recipes where practical and move result announcements to a concise status region.
- Preserve native radio semantics, the mobile disclosure, the desktop sticky category panel, filter-reset behavior, and the documented product-grid breakpoints.
- Align one-off category-control radius and interaction treatments with documented brand tokens without changing filtering behavior.
- Add targeted coverage for the Shop heading, surface roles, URL state, category/search/sort interactions, result feedback, empty state, and responsive containment.

### Phase 4 contract

- Add a compact Cart introduction with one `h1`; keep all cart content on the quiet warm-canvas workspace below it.
- Preserve flat white line items, the raised sticky summary, quantity behavior, removal, clearing, persistence, pricing, and checkout navigation.
- Improve hierarchy among item count, cart actions, continuation, and checkout without making destructive actions dominant.
- Keep botanical/sun reassurance contained inside the summary and align the empty-cart state with the route's introduction/workspace rhythm.
- Add targeted coverage for empty and filled Cart states, heading and surface roles, totals, actions, and responsive containment.

### Phase 5 contract

- Add a compact Checkout introduction with one `h1` and minimal decoration that stops before checkout progress.
- Preserve the simplified header, progress order, solid raised form sections, sticky order summary, shipping and total calculations, legal acknowledgement, payment states, and WhatsApp message construction.
- Improve the blocked WhatsApp action through adjacent requirements, connected validation, and predictable focus or navigation to the first blocking field without weakening existing validation.
- Keep validation, payment, shipping, totals, and legal content on semantic, solid high-contrast surfaces.
- Add targeted coverage for empty, invalid, and valid Checkout states, progress semantics, validation focus, payment states, policy links, and WhatsApp integrity.

### Phase 6 contract

- Add or extend cross-route coverage for one `h1` per page, permitted background roles, protected commerce surfaces, sticky offsets, and mobile-first containment.
- Run targeted tests before the full suite, followed by type checking, linting, formatting checks, and the production build.
- Complete the responsive browser matrix at 320px, 360–390px, 768px, 1024–1280px, and 1440px+, including increased text size, 200% zoom, reduced motion, and keyboard-only navigation.
- Update this section after each review checkpoint. Update `Architecture.md` only if component ownership, shared responsibilities, or the documented test inventory changes.

Phase 6 implementation extends the existing Shop, Cart, Checkout, commerce-control, and responsive-foundation coverage with shared heading, workspace-decoration, protected-surface, sticky-offset, shrinkable-grid, keyboard-focus, and reduced-motion contracts. Automated verification on July 17, 2026 completed with 16 targeted tests and 79 full-suite tests passing; TypeScript, ESLint, and the Next.js production build also passed. The repository-wide Prettier check remains unresolved because it reports 79 existing files across documentation, configuration, application, and test code.

Headless Chromium review covered Shop at 320px, 375px with reduced motion, 768px, 1120px, and 1440px; empty Cart and Checkout at 320px and 1440px; and a 2x scale-factor Shop stress pass. No visible horizontal clipping or protected-workspace decoration regression was found. Final acceptance still requires manual keyboard-only navigation, real-browser 200% zoom and increased-text review, and filled Cart/Checkout browser-state review.
