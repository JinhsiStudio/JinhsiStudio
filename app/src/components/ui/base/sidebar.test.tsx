import { render, screen, fireEvent } from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";
import { describe, expect, it, vi } from "vitest";

describe("Sidebar Component", () => {
  // Test basic sidebar rendering
  it("renders sidebar with basic content", () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <Sidebar data-testid="sidebar">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Item 1</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  // Test sidebar collapse state
  it("handles sidebar collapse state", async () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <Sidebar>
          <SidebarContent>
            <SidebarTrigger data-testid="trigger" />
            Content
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    // Find the group element that has the data-state attribute
    const sidebarGroup = screen.getByTestId("trigger").closest(".group");
    expect(sidebarGroup).toHaveAttribute("data-state", "expanded");

    // Find and click collapse button
    const trigger = screen.getByTestId("trigger");
    fireEvent.click(trigger);

    // Wait for animation
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(sidebarGroup).toHaveAttribute("data-state", "collapsed");
  });

  // Test menu button click
  it("handles menu button click", () => {
    const handleClick = vi.fn();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleClick}>
                  Click Me
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalled();
  });
});
