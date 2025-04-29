import { useState } from "react";
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
import { FaTrash } from "react-icons/fa";
import { cn } from "@/lib/utils";

const DeleteIdeaDialog = ({
  handleDelete,
  isVisible,
}: {
  handleDelete: () => void;
  isVisible: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "p-2 text-gray-500 transition-opacity rounded-full sticky top-0 right-4",
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          tabIndex={isVisible ? 0 : -1}
          onClick={() => setOpen(true)}
          aria-label="Delete"
        >
          <FaTrash size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            idea?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteIdeaDialog;
