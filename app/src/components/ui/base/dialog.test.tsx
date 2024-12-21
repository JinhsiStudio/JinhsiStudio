import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { describe, expect, it } from "vitest";

describe("Dialog Component", () => {
  // Test dialog trigger and content rendering
  it("renders dialog when triggered", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    // Click trigger button
    fireEvent.click(screen.getByText("Open Dialog"));

    // Check if dialog content is visible
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description")).toBeInTheDocument();
  });

  // Test dialog close functionality
  it("closes dialog when close button is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByText("Open Dialog"));
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    // Dialog content should not be visible
    expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
  });
});
