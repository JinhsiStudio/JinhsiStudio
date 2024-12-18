import { render, screen, fireEvent } from "@testing-library/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";
import { describe, expect, it } from "vitest";

describe("Sheet Component", () => {
  // Test basic sheet functionality
  it("renders and opens sheet when triggered", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    // Click trigger button
    fireEvent.click(screen.getByText("Open Sheet"));

    // Check if sheet content is visible
    const title = await screen.findByText("Sheet Title");
    const description = await screen.findByText("Sheet Description");
    expect(title).toBeVisible();
    expect(description).toBeVisible();
  });

  // Test sheet close functionality
  it("closes sheet when close button is clicked", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>Sheet Content</SheetContent>
      </Sheet>,
    );

    // Open sheet
    fireEvent.click(screen.getByText("Open Sheet"));
    const content = await screen.findByText("Sheet Content");
    expect(content).toBeVisible();

    // Close sheet
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(content).not.toBeVisible();
  });

  // Test different sheet sides
  it("renders sheet with different sides", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="left" data-testid="left-sheet">
          Left Sheet
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText("Open Sheet"));
    const sheet = await screen.findByTestId("left-sheet");
    expect(sheet).toHaveClass("left-0");
  });
});
