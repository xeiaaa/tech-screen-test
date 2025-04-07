import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Idea } from "@/types";
import { InlineEdit } from "rsuite";
import DeleteIdeaDialog from "./delete-idea-dialog";
import EditableTextArea from "./editable-textarea";

interface IdeaCardProps {
  idea: Idea;
  latestId: string | null;
  editIdea: (
    id: string,
    values: { title?: string; description?: string }
  ) => void;
  removeIdea: (id: string) => void;
}

const IdeaCard = ({ idea, latestId, editIdea, removeIdea }: IdeaCardProps) => {
  return (
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
                // console.log(value);
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
  );
};

export default IdeaCard;
