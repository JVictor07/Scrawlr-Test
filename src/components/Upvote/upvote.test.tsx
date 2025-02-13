import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Upvote } from "./index";
import { upvoteStore } from "../../store/upvoteStore";

// Mock SVG as a simple React component
vi.mock("../../assets/arrow-up.svg?react", () => ({
  default: () => {
    const MockSvg = () => <div data-testid="mock-arrow-up-svg" />;
    return <MockSvg />;
  }
}));

vi.mock("../../store/upvoteStore", () => ({
  upvoteStore: vi.fn((selector) => selector({ 
    rows: [],
    addUpvote: vi.fn(),
    toggleUpvote: vi.fn()
  })),
}));

describe("Upvote component", () => {
  it("renders correctly", () => {
    render(<Upvote rowId={1} isActive={false} />);
    const button = screen.getByRole("button", { name: /add upvote/i });
    expect(button).toBeInTheDocument();
  });

  it("displays the correct aria-pressed attribute when active", () => {
    render(<Upvote rowId={1} isActive={true} />);
    const button = screen.getByRole("button", { name: /remove upvote/i });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("displays the correct aria-pressed attribute when inactive", () => {
    render(<Upvote rowId={1} isActive={false} />);
    const button = screen.getByRole("button", { name: /add upvote/i });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("calls toggleUpvote when clicked", () => {
    const toggleUpvoteMock = vi.fn();
    vi.mocked(upvoteStore).mockImplementation((selector) => 
      selector({ 
        rows: [],
        addUpvote: vi.fn(),
        toggleUpvote: toggleUpvoteMock 
      })
    );

    render(<Upvote rowId={1} isActive={false} />);
    const button = screen.getByRole("button", { name: /add upvote/i });
    fireEvent.click(button);

    expect(toggleUpvoteMock).toHaveBeenCalledWith(1);
  });

  it("changes button state and label when clicked", () => {
    // Start with inactive state
    const { rerender } = render(<Upvote rowId={1} isActive={false} />);
    const button = screen.getByTestId("upvote-1");
    // Verify initial state
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAttribute("aria-label", "Add upvote");
    
    // Click the button
    fireEvent.click(button);
    
    // Simulate state change by re-rendering with active=true
    rerender(<Upvote rowId={1} isActive={true} />);
    
    // Verify new state
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("aria-label", "Remove upvote");
    
    // Click again
    fireEvent.click(button);
    
    // Simulate state change back to inactive
    rerender(<Upvote rowId={1} isActive={false} />);
    
    // Verify returned to initial state
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAttribute("aria-label", "Add upvote");
  });
});