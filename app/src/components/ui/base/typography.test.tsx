import { render, screen } from "@testing-library/react";
import { Typography } from "./typography";
import { describe, expect, it } from "vitest";

describe("Typography Component", () => {
  // Test Title component with different levels
  it("renders Title with different heading levels", () => {
    render(
      <>
        <Typography.Title level={1}>Heading 1</Typography.Title>
        <Typography.Title level={2}>Heading 2</Typography.Title>
        <Typography.Title level={3}>Heading 3</Typography.Title>
      </>,
    );

    expect(screen.getByText("Heading 1").tagName).toBe("H1");
    expect(screen.getByText("Heading 2").tagName).toBe("H2");
    expect(screen.getByText("Heading 3").tagName).toBe("H3");
  });

  // Test Text component
  it("renders Text component correctly", () => {
    render(<Typography.Text>This is a paragraph of text</Typography.Text>);

    const text = screen.getByText("This is a paragraph of text");
    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("leading-7");
  });

  // Test custom className application
  it("applies custom className to Typography components", () => {
    render(
      <>
        <Typography.Title className="custom-title">
          Custom Title
        </Typography.Title>
        <Typography.Text className="custom-text">Custom Text</Typography.Text>
      </>,
    );

    expect(screen.getByText("Custom Title")).toHaveClass("custom-title");
    expect(screen.getByText("Custom Text")).toHaveClass("custom-text");
  });
});
