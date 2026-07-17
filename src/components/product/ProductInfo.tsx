"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  PackageCheck,
  RotateCcw,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { QuantityControls } from "@/components/cart/QuantityControls";
import { cardClassName } from "@/components/ui/Card";
import { useToast } from "@/context/ToastContext";
import { categories } from "@/data/categories";
import { useCart } from "@/hooks/useCart";
import { openCartDrawer } from "@/lib/cart-drawer-events";
import {
  formatProductCompareAtPrice,
  formatProductPrice,
  hasConfirmedPrice,
} from "@/lib/product-pricing";
import type { Product } from "@/types/product";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOfferId, setSelectedOfferId] = useState(
    product.offers?.[0]?.id ?? "",
  );
  const [addedMessage, setAddedMessage] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const category = categories.find((item) => item.id === product.category);
  const selectedOffer = product.offers?.find(
    (offer) => offer.id === selectedOfferId,
  );
  const selectedPrice = selectedOffer?.price ?? product.price;
  const selectedPackSize = selectedOffer?.packSize ?? product.packSize;
  const compareAtPrice = formatProductCompareAtPrice(
    selectedOffer?.compareAtPrice,
  );
  const canAddToCart =
    product.priceStatus === "confirmed" &&
    Boolean(selectedOffer) &&
    hasConfirmedPrice(selectedPrice);
  const trustItems = [
    { label: "Delivery", sublabel: "Free Nairobi & Kiambu", icon: Truck },
    { label: "Payment", sublabel: "M-Pesa / WhatsApp", icon: CreditCard },
    {
      label: "Products",
      sublabel: "Authenticity to confirm",
      icon: PackageCheck,
    },
    { label: "Returns", sublabel: "Policy guidance", icon: RotateCcw },
  ];

  const handleAddToCart = () => {
    if (!canAddToCart || !selectedOffer) {
      return;
    }

    addItem({
      id: `${product.id}:${selectedOffer.id}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      variantId: selectedOffer.id,
      variantLabel: selectedOffer.label,
      packSize: `${selectedOffer.totalQuantity} × ${selectedOffer.packSize}`,
      price: selectedPrice,
      priceStatus: "confirmed",
      image: product.image,
      quantity,
    });
    setAddedMessage(
      `${quantity} offer bundle${quantity === 1 ? "" : "s"} added to cart.`,
    );
    showToast(
      `${product.name} - ${selectedOffer.label} added to cart.`,
      "success",
    );
    openCartDrawer();
  };

  return (
    <section className="min-w-0 flex flex-col">
      <div className="flex flex-wrap items-center gap-3">
        {category ? <Badge variant="default">{category.name}</Badge> : null}
        {product.featured ? <Badge variant="success">Featured</Badge> : null}
        <Badge
          variant={
            product.priceStatus === "confirmed" ? "success" : "warning"
          }
        >
          {product.priceStatus === "confirmed"
            ? "Confirmed retail price"
            : "Price unconfirmed"}
        </Badge>
      </div>

      <h1 className="mt-5 break-words font-heading text-3xl font-extrabold leading-tight text-brand-charcoal sm:text-4xl lg:text-5xl">
        {product.name}
      </h1>
      <p className="mt-4 break-words font-heading text-2xl font-extrabold text-brand-charcoal sm:text-3xl">
        {formatProductPrice(selectedPrice, product.priceStatus)}
      </p>
      {compareAtPrice ? (
        <p className="mt-1 text-sm font-bold text-brand-muted line-through">
          {compareAtPrice}
        </p>
      ) : null}
      {selectedPackSize ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-brand-muted">
          <span className="max-w-full break-words rounded-full bg-brand-primary-muted px-3 py-1 text-brand-charcoal">
            Pack: {selectedPackSize}
          </span>
          {selectedOffer ? (
            <span className="max-w-full break-words rounded-full bg-brand-primary-muted px-3 py-1 text-brand-charcoal">
              Includes: {selectedOffer.totalQuantity} pack
              {selectedOffer.totalQuantity === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="mt-5">
        <p
          className={`text-base leading-8 text-brand-muted ${
            isDescriptionExpanded ? "" : "line-clamp-4"
          }`}
        >
          {product.description}
        </p>
        <button
          className="mt-2 font-heading text-sm font-extrabold text-brand-charcoal transition hover:text-brand-muted"
          type="button"
          onClick={() => setIsDescriptionExpanded((current) => !current)}
        >
          {isDescriptionExpanded ? "Show less" : "Read more"}
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={cardClassName({
                className: "min-w-0 flex gap-3",
                padding: "sm",
                variant: "flat",
              })}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-muted text-brand-charcoal">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-sm font-extrabold text-brand-charcoal">
                  {item.label}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-brand-muted">
                  {item.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3 rounded-brand-lg border border-brand-border-soft bg-brand-sun-wash p-4 text-sm leading-6 text-brand-charcoal">
        <Truck
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
        />
        <p>
          Free delivery applies to Nairobi and Kiambu. Mombasa, Kisumu, Nakuru,
          and Eldoret are KES 500; other locations are confirmed on WhatsApp.
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {product.benefits.map((benefit) => (
          <li
            key={benefit}
            className="flex gap-3 text-sm font-semibold leading-6 text-brand-charcoal"
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-success"
            />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-brand-lg border border-brand-border-soft bg-brand-botanical p-4 sm:p-5">
        <p className="font-heading text-lg font-extrabold text-brand-charcoal">
          Usage
        </p>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          {product.usage}
        </p>
        {product.ingredients ? (
          <>
            <p className="mt-4 font-heading text-lg font-extrabold text-brand-charcoal">
              Ingredients
            </p>
            <p className="mt-2 text-sm leading-6 text-brand-muted">
              {product.ingredients}
            </p>
          </>
        ) : null}
      </div>

      {product.warnings?.length ? (
        <Alert
          className="mt-5 p-4 text-orange-900 sm:p-5"
          icon={<AlertTriangle className="h-5 w-5" />}
          title="Warnings"
          variant="warning"
        >
          <ul className="list-disc space-y-2 pl-5">
            {product.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </Alert>
      ) : null}

      <div className="mt-8 space-y-4">
        {product.offers?.length ? (
          <fieldset>
            <legend className="block text-sm font-bold text-brand-charcoal">
              Choose a retail offer
            </legend>
            <p className="mt-1 text-sm leading-6 text-brand-muted">
              Each offer price is the total for all packs included in that
              offer.
            </p>
            <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-3">
              {product.offers.map((offer) => {
                const isSelected = offer.id === selectedOfferId;
                const offerCompareAtPrice = formatProductCompareAtPrice(
                  offer.compareAtPrice,
                );

                return (
                  <button
                    key={offer.id}
                    aria-pressed={isSelected}
                    className={`min-w-0 rounded-brand-lg border p-3 text-left transition sm:p-4 ${
                      isSelected
                        ? "border-brand-primary bg-brand-sun-wash shadow-brand-sm"
                        : "border-brand-border-soft bg-white hover:border-brand-primary"
                    }`}
                    type="button"
                    onClick={() => setSelectedOfferId(offer.id)}
                  >
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="min-w-0 break-words font-heading text-sm font-extrabold text-brand-charcoal sm:text-base">
                        {offer.label}
                      </span>
                      {offer.freeQuantity > 0 ? (
                        <Badge variant="success">
                          {offer.freeQuantity} free
                        </Badge>
                      ) : null}
                    </span>
                    <span className="mt-2 block break-words font-heading text-lg font-extrabold text-brand-charcoal">
                      {formatProductPrice(offer.price, "confirmed")}
                    </span>
                    {offerCompareAtPrice ? (
                      <span className="mt-1 block text-xs font-bold text-brand-muted line-through">
                        {offerCompareAtPrice}
                      </span>
                    ) : null}
                    <span className="mt-2 block text-xs font-semibold leading-5 text-brand-muted">
                      {offer.totalQuantity} pack
                      {offer.totalQuantity === 1 ? "" : "s"} total, each with{" "}
                      {offer.packSize}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <Alert variant="warning">
            Retail pricing is unconfirmed for this product. It cannot be added
            to the cart until Viesta confirms a retail offer.
          </Alert>
        )}
        {canAddToCart ? (
          <div>
            <p className="block text-sm font-bold text-brand-charcoal">
              Offer quantity
            </p>
            <p className="mt-1 text-sm leading-6 text-brand-muted">
              Each quantity adds one complete {selectedOffer?.label} bundle.
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <QuantityControls value={quantity} onChange={setQuantity} />
              <Button
                className="min-h-12 min-w-0 flex-1 px-4 text-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart aria-hidden="true" className="h-5 w-5" />
                Add selected offer
              </Button>
            </div>
          </div>
        ) : (
          <Button disabled className="min-h-12 w-full px-4 text-center">
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
            Price unconfirmed
          </Button>
        )}
        {addedMessage ? (
          <p
            aria-live="polite"
            className="text-sm font-bold text-brand-success"
            role="status"
          >
            {addedMessage}
          </p>
        ) : null}
      </div>
    </section>
  );
}
