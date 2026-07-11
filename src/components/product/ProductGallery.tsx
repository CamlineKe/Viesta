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
    <div className="min-w-0 space-y-4">
      <div className="group relative aspect-square overflow-hidden rounded-brand-xl border border-brand-border-soft bg-gradient-to-br from-brand-botanical via-brand-canvas to-brand-sun-wash shadow-brand-md">
        <div className="absolute inset-5 overflow-hidden rounded-brand-xl border border-brand-border-soft bg-white sm:inset-7">
          {!isImageLoaded ? (
            <div className="shimmer-surface absolute inset-0 animate-shimmer" />
          ) : null}
          <div className="absolute inset-4 sm:inset-6">
            <Image
              key={selectedImage}
              fill
              priority
              alt={`${product.name} product image`}
              className={cn(
                "object-contain transition duration-500 ease-out-expo group-hover:scale-[1.03]",
                isImageLoaded ? "opacity-100" : "opacity-0",
              )}
              sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 45vw, calc(100vw - 2rem)"
              src={selectedImage}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 hidden rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-brand-charcoal shadow-brand-sm backdrop-blur-md sm:block">
          Hover to zoom
        </div>
      </div>

      <div
        aria-label="Product image thumbnails"
        className="flex max-w-full snap-x gap-3 overflow-x-auto overscroll-x-contain pb-1"
        role="group"
      >
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            aria-label={`Show ${product.name} image ${index + 1}`}
            className={`aspect-square w-20 shrink-0 snap-start rounded-brand-lg border bg-white p-2 transition sm:w-24 ${
              selectedImage === image
                ? "border-brand-primary shadow-glow"
                : "border-brand-border-soft hover:border-brand-primary"
            }`}
            type="button"
            onClick={() => handleSelectImage(image)}
          >
            <span className="relative block h-full w-full overflow-hidden rounded-brand-md bg-brand-botanical">
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
