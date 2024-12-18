import { render, screen, fireEvent } from "@testing-library/react";
import { FloatButton, FloatButtonGroup } from "./float-button";
import { describe, expect, it } from "vitest";

describe("FloatButton Component", () => {
  // Test basic float button rendering
  it("renders float button correctly", () => {
    render(<FloatButton data-testid="float-btn">Click</FloatButton>);
    expect(screen.getByTestId("float-btn")).toBeInTheDocument();
  });

  // Test tooltip functionality
  it("renders float button with tooltip", async () => {
    render(<FloatButton tooltip="Help">Help Button</FloatButton>);

    const button = screen.getByText("Help Button");
    fireEvent.mouseEnter(button);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Help");
  });

  // Test FloatButtonGroup functionality
  it("renders float button group with multiple buttons", () => {
    render(
      <FloatButtonGroup>
        <FloatButton data-testid="btn-1">Button 1</FloatButton>
        <FloatButton data-testid="btn-2">Button 2</FloatButton>
      </FloatButtonGroup>,
    );

    expect(screen.getByTestId("btn-1")).toBeInTheDocument();
    expect(screen.getByTestId("btn-2")).toBeInTheDocument();
  });

  // Test group expansion behavior
  it("expands button group on click", () => {
    render(
      <FloatButtonGroup>
        <FloatButton data-testid="trigger">Menu</FloatButton>
        <FloatButton>Button 1</FloatButton>
        <FloatButton>Button 2</FloatButton>
      </FloatButtonGroup>,
    );

    const trigger = screen.getByTestId("trigger");
    fireEvent.click(trigger);

    // Verify buttons are visible after expansion
    const buttons = screen.getAllByRole("button");
    buttons.slice(1).forEach((button) => {
      expect(button).toBeVisible();
    });
  });
});
