import { useRef, useState } from "react";
import { Idea } from "@/types";
import { InlineEdit, Input } from "rsuite";

const EditableTextArea = ({
  idea,
  editIdea,
}: {
  idea: Idea;
  editIdea: (
    id: string,
    values: { title?: string; description?: string }
  ) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const DESCRIPTION_MAX_LENGTH = 140;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(idea.description);

  return (
    <div className="relative">
      <InlineEdit
        placeholder={idea.description || "Add more details.."}
        className={`w-full ${!idea.description.trim() && "text-gray-300"}`}
        showControls={false}
        onSave={(e) => {
          const value = (e?.target as HTMLInputElement).value;
          editIdea(idea.id, { description: value });
          // console.log(value);
        }}
      >
        <Input
          as="textarea"
          rows={4}
          inputRef={textareaRef}
          maxLength={DESCRIPTION_MAX_LENGTH}
          onBlurCapture={() => {
            setIsEditing(false);
          }}
          className="pr-14"
          onFocus={() => {
            // Move the cursor at the end of the text
            if (textareaRef.current) {
              setIsEditing(true);
              const el = textareaRef.current;
              el.value = idea.description;
              const len = el.value.length;
              el.focus();
              el.setSelectionRange(len, len);
            }
          }}
          onChangeCapture={(
            e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setValue(e.currentTarget.value);
          }}
        />
      </InlineEdit>
      {isEditing && value.length >= 100 && (
        <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {value.length}/{DESCRIPTION_MAX_LENGTH}
        </span>
      )}
    </div>
  );
};

export default EditableTextArea;
