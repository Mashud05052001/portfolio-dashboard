import { useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "../../styles/form.style.css";

type TQInputProps = {
  label?: string;
  name: string;
  type: "text" | "email" | "number" | "textarea" | "password";
  required?: boolean;
  placeholder?: string;
  others?: Record<string, unknown>;
  rows?: number;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
};

const PInput = ({
  label,
  name,
  type,
  placeholder,
  rows = 2,
  min,
  max,
  className,
  others,
  disabled = false,
}: TQInputProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const generateField = (
    field: ControllerRenderProps<FieldValues, string>,
    error: FieldError | undefined
  ) => {
    const {
      value: fieldValue = "",
      onChange: fieldOnChange,
      ...restFieldProps
    } = field;
    const commonClassName = `flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none q-input ${
      error ? "border-red-400" : ""
    }`;

    if (type === "password") {
      return (
        <div className="relative">
          <input
            className={commonClassName}
            placeholder={placeholder}
            type={visiblePassword ? "text" : "password"}
            disabled={disabled}
            value={fieldValue} // Always controlled
            onChange={fieldOnChange}
            {...restFieldProps}
            {...others}
          />
          <div
            onClick={() => setVisiblePassword(!visiblePassword)}
            className="absolute top-2.5 right-4 cursor-pointer opacity-60"
          >
            {visiblePassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </div>
        </div>
      );
    }
    if (type === "textarea") {
      return (
        <textarea
          className={`${commonClassName} h-auto`}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          value={fieldValue}
          onChange={(e) => {
            const value = e.target.value;
            fieldOnChange(value);
          }}
          {...restFieldProps}
          {...others}
        />
      );
    }
    return (
      <input
        className={commonClassName}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        value={fieldValue}
        onChange={(e) => {
          const value = e.target.value;
          fieldOnChange(type === "number" ? Number(value) : value);
        }}
        disabled={disabled}
        {...restFieldProps}
        {...others}
      />
    );
  };
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative ${className} `}>
          <div className="space-y-2 text-sm">
            {label && (
              <label className="block text-zinc-700  font-medium -mb-0.5">
                {label}
              </label>
            )}
            {generateField(field, error)}

            {error && (
              <div className="absolute left-1 bottom-[-1.4rem] font-semibold text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
                <small>{error?.message}</small>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default PInput;
