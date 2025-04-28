import { useState } from "react";
import { Idea } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface AddIdeaFormInput {
  title: string;
  description: string;
}

const AddIdeaDialog = ({
  addIdea,
}: {
  addIdea: (values: Omit<Idea, "id" | "createdAt" | "updatedAt">) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddIdeaFormInput>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [open, setOpen] = useState(false);

  const DESCRIPTION_MAX_LENGTH = 140;

  const description = watch("description");

  const onSubmit: SubmitHandler<AddIdeaFormInput> = (data) => {
    addIdea(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          <FaPlus />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Idea</DialogTitle>
          <DialogDescription>
            Add a title and short description for your idea.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <Input
              autoFocus
              placeholder="Title"
              {...register("title", { required: "Please enter a title." })}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Textarea
              placeholder="Description"
              maxLength={DESCRIPTION_MAX_LENGTH}
              // onChange={(e) => setDescription(e.target.value)}
              className="pr-14 h-24 resize-none whitespace-break-spaces"
              {...register("description")}
              style={{ wordBreak: "break-word" }}
            />
            {description.length >= 100 && (
              <span className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                {description.length}/{DESCRIPTION_MAX_LENGTH}
              </span>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIdeaDialog;
