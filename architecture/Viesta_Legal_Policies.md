# Viesta Legal Policies Architecture

**Business:** Viesta Health Nutrition  
**Market:** Kenya  
**Public storefront brand:** Viesta Nutrition
**Production hosting:** Vercel  
**Document status:** Approved business-policy specification; legal wording remains subject to qualified Kenyan legal review  
**Last updated:** 2026-07-15

## 1. Purpose

This document is the single decision and governance source for Viesta's three customer-facing policy pages:

- Returns & Refund Policy (`/returns-refund-policy`)
- Privacy Policy (`/privacy-policy`)
- Terms of Service (`/terms-of-service`)

It records approved business rules, data flows, shared terminology, implementation boundaries, open legal-review items, and acceptance criteria. Customer-facing copy remains owned by `src/data/legal.ts`; route components must not contain independent or conflicting policy rules.

This document is not legal advice or evidence of legal approval. Final customer-facing wording must be reviewed against applicable Kenyan law by a qualified legal professional before it is treated as legally approved.

## 2. Policy authority and naming

### 2.1 Contracting business

The legal business name used in contracts, policies, privacy-controller disclosures, and formal customer notices is:

> Viesta Health Nutrition

### 2.2 Public brand naming

The approved public storefront brand is **Viesta Nutrition**. The legacy `Viesta Health Shop` name must not appear in customer-facing application content. Wherever a legal obligation, contract, data-controller identity, copyright notice, or formal policy contact is stated, the copy must identify **Viesta Health Nutrition**.

Shared site data owns both names: `siteContent.name` contains the public brand and `siteContent.legalName` contains the registered business name. Application content should reference the appropriate shared value instead of introducing another literal naming variant.

### 2.3 Market and governing law

- The storefront sells and delivers within Kenya at launch.
- Prices are displayed in Kenya shillings (KES).
- Kenyan law governs the Terms of Service, subject to legal review.
- The policies must preserve non-excludable consumer and data-subject rights under applicable Kenyan law.

## 3. Storefront and order model

Viesta is a static Next.js storefront with a browser-side cart and WhatsApp order handoff. The website does not currently process payment or submit an order to a Viesta-owned backend.

The intended order lifecycle is:

1. The customer browses products and adds products to a browser-side cart.
2. The customer enters contact and delivery details in the checkout interface.
3. The website prepares a WhatsApp message containing the order and customer-supplied details.
4. The customer chooses whether to open WhatsApp and send that message.
5. Sending a WhatsApp inquiry or order request does not, by itself, create an accepted order.
6. Viesta confirms product availability, final price, delivery terms, payment instructions, and acceptance through WhatsApp.
7. Payment is made using the M-Pesa details confirmed by Viesta.
8. Viesta confirms payment and coordinates dispatch and delivery.

Customer-facing Terms and checkout copy must describe this lifecycle consistently. They must not imply that clicking the WhatsApp button completes a purchase or guarantees stock.

## 4. Returns and refunds policy specification

### 4.1 Scope

The policy applies to products purchased directly from Viesta Health Nutrition and delivered within Kenya. The customer must provide sufficient order and payment information for Viesta to identify the purchase.

### 4.2 Eligibility matrix

| Situation | Eligible outcome | Reporting deadline | Return-cost responsibility |
| --- | --- | --- | --- |
| Product arrives visibly damaged | Review for replacement or refund | Within 48 hours of delivery | Viesta |
| Incorrect product supplied | Review for replacement or refund | Within 48 hours of delivery | Viesta |
| Item missing from the delivered order | Review for delivery, replacement, or refund | Within 48 hours of delivery | Viesta |
| Product is expired when delivered | Review for replacement or refund | Within 7 days of delivery | Viesta |
| Product has a defect not reasonably visible at delivery | Review for replacement or refund | Within 7 days of delivery | Viesta, when eligibility is confirmed |
| Customer changes their mind | Not eligible | Not applicable | Not applicable |
| Customer damages or improperly stores the product after delivery | Not eligible | Not applicable | Customer |
| Opened product without a qualifying defect or delivery issue | Not eligible | Not applicable | Customer |

The treatment of a product that had to be opened to discover a defect must be determined reasonably from the facts and must not override statutory consumer rights. Final legal wording for this exception requires counsel review.

### 4.3 Condition and evidence

An eligible return should retain, where reasonably possible:

- The original product and packaging
- Seals, labels, accessories, and supplied materials
- The customer's order details
- M-Pesa payment confirmation
- Photographs or other evidence reasonably needed to show damage, expiry, incorrect supply, missing contents, or a defect

An opened product is generally ineligible unless the return concerns a qualifying defect, expiry issue, incorrect supply, or another right that cannot lawfully be excluded.

### 4.4 Remedies

- Viesta first verifies the reported issue and eligibility.
- A suitable replacement is the preferred remedy where stock and circumstances allow.
- If replacement is unavailable or inappropriate, Viesta issues a refund through the original payment method.
- Store credit may only be used when the customer expressly agrees to it.
- These operational remedies must not restrict a remedy available under applicable law.

### 4.5 Refund timing

An approved refund must be initiated through the original payment method within **7 business days** after eligibility is confirmed. Customer-facing wording should explain that completion time may also depend on the payment provider, without weakening Viesta's obligation to initiate the refund on time.

### 4.6 Cancellations

- A customer may request cancellation before dispatch.
- Viesta should confirm whether cancellation remains possible and whether payment has already been made.
- After dispatch, a request is governed by the returns eligibility rules rather than treated as an automatic cancellation.
- A change of mind after dispatch is not an eligible return reason under the approved business policy.

### 4.7 Return channels

Returns and cancellation requests begin through:

- WhatsApp: the confirmed business WhatsApp number in `src/data/site.ts`
- Phone: the confirmed business phone number in `src/data/site.ts`

The policy should ask customers not to send products back before Viesta confirms the return instructions.

### 4.8 Out of scope

Promotional-bundle return rules are not included at launch. If bundles are introduced, their eligibility and partial-return rules must be approved and added here before related promotions are published.

## 5. Privacy policy specification

### 5.1 Data controller

The data-controller identity stated in the Privacy Policy is:

> Viesta Health Nutrition

Privacy questions and data-rights requests use:

> viestaltd@gmail.com

The final policy must also display the confirmed business phone/WhatsApp contact and physical address from `src/data/site.ts` where appropriate.

### 5.2 Current website data flow

The current storefront operates as follows:

1. Cart product identifiers and quantities are stored in the customer's browser using `localStorage` under the key `viesta-cart`.
2. Checkout fields are held in browser-side React state while the customer uses the page.
3. Contact-form fields are held in browser-side React state while the customer uses the page.
4. The site builds a WhatsApp URL containing the customer-entered message.
5. Viesta does not receive the prepared information unless the customer chooses to open WhatsApp and send the message.
6. Once sent, the information is processed through WhatsApp/Meta and becomes available to Viesta in the business conversation.
7. M-Pesa independently retains transaction information under its applicable terms and legal obligations.

The Privacy Policy and checkout microcopy must not claim that Viesta stores no customer data. WhatsApp conversations, M-Pesa transactions, and operational delivery communications create records even though the website has no customer database.

### 5.3 Information categories

Depending on what a customer provides, Viesta may process:

- Full name
- Phone number
- Delivery location
- Optional address or landmark
- Ordered products and quantities
- Optional order notes
- Inquiry type and inquiry message
- WhatsApp conversation history
- M-Pesa confirmation or transaction information
- Delivery and issue-resolution communications

Viesta does not knowingly collect information directly from minors through the storefront.

### 5.4 Approved purposes

Customer information may be used to:

- Respond to product and service inquiries
- Prepare, verify, and confirm orders
- Confirm payment
- Coordinate delivery
- Handle cancellations, returns, refunds, and complaints
- Maintain records required by applicable accounting, tax, consumer-protection, or other legal obligations
- Protect customers, Viesta, and the ordering channel from fraud or misuse

Customer information must not be used for promotional or educational WhatsApp marketing at launch.

### 5.5 Third parties

The approved or necessary launch providers are:

| Provider | Role | Information involved |
| --- | --- | --- |
| WhatsApp / Meta | Customer communication and order handoff | Information the customer sends in WhatsApp |
| Vercel | Production website hosting | Technical request and service logs handled by the hosting platform |
| M-Pesa provider | Payment and payment confirmation | Transaction and account information handled by the payment provider |

Viesta performs deliveries itself at launch and does not currently disclose delivery information to an external courier.

No Google Analytics, Meta Pixel, TikTok Pixel, advertising pixel, CRM, email-marketing platform, or separate customer database is approved for launch. Adding any such provider requires a privacy-impact review, an update to this document, corresponding customer-facing disclosure, and any required consent mechanism before activation.

### 5.6 Retention schedule

| Record | Approved retention rule |
| --- | --- |
| Incomplete WhatsApp inquiries | Delete within 30 days after the last activity |
| Completed-order WhatsApp conversations | Delete within 30 days after delivery or final issue resolution |
| Browser cart | Remains in the customer's browser until cleared by the customer, application behavior, or browser storage controls |
| Financial, payment, tax, or accounting records | Retain only for the period required by applicable Kenyan law and legitimate accounting obligations |
| Marketing contacts | None maintained at launch |

Where a legal obligation, active dispute, fraud investigation, refund, or unresolved complaint requires longer retention, the relevant information may be retained only for as long as that purpose reasonably requires. Final statutory periods must be validated with Kenyan legal and accounting advisers.

### 5.7 Security controls

The operational baseline is:

- Two-factor authentication on the business WhatsApp account
- Access limited to authorized business devices and people
- Device screen locks and reasonable account-password controls
- Prompt removal of access from lost, replaced, or unauthorized devices
- Deletion according to the approved retention schedule
- No unnecessary copying of customer details into spreadsheets, notebooks, CRMs, or cloud-storage records

The final Privacy Policy should describe safeguards proportionately and must not promise absolute security.

### 5.8 Data-subject rights

The final policy must explain how a person can request information about the use of their data and exercise applicable access, objection, correction, and deletion rights. It must also explain that some records may need to be retained where required by law or for an active legal claim.

Any ODPC registration or notification obligation remains a compliance matter for qualified Kenyan advisers. Omitting it from marketing copy does not remove the business's obligation to assess and comply with applicable requirements.

## 6. Terms of Service specification

### 6.1 Eligibility and territory

- The storefront is intended for customers ordering within Kenya.
- A person entering into an order contract must be at least 18 years old.
- A parent or guardian is responsible for purchasing and supervising any product intended for a minor, subject to product labels and qualified healthcare advice.

### 6.2 Product information and wellness disclaimer

- Product and editorial information is provided for general wellness education and product comparison.
- It is not medical diagnosis, treatment, or a substitute for advice from a qualified healthcare professional.
- Customers must read and follow the supplied product label, ingredients, directions, warnings, and storage instructions.
- Customers should obtain professional advice before use where pregnancy, breastfeeding, allergies, medication, an existing condition, or use by a minor is relevant.
- Product images and packaging may change, but the delivered product must remain accurately identified and legally supplied.

These statements do not excuse inaccurate product descriptions, unsafe products, misleading claims, or other obligations that cannot legally be excluded.

### 6.3 Prices and availability

- Displayed product prices are retail prices in KES.
- Delivery charges are shown or confirmed separately.
- A displayed product or price does not guarantee availability or acceptance of an order.
- Viesta may correct genuine stock or price errors before accepting an order.
- Viesta may reject or cancel an order because of unavailable stock, an evident price error, suspected fraud, delivery limitations, or legal/product restrictions.
- If Viesta cancels an accepted and paid order, any amount due back to the customer must be refunded through the appropriate process.

The Terms must not describe prices as tax-free. Tax treatment is an internal compliance matter and displayed prices should be described only as the retail amount payable for the product, excluding separately stated delivery charges.

### 6.4 Order formation

The contract-formation rule is:

> Sending a WhatsApp order request is an invitation for Viesta to review the requested order. An order is accepted only after Viesta confirms product availability, final price, delivery terms, payment instructions, and acceptance through WhatsApp.

The checkout interface gives the customer an opportunity to review and correct their order and customer details before proceeding to WhatsApp. It requires explicit Terms of Service agreement and Privacy Policy acknowledgement, links to all three policies, and includes the acknowledgement in the prepared message when the customer sends it.

### 6.5 Payment and stock reservation

- M-Pesa Paybill/Till details are confirmed privately through WhatsApp at launch.
- The customer should not pay using unverified details or before Viesta confirms the order and payment instructions.
- Payment timing and any unpaid-stock reservation period are communicated during order confirmation.
- Stock is not reserved indefinitely unless Viesta expressly agrees otherwise.
- Final public Paybill/Till details require a separate approved update to site data, checkout copy, these policies, and operational guidance.

### 6.6 Dispatch, delivery, and risk

- Dispatch and delivery estimates depend on the customer's location, product availability, and the agreement confirmed through WhatsApp.
- Estimates are not guarantees where delay results from circumstances outside reasonable control, but Viesta must communicate material known delays.
- Responsibility for the product passes to the customer when the order is handed to the customer or an authorized recipient at the agreed location.
- A customer must provide accurate, complete, and reachable delivery information.
- If delivery cannot be completed because the customer is unavailable, unreachable, or provides incomplete information, Viesta will contact the customer to agree on another attempt and disclose any reasonable additional delivery charge before proceeding.

The failed-delivery rule remains necessary even though customers initiate contact through WhatsApp; availability and location problems can still occur after order confirmation.

### 6.7 Returns and cancellations

The Terms must summarize and link to the Returns & Refund Policy rather than reproduce a conflicting version. The Returns & Refund Policy controls the detailed eligibility, evidence, timing, remedy, and return-delivery rules.

### 6.8 Intellectual property

Viesta confirms that it owns or has permission to use the product images, brand assets, descriptions, articles, and testimonials published through the storefront. The Terms should reserve the applicable rights while allowing customers normal personal use of the site.

### 6.9 Third-party services

WhatsApp, Vercel, and M-Pesa operate under their own services and terms. The Terms and Privacy Policy must explain their roles without attempting to disclaim Viesta's own responsibilities.

### 6.10 Disputes and governing law

The intended escalation path is:

1. Contact Viesta support through the published phone, WhatsApp, or email channel.
2. Attempt good-faith negotiation and issue resolution.
3. Use mediation where appropriate and agreed or legally required.
4. Refer unresolved disputes to the courts or other competent bodies in Kenya.

The Terms are governed by Kenyan law. Nothing in them should prevent a customer from using a regulator, tribunal, court, or remedy available under applicable law.

## 7. Cross-page consistency contract

The following statements must remain aligned everywhere they appear:

| Subject | Authoritative rule |
| --- | --- |
| Legal business | Viesta Health Nutrition |
| Ordering channel | Website prepares a WhatsApp order request |
| Contract formation | Only after Viesta confirms and accepts the order through WhatsApp |
| Payment | M-Pesa details confirmed privately through WhatsApp at launch |
| Market | Kenya only at launch |
| Customer age | Contracting customer is 18 or older |
| Returns | Qualifying damage, defect, expiry, missing item, or incorrect supply; no change-of-mind returns |
| Refund initiation | Original payment method within 7 business days after approval |
| Marketing | No promotional or educational WhatsApp marketing at launch |
| Analytics | None approved at launch |
| Delivery | Viesta performs delivery directly at launch |
| Medical claims | General wellness information; not diagnosis or treatment |

Phase 4 must reconcile these rules in:

- `src/data/site.ts`
- `src/data/faqs.ts`
- `src/app/about/page.tsx`
- `src/app/checkout/page.tsx`
- `src/components/checkout/CheckoutForm.tsx`
- `src/components/checkout/CheckoutView.tsx`
- `src/components/checkout/OrderSummary.tsx`
- `src/components/contact/WhatsAppInquiryForm.tsx`
- Homepage and Blog WhatsApp-update calls to action
- Footer identity and legal links
- Repository documentation

## 8. Content and component ownership

| Concern | Owner |
| --- | --- |
| Approved decisions and governance | `architecture/Viesta_Legal_Policies.md` |
| Customer-facing legal content | `src/data/legal.ts` |
| Legal content types | `src/types/content.ts` |
| Shared legal presentation | `src/components/content/LegalPageLayout.tsx` |
| Route metadata and canonical URLs | Individual legal route `page.tsx` files |
| Contact, payment, and site identity data | `src/data/site.ts` |
| Customer-facing summary answers | `src/data/faqs.ts` |

Route files should remain thin and must not duplicate substantive policy rules. The implementation should use structured TypeScript content rather than add a Markdown runtime or another content dependency.

## 9. Planned implementation phases

### Phase 1 — Policy architecture and decisions

Status: **Complete; user approved on 2026-07-15**

- Establish this source-of-truth document.
- Record business identity, Vercel hosting, retention periods, refund timing, and all approved policy decisions.
- Identify legal-review boundaries and cross-page dependencies.

### Phase 2 — Typed legal content

Status: **Complete; user approved progression on 2026-07-15**

- [x] Extend the legal content type for summaries, dates, multiple paragraphs, lists, stable section IDs, contacts, and related links.
- [x] Author the three complete customer-facing policies from this specification.
- [x] Preserve visible review status until content approval.
- [x] Add focused model, business-rule, and basic rendering tests without running them.
- [x] User approved progression from the Phase 2 model and policy drafts on 2026-07-15.

### Phase 3 — Shared legal-page experience

Status: **Complete; user approved progression on 2026-07-15**

- [x] Update the shared legal layout with a page-level heading and clear draft status.
- [x] Add accessible page navigation, structured sections, related-policy links, and contact guidance.
- [x] Add route descriptions, canonical URLs, and temporary `noindex` directives while legal review is pending.
- [x] Preserve a restrained, readable warm botanical presentation across mobile and desktop layouts.
- [x] Update focused rendering assertions without running the test suite.
- [x] User approved progression from the Phase 3 legal-page experience on 2026-07-15.

### Phase 4 — Store-wide integration

Status: **Complete; user approved progression on 2026-07-15**

- [x] Add required checkout acknowledgement and links to all three policies.
- [x] Explain the browser-to-WhatsApp data handoff in checkout and contact forms.
- [x] Align checkout, WhatsApp messages, FAQs, payment wording, and order-acceptance wording.
- [x] Separate the Viesta Nutrition public brand from the Viesta Health Nutrition legal entity.
- [x] Reconcile About-page naming and remove unsupported sourcing and effectiveness claims.
- [x] Remove promotional WhatsApp-update calls to action because marketing use is not approved.
- [x] Add or update focused validation, checkout, and WhatsApp-message tests without running them.
- [x] User approved progression from the Phase 4 store-wide integration on 2026-07-15.

### Phase 5 — Documentation and acceptance

Status: **Implemented; awaiting user-run verification, legal review, and final acceptance**

- [x] Reconcile architecture, About, Blog, design, SEO, PRD, and README documentation.
- [x] Document the public brand/legal identity split and privacy-safe launch measurement position.
- [x] Prepare targeted and full automated verification commands without running them.
- [ ] User completes targeted tests, full tests, type checking, linting, formatting, and production build.
- [ ] User completes responsive, accessibility, policy-link, content-consistency, WhatsApp, and print review.
- [ ] Qualified Kenyan legal review is obtained before legal approval is claimed.
- [ ] Policy effective dates are set and temporary legal-page `noindex` directives are removed after approval.
- [ ] User provides final acceptance after verification and legal-review requirements are satisfied.

## 10. Phase 1 acceptance checklist

- [x] Registered business name recorded as Viesta Health Nutrition.
- [x] Kenya-only launch market recorded.
- [x] Vercel recorded as the production hosting provider.
- [x] Seven-day returns request window recorded.
- [x] Forty-eight-hour visible delivery-issue reporting window recorded.
- [x] Refund initiation within seven business days recorded.
- [x] Privacy retention schedule recorded.
- [x] No analytics or advertising pixels approved at launch.
- [x] No promotional or educational WhatsApp marketing approved at launch.
- [x] WhatsApp order-acceptance lifecycle recorded.
- [x] M-Pesa confirmation remains private through WhatsApp at launch.
- [x] Terms acknowledgement identified for Phase 4.
- [x] Legal review boundary documented.
- [x] User reviewed and approved this Phase 1 document on 2026-07-15.
- [ ] Qualified Kenyan legal review has been completed; required before legal approval, not before technical drafting.

## 11. Change-control rules

Any future change to analytics, advertising, hosting, payment processing, delivery providers, customer-data storage, marketing, return eligibility, refund timing, market coverage, or contract formation must follow this order:

1. Update and approve this architecture document.
2. Assess legal and privacy implications.
3. Update typed policy content.
4. Update affected checkout, contact, FAQ, and site copy.
5. Add or update tests proportionate to the change.
6. Complete user-run automated and browser verification.
7. Record the new effective and last-updated dates.

No implementation should silently diverge from the authoritative rules in this document.

## 12. Phase 5 verification handoff

All commands must be run by the user from:

```text
/home/camline/Documents/Projects/Viesta
```

Run the fastest targeted checks first:

```bash
npm test -- src/__tests__/legal-content.test.tsx src/__tests__/validation.test.ts src/__tests__/commerce-responsive.test.tsx src/__tests__/whatsapp.test.ts
npm run type-check
npm run format:check
npm run lint
```

Then run the full suite and production build:

```bash
npm test
npm run build
```

Manual acceptance must cover:

- `/returns-refund-policy`, `/privacy-policy`, and `/terms-of-service` at 320px, tablet, laptop, and wide desktop widths.
- Page-level headings, draft status, effective-date state, table-of-contents anchors, contact links, related-policy links, keyboard focus, long-text wrapping, and print preview.
- Checkout with missing fields, missing policy acknowledgement, complete valid details, and the prepared WhatsApp message.
- Confirmation that the order-request button remains blocked until validation passes.
- Confirmation that the sent message records policy acknowledgement and requests availability, total, delivery, payment, and acceptance confirmation.
- Contact-form privacy notice and WhatsApp handoff behavior.
- Homepage, Blog index, and Blog article endings, confirming that no promotional WhatsApp subscription remains.
- About-page public naming, conservative claims, founder details, and image permission.
- Footer legal identity and all legal links.
- Mobile WhatsApp behavior on a real device before launch.

The implementation must remain described as **awaiting verification** until the user supplies successful results.

## 13. Legal-review and release handoff

Qualified Kenyan legal review should validate at least:

- The registered entity and data-controller identity.
- Internet-order disclosure, review, correction, acceptance, cancellation, and copy/record requirements.
- Returns eligibility, reporting periods, opened-product treatment, remedies, delivery costs, and refund timing.
- Privacy purposes, lawful bases, rights handling, provider disclosures, international processing, retention, security wording, and any ODPC registration obligation.
- Product and medical-information disclaimers.
- Payment, delivery, failed-delivery, risk-transfer, liability, dispute, and governing-law clauses.
- The checkout acknowledgement wording and the WhatsApp conversation record.

After approved legal wording is supplied:

1. Apply counsel-required changes to this document and `src/data/legal.ts`.
2. Set each policy's `reviewStatus` to `legally-approved`.
3. Set approved `effectiveDate` and `updatedAt` values.
4. Remove resolved legal-review confirmation flags and the public warning state.
5. Remove the temporary route-level `noindex` directives only when indexing is approved.
6. Re-run every targeted and full verification command.
7. Repeat the legal-page, checkout, WhatsApp, accessibility, responsive, and print review.
8. Record final user acceptance and release date in this document.

Until those steps are complete, the policies are business-approved drafts and must not be described as legally approved or fully launch-ready.
