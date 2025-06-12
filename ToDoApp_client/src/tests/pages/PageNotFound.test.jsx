import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";


describe("PageNotFound page", () => {
  it("should display page-not-found message", () => {
    render(<PageNotFound />);

    // display page-not-found message
    expect(screen.getByText("Uh oh! You have entered a wrong page!")).toBeInTheDocument();
  });
});