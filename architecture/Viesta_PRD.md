# Product Requirements Document (PRD)

## Nutrition & Health Supplements E-Commerce Website

**Version:** 1.0  
**Date:** July 2026  
**Client:** Viesta Nutrition  
**Status:** DRAFT

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Sitemap](#2-sitemap)
3. [Page-by-Page Breakdown](#3-page-by-page-breakdown)
4. [Category Structure & Product Data](#4-category-structure--product-data)
5. [E-Commerce Flow](#5-e-commerce-flow)
6. [Technical Requirements](#6-technical-requirements)
7. [UI/UX Considerations](#7-uiux-considerations)
8. [Content Checklist](#8-content-checklist)
9. [Launch Checklist](#9-launch-checklist)
10. [Future Scope (Post-Launch)](#10-future-scope-post-launch)
11. [Summary](#11-summary)

---

## 1. Project Overview

### 1.1 Summary

A static e-commerce website for a nutrition and health supplements store ("Viesta"). The site showcases products across multiple health categories and facilitates orders through a WhatsApp-based checkout flow. No database, authentication, or admin panel is required for the initial launch.

### 1.2 Business Goals

- Establish an online presence for the Viesta nutrition store
- Display products with clear categorization
- Simplify the ordering process via WhatsApp
- Build trust through educational blog content
- Provide transparent shipping and policy information

### 1.3 Technical Constraints

- **Framework:** Next.js (static site generation)
- **Language:** TypeScript
- **Database:** None (products stored as static JSON data)
- **Authentication:** None
- **Payment:** Offline via Paybill/Till (WhatsApp-based confirmation)
- **Hosting:** Vercel
- **Language:** English (single region - Kenya)
- **Analytics:** Google Analytics

---

## 2. Sitemap

### 2.1 Page Hierarchy

```
📄 Homepage (/)
├── Hero Section
├── Featured Categories
├── Best Sellers
├── Trust Badges
├── Blog Teasers
└── Newsletter Signup

📄 Shop (/shop)
├── All Products Grid
├── Category Filters (Sidebar or Dropdown)
└── Product Cards

📄 Product Detail (/products/[slug])
├── Product Image
├── Product Name & Price
├── Product Description
├── Add to Cart Button
├── Related Products
└── Customer Reviews (Static Testimonials)

📄 About Us (/about)
├── Brand Story
├── Mission & Values
└── Team/Credentials (optional)

📄 Contact Us (/contact)
├── Contact Form (static)
├── Phone Number
├── Email Address
└── Physical Address (optional)

📄 FAQs (/faqs)
├── Accordion-style FAQ List
└── Categories: Shipping, Products, Orders, Returns

📄 Cart (/cart)
├── Cart Items List
├── Quantity Updates
├── Remove Items
├── Subtotal Display
└── Proceed to Checkout Button

📄 Checkout (/checkout)
├── Checkout Form
│   ├── Full Name
│   ├── Phone Number
│   ├── Delivery Location (Dropdown)
│   └── Delivery Address (Optional)
├── Order Summary
│   ├── Products + Quantities
│   ├── Subtotal
│   ├── Shipping Fee (Based on Location)
│   ├── Grand Total
│   └── Paybill/Till Number Display
└── "Order via WhatsApp" Button

📄 Blog (/blog)
├── Blog Post Grid
├── Category Filters (Nutrition Tips, Fitness, Ingredients, Wellness)
└── Pagination (if needed)

📄 Blog Post (/blog/[slug])
├── Full Article
├── Author & Date
├── Category Tag
└── Related Posts

📄 Legal Pages (Footer)
├── /returns-refund-policy
├── /privacy-policy
└── /terms-of-service
```

### 2.2 Page Count Summary

| Type | Count |
|------|-------|
| Core Pages | 8 |
| Blog Pages | 2 (Index + Post template) |
| Legal Pages | 3 |
| **Total Static Pages** | **13** |

---

## 3. Page-by-Page Breakdown

### 3.1 Site Header (Global Component)

**Appears on:** All pages

**Sections:**

**Top Bar (thin strip)**
- Shipping announcement: "Free Shipping in Nairobi & Kiambu"
- Contact: Phone number, Email
- Currency: KES (Kenya Shilling)

**Navigation Bar**
- Logo (Viesta brand)
- Main Menu: Home | Shop | Blog | About | Contact | FAQs
- Cart Icon (with item count badge)
- Search Bar (optional -- simple product search)

### 3.2 Homepage (/)

**Purpose:** First impression, drive exploration, build trust

**Sections (top to bottom):**

1. **Hero Section**
   - Full-width banner image
   - Headline: "Your Trusted Source for Premium Nutrition"
   - Sub-headline: "Quality supplements for every health goal"
   - CTA Button: "Shop Now" → links to /shop

2. **Featured Categories (Grid of 6-7)**
   - Cognitive Support
   - Immunity Boosters
   - Digestive Health
   - Men's & Women's Health
   - Herbal Extracts
   - Sports Nutrition
   - Functional Powders
   - *Each category displays as a card with icon + name*

3. **Best Sellers (Product carousel/grid)**
   - 4-6 products with: Product image, Product name, Price (KES), "Add to Cart" button
   - View All link → /shop

4. **Trust Badges (Row of 4)**
   - Quality Guaranteed
   - Lab Tested
   - Fast Delivery
   - Secure Checkout

5. **Blog Teasers (3 latest posts)**
   - Image + Title + Excerpt + "Read More" link
   - View All link → /blog

6. **Newsletter Signup (Optional)**
   - Email input + Subscribe button
   - Disclaimer: "No spam, unsubscribe anytime"

### 3.3 Shop Page (/shop)

**Purpose:** Browse and filter all products

**Layout:**

**Sidebar Filters (collapsible disclosure on mobile)**
- Category filter (radio options)
- Sort by: Price (low-high, high-low), Name (A-Z, Z-A)

**Product Grid**
- Display products as cards: 1 per row at the narrowest phone widths, 2 from 640px, 3 on tablet/standard desktop, and 4 only on sufficiently wide screens
- Each card: Product image, Product name, Category tag (small badge), Price (KES), "Add to Cart" button
- Pagination (if >12 products)

### 3.4 Product Detail Page (/products/[slug])

**Purpose:** Showcase individual product and enable purchase

**Sections:**
- Product Image (main image, optional thumbnails)
- Product Info: Product name, Price (KES), Category tag, Product description (text), Add to Cart button (with quantity selector)
- "Buy it with" / Related Products (below)
- Related Products (3-4 products from same category)
- Customer Reviews (Static testimonials -- displayed as quotes)

### 3.5 About Us (/about)

**Purpose:** Build trust and tell the brand story

- Brand Story (Who we are, why we started)
- Mission & Values
- Quality Commitment
- Optional: Team photos or credentials

### 3.6 Contact Us (/contact)

**Purpose:** Provide contact methods

- Contact Form (Name, Email, Message)
- Direct Contact: Phone Number (clickable), Email Address (clickable), Physical Address (if applicable)
- WhatsApp Direct Chat button

### 3.7 FAQs (/faqs)

**Purpose:** Answer common questions

**Categories:**
- Shipping: Delivery times, zones, fees
- Products: Ingredients, usage, quality
- Orders: How to order, payment, confirmation
- Returns: Policy, process, timeline

**Format:** Accordion-style expand/collapse

### 3.8 Cart Page (/cart)

**Purpose:** Review items before checkout

**Sections:**
- Cart Items List: Each item displays Image, Name, Price, Quantity selector, Remove button
- Cart Summary: Subtotal, "Proceed to Checkout" button (primary CTA), "Continue Shopping" link

> **Empty Cart State:** Display "Your cart is empty" + "Start Shopping" button

### 3.9 Checkout Page (/checkout)

**Purpose:** Collect order details and initiate WhatsApp order

1. **Customer Information Form**
   - Full Name (required)
   - Phone Number (required)
   - Delivery Location (dropdown -- Nairobi, Kiambu, Mombasa, Kisumu, Nakuru, Eldoret)
   - Delivery Address (optional textarea)

2. **Order Summary**
   - Products + Quantities
   - Subtotal
   - Shipping Fee (auto-calculated based on location)
   - Grand Total
   - Paybill/Till Number (displayed prominently)

3. **Order via WhatsApp Button**
   - Primary CTA
   - Opens WhatsApp with pre-filled message

### 3.10 Blog Index (/blog)

**Purpose:** Display all articles

- Category Filters: All | Nutrition Tips | Fitness | Ingredients | Wellness
- Blog Post Grid: Image (featured), Title, Excerpt (short preview), Date, Category tag, "Read More" link

### 3.11 Blog Post (/blog/[slug])

**Purpose:** Full article content

- Featured Image
- Title
- Author & Date
- Category Tag
- Full Content
- Related Posts (3 posts by category)

### 3.12 Legal Pages (Footer Links)

Three separate pages with static legal text (provided by client):

- Returns/Refund Policy (/returns-refund-policy)
- Privacy Policy (/privacy-policy)
- Terms of Service (/terms-of-service)

---

## 4. Category Structure & Product Data

### 4.1 Final Categories

```
📦 Product Categories:
├── Cognitive Support
├── Immunity Boosters
├── Digestive Health
├── Men's & Women's Health
│   ├── Men's Health (filter)
│   └── Women's Health (filter)
├── Herbal Extracts
├── Sports Nutrition
└── Functional Powders
```

### 4.2 Product Data Structure

Each product stored as an object in a static JSON file with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique product identifier |
| name | string | Product display name |
| slug | string | URL-friendly product name |
| category | string | Main category (from list above) |
| subCategory | string or null | Men's Health, Women's Health, or null |
| price | number | Price in KES |
| image | string | Path to product image |
| description | string | Product description |
| featured | boolean | Whether to show as best seller |

### 4.3 Filtering Logic

- **Category filter:** Show products where category matches selected category
- **Sub-category filter:** Show products where subCategory matches selected gender
- **Sort options:** Price (low-high, high-low), Name (A-Z, Z-A)

---

## 5. E-Commerce Flow: Add to Cart → WhatsApp Checkout

### 5.1 Complete Step-by-Step Flow

| Step | Action | System Behavior |
|------|--------|-----------------|
| 1 | Customer clicks "Add to Cart" on product | Product added to cart state (localStorage) |
| 2 | Customer views Cart page | Shows all items, quantities, subtotal |
| 3 | Customer clicks "Proceed to Checkout" | Navigates to /checkout |
| 4 | Customer fills in form | Name, Phone, Location, Address (optional) |
| 5 | System displays order summary | Products, quantities, subtotal, shipping fee, grand total, Paybill/Till number |
| 6 | Customer clicks "Order via WhatsApp" | Pre-filled WhatsApp message generated |
| 7 | Redirect to WhatsApp | Message contains: products, location, total |
| 8 | Customer sends payment | Via Paybill/Till number displayed on page |
| 9 | Customer sends screenshot | Confirmation sent via WhatsApp |
| 10 | Owner confirms manually | Order confirmed, delivery arranged |

### 5.2 WhatsApp Message Template

The following message template is pre-filled and sent via WhatsApp when the customer clicks the order button:

```
Hello! I'd like to place an order:

📦 Products:
- {Product A} x{quantity}
- {Product B} x{quantity}

📍 Location: {Delivery Location}
📞 Phone: {Phone Number}
🏠 Address: {Delivery Address (if provided)}

💰 Total: KES {Grand Total}

I'll send payment to the Paybill/Till number displayed on your website.
Please confirm my order. 🙏
```

### 5.3 Shipping Fee Logic

Shipping fees are calculated automatically based on the selected delivery location:

| Zone | Location | Fee |
|------|----------|-----|
| Free Zone | Nairobi, Kiambu | KES 0 |
| Paid Zone | Mombasa, Kisumu, Nakuru, Eldoret | KES 500 (flat fee) |
| Other | Not listed | Contact us for shipping fees |

*Implementation: Dropdown selection → auto-calculates shipping fee → updates grand total.*

---

## 6. Technical Requirements

### 6.1 Framework & Tooling

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Rendering:** Static Site Generation (SSG) -- all pages pre-built
- **Styling:** Tailwind CSS
- **State Management:** React Context + localStorage (cart persistence)
- **Data Storage:** Static JSON files with TypeScript types (products, blog posts, FAQs)
- **Content:** JSON files (for products, blog posts)
- **Hosting:** Vercel
- **Analytics:** Google Analytics

### 6.2 State Management: React Context + localStorage

**Decision Rationale:**

- Cart is the only global state needed across 3 pages (shop, cart, checkout)
- No async actions, API calls, or optimistic updates required
- React Context is built-in with zero additional dependencies
- Simpler to implement and debug for MVP
- localStorage provides persistence across page refreshes

**Future Consideration for More Complex State:**

- Adding user authentication
- Complex multi-step forms
- Real-time inventory updates
- Multiple state slices (cart, user, filters, UI)

### 6.3 Folder Structure

The project folder structure is maintained separately in [`Architecture.md`](./Architecture.md).

### 6.4 Data Storage Strategy

**Product Data:**
- Stored in `src/data/products.json` with TypeScript types
- All products pre-defined in JSON
- Images stored in `public/images/products/`

**Blog Data:**
- Stored in `src/data/blog-posts.json` with TypeScript types
- All blog posts pre-defined in JSON
- Images stored in `public/images/blog/`

**FAQ Data:**
- Stored in `src/data/faqs.json`
- Q&A pairs organized by category

**Cart State:**
- Stored in localStorage via React Context
- Persists across page refreshes
- Cleared on successful order placement

### 6.5 Cart State Management (High-Level)

**Cart Data Structure:**

```json
[
  {
    "id": "product-001",
    "name": "Vitamin C 1000mg",
    "price": 1500,
    "quantity": 2,
    "image": "/images/products/vitamin-c.jpg",
    "slug": "vitamin-c-1000mg"
  }
]
```

**Key Functions:**

- `addToCart(product, quantity)` -- Add item or update quantity
- `removeFromCart(productId)` -- Remove item from cart
- `updateQuantity(productId, quantity)` -- Update quantity
- `clearCart()` -- Clear all items
- `getCartTotal()` -- Calculate total price
- `getTotalItems()` -- Calculate total item count

**Persistence:**

- Cart saved to localStorage on every change
- Cart loaded from localStorage on app initialization
- No server-side storage required

---

## 7. UI/UX Considerations

### 7.1 Mobile-First Design

- **Navigation:** Hamburger menu on mobile
- **Product Grid:** 1 column at the narrowest mobile widths, 2 from 640px, 3 on tablet/standard desktop, and 4 only on sufficiently wide screens
- **Cart/Checkout:** Full-width forms, large tap targets (min 44px)
- **Buttons:** Prominent, high-contrast CTAs

### 7.2 Trust Signals

| Signal | Placement |
|--------|-----------|
| Phone number | Top bar (visible on all pages) |
| Free shipping badge | Top bar + Cart/Checkout |
| Quality guarantee | Homepage (trust badges row) |
| Clear Paybill/Till | Checkout page (prominent display) |
| WhatsApp chat | Floating button (all pages) |

### 7.3 Color Palette (Based on Viesta Logo)

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| Primary | Bright Yellow | #F6E206 | Main brand color; communicates energy, wellness, optimism |
| Secondary | White | #FFFFFF | Clean contrast; fresh nutrition and beauty brand feel |
| Accent | Soft Gold | #FFD700 | CTA buttons, highlights, badges, promotions |
| Text | Dark Charcoal | #1A1A1A | Headings, body text, navigation |
| Muted Text | Warm Gray | #6B7280 | Secondary labels, descriptions, placeholders |
| Background | Soft Cream | #FFFBEA | Gentle section backgrounds (pairs with yellow) |
| Light Background | Light Gray | #F5F5F5 | Cards, forms, dashboard contrast |
| Border | Pale Yellow Gray | #E5E7EB | Dividers, input borders, card outlines |
| Success | Green | #2E7D32 | Health products, successful actions |
| Warning | Orange | #F57C00 | Urgency, alerts, expiring offers |
| Danger | Red | #DC2626 | Errors, destructive actions |

### 7.4 Typography

| Role | Font | Usage |
|------|------|-------|
| Headings | Nunito Sans | Rounded, friendly, clean; matches soft logo style |
| Body | Open Sans | Highly readable, professional; works for nutrition/wellness |
| Alternative Body | Inter | Modern, digital feel (optional) |

**Scale:**

- **16px** -- Base body text
- **24px** -- Section headings
- **32px** -- Page headings
- **40px** -- Hero heading

### 7.5 Key UX Flows

**Path A: New Customer**
> Homepage → Browse Categories → View Product → Add to Cart → Checkout → WhatsApp Order

**Path B: Returning Customer**
> Shop → Filter by Category → Add to Cart → Checkout → WhatsApp Order

**Path C: Educational Visitor**
> Blog → Read Article → Browse Related Products → Add to Cart → Checkout

---

## 8. Content Checklist

### 8.1 Product Content

| Item | Quantity | Provided By |
|------|----------|-------------|
| Product images | 20-30 | Client |
| Product names | 20-30 | Client |
| Product descriptions | 20-30 | Client |
| Product prices (KES) | 20-30 | Client |
| Category assignments | 20-30 | Client |
| Best seller selection | 4-6 | Client |

### 8.2 Homepage Content

| Item | Status |
|------|--------|
| Hero image (banner) | Client to provide |
| Hero headline + sub-headline | Client to provide |
| Category icons/images | Client to provide (or use stock) |
| Trust badge icons/text | Client to confirm |
| Blog teaser selection | 3 posts from blog |

### 8.3 Blog Content

| Item | Status |
|------|--------|
| 5-10 blog posts (written) | Client to provide |
| Blog featured images | Client to provide |
| Blog categories | Defined: Nutrition Tips, Fitness, Ingredients, Wellness |

### 8.4 Static Pages Content

| Page | Content Status |
|------|----------------|
| About Us | Client to provide (brand story, mission) |
| Contact Us | Client to provide (phone, email, address) |
| FAQs | Client to provide (Q&A pairs) |
| Legal Pages | Client to write (Returns, Privacy, Terms) |

### 8.5 Visual Assets

| Asset | Quantity | Source |
|-------|----------|--------|
| Logo (Viesta) | 1 | Client |
| Favicon | 1 | Client |
| Product images | 20-30 | Client |
| Hero banner | 1-2 | Client or stock |
| Category icons | 7 | Stock icons (FontAwesome, Lucide) |
| Blog images | 5-10 | Client or stock |
| Trust badge icons | 4 | Stock icons |

---

## 9. Launch Checklist

### 9.1 Pre-Launch Tasks

**Content Finalization:**
- [ ] All product data added (names, prices, descriptions, images)
- [ ] Blog posts written and formatted
- [ ] About Us page finalized
- [ ] Contact details confirmed
- [ ] FAQs written and organized
- [ ] Legal pages written (Returns, Privacy, Terms)
- [ ] Footer links confirmed

**Design & UX:**
- [ ] Mobile responsive testing (phone, tablet)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cart functionality tested (add, remove, update)
- [ ] Checkout flow tested (form + WhatsApp redirect)
- [ ] WhatsApp message template verified
- [ ] Shipping fee logic tested (all regions)
- [ ] Navigation and links tested (no 404s)

**Performance:**
- [ ] Lighthouse score >90 (Performance, Accessibility, SEO)
- [ ] Image optimization (compressed, WebP format)
- [ ] Lazy loading for images
- [ ] Fast initial load (TTFB <200ms)

**Legal & Compliance:**
- [ ] Supplement disclaimer displayed (FDA statement)
- [ ] Privacy policy accessible
- [ ] Terms of service accessible
- [ ] Returns/refund policy accessible
- [ ] Cookie consent (if applicable)

**SEO:**
- [ ] Meta titles and descriptions for all pages
- [ ] Open Graph images configured
- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] Alt text for all images
- [ ] Clean URL structure (/products/[slug], /blog/[slug])

**Analytics:**
- [ ] Google Analytics / Tag Manager installed
- [ ] Event tracking for: Add to cart, Initiate checkout, WhatsApp button clicks, Form submissions

**Final Review:**
- [ ] Test all CTAs
- [ ] Test WhatsApp redirect on mobile
- [ ] Check all shipping zone calculations
- [ ] Verify Paybill/Till number displayed correctly
- [ ] Review all content for typos/errors

---

## 10. Future Scope (Post-Launch)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Admin panel (add/edit products) | High | Medium |
| Database integration (Firebase/Supabase) | High | Medium |
| Inventory tracking | Medium | Medium |
| Customer accounts / order history | Medium | High |
| Online payment integration (Stripe) | Low | High |
| Email order confirmations | Low | Medium |
| Multi-language support | Low | High |
| Product search functionality | Low | Medium |

---

## 11. Summary

### 11.1 Key Takeaways

- **13 pages** (8 core, 2 blog templates, 3 legal)
- **7 product categories** + sub-filters for Men's/Women's Health
- **WhatsApp checkout flow** (no online payment processing)
- **Static Next.js site** -- no database, no authentication
- **TypeScript** -- full type safety across the codebase
- **Mobile-first** design with clear trust signals
- **Content-driven** -- products, blog, FAQs, policies
- **React Context + localStorage** for cart management

### 11.2 Technical Stack Summary

```
Frontend: Next.js 14+ (SSG) with TypeScript
Styling: Tailwind CSS
State: React Context + localStorage
Data: Static JSON files (typed with TypeScript)
Hosting: Vercel
Analytics: Google Analytics
```

### 11.3 Color Palette Summary

```
Primary: #F6E206 (Bright Yellow)
Secondary: #FFFFFF (White)
Accent: #FFD700 (Soft Gold)
Text: #1A1A1A (Dark Charcoal)
Muted: #6B7280 (Warm Gray)
Background: #FFFBEA (Soft Cream)
Light BG: #F5F5F5 (Light Gray)
Border: #E5E7EB (Pale Yellow Gray)
Success: #2E7D32 (Green)
Warning: #F57C00 (Orange)
Danger: #DC2626 (Red)
```

### 11.4 Typography Summary

```
Headings: Nunito Sans (rounded, friendly)
Body: Open Sans (readable, professional)
Alternative: Inter (modern, digital)
Base: 16px
Headings: 24px, 32px, 40px
```

### 11.5 Development Phases

**Phase 1: Foundation & Setup**
> Project initialization, Tailwind CSS, folder structure, TypeScript types, static data files, color palette

**Phase 2: Core Components & Layout**
> Header, Footer, Layout wrapper, Product Card, Category Card, Trust Badges, Blog Card

**Phase 3: Page Development**
> Homepage, Shop, Product Detail, About, Contact, FAQs, Blog Index, Blog Post, Legal pages

**Phase 4: Cart & State Management**
> CartContext, useCart hook, localStorage, Cart page, Add to Cart functionality

**Phase 5: Checkout & WhatsApp Integration**
> Checkout form, shipping fee logic, order summary, WhatsApp message generation, form validation

**Phase 6: Blog & Content Integration**
> Blog post data, category filtering, related posts, static content population

**Phase 7: Testing & Optimization**
> Mobile responsive, cross-browser, cart/checkout testing, performance optimization, Lighthouse, SEO meta tags

**Phase 8: Analytics & Launch Preparation**
> Google Analytics, event tracking, sitemap, robots.txt, final review, Vercel deployment

---

> **End of PRD**
>
> *This PRD is a living document. Updates and refinements can be made as requirements evolve during development.*
