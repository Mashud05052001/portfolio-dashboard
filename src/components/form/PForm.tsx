import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TConfig = {
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, unknown>;
  resolver?: unknown;
};
type TProps = TConfig & {
  children: ReactNode;
  className?: string;
};

export default function PForm({
  children,
  className,
  onSubmit,
  defaultValues,
  resolver,
}: TProps) {
  const formConfig: Record<string, unknown> = {};
  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form
        className={`${className}`}
        onSubmit={methods.handleSubmit((data) => {
          onSubmit(data);
          // methods.reset();
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
}
