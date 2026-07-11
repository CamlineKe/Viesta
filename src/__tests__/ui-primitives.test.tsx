import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, cardClassName } from "@/components/ui/Card";
import { FormField, getFieldControlClassName } from "@/components/ui/FormField";

describe("UI primitives", () => {
  it("uses the documented card radius and surface treatment", () => {
    expect(cardClassName()).toContain("rounded-brand-lg");
    expect(cardClassName()).toContain("bg-white/90");
    expect(cardClassName({ variant: "flat" })).toContain(
      "bg-brand-surface-solid",
    );
    expect(cardClassName({ variant: "raised" })).toContain(
      "shadow-brand-md",
    );
    expect(cardClassName({ variant: "interactive" })).toContain(
      "hover:-translate-y-1",
    );
    expect(cardClassName({ variant: "featured" })).toContain(
      "bg-brand-botanical",
    );

    const markup = renderToStaticMarkup(<Card>Card content</Card>);

    expect(markup).toContain("rounded-brand-lg");
    expect(markup).toContain("Card content");
  });

  it("renders danger alerts as assertive feedback", () => {
    const markup = renderToStaticMarkup(
      <Alert variant="danger">Unable to continue.</Alert>,
    );

    expect(markup).toContain('role="alert"');
    expect(markup).toContain("Unable to continue.");
  });

  it("connects a form field error with its control", () => {
    const markup = renderToStaticMarkup(
      <FormField
        error="Enter a valid phone number."
        id="phone"
        label="Phone number"
      >
        {({ describedBy, id, invalid }) => (
          <input
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={getFieldControlClassName({ invalid })}
            id={id}
          />
        )}
      </FormField>,
    );

    expect(markup).toContain('for="phone"');
    expect(markup).toContain('aria-describedby="phone-error"');
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain('id="phone-error"');
    expect(markup).toContain('role="alert"');
  });

  it("prevents duplicate button actions while loading", () => {
    const markup = renderToStaticMarkup(
      <Button isLoading>Save changes</Button>,
    );

    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain("disabled");
    expect(markup).toContain("animate-spin");
  });
});
