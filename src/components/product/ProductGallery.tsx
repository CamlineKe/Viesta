"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/class-names";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.gallery.length > 0 ? product.gallery : [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSelectImage = (image: string) => {
    if (image === selectedImage) {
      return;
    }

    setIsImageLoaded(false);
    setSelectedImage(image);
  };

  return (
    <div className="space-y-4">
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-neutral-200/70 bg-brand-primary-muted shadow-soft">
        <div className="absolute inset-6 rounded-3xl border border-white/80 bg-white/65" />
        {!isImageLoaded ? (
          <div className="shimmer-surface absolute inset-8 animate-shimmer rounded-3xl sm:inset-10" />
        ) : null}
        <div className="absolute inset-0 p-8 sm:p-10">
          <div className="relative h-full w-full">
            <Image
              key={selectedImage}
              fill
              priority
              alt={`${product.name} product image`}
              className={cn(
                "object-contain transition duration-500 ease-out-expo group-hover:scale-105",
                isImageLoaded ? "opacity-100" : "opacity-0",
              )}
              sizes="(min-width: 1024px) 45vw, 90vw"
              src={selectedImage}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 hidden rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-brand-charcoal shadow-brand-sm backdrop-blur-md sm:block">
          Hover to zoom
        </div>
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            aria-label={`Show ${product.name} image ${index + 1}`}
            className={`aspect-square w-20 shrink-0 snap-start rounded-2xl border bg-white p-2 transition sm:w-24 ${
              selectedImage === image
                ? "border-brand-primary shadow-glow"
                : "border-neutral-200 hover:border-brand-primary"
            }`}
            type="button"
            onClick={() => handleSelectImage(image)}
          >
            <span className="relative block h-full w-full overflow-hidden rounded-xl bg-brand-primary-muted">
              <Image
                fill
                alt={`${product.name} thumbnail ${index + 1}`}
                className="object-contain p-1"
                sizes="96px"
                src={image}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
