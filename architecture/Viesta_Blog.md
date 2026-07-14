# Viesta Wellness Blog

## Purpose

The Viesta Wellness Blog provides practical, source-led health education for individuals and families in Kenya. It helps readers understand everyday wellness topics without presenting supplements, herbal products, or lifestyle habits as substitutes for diagnosis, treatment, or qualified medical care.

The editorial experience is designed around three principles:

- Make complex wellness topics easier to understand.
- Name authoritative sources and explain important clinical context.
- Keep educational guidance clearly separated from product discovery.

## Current status

- Implementation phases 1–7 are complete.
- Eight educational articles are published in the local data model.
- Default byline: `Viesta Wellness Team`.
- Featured launch guides: blood pressure, diabetes, and detox.
- Customer stories are withheld pending consent and approved testimony.
- Product references use neutral catalog-discovery language.
- Last medical-source review: 14 July 2026.
- Article publication date currently recorded in data: 14 July 2026.
- The three generic placeholder covers have been removed.
- Automated and browser verification remain user-run requirements.

Before production launch, the article copy should receive qualified Kenyan clinical review. Publication dates should also be changed if the public launch occurs on a different date.

## Implemented reader journey

```text
Homepage
   ↓
Blood pressure · Diabetes · Detox
   ↓
Editorial blog landing page
   ↓
Leading guide · Featured guides · Topic filtering
   ↓
Structured article
   ↓
Sections · Lists · Tables · Callouts · Sources · Disclaimer
   ↓
Optional product discovery · Related reading
   ↓
WhatsApp updates or return to the journal
```

### Blog landing page

The `/blog` page contains:

1. Botanical editorial hero inspired by the About page.
2. A leading blood-pressure guide.
3. The three featured launch guides.
4. Topic-based article filtering with an accessible result count.
5. All eight published guides.
6. Healthy Living Essentials.
7. A WhatsApp updates call to action.

The page uses the established Viesta design system: warm canvas backgrounds, botanical surfaces, yellow accents, charcoal typography, glass-framed imagery, rounded cards, and mobile-first horizontal discovery.

### Article pages

Every `/blog/[slug]` page contains:

1. Back navigation.
2. Category, title, excerpt, author, formatted date, and read time.
3. A consistent 16:10 cover image.
4. Responsive table-of-contents navigation.
5. Structured headings, paragraphs, lists, tables, and safety callouts.
6. Authoritative source links.
7. A shared medical-information disclaimer.
8. Optional product discovery separated from the article body.
9. Related wellness guides.
10. WhatsApp and journal continuation actions.

Reference tables are semantic, keyboard-focusable horizontal regions with mobile scrolling guidance.

## Publication inventory

| Order | Article | Slug | Category | Cover | Featured |
|---:|---|---|---|---|---|
| 1 | Understanding Blood Pressure: Numbers, Habits, and When to Get Help | `blood-pressure-awareness` | `heart-blood-pressure` | `blood-pressure-awareness.webp` | Yes |
| 2 | Diabetes Wellness: Understanding Tests and Everyday Routines | `diabetes-wellness` | `diabetes-support` | `diabetes-wellness.webp` | Yes |
| 3 | Detoxing the Right Way: What the Evidence Says | `detoxing-the-right-way` | `detox-weight-wellness` | `detoxing-the-right-way.webp` | Yes |
| 4 | Everyday Immunity Support: Sleep, Nutrition, and Healthy Habits | `daily-immunity-support` | `immunity` | `daily-immunity-support.webp` | No |
| 5 | Joint Mobility Wellness: Movement, Strength, and Daily Care | `joint-mobility-wellness` | `joint-mobility` | `joint-mobility-wellness.webp` | No |
| 6 | Women's Everyday Wellness: Energy, Nutrition, and Self-Care | `womens-wellness` | `mens-womens-health` | `womens-wellness.webp` | No |
| 7 | Men's Wellness and Prostate Awareness | `mens-wellness` | `mens-womens-health` | `mens-wellness.webp` | No |
| 8 | Herbal Tea Wellness: Routines, Safety, and Informed Choices | `herbal-tea-wellness` | `herbal-tea` | `herbal-tea-wellness.webp` | No |

## Topic taxonomy

| Identifier | Public label | Current use |
|---|---|---|
| `heart-blood-pressure` | Heart & Blood Pressure | Blood-pressure guide |
| `diabetes-support` | Diabetes Support | Glucose testing and everyday routines |
| `detox-weight-wellness` | Detox & Weight Wellness | Evidence-aware detox guidance |
| `immunity` | Immunity | Everyday immune-wellness habits |
| `joint-mobility` | Joint & Mobility | Movement and joint-care education |
| `mens-womens-health` | Men's & Women's Health | Men's and women's wellness guides |
| `herbal-tea` | Herbal Tea | Tea routines, safety, and interactions |
| `customer-stories` | Customer Stories | Reserved; not currently published |

Category definitions and display labels are centralized in `src/data/blog-categories.ts`.

## Technical architecture

### Core data and types

- `src/types/blog.ts` defines publication states, covers, structured content blocks, sources, and product references.
- `src/data/blog-posts.ts` is the public article-data entry point.
- `src/data/blog-articles/` contains one maintainable data file per article and a shared source registry.
- `src/data/blog-editorial.ts` contains the disclaimer, date formatting, read-time calculation, and table-of-contents extraction.

The structured content model supports:

- Paragraphs
- Level-two and level-three headings
- Ordered and unordered lists
- Captioned reference tables
- Information, takeaway, professional-help, and warning callouts
- Authoritative source records
- Optional related-product slugs
- Draft and published states
- Publication and revision dates
- Derived read time

Only published articles may appear on the homepage, blog index, static article routes, related-reading sections, or search metadata.

### Presentation components

- `src/components/content/BlogCard.tsx`
- `src/components/content/BlogGrid.tsx`
- `src/components/content/BlogArticleBody.tsx`
- `src/components/content/BlogTableOfContents.tsx`
- `src/components/content/BlogSources.tsx`
- `src/components/content/BlogProductDiscoveryCard.tsx`

### Routes and integration

- `src/app/page.tsx` displays the three featured guides.
- `src/app/blog/page.tsx` renders the editorial landing experience.
- `src/app/blog/[slug]/page.tsx` renders published article pages.

## Editorial rules

1. The blog provides general education, not diagnosis, treatment, or individualized medical advice.
2. Health statements must be traceable to an authoritative source in the article's source set.
3. Diagnostic values must name the framework that defines them.
4. Product discovery must remain visually and editorially separate from medical guidance.
5. Product names and storefront categories are not evidence of treatment effects.
6. Articles must never tell readers to stop, delay, replace, or adjust prescribed treatment.
7. Readers must be directed to qualified guidance when pregnancy, nursing, medication, or a medical condition affects supplement or herbal-product decisions.
8. Draft notes, unsupported claims, and internal confirmation fields must not render publicly.
9. Publication dates must represent actual publication; material medical revisions require an `updatedAt` date.
10. Sources must be reviewed again when an article's medical or safety guidance changes.

## Medical reference decisions

### Blood pressure

- WHO is the primary global clinical reference.
- WHO describes hypertension as readings of at least `140/90 mmHg` on two different days.
- The AHA classification is shown as a separately named framework: normal below `120/80`, elevated systolic `120–129` with diastolic below `80`, Stage 1 `130–139` or `80–89`, and Stage 2 at least `140` or `90`.
- One home reading must not be presented as a diagnosis.
- Urgent-care guidance must use local medical help rather than a United States emergency number.

Sources:

- [WHO — Hypertension](https://www.who.int/news-room/fact-sheets/detail/hypertension)
- [American Heart Association — Understanding Blood Pressure Readings](https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings)

### Blood glucose and HbA1c

- Fasting glucose: normal `99 mg/dL` or below, prediabetes `100–125 mg/dL`, and diabetes `126 mg/dL` or above.
- HbA1c: normal below `5.7%`, prediabetes `5.7–6.4%`, and diabetes `6.5%` or above.
- CDC does not define general normal or prediabetes categories for a random glucose test.
- A random result of `200 mg/dL` or above requires clinical interpretation.
- Diagnostic results and personal treatment targets require professional guidance.

Source:

- [CDC — Diabetes Testing](https://www.cdc.gov/diabetes/diabetes-testing/index.html)

### Detox and cleansing

- Commercial detox and cleanse programs have limited supporting evidence and may introduce risks.
- Tea, fasting, juice, laxatives, and supplements must not be described as removing toxins or cleansing organs.
- Hydration, balanced meals, fibre-containing foods, sleep, and movement may be discussed as sustainable general wellness practices.

Source:

- [NCCIH — “Detoxes” and “Cleanses”: What You Need To Know](https://www.nccih.nih.gov/health/detoxes-cleanses)

### Immunity

- Adequate nutrition supports normal immune function.
- Foods, vitamins, herbs, tea, and Viesta products must not be described as preventing or treating infections without product-specific evidence and approved wording.
- Avoid promises to “boost” immunity or guarantee resilience.

Sources:

- [NIH Office of Dietary Supplements — Dietary Supplements for Immune Function and Infectious Diseases](https://ods.od.nih.gov/factsheets/ImmuneFunction-HealthProfessional/)
- [WHO — Self-care for Health and Well-being](https://www.who.int/news-room/fact-sheets/detail/self-care-health-interventions/)

### Joint mobility

- General discomfort must be distinguished from osteoarthritis, inflammatory disease, injury, infection, and other causes.
- Gentle movement, strengthening, and low-impact activity may be discussed using NIAMS guidance.
- Products must not be described as treating arthritis, repairing cartilage, reducing inflammation, or relieving pain without approved evidence.

Source:

- [NIAMS — Osteoarthritis: Diagnosis, Treatment, and Steps to Take](https://www.niams.nih.gov/health-topics/osteoarthritis/diagnosis-treatment-and-steps-to-take)

### Women's wellness

- The article covers broadly applicable nutrition, sleep, movement, self-care, and professional assessment.
- Fatigue, menstrual changes, mood changes, or weight changes must not be used to diagnose “hormonal imbalance.”
- Products must not be described as balancing hormones, treating PMS, supporting fertility, correcting deficiencies, or restoring energy without verified evidence.

Sources:

- [WHO — Self-care for Health and Well-being](https://www.who.int/news-room/fact-sheets/detail/self-care-health-interventions/)
- [WHO — Healthy Diet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet)
- [WHO — Physical Activity](https://www.who.int/news-room/fact-sheets/detail/physical-activity)

### Men's wellness and prostate awareness

- Prostate changes become more common with age, but urinary symptoms can have several causes.
- New or changing symptoms require professional assessment.
- Prostate screening is presented as an informed decision to discuss with a clinician.
- Products must not be described as treating, shrinking, protecting, or preventing a prostate condition without verified evidence.

Sources:

- [National Cancer Institute — Understanding Prostate Changes and Conditions](https://www.cancer.gov/types/prostate/understanding-prostate-changes)
- [National Cancer Institute — Prostate Cancer Screening](https://www.cancer.gov/types/prostate/patient/prostate-screening-pdq)

### Herbal tea

- Tea is presented as a beverage and routine, not a therapy.
- Ingredients and preparation instructions must come from a confirmed label.
- Herbal products can cause side effects and interact with medicines.
- Evidence about one herb must not be transferred automatically to another herb, blend, or finished product.

Sources:

- [NCCIH — Herbs at a Glance](https://www.nccih.nih.gov/health/herbsataglance)
- [NCCIH — Herb-Drug Interactions](https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions)

## Product-claim boundary

The inventory confirms product names, categories, formats, pack sizes, images, minimum order quantities, and prices. It does not currently provide confirmed ingredients, complete directions, contraindications, clinical evidence, or approved health claims.

Articles may:

- Link to a relevant product or storefront category.
- State a confirmed product name and format.
- Ask readers to verify the label and seek professional guidance when appropriate.

Articles must not state or imply that:

- Bio1 Sterol improves circulation or lowers blood pressure.
- Bio1 Gluco balances blood glucose or manages diabetes.
- Bio2 products remove toxins, cleanse organs, or produce weight loss.
- Bio1 Immune Booster prevents illness or boosts immune response.
- BioRelief treats arthritis, inflammation, pain, or cartilage damage.
- Bio Metabalance balances hormones or treats PMS.
- BioForge treats or supports a prostate condition.
- Any herbal tea is a therapy or substitute for medical care.

`Bio Pawa`/`BioPawa` appeared in the original brief but is not in the confirmed inventory and must not be published or linked. The confirmed joint-and-mobility range is BioRelief, BioRelief Plus, and BioRelief Cream, subject to the same claim restrictions.

## Customer-story gate

The proposed Josephine, Charles, and Grace stories are not published. A customer story requires:

- Verified identity and genuine experience.
- Written permission for the name, quotation, photograph, and publication channels.
- Approval of the exact final wording.
- Wording that does not promise typical results or imply an unsupported medical outcome.
- Accurate product-use details consistent with approved label wording.
- A process for withdrawal or correction.

Fictional, composite, or AI-generated testimonials must not replace missing evidence.

## Required disclaimer

Every educational article displays this shared disclaimer as an informational callout:

> This article provides general wellness information and is not medical advice. It does not diagnose, treat, cure, or prevent any disease and does not replace care from a qualified healthcare professional. Ask a qualified professional before using supplements or herbal products if you have a medical condition, take medication, are pregnant, or are nursing.

## Images

All published covers are stored in `public/images/blog/` and use:

- WebP format
- `1600 × 1000` dimensions
- 16:10 aspect ratio
- Landscape orientation
- Article-specific alternative text

Current covers:

- `blood-pressure-awareness.webp`
- `daily-immunity-support.webp`
- `detoxing-the-right-way.webp`
- `diabetes-wellness.webp`
- `herbal-tea-wellness.webp`
- `joint-mobility-wellness.webp`
- `mens-wellness.webp`
- `womens-wellness.webp`

The retired `nutrition.webp`, `fitness.webp`, and `wellness.webp` files must not be reintroduced.

## SEO

The blog index provides canonical, Open Graph, and Twitter metadata.

Published article pages provide:

- Canonical URLs
- Index/follow rules
- Article Open Graph metadata
- Twitter summary cards
- Publication and revision dates
- Article-specific social images
- `BlogPosting` JSON-LD using absolute production URLs

SEO helpers are centralized in `src/lib/blog-seo.ts`, and JSON-LD is safely serialized by `src/components/seo/JsonLd.tsx`.

## Test coverage

Blog-specific coverage includes:

- `src/__tests__/blog-data.test.ts`
- `src/__tests__/blog-rendering.test.tsx`
- `src/__tests__/blog-seo.test.tsx`
- Blog filtering coverage in `src/__tests__/editorial-responsive.test.tsx`

The tests validate publication inventory, unique slugs and anchors, cover existence, sources, read times, table shape, product links, draft exclusion, semantic rendering, accessible tables, table-of-contents links, source links, metadata, structured data, and JSON-LD escaping.

## Production launch requirements

Before the blog is treated as production-ready:

1. Run the targeted blog tests and full project test suite.
2. Run the type check, lint, formatting check, and production build.
3. Review the homepage, blog index, and article pages at mobile, tablet, and desktop sizes.
4. Keyboard-test filters, tables, contents links, sources, cards, and WhatsApp actions.
5. Validate deployed article pages with a structured-data testing tool.
6. Confirm `https://viesta.co.ke` is the correct canonical production domain.
7. Obtain qualified Kenyan clinical review of the final article copy.
8. Supply confirmed product labels and regulatory documentation before approving stronger product wording.

Outstanding product evidence includes:

- Clear product-label images or authoritative label copies
- Complete ingredient quantities
- Confirmed directions and warnings
- Evidence supporting any proposed health claim
- Applicable Kenyan registration or approval documentation
- Exact approved marketing wording

No regulatory approval or compliant health-claim status is inferred from product names, inventory categories, or draft storefront descriptions.

## Recommended verification commands

Run from `/home/camline/Documents/Projects/Viesta`:

```bash
npm test -- src/__tests__/blog-data.test.ts src/__tests__/blog-rendering.test.tsx src/__tests__/blog-seo.test.tsx src/__tests__/editorial-responsive.test.tsx
npm test
npm run type-check
npm run lint
npm run format:check
npm run build
```
