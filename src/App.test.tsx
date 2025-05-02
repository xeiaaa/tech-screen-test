import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./hooks/use-ideas", () => ({
  useIdeas: vi.fn(),
}));

import { useIdeas } from "./hooks/use-ideas";
const mockedUseIdeas = vi.mocked(useIdeas);

describe("App", () => {
  test("Shows empty state when there are no ideas", () => {
    mockedUseIdeas.mockReturnValue({
      ideas: [],
      removeIdea: vi.fn(),
      addIdea: vi.fn(),
      editIdea: vi.fn(),
      sort: "creation-date-asc",
      setSort: vi.fn(),
      latestId: null,
      setIdeasMap: vi.fn(),
    });

    render(<App />);

    expect(
      screen.getByText(/get started by creating a new idea/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add New/i })
    ).toBeInTheDocument();
  });

  test("Show the card list when there are ideas", () => {
    mockedUseIdeas.mockReturnValue({
      ideas: [
        {
          title: "aaa",
          description: "aaa",
          id: "1745819851881",
          createdAt: 1745819851881,
          updatedAt: 1745819851881,
        },
        {
          title: "bbb",
          description: "bbb",
          id: "1745819855838",
          createdAt: 1745819855838,
          updatedAt: 1745819855838,
        },
      ],
      removeIdea: vi.fn(),
      addIdea: vi.fn(),
      editIdea: vi.fn(),
      sort: "creation-date-asc",
      setSort: vi.fn(),
      latestId: null,
      setIdeasMap: vi.fn(),
    });
    render(<App />);

    expect(
      screen.queryByText(/get started by creating a new idea/i)
    ).not.toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(2);
  });
});
