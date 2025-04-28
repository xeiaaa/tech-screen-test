import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import AddIdeaDialog from "./add-idea-dialog";
import { Idea, SortOption } from "@/types";

interface IdeasHeaderProps {
  ideas: Idea[];
  sort: SortOption;
  setSort: (sortOption: SortOption) => void;
  addIdea: (values: Omit<Idea, "id" | "createdAt" | "updatedAt">) => void;
}

const IdeasHeader = ({ ideas, sort, setSort, addIdea }: IdeasHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl">💡 Idea Board</h1>
      {ideas.length > 0 && (
        <div className="flex max-[445px]:flex-col gap-2 sm:flex-row items-center justify-between">
          <div className="w-full flex gap-2 items-center">
            <span style={{ whiteSpace: "nowrap" }}>Sort by:</span>
            <Select value={sort} onValueChange={(a: SortOption) => setSort(a)}>
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
  );
};

export default IdeasHeader;
