import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type TSelectOption = { key: string; label: string };

type TProps = {
  name: string;
  label: string;
  className?: string;
};

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["clean"],
];

export default function PQuillTextEditor({ name, label, className }: TProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className}  min-h-96 space-y-2 relative`}>
          <label htmlFor={name} className="text-zinc-700 font-medium">
            {label}
          </label>
          <ReactQuill
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
            modules={{ toolbar: toolbarOptions }}
            className="h-72 rounded-xl"
          />
          {error && (
            <div className="absolute left-[0.1rem] bottom-[-1.3rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
              <small>{error.message}</small>
            </div>
          )}
        </div>
      )}
    />
  );
}
