import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { describe, expect, it } from "vitest";

describe("Card Component", () => {
  // Test full card rendering with all subcomponents
  it("renders complete card with all sections", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  // Test custom className application
  it("applies custom className to Card components", () => {
    render(
      <Card className="custom-card" data-testid="card">
        <CardContent>Test Content</CardContent>
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("custom-card");
  });
});
