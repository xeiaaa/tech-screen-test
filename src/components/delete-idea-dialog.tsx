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

const DeleteIdeaDialog = ({ handleDelete }: { handleDelete: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="p-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-full sticky top-0 right-4"
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
          <Button onClick={handleDelete}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteIdeaDialog;
