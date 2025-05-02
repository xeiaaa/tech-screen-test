import { render, screen } from "@testing-library/react";
import AddIdeaDialog from "../add-idea-dialog";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Add Idea Dialog", () => {
  test("renders without crashing", () => {
    render(<AddIdeaDialog addIdea={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /add new/i })
    ).toBeInTheDocument();
  });

  test("opens and closes the dialog", async () => {
    render(<AddIdeaDialog addIdea={vi.fn()} />);
    const user = userEvent.setup();

    const openDialogButton = screen.getByRole("button", { name: /add new/i });

    const nullDialog = screen.queryByRole("dialog");
    expect(nullDialog).not.toBeInTheDocument();

    await user.click(openDialogButton);

    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  test("shows error message when title is empty", async () => {
    render(<AddIdeaDialog addIdea={vi.fn()} />);
    const user = userEvent.setup();

    const openDialogButton = screen.getByRole("button", { name: /add new/i });
    await user.click(openDialogButton);

    // check inputs
    const [titleInput, descriptionInput] = screen.getAllByRole("textbox");
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Add" });

    expect(screen.queryByText(/please enter a title/i)).not.toBeInTheDocument();

    await user.click(submitButton);
    expect(screen.getByText(/please enter a title/i)).toBeInTheDocument();

    await user.type(titleInput, "sample title");
    expect(screen.queryByText(/please enter a title/i)).not.toBeInTheDocument();
  });

  test("validates description max length", async () => {
    render(<AddIdeaDialog addIdea={vi.fn()} />);
    const user = userEvent.setup();

    const openDialogButton = screen.getByRole("button", { name: /add new/i });
    await user.click(openDialogButton);

    const [, descriptionInput] = screen.getAllByRole("textbox");
    await user.type(descriptionInput, "*".repeat(99));
    expect(screen.queryByText(/99\/140/i)).not.toBeInTheDocument();

    await user.type(descriptionInput, "*");
    expect(screen.getByText(/100\/140/i)).toBeInTheDocument();
  });

  test("calls addIdea with form data on submit", async () => {
    const addIdeaMock = vi.fn();
    render(<AddIdeaDialog addIdea={addIdeaMock} />);
    const user = userEvent.setup();

    const openDialogButton = screen.getByRole("button", { name: /add new/i });
    await user.click(openDialogButton);

    const [titleInput, descriptionInput] = screen.getAllByRole("textbox");
    const formData = {
      title: "Sample Title",
      description: "desc",
    };
    await user.type(titleInput, formData.title);
    await user.type(descriptionInput, formData.description);

    const submitButton = screen.getByRole("button", { name: "Add" });
    await user.click(submitButton);

    expect(addIdeaMock).toHaveBeenCalledWith(formData);
  });
});
