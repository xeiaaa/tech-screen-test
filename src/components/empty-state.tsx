import { LightbulbOff } from "lucide-react";
import AddIdeaDialog from "./add-idea-dialog";
import { Idea } from "@/types";

const EmptyState = ({
  addIdea,
}: {
  addIdea: (values: Omit<Idea, "id" | "createdAt" | "updatedAt">) => void;
}) => {
  return (
    <div className="flex flex-grow justify-center items-center border-2 border-dashed rounded-2xl">
      <div className="flex flex-col gap-8 justify-center items-center">
        <LightbulbOff size={96} />
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-2xl">No ideas yet.</p>
          <p className="text-lg">Get started by creating a new idea.</p>

          <AddIdeaDialog addIdea={addIdea} />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
