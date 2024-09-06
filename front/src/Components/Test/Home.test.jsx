import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../Pages/Home";

describe("Home Component", () => {
  test("Search the title 'Articles récents'", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Articles récents/i)).toBeDefined();
  });
});
