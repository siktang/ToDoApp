import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../../components/Header/Header";


describe("Header component", () => {
  it("should display project title in header", () => {
    render(<Header />);

    // display project title
    expect(screen.getByText("My To-Do List")).toBeInTheDocument();
  });
});