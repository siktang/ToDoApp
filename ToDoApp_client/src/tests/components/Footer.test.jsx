import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../../components/Footer/Footer";


describe("Footer component", () => {
  it("should display copyright info in footer", () => {
    render(<Footer />);

    // display copyright info
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });
});