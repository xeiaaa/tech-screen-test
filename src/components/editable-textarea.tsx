import { useRef } from "react";
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

  return (
    <InlineEdit
      placeholder={idea.description}
      className="w-full"
      showControls={false}
      onSave={(e) => {
        const value = (e?.target as HTMLInputElement).value;
        editIdea(idea.id, { description: value });
        console.log(value);
      }}
    >
      <Input
        as="textarea"
        rows={4}
        inputRef={textareaRef}
        onFocus={() => {
          // Move the cursor at the end of the text
          if (textareaRef.current) {
            const el = textareaRef.current;
            el.value = idea.description;
            const len = el.value.length;
            el.focus();
            el.setSelectionRange(len, len);
          }
        }}
      />
    </InlineEdit>
  );
};

export default EditableTextArea;
