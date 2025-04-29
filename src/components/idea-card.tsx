import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Idea } from "@/types";
import { InlineEdit } from "rsuite";
import DeleteIdeaDialog from "./delete-idea-dialog";
import EditableTextArea from "./editable-textarea";
import { useRef, useState } from "react";

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
  const [isInteracting, setIsInteracting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => setIsInteracting(true);
  const handleBlur = (e: React.FocusEvent) => {
    // Check if the next focused element is still inside the card
    if (cardRef.current && !cardRef.current.contains(e.relatedTarget)) {
      setIsInteracting(false);
    }
  };

  return (
    <Card
      className={cn(
        `w-full group relative overflow-x-auto`,
        idea.id === latestId ? "animate-highlight" : ""
      )}
      key={idea.id}
      ref={cardRef}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
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
            isVisible={isInteracting}
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
