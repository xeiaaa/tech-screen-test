import "./App.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { InlineEdit } from "rsuite";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import AddIdeaDialog from "./components/add-idea-dialog";
import EditableTextArea from "./components/editable-textarea";
import { useIdeas } from "./hooks/use-ideas";
import EmptyState from "./components/empty-state";
import { cn, formatDate } from "./lib/utils";
import DeleteIdeaDialog from "./components/delete-idea-dialog";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { ideas, removeIdea, addIdea, editIdea, sort, setSort, latestId } =
    useIdeas();

  return (
    <>
      <div className="max-w-[1024px] mx-auto p-8 flex flex-col gap-8 h-full">
        {/* Header */}
        {/* Don't show header when there are no ideas yet */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">💡 Idea Board</h1>
          {ideas.length > 0 && (
            <div className="flex max-[445px]:flex-col gap-2 sm:flex-row items-center justify-between">
              <div className="w-full flex gap-2 items-center">
                <span style={{ whiteSpace: "nowrap" }}>Sort by:</span>
                <Select
                  value={sort}
                  onValueChange={(
                    a:
                      | "creation-date-asc"
                      | "creation-date-desc"
                      | "title-asc"
                      | "title-desc"
                  ) => setSort(a)}
                >
                  <SelectTrigger className="min-[445px]:w-[200px] max-sm:grow">
                    <SelectValue placeholder="Sort by:" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creation-date-desc">
                      Created: Newest First
                    </SelectItem>
                    <SelectItem value="creation-date-asc">
                      Created: Oldest First
                    </SelectItem>
                    <SelectItem value="title-asc">Title: A → Z</SelectItem>
                    <SelectItem value="title-desc">Title: Z → A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <AddIdeaDialog addIdea={addIdea} />
            </div>
          )}
        </div>

        {/* List */}
        {ideas.length === 0 ? (
          <EmptyState addIdea={addIdea} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {ideas.map((idea) => (
              <Card
                className={cn(
                  `w-full group relative overflow-x-auto`,
                  idea.id === latestId ? "animate-highlight" : ""
                )}
                key={idea.id}
              >
                <CardHeader>
                  <div className="flex flex-row items-start justify-between">
                    <CardTitle>
                      <InlineEdit
                        defaultValue={idea.title}
                        className="w-full !border-0 hover:bg-none"
                        showControls={false}
                        onSave={(e) => {
                          const value = (e?.target as HTMLInputElement).value;
                          editIdea(idea.id, { title: value });
                          console.log(value);
                        }}
                      />
                    </CardTitle>
                    <DeleteIdeaDialog
                      handleDelete={() => {
                        removeIdea(idea.id);
                      }}
                    ></DeleteIdeaDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <EditableTextArea idea={idea} editIdea={editIdea} />
                  <div className="flex flex-col gap-1 px-2 text-right">
                    <span className="text-xs text-gray-400">
                      Created {formatDate(idea.createdAt)}
                    </span>
                    <span className="text-xs text-gray-400">
                      Updated {formatDate(idea.updatedAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
