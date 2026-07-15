import type { LegalPage } from "@/types/content";
import { siteContent } from "@/data/site";

const reviewStatus = "business-approved-legal-review-pending" as const;
const updatedAt = "2026-07-15";
const needsLegalReview = ["qualified Kenyan legal review"];

export const legalPages: LegalPage[] = [
  {
    slug: "returns-refund-policy",
    title: "Returns & Refund Policy",
    summary:
      "How Viesta Health Nutrition handles damaged, defective, expired, missing, or incorrectly supplied products.",
    effectiveDate: null,
    updatedAt,
    reviewStatus,
    contactChannels: ["phone", "whatsapp"],
    relatedPolicies: ["terms-of-service", "privacy-policy"],
    needsConfirmation: needsLegalReview,
    sections: [
      {
        id: "scope",
        heading: "Scope",
        paragraphs: [
          "This policy applies to products purchased directly from Viesta Health Nutrition and delivered within Kenya. It explains the operational process for reporting and resolving damaged, defective, expired, missing, or incorrectly supplied products.",
          "This policy does not limit any consumer right or remedy that cannot lawfully be excluded under Kenyan law.",
        ],
      },
      {
        id: "eligible-returns",
        heading: "Eligible returns",
        paragraphs: [
          "Viesta will review a return request when the order can be identified and the reported issue falls within the applicable reporting period.",
        ],
        items: [
          "A product that arrived visibly damaged, reported within 48 hours after delivery.",
          "An incorrect product supplied by Viesta, reported within 48 hours after delivery.",
          "An item missing from the delivered order, reported within 48 hours after delivery.",
          "A product that was expired when delivered, reported within 7 days after delivery.",
          "A product with a defect that was not reasonably visible at delivery, reported within 7 days after delivery.",
        ],
      },
      {
        id: "ineligible-returns",
        heading: "Ineligible returns",
        paragraphs: [
          "Viesta does not accept returns because a customer changed their mind. A product is also ineligible when it was damaged, improperly used, or improperly stored after delivery.",
          "Opened products are generally ineligible unless opening the product was reasonably necessary to discover a qualifying defect, expiry issue, incorrect supply, or another right that cannot lawfully be excluded.",
        ],
      },
      {
        id: "product-condition",
        heading: "Product condition",
        paragraphs: [
          "Where reasonably possible, keep the product unused, sealed, and in its original packaging while Viesta reviews the request. Keep all supplied labels, seals, accessories, and materials.",
          "Do not send a product back before Viesta confirms that the return is eligible and provides return instructions.",
        ],
      },
      {
        id: "evidence",
        heading: "Information needed",
        paragraphs: [
          "Viesta may request information reasonably needed to identify the order and assess the reported issue.",
        ],
        items: [
          "The customer's order details.",
          "The original product and packaging, where available.",
          "The M-Pesa payment confirmation.",
          "Clear photographs or other evidence showing the damage, expiry, incorrect supply, missing contents, or defect.",
        ],
      },
      {
        id: "request-process",
        heading: "How to request a return",
        paragraphs: [
          "Contact Viesta through the published business phone number or WhatsApp number within the applicable reporting period. Explain the issue and provide the requested order and payment information.",
          "Viesta will review the request, may ask reasonable follow-up questions, and will confirm whether the request is eligible before arranging a return or other remedy.",
        ],
      },
      {
        id: "remedies",
        heading: "Replacements and refunds",
        paragraphs: [
          "Where stock and the circumstances allow, a suitable replacement is the preferred remedy. If replacement is unavailable or inappropriate, Viesta will issue a refund through the original payment method. Store credit will only be used when the customer expressly agrees to it.",
          "The appropriate remedy depends on the verified issue and does not restrict any remedy available under applicable law.",
        ],
      },
      {
        id: "refund-timing",
        heading: "Refund timing",
        paragraphs: [
          "Viesta will initiate an approved refund through the original payment method within 7 business days after return eligibility is confirmed. The payment provider may require additional processing time before the funds appear in the customer's account.",
        ],
      },
      {
        id: "return-costs",
        heading: "Return delivery costs",
        paragraphs: [
          "Viesta will cover reasonable return delivery costs when it confirms that it supplied a damaged, defective, expired, or incorrect product. Viesta will also address reasonable delivery costs for a confirmed missing-item issue.",
        ],
      },
      {
        id: "cancellations",
        heading: "Order cancellations",
        paragraphs: [
          "A customer may ask to cancel an order before dispatch. Viesta will confirm whether cancellation remains possible and explain the refund process if payment has already been made.",
          "After dispatch, a request is assessed under this Returns & Refund Policy. Dispatch does not create a right to return a product merely because the customer changed their mind.",
        ],
      },
      {
        id: "contact",
        heading: "Contact Viesta",
        paragraphs: [
          "Start a return or cancellation request through the phone or WhatsApp details published on the Viesta website. Include enough information for Viesta to identify the order and respond within the applicable reporting period.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "How Viesta Health Nutrition handles information used for inquiries, WhatsApp orders, payment confirmation, and delivery.",
    effectiveDate: null,
    updatedAt,
    reviewStatus,
    contactChannels: ["email", "phone", "whatsapp"],
    relatedPolicies: ["terms-of-service", "returns-refund-policy"],
    needsConfirmation: needsLegalReview,
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        paragraphs: [
          "Viesta Health Nutrition is responsible for deciding how customer information described in this policy is used for its storefront, inquiries, orders, payment confirmation, delivery, and customer support.",
          `Privacy questions and requests may be sent to ${siteContent.contact.email} or through the phone and WhatsApp contact details published on the website.`,
        ],
      },
      {
        id: "information-collected",
        heading: "Information we may collect",
        paragraphs: [
          "The information Viesta handles depends on what a customer chooses to provide and whether an inquiry proceeds to an order.",
        ],
        items: [
          "Full name and phone number.",
          "Delivery location and an optional address or landmark.",
          "Products, quantities, and optional order notes.",
          "Inquiry type and inquiry message.",
          "WhatsApp conversation history.",
          "M-Pesa confirmation or transaction information shared for payment verification.",
          "Delivery, return, refund, complaint, and issue-resolution communications.",
        ],
      },
      {
        id: "website-data-flow",
        heading: "How the website prepares information",
        paragraphs: [
          "The website keeps checkout and contact-form entries in the customer's browser while the relevant page is being used. It prepares a WhatsApp message from the information entered by the customer.",
          "Viesta does not receive that prepared information unless the customer chooses to open WhatsApp and send the message. Once sent, WhatsApp processes the message and makes it available to Viesta in the business conversation.",
        ],
      },
      {
        id: "browser-storage",
        heading: "Cart and browser storage",
        paragraphs: [
          "The storefront uses the browser's local storage to remember cart product identifiers and quantities on the customer's device. This is necessary to preserve the cart between page visits and is not used for advertising or cross-site tracking.",
          "A customer can remove this information by clearing the cart or using the storage controls provided by their browser. Blocking or clearing browser storage may prevent the cart from being remembered.",
        ],
      },
      {
        id: "purposes",
        heading: "Why we use information",
        paragraphs: [
          "Viesta limits its use of customer information to purposes connected with the customer's request, an order, applicable obligations, and reasonable protection of the ordering channel.",
        ],
        items: [
          "Responding to product and service inquiries.",
          "Preparing, verifying, and confirming orders.",
          "Confirming payment and coordinating delivery.",
          "Handling cancellations, returns, refunds, complaints, and support requests.",
          "Keeping records required by applicable accounting, tax, consumer-protection, or other legal obligations.",
          "Preventing or investigating fraud, misuse, and security incidents.",
        ],
      },
      {
        id: "lawful-handling",
        heading: "Basis for handling information",
        paragraphs: [
          "Depending on the circumstances, Viesta handles information to take steps requested by a customer, perform an accepted order, meet a legal obligation, or pursue a legitimate operational or security interest that does not override the customer's rights. Viesta will seek consent where applicable law requires it.",
        ],
      },
      {
        id: "service-providers",
        heading: "Service providers",
        paragraphs: [
          "WhatsApp and Meta support customer communication and the order handoff. Vercel hosts the production website and may process technical request and service-log information. The M-Pesa provider processes payment and transaction information under its own applicable terms and legal obligations.",
          "These providers may process information in locations outside Kenya. Viesta must use providers and safeguards consistent with applicable data-protection requirements and will update this policy if the provider arrangement materially changes.",
          "Viesta performs deliveries itself at launch and does not currently disclose customer delivery details to an external courier.",
        ],
      },
      {
        id: "analytics-and-marketing",
        heading: "Analytics and marketing",
        paragraphs: [
          "Viesta does not use Google Analytics, Meta Pixel, TikTok Pixel, advertising pixels, or similar behavioral-tracking tools at launch.",
          "Viesta does not use inquiry or order details for promotional or educational WhatsApp marketing at launch. A future marketing service or tracking tool will require an appropriate privacy review, updated disclosure, and consent mechanism before activation.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep information",
        paragraphs: [
          "Viesta keeps information only for as long as reasonably needed for the purpose described below, unless a legal obligation, active dispute, fraud investigation, refund, or unresolved complaint requires longer retention.",
        ],
        items: [
          "Incomplete WhatsApp inquiries are deleted within 30 days after the last activity.",
          "Completed-order WhatsApp conversations are deleted within 30 days after delivery or final issue resolution.",
          "Cart information remains in the customer's browser until cleared through the cart, application behavior, or browser controls.",
          "Financial, payment, tax, or accounting records are retained only for the period required by applicable Kenyan law and legitimate accounting obligations.",
          "Viesta does not maintain marketing-contact records at launch.",
        ],
      },
      {
        id: "security",
        heading: "How we protect information",
        paragraphs: [
          "Viesta uses proportionate safeguards including two-factor authentication for the business WhatsApp account, access limited to authorized people and devices, device screen locks, reasonable account controls, and deletion under the retention schedule.",
          "Viesta avoids unnecessary copying of customer details into spreadsheets, notebooks, customer-management systems, or cloud-storage records. No transmission or storage method can be guaranteed to be completely secure.",
        ],
      },
      {
        id: "rights",
        heading: "Your data-protection rights",
        paragraphs: [
          "Subject to applicable Kenyan law, a person may ask to be informed about the use of their personal data, request access, object to certain processing, request correction of inaccurate or misleading data, or request deletion where applicable.",
          "Some information may need to be retained where the law requires it or while a payment issue, complaint, dispute, fraud concern, or legal claim remains active. Viesta will explain the applicable reason when responding to a request.",
          "A person may also raise a concern with Kenya's Office of the Data Protection Commissioner where that right is available.",
        ],
      },
      {
        id: "children",
        heading: "Children's information",
        paragraphs: [
          "The storefront is not intended to form order contracts with children, and Viesta does not knowingly collect information directly from minors. A parent or guardian should contact Viesta if they believe a minor has supplied personal information without appropriate involvement.",
        ],
      },
      {
        id: "policy-changes",
        heading: "Changes to this policy",
        paragraphs: [
          "Viesta may update this policy when its storefront, providers, data practices, or legal obligations change. The page will show the applicable effective date and last-updated date. A material change will be communicated in an appropriate manner before or when it takes effect where required.",
        ],
      },
      {
        id: "contact",
        heading: "Contact Viesta",
        paragraphs: [
          `Send privacy questions or data-rights requests to ${siteContent.contact.email}. Customers may also use the phone and WhatsApp details published on the Viesta website. Viesta may request reasonable information to verify identity before acting on a request involving personal data.`,
        ],
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    summary:
      "The rules for using the Viesta storefront and requesting products for delivery within Kenya through WhatsApp.",
    effectiveDate: null,
    updatedAt,
    reviewStatus,
    contactChannels: ["email", "phone", "whatsapp"],
    relatedPolicies: ["returns-refund-policy", "privacy-policy"],
    needsConfirmation: needsLegalReview,
    sections: [
      {
        id: "about-these-terms",
        heading: "About these terms",
        paragraphs: [
          "These Terms govern use of the Viesta storefront and orders accepted by Viesta Health Nutrition. By using the storefront or asking Viesta to accept an order, a customer agrees to follow these Terms together with the Returns & Refund Policy and Privacy Policy.",
          "Nothing in these Terms excludes or limits a right or remedy that cannot lawfully be excluded under Kenyan law.",
        ],
      },
      {
        id: "territory-and-age",
        heading: "Territory and customer eligibility",
        paragraphs: [
          "Viesta accepts orders for delivery within Kenya at launch. A person entering into an order contract must be at least 18 years old and able to provide accurate contact, payment, and delivery information.",
          "A parent or guardian is responsible for purchasing and supervising any product intended for a minor, subject to the product label and appropriate professional advice.",
        ],
      },
      {
        id: "wellness-information",
        heading: "Product and wellness information",
        paragraphs: [
          "Product descriptions, articles, and other storefront content provide general wellness education and product-comparison information. They are not medical diagnosis or treatment and do not replace advice from a qualified healthcare professional.",
          "Customers must read and follow the supplied label, ingredients, directions, warnings, expiry information, and storage instructions. Professional advice should be obtained before use where pregnancy, breastfeeding, allergies, medication, an existing condition, or use by a minor is relevant.",
          "Product images and packaging may change, but Viesta remains responsible for accurately identifying and lawfully supplying the delivered product.",
        ],
      },
      {
        id: "prices",
        heading: "Prices and delivery charges",
        paragraphs: [
          "Displayed product prices are retail prices in Kenya shillings. Delivery charges are shown during checkout or confirmed separately through WhatsApp when a location requires an individual quotation.",
          "The final amount is confirmed before an order is accepted. A displayed price or product does not guarantee availability or acceptance.",
        ],
      },
      {
        id: "availability-and-errors",
        heading: "Availability and listing errors",
        paragraphs: [
          "Viesta may correct a genuine product, stock, or price error before accepting an order. Viesta may reject or cancel an order because of unavailable stock, an evident price error, suspected fraud, delivery limitations, or a legal or product restriction.",
          "If Viesta cancels an accepted order after receiving payment, it will return any amount due through the applicable refund process.",
        ],
      },
      {
        id: "placing-an-order",
        heading: "Placing an order",
        paragraphs: [
          "The website allows a customer to review products, quantities, customer details, delivery information, and an estimated total before preparing a WhatsApp message. The customer is responsible for reviewing and correcting that information before sending it.",
          "Sending a WhatsApp message is an order request and does not by itself create an accepted order or guarantee stock.",
        ],
      },
      {
        id: "order-acceptance",
        heading: "When an order is accepted",
        paragraphs: [
          "An order is accepted only after Viesta confirms product availability, the final price, delivery terms, payment instructions, and acceptance through WhatsApp. Any change to the requested products, price, or delivery arrangement must be agreed before acceptance.",
        ],
      },
      {
        id: "payment",
        heading: "Payment",
        paragraphs: [
          "M-Pesa Paybill or Till details are confirmed privately through WhatsApp at launch. Customers should not pay using unverified details or before Viesta confirms the order and payment instructions.",
          "Payment timing and any period for reserving unpaid stock are communicated during order confirmation. Stock is not reserved indefinitely unless Viesta expressly agrees otherwise.",
        ],
      },
      {
        id: "delivery",
        heading: "Dispatch and delivery",
        paragraphs: [
          "Dispatch and delivery estimates depend on the customer's location, product availability, and the arrangement confirmed through WhatsApp. Estimates are not guarantees where delay results from circumstances outside Viesta's reasonable control, but Viesta will communicate material known delays.",
          "Responsibility for the product passes to the customer when the order is handed to the customer or an authorized recipient at the agreed location.",
        ],
      },
      {
        id: "failed-delivery",
        heading: "Unsuccessful delivery",
        paragraphs: [
          "The customer must provide accurate, complete, and reachable delivery information. If delivery cannot be completed because the customer is unavailable, unreachable, or provides incomplete information, Viesta will contact the customer to agree on another attempt.",
          "Any reasonable additional delivery charge must be disclosed and agreed before another charged delivery attempt proceeds.",
        ],
      },
      {
        id: "cancellations-and-returns",
        heading: "Cancellations, returns, and refunds",
        paragraphs: [
          "A customer may ask to cancel before dispatch. After dispatch, eligibility is assessed under the Returns & Refund Policy.",
          "The Returns & Refund Policy contains the detailed reporting periods, evidence requirements, eligibility rules, remedies, return-delivery costs, and refund timing and forms part of these Terms.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "Acceptable use",
        paragraphs: [
          "Customers must not misuse the storefront, interfere with its operation, attempt unauthorized access, submit fraudulent order or payment information, impersonate another person, or use the service for an unlawful purpose.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "Intellectual property",
        paragraphs: [
          "The storefront's Viesta branding, layout, original text, graphics, and other protected material belong to Viesta or are used with permission. Customers may use the storefront for personal shopping and reference but may not reproduce, sell, republish, or commercially exploit protected content without permission or another lawful basis.",
          "Third-party product names, trademarks, images, and materials remain the property of their respective owners.",
        ],
      },
      {
        id: "third-party-services",
        heading: "Third-party services",
        paragraphs: [
          "The storefront relies on Vercel for hosting, WhatsApp and Meta for communication, and M-Pesa for payment services. Those providers operate their own services under their applicable terms and privacy practices.",
          "Viesta is not responsible for an independent provider's systems or availability, but this does not remove Viesta's responsibility for its own conduct, customer commitments, or obligations under applicable law.",
        ],
      },
      {
        id: "responsibility",
        heading: "Responsibility and legal limitations",
        paragraphs: [
          "Viesta remains responsible for obligations that cannot lawfully be excluded. To the extent permitted by law, Viesta is not responsible for loss caused solely by customer misuse, failure to follow supplied instructions, unauthorized alteration of a product, or events outside Viesta's reasonable control.",
          "No wording in these Terms excludes liability or a consumer remedy where such an exclusion would be unlawful, including responsibility arising from fraud, deliberate misconduct, or another non-excludable obligation.",
        ],
      },
      {
        id: "disputes",
        heading: "Questions, complaints, and disputes",
        paragraphs: [
          "A customer should first contact Viesta through the published email, phone, or WhatsApp details so the parties can attempt good-faith resolution. The parties may use mediation where appropriate and agreed or legally required.",
          "An unresolved matter may be referred to a court, regulator, tribunal, or other competent body in Kenya where applicable.",
        ],
      },
      {
        id: "governing-law",
        heading: "Governing law",
        paragraphs: [
          "These Terms are governed by Kenyan law. Nothing in them prevents a customer from using a regulator, tribunal, court, or remedy available under applicable law.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to these terms",
        paragraphs: [
          "Viesta may update these Terms when its storefront, order process, providers, products, or legal obligations change. The page will show the applicable effective date and last-updated date. Changes do not retrospectively alter an accepted order unless the customer agrees or applicable law requires it.",
        ],
      },
      {
        id: "contact",
        heading: "Contact Viesta",
        paragraphs: [
          `Questions about these Terms may be sent to ${siteContent.contact.email} or raised through the phone and WhatsApp details published on the Viesta website.`,
        ],
      },
    ],
  },
];
