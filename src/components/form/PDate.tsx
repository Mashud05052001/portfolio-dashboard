import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TQTimePickerRangeProps = {
  name: string;
  label: string;
  others?: Record<string, unknown>;
  format?: string;
  className?: string;
};

const PDate = ({
  name,
  label,
  others = {},
  format = "DD-MM-YYYY",
  className,
}: TQTimePickerRangeProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative space-y-2 text-sm ${className}`}>
          {label && (
            <label className="block text-zinc-700 font-medium -mb-0.5">
              {label}
            </label>
          )}
          <Form.Item>
            {
              <DatePicker
                format={format}
                hourStep={1}
                minuteStep={10}
                style={{ width: "100%", height: "2.5rem" }}
                {...field}
                {...others}
              />
            }
            {error && (
              <div className="absolute font-semibold left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
                <small>{error?.message}</small>
              </div>
            )}
          </Form.Item>
        </div>
      )}
    />
  );
};

export default PDate;
