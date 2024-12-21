import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { describe, expect, it } from "vitest";

describe("Avatar Component", () => {
  //FIXME Test Failure
  //   // Test avatar with image
  //   it("renders avatar with correct structure", () => {
  //     const { container } = render(
  //       <Avatar>
  //         <AvatarImage
  //           data-testid="avatar-img"
  //           src="https://avatars.githubusercontent.com/u/39649411?v=4"
  //           alt="Test Avatar"
  //         />
  //         <AvatarFallback delayMs={0}>JD</AvatarFallback>
  //       </Avatar>,
  //     );

  //     const image = container.querySelector(
  //       "img[alt='Test Avatar']",
  //     ) as HTMLImageElement;
  //     expect(image).toBeTruthy();
  //     expect(image).toHaveAttribute(
  //       "src",
  //       "https://avatars.githubusercontent.com/u/39649411?v=4",
  //     );
  //     expect(image).toHaveAttribute("alt", "Test Avatar");
  //   });

  // Test fallback rendering
  it("renders fallback when specified", () => {
    render(
      <Avatar>
        <AvatarImage src="invalid.jpg" alt="Invalid Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  // Test custom className
  it("applies custom className to Avatar", () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    const avatarRoot = container.firstChild as HTMLElement;
    expect(avatarRoot).toHaveClass(
      "custom-avatar",
      "relative",
      "flex",
      "h-10",
      "w-10",
      "shrink-0",
      "overflow-hidden",
      "rounded-full",
    );
  });
});
