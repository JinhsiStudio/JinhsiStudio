import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("should render correctly", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("peer");
  });

  it("should toggle checked state", async () => {
    const user = userEvent.setup();
    render(<Checkbox />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toHaveAttribute("data-state", "checked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("should apply custom className", () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom-class");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("disabled");
    expect(checkbox).toHaveClass("disabled:cursor-not-allowed");
    expect(checkbox).toHaveClass("disabled:opacity-50");
  });

  it("should show check icon when checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox />);

    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox-icon")).toBeInTheDocument();
  });

  it("should not show check icon when double checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox />);

    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox-icon")).toBeInTheDocument();
    expect(screen.getByRole("checkbox-indicator")).toBeInTheDocument();
    expect(screen.getByRole("checkbox-indicator")).toContainElement(
      screen.getByRole("checkbox-icon"),
    );
    expect(screen.getByRole("checkbox", { checked: true }));

    //Double click
    await user.click(screen.getByRole("checkbox"));
    expect(
      screen.getByRole("checkbox", { checked: false }),
    ).toBeInTheDocument();
  });
});
