import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { describe, expect, it } from "vitest";

describe("Tooltip Component", () => {
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
    <TooltipProvider>{children}</TooltipProvider>
  );

  // Test basic tooltip functionality
  it("shows tooltip on hover", async () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    const trigger = screen.getByText("Hover me");
    fireEvent.mouseEnter(trigger);

    // Wait for tooltip to appear
    const tooltip = await screen.findByText("Tooltip text");
    expect(tooltip).toBeVisible();
  });

  // Test custom positioning
  it("renders tooltip with custom position", () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent side="right">Right tooltip</TooltipContent>
        </Tooltip>
      </TooltipWrapper>,
    );

    const trigger = screen.getByText("Hover me");
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText("Right tooltip")).toHaveAttribute(
      "data-side",
      "right",
    );
  });
});
