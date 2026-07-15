# Viesta SEO Architecture and Execution Guide

**Project:** Viesta Nutrition  
**Site type:** Static Next.js e-commerce storefront with WhatsApp checkout  
**Primary market:** Kenya  
**Framework:** Next.js App Router, TypeScript, static product/blog data  
**Status:** Planning guide for SEO implementation  
**Last updated:** July 9, 2026

---

## 1. Purpose

This document is the working SEO roadmap for Viesta, from technical SEO implementation through deployment, Google indexing, measurement, and ongoing optimization.

The goal is not to chase short-term ranking tricks. The goal is to make the site easy for search engines to crawl, understand, index, and display accurately while keeping the customer experience clear, trustworthy, and medically responsible.

Viesta sells nutrition and health supplements. That means SEO must be handled with extra care because product descriptions, blog posts, and category pages can touch health-related topics. The site should prioritize accurate product information, safe wellness language, transparent ordering, and clear limitations instead of aggressive medical claims.

---

## 2. Current Project Context

### 2.1 Product and Business Context

Viesta is a static storefront for nutrition and health supplements in Kenya. The initial site supports:

- Product browsing by health-focused categories.
- Product detail pages under `/products/[slug]`.
- Blog content under `/blog` and `/blog/[slug]`.
- Cart and checkout pages using local state.
- WhatsApp-based order submission.
- Local delivery context, KES pricing, and M-Pesa confirmation through WhatsApp.
- Static legal pages for privacy, terms, and returns.

The initial launch is a static e-commerce site hosted on Vercel. Google Analytics and other behavioral-tracking tools are not approved for launch. Any future analytics implementation requires the privacy-impact, disclosure, consent, and policy change-control process defined in `Viesta_Legal_Policies.md`.

### 2.2 Current Technical SEO State

The project already has a good foundation:

- Next.js App Router pages are statically renderable.
- Product and blog routes use `generateStaticParams`.
- Root metadata exists in `src/app/layout.tsx`.
- Basic page-level metadata exists on key pages.
- Product and blog pages generate dynamic titles and descriptions.
- The blog index has canonical, Open Graph, and Twitter metadata.
- Published blog articles generate canonical, Open Graph, and Twitter metadata from article data.
- Published blog articles render matching `BlogPosting` JSON-LD.
- Product, blog, category, FAQ, shipping, legal, and contact content are stored in typed local data files.

Current gaps to address:

- No `sitemap.ts` or generated `sitemap.xml`.
- No `robots.ts` or generated `robots.txt`.
- Canonical metadata is not yet consistently implemented outside the blog and About pages.
- Open Graph and Twitter metadata are not yet consistently implemented outside the blog and About pages.
- Structured data is currently limited to published blog articles.
- No Search Console verification plan in code or deployment settings.
- No formal index/noindex rules for cart, checkout, or policy pages.
- No SEO acceptance checklist for launch.
- Blog/product content still contains `needsConfirmation` fields, meaning some claims, references, labels, and final copy require confirmation before launch.

---

## 3. SEO Principles for Viesta

### 3.1 What SEO Must Optimize For

SEO work should help:

- Search engines discover all important public pages.
- Google understand product, organization, breadcrumb, article, and FAQ context.
- Customers find relevant products by health goal, product name, and local purchase intent.
- Search snippets represent the page accurately.
- The site remain fast, accessible, mobile-friendly, and stable.
- Product and wellness content avoid unsupported health claims.

### 3.2 What SEO Must Not Do

SEO work should not:

- Claim products diagnose, treat, cure, or prevent diseases unless legally approved and backed by confirmed documentation.
- Add fake reviews, fake ratings, or unverified aggregate ratings.
- Generate keyword-stuffed copy that weakens trust.
- Index checkout/cart pages that do not help search users.
- Create many thin category or landing pages without distinct value.
- Hide text, links, or structured data that contradicts visible page content.

### 3.3 Main Tradeoff

For Viesta, trust and compliance matter more than aggressive keyword expansion.

That may slow content production because every product and blog page needs careful wording, but it reduces legal, reputational, and search-quality risk. This is the right tradeoff for a health-supplement storefront.

---

## 4. SEO Architecture Overview

The SEO implementation should be handled in seven parts.

| Part | Focus | Outcome |
|------|-------|---------|
| 1 | Technical SEO foundation | Crawlable, indexable, canonical, measurable site |
| 2 | Metadata and snippets | Strong titles, descriptions, OG/Twitter previews |
| 3 | Structured data | Machine-readable product, article, breadcrumb, organization, and FAQ context |
| 4 | Content SEO | Search-intent aligned pages with safe wellness language |
| 5 | Local and commerce SEO | Kenya/local trust signals, delivery, contacts, product availability |
| 6 | Deployment to Google | Search Console, sitemap submission, inspection, indexing checks |
| 7 | Measurement and iteration | Analytics, Search Console monitoring, content improvement loop |

The implementation order matters. Technical crawl/index foundations should come before content expansion because Google needs a stable, correct site structure before more pages are optimized.

---

## 5. Part 1: Technical SEO Foundation

### 5.1 Objectives

Part 1 should ensure that:

- Important public pages can be crawled.
- Unhelpful transactional pages are handled intentionally.
- Every indexable page has a stable canonical URL.
- Google can discover the full URL set through a sitemap.
- `robots.txt` references the sitemap and does not block required assets.
- Build output can be checked before deployment.
- The production domain is treated as the source of truth.

### 5.2 URL Strategy

Canonical production domain:

```txt
https://viesta.co.ke
```

Current public URL groups:

| URL group | Example | SEO intent |
|-----------|---------|------------|
| Homepage | `/` | Brand, store overview, key categories |
| Shop index | `/shop` | Product discovery and commercial intent |
| Product pages | `/products/bioflex` | Product-specific search intent |
| Blog index | `/blog` | Educational content hub |
| Blog posts | `/blog/how-to-choose-supplements-daily-routine` | Informational search intent |
| About | `/about` | Trust, brand credibility |
| Contact | `/contact` | Local and support intent |
| FAQs | `/faqs` | Support and long-tail questions |
| Legal pages | `/privacy-policy`, `/terms-of-service`, `/returns-refund-policy` | Trust and compliance |
| Cart/checkout | `/cart`, `/checkout` | Transactional flow, usually not valuable as search landing pages |

Recommended URL rules:

- Keep URLs lowercase, readable, and hyphen-separated.
- Keep existing `/products/[slug]` and `/blog/[slug]` patterns.
- Do not introduce query-based indexable category pages until there is a deliberate category landing-page strategy.
- Treat `/shop?category=...` filters as user-experience states, not separate indexable URLs.
- Avoid changing slugs after launch unless redirects are planned.

### 5.3 Canonical URL Strategy

Every indexable page should emit a canonical URL pointing to its clean production path.

Examples:

| Page type | Canonical |
|-----------|-----------|
| Home | `https://viesta.co.ke/` |
| Shop | `https://viesta.co.ke/shop` |
| Product | `https://viesta.co.ke/products/{slug}` |
| Blog index | `https://viesta.co.ke/blog` |
| Blog post | `https://viesta.co.ke/blog/{slug}` |

For `/shop` query filters:

- Keep the canonical as `https://viesta.co.ke/shop`.
- Do not create canonical URLs for each filter state unless those pages become real category landing pages with unique content.

Implementation target:

- Add `alternates.canonical` to static and dynamic metadata.
- Use `siteContent.url` as the base.
- Keep canonical generation centralized enough to avoid typos.

Risk level: Medium. Incorrect canonicals can cause Google to ignore preferred pages or consolidate signals incorrectly.

### 5.4 Sitemap Strategy

Create `src/app/sitemap.ts` using Next.js metadata file conventions.

The sitemap should include:

- Homepage.
- Shop page.
- Product detail pages from `src/data/products.ts`.
- Blog index.
- Blog post pages from `src/data/blog-posts.ts`.
- About, contact, FAQ, and legal pages.

The sitemap should exclude:

- `/cart`.
- `/checkout`.
- Temporary/internal routes.
- Search/filter query states.
- Any product or blog page that is intentionally withheld from launch.

Recommended sitemap fields:

- `url`
- `lastModified`
- `changeFrequency`
- `priority`

Suggested priorities:

| Page type | Priority |
|-----------|----------|
| Homepage | `1.0` |
| Shop | `0.9` |
| Product pages | `0.8` |
| Blog index | `0.7` |
| Blog posts | `0.6` |
| About/contact/FAQs | `0.5` |
| Legal pages | `0.3` |

Tradeoff:

- Priority and change frequency are only hints. They are still useful for expressing site intent, but content quality, internal links, and crawl behavior matter more.

### 5.5 Robots Strategy

Create `src/app/robots.ts`.

Recommended policy:

```txt
User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Sitemap: https://viesta.co.ke/sitemap.xml
```

Important distinction:

- `robots.txt` controls crawling, not guaranteed indexing.
- For pages that should not appear in search results, use `noindex` metadata where appropriate.

Recommended indexability:

| Page | Index rule | Reason |
|------|------------|--------|
| `/` | index | Primary brand/store page |
| `/shop` | index | Main commercial page |
| `/products/[slug]` | index | Product search landing pages |
| `/blog` | index | Content hub |
| `/blog/[slug]` | index when final | Informational search pages |
| `/about` | index | Trust and brand page |
| `/contact` | index | Local/contact intent |
| `/faqs` | index | Support and long-tail intent |
| Legal pages | index or noindex by decision | Useful for trust, low search value |
| `/cart` | noindex | Personal transactional state |
| `/checkout` | noindex | Personal transactional state |

Risk level: Medium. Accidentally blocking assets or public pages can hurt rendering and indexing.

### 5.6 Rendering and Crawlability

The site should preserve server-rendered content for SEO-critical areas:

- Page titles and headings.
- Product names, descriptions, prices, categories, and images.
- Blog titles, excerpts, authors, dates, and article copy.
- Breadcrumb links.
- Contact details and location information.

Avoid making SEO-critical content available only after client-side interaction. Client-side filtering on `/shop` is acceptable because products are still present in the page/data flow, but permanent category landing pages should eventually be server-rendered routes if they become SEO targets.

### 5.7 Performance and Core Web Vitals

SEO implementation should not add heavy scripts or unnecessary client code.

Technical targets:

- Keep images optimized through `next/image`.
- Use correct image dimensions, `sizes`, and priority only for true above-the-fold images.
- Keep fonts using `display: "swap"`.
- Avoid large third-party scripts beyond analytics and required integrations.
- Run production builds before launch.
- Test mobile performance because most local commerce discovery is mobile-heavy.

Recommended checks:

- `npm run build`
- Lighthouse/PageSpeed on production URL after deployment.
- Search Console Core Web Vitals once field data becomes available.

### 5.8 Accessibility and Semantic HTML

Accessibility supports users and helps search engines understand page structure.

Implementation standards:

- One clear `<h1>` per page.
- Logical heading order.
- Descriptive link text.
- Image alt text that describes meaningful product/content images.
- Breadcrumbs marked with `nav aria-label="Breadcrumb"`.
- Product cards should link clearly to product details.
- Buttons should be buttons when they trigger actions, links when they navigate.

Risk level: Low to Medium. Poor semantics usually does not block indexing, but it weakens quality and usability.

---

## 6. Part 2: Metadata and Search Snippets

### 6.1 Metadata Model

Next.js supports static `metadata` exports and dynamic `generateMetadata` functions in App Router server components. Viesta should use:

- Static `metadata` for static pages.
- `generateMetadata` for product and blog detail pages.
- Shared helper functions for canonical URLs and social image fallbacks if duplication grows.

Recommended global metadata:

- Site title template.
- Default description.
- `metadataBase`.
- Open Graph site name.
- Default Open Graph image.
- Twitter card metadata.
- Icons.
- Optional Search Console verification token once available.

### 6.2 Title Strategy

General title format:

```txt
{Page-specific title} | Viesta Nutrition
```

Recommended examples:

| Page | Title |
|------|-------|
| Home | `Viesta Nutrition` |
| Shop | `Shop Health Supplements in Kenya` |
| Product | `{Product Name}` |
| Blog | `Nutrition and Wellness Journal` |
| Blog post | `{Post Title}` |
| Contact | `Contact Viesta Nutrition` |

Product title considerations:

- Use the product name exactly.
- Avoid stuffing with repeated phrases like "best supplement in Kenya".
- Add differentiators in description/body copy, not every title.

### 6.3 Description Strategy

Meta descriptions should:

- Summarize the page accurately.
- Mention Kenya/local ordering where useful.
- Avoid unsupported medical claims.
- Stay concise enough to work as a search snippet.

Product description example pattern:

```txt
{Product name} from Viesta Nutrition. Compare format, pack details, price, and ordering options for delivery in Kenya.
```

Blog description example pattern:

```txt
Practical guidance from Viesta Nutrition on {topic}, with careful supplement-use reminders and wellness context.
```

### 6.4 Social Sharing Metadata

Add Open Graph and Twitter card metadata for:

- Homepage.
- Shop.
- Product pages.
- Blog posts.

Recommended image strategy:

- Use `/images/brand/hero.png` as default social image initially.
- Use product images for product pages if dimensions and crop are acceptable.
- Use blog hero images for blog posts.
- Later create a branded `opengraph-image` asset for stronger previews.

Risk level: Low. This does not directly guarantee rankings but improves share previews and brand consistency.

---

## 7. Part 3: Structured Data

Structured data should match visible page content. Do not add fields that are not actually shown or confirmed.

### 7.1 Recommended JSON-LD Types

| Page type | Structured data |
|-----------|-----------------|
| Global/root | `Organization` or `LocalBusiness` |
| Product pages | `Product`, `Offer`, `BreadcrumbList` |
| Blog posts | `Article` or `BlogPosting`, `BreadcrumbList` |
| FAQ page | `FAQPage` if FAQ content is visible |
| Breadcrumbs | `BreadcrumbList` on product/blog/detail pages |

### 7.2 Product Structured Data

Use Product structured data only with confirmed facts.

Allowed when confirmed:

- Product name.
- Product image.
- Description.
- SKU/product ID if stable.
- Brand.
- Price.
- Currency.
- Availability.
- Product URL.

Avoid until verified:

- Aggregate ratings.
- Review snippets.
- Medical or treatment claims.
- Unsupported availability.
- Fake offer data.

For products with `needsConfirmation`, structured data should either omit uncertain fields or wait until the product content is final.

### 7.3 Organization or LocalBusiness Data

Viesta should expose business identity consistently:

- Name: `Viesta Nutrition`.
- URL: `https://viesta.co.ke`.
- Logo: `/icons/logo.svg`.
- Phone.
- Email.
- Address: New Horizon Industrial Park, Ruiru, Kenya.
- WhatsApp/contact URL where appropriate.

If the business has a verified Google Business Profile later, align name, address, phone, opening hours, and category exactly.

### 7.4 Blog Article Data

Blog posts should include:

- Headline.
- Description.
- Author.
- Publisher.
- Publish date.
- Image.
- URL.

For health-adjacent posts, visible article content should include practical disclaimers where appropriate. Structured data should not imply clinical authority that the site has not established.

---

## 8. Part 4: Content SEO

### 8.1 Search Intent Map

| Intent | Target page type | Example query patterns |
|--------|------------------|------------------------|
| Brand | Homepage/About | `Viesta Nutrition`, `Viesta supplements` |
| Product | Product pages | `{product name}`, `{product name} Kenya` |
| Category | Shop or future category pages | `blood sugar support supplements Kenya` |
| Educational | Blog posts | `how to read supplement labels` |
| Local/contact | Contact page | `Viesta Nutrition Ruiru`, `supplement shop Ruiru` |
| Support | FAQs/legal | `Viesta delivery`, `Viesta returns` |

### 8.2 Product Content Standards

Every product page should eventually include:

- Product name.
- Category.
- Product image.
- Price or clear confirmation workflow.
- Pack size or format.
- Short description.
- Benefits framed as support, not disease treatment.
- Usage note based on confirmed label directions.
- Warnings and medical caution where appropriate.
- WhatsApp ordering CTA.
- Related products.

Health-claim wording rules:

- Prefer "supports", "routine", "wellness", "comfort", and "general health".
- Avoid "treats", "cures", "reverses", "prevents", or "guarantees".
- For diabetes, blood pressure, pregnancy, medication, chronic illness, or symptoms, include professional-advice language.

### 8.3 Blog Content Standards

Blog posts should:

- Answer one clear user question.
- Use practical headings.
- Include safe supplement guidance.
- Link to relevant product categories only when useful.
- Avoid using blog content as disguised medical advice.
- Include sources/references when making health or ingredient claims.
- Be reviewed before launch if `needsConfirmation` includes references, final copy, or health claims.

### 8.4 Category Content Strategy

The current `/shop` page handles all products and filters. That is appropriate for launch.

Future category landing pages may be useful when:

- Each category has enough unique products.
- Each page can include distinct helpful copy.
- Search demand justifies a dedicated URL.
- Internal links can support the category page naturally.

Potential future routes:

```txt
/shop/blood-pressure-heart-health
/shop/joint-mobility-support
/shop/detox-digestive-wellness
/shop/immunity-general-wellness
/shop/mens-wellness
/shop/womens-wellness
```

Do not create these routes until the content is strong enough. Thin category pages can dilute quality.

---

## 9. Part 5: Local and Commerce SEO

### 9.1 Local Trust Signals

The site should consistently show:

- Business name.
- Phone number.
- Email.
- WhatsApp number.
- Address.
- Kenya delivery context.
- Currency in KES.
- Clear payment confirmation process.

Relevant implementation areas:

- `src/data/site.ts`
- Header/top bar
- Contact page
- Footer
- Checkout page
- Organization/LocalBusiness structured data

### 9.2 Google Business Profile

After launch, create or update the Google Business Profile if Viesta has a customer-facing or service-area presence.

Keep the following consistent with the website:

- Business name.
- Primary category.
- Phone number.
- Website URL.
- Address or service area.
- Opening hours.
- Photos/logo.
- Products or services.

This is separate from technical SEO but important for local discovery.

### 9.3 Merchant and Product Feeds

For launch, structured data is enough.

Future option:

- Google Merchant Center product feed.

Only consider this after product facts, prices, availability, shipping, and return policies are stable. A feed creates operational maintenance obligations.

---

## 10. Part 6: Deployment to Google Search

### 10.1 Pre-Deployment Checklist

Before submitting to Google:

- Production domain resolves correctly.
- HTTPS works.
- `siteContent.url` matches the production domain.
- No staging or preview URL is used in canonical metadata.
- `sitemap.xml` is available.
- `robots.txt` is available.
- Product and blog pages build successfully.
- No launch-blocking `needsConfirmation` remains on public SEO-critical pages.
- Metadata and canonical URLs are correct.
- Open Graph previews work.
- Cart and checkout are intentionally noindexed or excluded from sitemap.
- Legal pages are complete enough for launch.
- Analytics and Search Console ownership are ready.

### 10.2 Google Search Console Setup

Recommended property:

- Use a Domain property for `viesta.co.ke` if DNS verification is available.
- Use URL-prefix property only if DNS access is not available.

Search Console tasks:

- Verify ownership.
- Submit `https://viesta.co.ke/sitemap.xml`.
- Inspect homepage URL.
- Request indexing for homepage after launch.
- Inspect representative product and blog URLs.
- Monitor indexing, coverage, enhancements, and Core Web Vitals.

### 10.3 Launch-Day Indexing Checks

After deployment:

1. Visit `https://viesta.co.ke/robots.txt`.
2. Visit `https://viesta.co.ke/sitemap.xml`.
3. Confirm sitemap URLs return `200`.
4. Confirm production pages render visible product/blog content.
5. Use Search Console URL Inspection for:
   - `https://viesta.co.ke/`
   - `https://viesta.co.ke/shop`
   - One product page.
   - One blog post.
6. Search Google with:

```txt
site:viesta.co.ke
```

Indexing may take days or weeks. Google does not guarantee that every submitted URL will be indexed.

---

## 11. Part 7: Measurement and Iteration

### 11.1 Future analytics events

No analytics or advertising pixels are approved for launch. If Viesta later approves a compliant analytics implementation, measurement should remain limited to documented business-relevant actions and follow the legal-policy change-control process.

Recommended events:

| Event | Trigger |
|-------|---------|
| `view_item` | Product detail viewed |
| `add_to_cart` | Product added to cart |
| `view_cart` | Cart viewed |
| `begin_checkout` | Checkout viewed |
| `whatsapp_order_request_click` | Order-request handoff opened |
| `whatsapp_inquiry_click` | General WhatsApp contact clicked |
| `blog_post_view` | Blog post viewed |

### 11.2 Search Console Metrics

Monitor:

- Indexed pages.
- Crawled but not indexed pages.
- 404s and redirect issues.
- Search queries.
- Click-through rate by page.
- Average position by page/query.
- Product structured data enhancements.
- Breadcrumb structured data enhancements.
- Core Web Vitals.

### 11.3 Monthly SEO Review Workflow

Every month:

1. Export top queries and pages from Search Console.
2. Identify pages with impressions but low CTR.
3. Improve titles/descriptions where snippets are weak.
4. Identify product pages with no impressions.
5. Improve internal links to those products.
6. Review content with health-claim risk.
7. Add or improve blog posts based on real query demand.
8. Re-run production build and spot-check structured data.

---

## 12. Implementation Impact Map

These are the files likely to be touched when SEO implementation begins.

| Area | Files | Expected change | Risk |
|------|-------|-----------------|------|
| Site constants | `src/data/site.ts` | Add SEO defaults, social image, canonical helper inputs, verification token if needed | Medium |
| Root metadata | `src/app/layout.tsx` | Add richer global metadata, Open Graph/Twitter defaults, icons, verification | Medium |
| Sitemap | `src/app/sitemap.ts` | Generate sitemap from static routes, products, and blog posts | Medium |
| Robots | `src/app/robots.ts` | Generate robots policy and sitemap reference | Medium |
| Static pages | `src/app/*/page.tsx` | Add canonical, robots rules, stronger titles/descriptions | Low to Medium |
| Product pages | `src/app/products/[slug]/page.tsx` | Add canonical, OG image, Product JSON-LD, Breadcrumb JSON-LD | Medium to High |
| Blog pages | `src/app/blog/[slug]/page.tsx` | Add canonical, OG image, Article JSON-LD, Breadcrumb JSON-LD | Medium |
| FAQ page | `src/app/faqs/page.tsx` | Add FAQPage JSON-LD if visible FAQ data qualifies | Medium |
| Product data | `src/data/products.ts` | Confirm fields used for metadata/structured data | High if product claims are uncertain |
| Blog data | `src/data/blog-posts.ts` | Confirm references, dates, authors, and final copy | Medium to High |
| Tests | `src/__tests__/*` or new SEO tests | Verify sitemap URLs, robots policy, metadata helpers, structured data builders | Medium |

---

## 13. Recommended Implementation Plan

### Phase 1: Technical SEO

Implement first:

1. Confirm production domain and `siteContent.url`.
2. Add `src/app/sitemap.ts`.
3. Add `src/app/robots.ts`.
4. Add canonical URLs to root, static pages, product pages, and blog posts.
5. Add `noindex` metadata for `/cart` and `/checkout`.
6. Run `npm run type-check`.
7. Run `npm run build`.
8. Inspect generated `/sitemap.xml` and `/robots.txt` locally or after deployment.

### Phase 2: Metadata and Social Preview

Implement next:

1. Strengthen page titles and descriptions.
2. Add Open Graph defaults.
3. Add product/blog-specific Open Graph metadata.
4. Add Twitter card metadata.
5. Add a branded default social image if needed.

### Phase 3: Structured Data

Implement after metadata:

1. Add Organization or LocalBusiness JSON-LD.
2. Add BreadcrumbList JSON-LD.
3. Add Product JSON-LD only with confirmed fields.
4. Add BlogPosting JSON-LD.
5. Add FAQPage JSON-LD if FAQ content is eligible.
6. Validate using Google's Rich Results Test after deployment.

### Phase 4: Content Hardening

Implement before public SEO push:

1. Review all product `needsConfirmation` fields.
2. Confirm product labels, prices, warnings, and stock status.
3. Rewrite risky medical wording.
4. Add useful product/category internal links.
5. Review blog references and health claims.

### Phase 5: Google Deployment

Implement after production deployment:

1. Verify Search Console property.
2. Submit sitemap.
3. Inspect homepage, shop, one product, and one blog post.
4. Request indexing for key URLs.
5. Monitor indexing and enhancement reports.

### Phase 6: Measurement

Consider only after indexing begins and after a separate privacy and business approval:

1. Complete a privacy-impact and consent assessment for the proposed analytics provider.
2. Update the Privacy Policy and legal-policy architecture before activation.
3. Add only the approved analytics events.
4. Connect Search Console and the approved analytics workflow.
5. Review query/page performance monthly.
6. Improve titles, descriptions, internal links, and content based on data.

---

## 14. Acceptance Criteria

Technical SEO is ready when:

- `https://viesta.co.ke/sitemap.xml` returns a valid sitemap.
- `https://viesta.co.ke/robots.txt` returns the expected robots policy.
- Important pages have canonical URLs.
- Cart and checkout do not appear in the sitemap.
- Product and blog detail pages generate correct metadata.
- Build and type check pass.
- Search Console can fetch and render key URLs.
- No accidental staging URLs appear in page source.

Structured data is ready when:

- JSON-LD matches visible content.
- Product structured data uses only confirmed product facts.
- Breadcrumb structured data reflects visible breadcrumbs.
- Blog structured data uses accurate author/date/publisher values.
- Rich Results Test shows no critical errors for supported rich result types.

Content SEO is ready when:

- Product copy is helpful and medically conservative.
- Blog posts have final copy and references where needed.
- Internal links help customers move between related products, categories, and educational posts.
- No page relies on keyword stuffing or unsupported claims.

Deployment to Google is ready when:

- Search Console ownership is verified.
- Sitemap is submitted.
- Key URLs pass URL Inspection.
- Initial indexing status is monitored after launch.

---

## 15. Source References

This guide is aligned with the following official references:

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google sitemap overview: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google robots.txt guide: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Google Product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Google Breadcrumb structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google Search Console guide: https://developers.google.com/search/docs/monitor-debug/search-console-start
- Next.js metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js sitemap convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js robots convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
