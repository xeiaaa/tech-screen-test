# Developer Comments

- I chose to use a modal for creating a new idea instead of adding an empty tile with placeholder content. This prevents the board from being cluttered with multiple empty tiles if the user repeatedly clicks the “Add New” button.

Empty State

- ui to show when there are no ideas yet
- has an Add New Idea button

Header

- allows user to sort by
  Created: Newest First
  Created: Oldest First
  Title: A -> Z
  Title: Z -> A
- add new idea button

Add New Idea Button

- opens a dialog containing a form

Card

- new cards added have some highlight to show

Local Storage for data persistence

# Update April 28, 2025

- Renamed “Title” section and added favicon
- Changed `types.d.ts` to `types.ts`
- Switched `Idea.createdAt` and `Idea.updatedAt` to use `number` timestamps
- Persisting sort order in the URL query string
- Integrated React Hook Form for all forms

# Update April 29, 2025

- Delete button shows when 1) Idea card is hovered and 2) title or description is focused
