import { render, screen, fireEvent } from "@testing-library/react";
import { AppSidebar } from "./app-sidebar";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./sidebar";

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe("AppSidebar Component", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <SidebarProvider>{ui}</SidebarProvider>
      </BrowserRouter>,
    );
  };

  // Test basic sidebar rendering
  it("renders app sidebar with menu items", () => {
    renderWithRouter(<AppSidebar />);

    expect(
      screen.getByRole("button", { name: "Label-Home" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Label-GachaTracker" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Label-Settings" }),
    ).toBeInTheDocument();
  });

  // Test navigation functionality
  it("handles navigation when menu items are clicked", () => {
    renderWithRouter(<AppSidebar />);

    fireEvent.click(screen.getByRole("button", { name: "Label-GachaTracker" }));
    expect(window.location.pathname).toBe("/gacha");

    fireEvent.click(screen.getByRole("button", { name: "Label-Settings" }));
    expect(window.location.pathname).toBe("/settings");
  });

  // Test menu item selection state
  it("highlights selected menu item", () => {
    renderWithRouter(<AppSidebar />);

    fireEvent.click(screen.getByRole("button", { name: "Label-GachaTracker" }));
    const menuButton = screen.getByRole("button", {
      name: "Label-GachaTracker",
    });
    expect(menuButton).toHaveAttribute("data-active", "true");
  });
});
