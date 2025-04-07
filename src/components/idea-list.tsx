import { Idea } from "@/types";
import IdeaCard from "./idea-card";

interface IdeaListProps {
  ideas: Idea[];
  latestId: string | null;
  editIdea: (
    id: string,
    values: { title?: string; description?: string }
  ) => void;
  removeIdea: (id: string) => void;
}

const IdeaList = ({ ideas, latestId, editIdea, removeIdea }: IdeaListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {ideas.map((idea) => (
        <IdeaCard
          idea={idea}
          latestId={latestId}
          editIdea={editIdea}
          removeIdea={removeIdea}
          key={idea.id}
        />
      ))}
    </div>
  );
};

export default IdeaList;
