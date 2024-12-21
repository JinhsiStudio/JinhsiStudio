import { render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { describe, expect, it } from "vitest";

describe("Breadcrumb Component", () => {
  // Test basic breadcrumb rendering
  it("renders breadcrumb with items correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  // Test breadcrumb link functionality
  it("renders breadcrumb links with correct attributes", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const link = screen.getByText("Home");
    expect(link).toHaveAttribute("href", "/home");
  });

  // Test current page styling
  it("applies correct styling to current page", () => {
    render(
      <BreadcrumbPage className="current-page">Current Page</BreadcrumbPage>,
    );

    expect(screen.getByText("Current Page")).toHaveClass(
      "current-page",
      "font-normal",
      "text-foreground",
    );
  });
});
