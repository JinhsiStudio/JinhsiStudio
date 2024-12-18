import { render, screen, fireEvent } from "@testing-library/react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./select";
import { describe, expect, it } from "vitest";

describe("Select Component", () => {
  // Test basic select rendering and functionality
  it("renders select and handles selection", () => {
    render(
      <Select defaultValue="option1">
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    // Check initial state
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    // Open select
    fireEvent.click(screen.getByRole("combobox"));

    // Select another option
    fireEvent.click(screen.getByText("Option 2"));
    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2");
  });

  // Test placeholder
  it("displays placeholder when no value is selected", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select something" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("Select something")).toBeInTheDocument();
  });

  // Test disabled state
  it("renders disabled select correctly", () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue>Disabled Select</SelectValue>
        </SelectTrigger>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
