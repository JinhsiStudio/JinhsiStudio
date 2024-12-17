import { render, screen } from "@testing-library/react";
import { List } from "./list";
import { describe, expect, it } from "vitest";

describe("List Component", () => {
  // Test basic rendering
  it("renders List with children correctly", () => {
    render(
      <List>
        <div>Test Item 1</div>
        <div>Test Item 2</div>
      </List>,
    );

    expect(screen.getByText("Test Item 1")).toBeInTheDocument();
    expect(screen.getByText("Test Item 2")).toBeInTheDocument();
  });

  // Test List with header and footer
  it("renders List with header and footer", () => {
    render(
      <List header="List Header" footer="List Footer">
        <div>Test Content</div>
      </List>,
    );

    expect(screen.getByText("List Header")).toBeInTheDocument();
    expect(screen.getByText("List Footer")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  // Test ListItem basic rendering
  it("renders ListItem correctly", () => {
    render(
      <List>
        <List.Item>Test Item Content</List.Item>
      </List>,
    );

    expect(screen.getByText("Test Item Content")).toBeInTheDocument();
  });

  // Test ListItem with meta properties
  it("renders ListItem with meta properties", () => {
    const meta = {
      title: "Item Title",
      description: "Item Description",
      avatar: <div data-testid="avatar">Avatar</div>,
    };

    render(
      <List>
        <List.Item meta={meta}>Title</List.Item>
      </List>,
    );

    expect(screen.getByText("Item Title")).toBeInTheDocument();
    expect(screen.getByText("Item Description")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  //FIXME: Fix this test
  //   // Test custom className application
  //   it("applies custom className to List and ListItem", () => {
  //     render(
  //       <List className="custom-list-class">
  //         <List.Item className="custom-item-class">Test Item</List.Item>
  //       </List>,
  //     );

  //     const list = screen.getByText("Test Item").parentElement?.parentElement;
  //     const item = screen.getByText("Test Item").parentElement;

  //     expect(list).toHaveClass("custom-list-class", { exact: false });
  //     expect(item).toHaveClass("custom-item-class", { exact: false });
  //   });

  // Test meta with custom className
  it("renders ListItem with meta custom className", () => {
    const meta = {
      title: "Title",
      className: "custom-meta-class",
    };

    render(
      <List>
        <List.Item meta={meta}>Title</List.Item>
      </List>,
    );

    const metaElement = screen.getByText("Title").parentElement?.parentElement;
    expect(metaElement).toHaveClass("custom-meta-class");
  });
});
