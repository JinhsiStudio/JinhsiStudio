import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GachaAvatarCard from "./gacha-avatar-card";

describe("GachaAvatarCard Component", () => {
  const defaultProps = {
    name: "Test Character",
    resourceId: 1104,
    number: 50,
  };

  // Test basic rendering
  it("renders with correct props", () => {
    render(<GachaAvatarCard {...defaultProps} />);

    expect(screen.getByText("50")).toBeInTheDocument();
    const img = screen.getByRole("gacha-avatar-icon");
    expect(img).toHaveAttribute("alt", "small");
    expect(img).toHaveClass("w-16 h-20 object-cover");
  });

  // Test image error handling
  it("shows fallback icon when image fails to load", () => {
    render(<GachaAvatarCard {...defaultProps} />);

    const img = screen.getByRole("gacha-avatar-icon");
    fireEvent.error(img);

    expect(img).not.toBeInTheDocument();
    expect(screen.getByRole("gacha-avatar-fallback-icon")).toBeInTheDocument();
  });

  // Test number display
  it("displays correct number", () => {
    render(<GachaAvatarCard {...defaultProps} number={75} />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  //   // Test custom className
  //   it("applies custom className to container", () => {
  //     const { container } = render(
  //       <GachaAvatarCard className="custom-class" {...defaultProps} />,
  //     );

  //     expect(container.firstChild).toHaveClass("custom-class");
  //   });

  //   // Test console logging
  //   it("logs image path and props", () => {
  //     const consoleSpy = vi.spyOn(console, "info");
  //     render(<GachaAvatarCard {...defaultProps} />);

  //     expect(consoleSpy).toHaveBeenCalledWith(
  //       expect.any(String),
  //       "Test Character",
  //       1104,
  //     );
  //   });
});
