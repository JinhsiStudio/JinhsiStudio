import { render } from "@testing-library/react";
import { Separator } from "./separator";
import { describe, expect, it } from "vitest";

describe("Separator Component", () => {
  // Test horizontal separator
  it("renders horizontal separator correctly", () => {
    const { container } = render(<Separator orientation="horizontal" />);
    expect(container.firstChild).toHaveClass("h-[1px]", "w-10/12");
  });

  // Test vertical separator
  it("renders vertical separator correctly", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("w-[1px]", "h-10/12");
  });

  // Test decorative attribute
  it("renders with correct ARIA attributes", () => {
    const { container } = render(<Separator decorative={true} />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  // Test custom className
  it("applies custom className correctly", () => {
    const { container } = render(<Separator className="custom-separator" />);
    expect(container.firstChild).toHaveClass("custom-separator");
  });
});
