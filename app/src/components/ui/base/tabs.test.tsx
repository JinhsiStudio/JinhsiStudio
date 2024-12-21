import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { describe, expect, it, vi } from "vitest";

describe("Tabs Component", () => {
  // Test basic tabs rendering and functionality
  it("renders tabs and handles tab switching", async () => {
    const handleValueChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    // Check initial state
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab1).toHaveAttribute("data-state", "active");
    expect(tab2).toHaveAttribute("data-state", "inactive");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("type", "button");
    expect(tab2).toHaveAttribute("type", "button");
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.queryByText("Content 2")).toBeNull();

    fireEvent.mouseDown(tab2);

    // Wait for state changes and callback
    await waitFor(
      () => {
        expect(handleValueChange).toHaveBeenCalledWith("tab2");
        expect(tab1).toHaveAttribute("data-state", "inactive");
        expect(tab2).toHaveAttribute("data-state", "active");
        expect(screen.queryByText("Content 1")).toBeNull();
        expect(screen.getByText("Content 2")).toBeVisible();
      },
      {
        timeout: 1000,
      },
    );
  });

  // Test active tab styling
  it("applies correct styling to active tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const activeTab = screen.getByRole("tab", { name: "Tab 1" });
    expect(activeTab).toHaveAttribute("data-state", "active");
    expect(activeTab).toHaveAttribute("aria-selected", "true");
  });
});
