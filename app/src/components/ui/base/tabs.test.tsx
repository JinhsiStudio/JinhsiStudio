import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { describe, expect, it } from "vitest";

describe("Tabs Component", () => {
  // Test basic tabs rendering and functionality
  it("renders tabs and handles tab switching", async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    // Check initial state
    const content1 = screen.getByText("Content 1");
    const content2 = screen.getByText("Content 2");

    expect(content1).toBeVisible();
    expect(content2).not.toBeVisible();

    // Switch tab
    fireEvent.click(screen.getByText("Tab 2"));

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(content1).not.toBeVisible();
    expect(content2).toBeVisible();
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

    const activeTab = screen.getByText("Tab 1");
    expect(activeTab).toHaveAttribute("data-state", "active");
  });
});
