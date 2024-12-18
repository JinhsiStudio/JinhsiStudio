import { render, screen, fireEvent } from "@testing-library/react";
import { AppSidebar } from "./app-sidebar";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe("AppSidebar Component", () => {
  // Helper function to render with router
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  // Test basic sidebar rendering
  it("renders app sidebar with menu items", () => {
    renderWithRouter(<AppSidebar />);

    expect(screen.getByText("Label-Home")).toBeInTheDocument();
    expect(screen.getByText("Label-GachaTracker")).toBeInTheDocument();
    expect(screen.getByText("Label-Settings")).toBeInTheDocument();
  });

  // Test navigation functionality
  it("handles navigation when menu items are clicked", () => {
    renderWithRouter(<AppSidebar />);

    // Click on Gacha menu item
    fireEvent.click(screen.getByText("Label-GachaTracker"));
    expect(window.location.pathname).toBe("/gacha");

    // Click on Settings menu item
    fireEvent.click(screen.getByText("Label-Settings"));
    expect(window.location.pathname).toBe("/settings");
  });

  // Test menu item selection state
  it("highlights selected menu item", () => {
    renderWithRouter(<AppSidebar />);

    fireEvent.click(screen.getByText("Label-GachaTracker"));
    const menuButton = screen.getByText("Label-GachaTracker").closest("button");
    expect(menuButton).toHaveAttribute("data-state", "active");
  });
});
