import "./App.css";
import { useIdeas } from "./hooks/use-ideas";
import EmptyState from "./components/empty-state";
import { Toaster } from "./components/ui/sonner";
import IdeaList from "./components/idea-list";
import IdeasHeader from "./components/ideas-header";

function App() {
  const { ideas, removeIdea, addIdea, editIdea, sort, setSort, latestId } =
    useIdeas();

  return (
    <>
      <div className="max-w-[1024px] mx-auto p-8 flex flex-col gap-8 h-full">
        {/* Header */}
        <IdeasHeader
          ideas={ideas}
          sort={sort}
          setSort={setSort}
          addIdea={addIdea}
        />

        {/* List */}
        {ideas.length === 0 ? (
          <EmptyState addIdea={addIdea} />
        ) : (
          <IdeaList
            ideas={ideas}
            latestId={latestId}
            editIdea={editIdea}
            removeIdea={removeIdea}
          ></IdeaList>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
