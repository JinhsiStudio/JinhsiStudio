import { render, screen, fireEvent, act } from "@testing-library/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { describe, expect, it } from "vitest";

describe("Tooltip Component", () => {
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
    <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
  );

  // Test basic tooltip functionality
  it("shows tooltip on hover", async () => {
    render(
      <TooltipWrapper>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // Get the trigger button
    const trigger = screen.getByRole("button", { name: "Hover me" });

    // Trigger mouse enter event
    await act(async () => {
      fireEvent.mouseEnter(trigger);
      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Find tooltip content in document.body
    const tooltip = document.querySelector('[role="tooltip"]');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Tooltip text");
  });

  // Test custom positioning
  it("renders tooltip with custom position", async () => {
    render(
      <TooltipWrapper>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent side="right">Right tooltip</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    // Trigger mouse enter event
    const trigger = screen.getByRole("button", { name: "Hover me" });
    await act(async () => {
      fireEvent.mouseEnter(trigger);
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Find tooltip content and its container in document.body
    const tooltipContent = document.querySelector('[role="tooltip"]');
    expect(tooltipContent).toBeInTheDocument();

    // Find parent element with data-side attribute
    const tooltipWithSide = tooltipContent?.closest("[data-side]");
    expect(tooltipWithSide).toHaveAttribute("data-side", "right");
  });
});
