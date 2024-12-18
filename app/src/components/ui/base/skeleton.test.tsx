import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";
import { describe, expect, it } from "vitest";

describe("Skeleton Component", () => {
  // Test basic skeleton rendering
  it("renders skeleton with default classes", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-primary/10",
    );
  });

  // Test custom className application
  it("applies custom className to skeleton", () => {
    const { container } = render(
      <Skeleton className="custom-skeleton h-20 w-40" />,
    );
    expect(container.firstChild).toHaveClass("custom-skeleton", "h-20", "w-40");
  });

  // Test with children content
  it("renders skeleton with children", () => {
    const { container } = render(
      <Skeleton>
        <div>Loading content...</div>
      </Skeleton>,
    );
    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container).toHaveTextContent("Loading content...");
  });
});
