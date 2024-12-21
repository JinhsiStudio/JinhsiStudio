import { render } from "@testing-library/react";
import { Spinner } from "./spinner";
import { describe, expect, it } from "vitest";

describe("Spinner Component", () => {
  // Test basic spinner rendering
  it("renders spinner with default size", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector("svg");
    expect(spinner).toHaveClass("h-8", "w-8");
  });

  // Test different sizes
  it("renders spinner with different sizes", () => {
    const { container, rerender } = render(<Spinner size="small" />);
    expect(container.querySelector("svg")).toHaveClass("h-4", "w-4");

    rerender(<Spinner size="large" />);
    expect(container.querySelector("svg")).toHaveClass("h-16", "w-16");
  });

  // Test fullscreen mode
  it("renders fullscreen spinner", () => {
    const { container } = render(<Spinner fullscreen />);
    const overlay = container.firstChild;
    expect(overlay).toHaveClass("fixed", "inset-0", "z-50");
  });

  // Test spinning state
  it("controls visibility based on spinning prop", () => {
    const { container, rerender } = render(<Spinner spinning={false} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();

    rerender(<Spinner spinning={true} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
