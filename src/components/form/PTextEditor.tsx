import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import { Controller, useFormContext } from "react-hook-form";

import Toolbar from "./PToolbar";

const TextEditor = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      ListItem,
    ],
    content: value ?? "",
    editorProps: {
      attributes: {
        class:
          "rounded-b-lg bg-white p-4 outline-none min-h-[200px] border border-t-0 border-[#EAECF0]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="relative">
      <label className="block text-zinc-700  font-medium absolute -top-8">
        {label}
      </label>

      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

const PTextEditor = ({
  name,
  className,
  label,
}: {
  name: string;
  className?: string;
  label: string;
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${className} mt-8  rounded-md border border-[#b2b2b2]`}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <TextEditor
              value={field.value as string}
              onChange={field.onChange}
              label={label}
            />
            {error && (
              <div className="absolute left-1 bottom-[-1.4rem] font-semibold text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
                <small>{error?.message}</small>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default PTextEditor;
