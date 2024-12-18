import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { describe, expect, it } from "vitest";

describe("Avatar Component", () => {
  // Test avatar with image
  it("renders avatar with image correctly", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test Avatar" />
      </Avatar>,
    );

    const image = container.querySelector("img");
    expect(image).toHaveAttribute("src", "test.jpg");
    expect(image).toHaveAttribute("alt", "Test Avatar");
  });

  // Test fallback rendering
  it("renders avatar fallback when image fails", () => {
    render(
      <Avatar>
        <AvatarImage src="invalid.jpg" alt="Invalid Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    const fallback = screen.getByText("JD");
    // Trigger error event to show fallback
    const image = screen.getByAltText("Invalid Avatar");
    fireEvent.error(image);

    expect(fallback).toBeVisible();
  });

  // Test custom className
  it("applies custom className to Avatar", () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    expect(container.firstChild).toHaveClass("custom-avatar");
  });
});
