/* eslint-disable no-console */
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Editor } from "@tiptap/react";

// Generic handler to process button commands
const handleClick = (command: string, editor: Editor | null) => {
  if (!editor) return;
  switch (command) {
    case "bold":
      editor?.chain().focus().toggleBold().run();
      break;
    case "italic":
      editor?.chain().focus().toggleItalic().run();
      break;
    case "underline":
      editor.chain().focus().toggleUnderline().run();
      break;
    case "strikethrough":
      editor.chain().focus().toggleStrike().run();
      break;
    case "alignLeft":
      editor.chain().focus().setTextAlign("left").run();
      break;
    case "alignCenter":
      editor.chain().focus().setTextAlign("center").run();
      break;
    case "alignRight":
      editor.chain().focus().setTextAlign("right").run();
      break;
    case "unorderedList":
      editor.chain().focus().toggleBulletList().run();
      break;
    case "heading1":
      editor.chain().focus().toggleHeading({ level: 1 }).run();
      break;
    case "heading2":
      editor.chain().focus().toggleHeading({ level: 2 }).run();
      break;
    case "heading3":
      editor.chain().focus().toggleHeading({ level: 3 }).run();
      break;
    case "heading4":
      editor.chain().focus().toggleHeading({ level: 4 }).run();
      break;
    case "heading5":
      editor.chain().focus().toggleHeading({ level: 5 }).run();
      break;
    case "heading6":
      editor.chain().focus().toggleHeading({ level: 6 }).run();
      break;
    case "code":
      editor.chain().focus().toggleCodeBlock().run();
      break;
  }
};

type ToolbarButtonProps = {
  Icon: React.ElementType;
  command: string;
  onClick: (command: string, editor: Editor | null) => void;
  editor: Editor | null;
};

const ToolbarButton = ({
  Icon,
  command,
  onClick,
  editor,
}: ToolbarButtonProps) => {
  return (
    <button
      className="text-shark-500 transition-all hover:text-shark-800"
      onClick={() => onClick(command, editor)}
    >
      {Icon && <Icon className="size-5" />}
    </button>
  );
};

type ToolbarSectionProps = {
  buttons: { Icon: React.ElementType; command: string }[];
  editor: Editor | null;
};

const ToolbarSection = ({ buttons, editor }: ToolbarSectionProps) => {
  return (
    <div className="mr-4 inline-flex items-center gap-2.5 border-r border-r-[#EAECF0] py-3 pr-4 last:mr-0 last:border-r-0">
      {buttons.map((button, idx) => (
        <ToolbarButton
          key={idx}
          Icon={button.Icon}
          command={button.command}
          editor={editor}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const toolbarSections = [
    {
      buttons: [
        { Icon: Heading1, command: "heading1" },
        { Icon: Heading2, command: "heading2" },
        { Icon: Heading3, command: "heading3" },
        { Icon: Heading4, command: "heading4" },
        { Icon: Heading5, command: "heading5" },
        { Icon: Heading6, command: "heading6" },
      ],
    },
    {
      buttons: [
        { Icon: Bold, command: "bold" },
        { Icon: Italic, command: "italic" },
        { Icon: Underline, command: "underline" },
        { Icon: Strikethrough, command: "strikethrough" },
      ],
    },
    {
      buttons: [
        { Icon: AlignLeft, command: "alignLeft" },
        { Icon: AlignCenter, command: "alignCenter" },
        { Icon: AlignRight, command: "alignRight" },
      ],
    },
    {
      buttons: [
        { Icon: List, command: "unorderedList" },
        { Icon: Code, command: "code" },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center rounded-t-lg border border-b-0 border-[#EAECF0] bg-[#F2F4F7] px-4">
      <div>
        {toolbarSections.map((section, idx) => (
          <ToolbarSection key={idx} buttons={section.buttons} editor={editor} />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
