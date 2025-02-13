import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UpvoteGroup } from "./index";
import { upvoteStore } from "../../store/upvoteStore";

// Mock SVG components
vi.mock("../../assets/plus.svg?react", () => ({
  default: () => {
    const MockPlus = () => <div data-testid="mock-plus-svg" />;
    return <MockPlus />;
  }
}));

vi.mock("../../assets/arrow-up.svg?react", () => ({
  default: () => {
    const MockSvg = () => <div data-testid="mock-arrow-up-svg" />;
    return <MockSvg />;
  }
}));

// Mock the store
vi.mock("../../store/upvoteStore", () => ({
  upvoteStore: vi.fn((selector) => selector({
    addUpvote: vi.fn(),
    toggleUpvote: vi.fn(),
    rows: []
  })),
}));

describe("UpvoteGroup component", () => {
  const mockRow = {
    id: 1,
    qtd: 3,
    isSelected: false
  };

  it("renders the correct number of upvotes", () => {
    render(<UpvoteGroup row={mockRow} />);
    const upvotes = screen.getAllByTestId(`upvote-${mockRow.id}`);
    expect(upvotes).toHaveLength(mockRow.qtd);
  });

  it("renders the add upvote button", () => {
    render(<UpvoteGroup row={mockRow} />);
    const addButton = screen.getByTestId(`add-upvote-${mockRow.id}`);
    expect(addButton).toBeInTheDocument();
  });

  it("calls addUpvote when the plus button is clicked", () => {
    const addUpvoteMock = vi.fn();
    vi.mocked(upvoteStore).mockImplementation((selector) => 
      selector({ addUpvote: addUpvoteMock, toggleUpvote: vi.fn(), rows: [] })
    );

    render(<UpvoteGroup row={mockRow} />);
    const addButton = screen.getByTestId(`add-upvote-${mockRow.id}`);
    
    fireEvent.click(addButton);
    
    expect(addUpvoteMock).toHaveBeenCalledTimes(1);
    expect(addUpvoteMock).toHaveBeenCalledWith(mockRow.id);
  });

  it("renders with correct accessibility attributes", () => {
    render(<UpvoteGroup row={mockRow} />);
    
    const region = screen.getByRole("region", { name: /upvote group/i });
    expect(region).toBeInTheDocument();
    
    const group = screen.getByRole("group", { name: `${mockRow.qtd} upvotes` });
    expect(group).toBeInTheDocument();
  });

  it("renders upvotes with correct active state", () => {
    const activeRow = { ...mockRow, isSelected: true };
    render(<UpvoteGroup row={activeRow} />);
    
    const upvotes = screen.getAllByRole("button", { name: /remove upvote/i });
    expect(upvotes).toHaveLength(activeRow.qtd);
    
    upvotes.forEach(upvote => {
      expect(upvote).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("changes upvote state when clicked", () => {
    const toggleUpvoteMock = vi.fn();
    vi.mocked(upvoteStore).mockImplementation((selector) => 
      selector({ toggleUpvote: toggleUpvoteMock, addUpvote: vi.fn(), rows: [] })
    );

    // Start with inactive state
    const { rerender } = render(<UpvoteGroup row={mockRow} />);
    
    // Get the first upvote button
    const upvoteButton = screen.getAllByTestId(`upvote-${mockRow.id}`)[0];
    expect(upvoteButton).toHaveAttribute("aria-pressed", "false");
    expect(upvoteButton).toHaveAttribute("aria-label", "Add upvote");
    
    // Click the upvote button
    fireEvent.click(upvoteButton);
    expect(toggleUpvoteMock).toHaveBeenCalledWith(mockRow.id);
    
    // Simulate state update by re-rendering with isSelected=true
    const updatedRow = { ...mockRow, isSelected: true };
    rerender(<UpvoteGroup row={updatedRow} />);
    
    // Verify the state changed
    const updatedButton = screen.getAllByTestId(`upvote-${mockRow.id}`)[0];
    expect(updatedButton).toHaveAttribute("aria-pressed", "true");
    expect(updatedButton).toHaveAttribute("aria-label", "Remove upvote");
  });
});