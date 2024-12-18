import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import { describe, expect, it } from "vitest";

describe("Button Component", () => {
  // Test basic rendering
  it("renders button with children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  // Test different variants
  it("renders button with different variants", () => {
    render(
      <Button variant="destructive" data-testid="destructive-button">
        Delete
      </Button>,
    );
    const button = screen.getByTestId("destructive-button");
    expect(button).toHaveClass("bg-destructive");
  });

  // Test different sizes
  it("renders button with different sizes", () => {
    render(
      <Button size="sm" data-testid="small-button">
        Small
      </Button>,
    );
    const button = screen.getByTestId("small-button");
    expect(button).toHaveClass("h-8");
  });

  // Test disabled state
  it("renders disabled button correctly", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
