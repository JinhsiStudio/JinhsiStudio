import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";
import { describe, expect, it, vi } from "vitest";

describe("Input Component", () => {
  // Test basic input rendering
  it("renders input correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  // Test value changes
  it("handles value changes correctly", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalled();
  });

  // Test disabled state
  it("renders disabled input correctly", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  // Test readonly state
  it("renders readonly input correctly", () => {
    render(<Input value="readonly text" readOnly />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });
});
