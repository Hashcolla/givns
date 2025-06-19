import { cn } from "@/lib/utils";
import type {
  ComponentProps,
  ComponentPropsWithRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import type { Control } from "react-hook-form";

type FormTextInputProps = {
  prefixIcon?: ReactNode;
  sufixIcon?: ReactNode;
  name: string;
  control?: Control<any>;
} & ComponentPropsWithRef<"input">;

const FormTextInput = ({
  className,
  prefixIcon,
  sufixIcon,
  name,
  control,
  ...inputProps
}: FormTextInputProps) => {
  return (
    <div className="bg-accent dark:bg-accent/50 flex h-[50px] w-full space-x-2 overflow-hidden rounded-lg px-2">
      {prefixIcon && (
        <div className="flex h-full max-w-[50px] items-center justify-center overflow-hidden">
          {prefixIcon}
        </div>
      )}
      <input
        {...control?.register(name, {})}
        type="text"
        name={name}
        className={cn(
          "placeholder:text-secondary h-full w-full flex-1 rounded-lg outline-0",
          className
        )}
        {...inputProps}
      />
      {sufixIcon && (
        <div className="flex h-full max-w-[50px] items-center justify-center overflow-hidden">
          {sufixIcon}
        </div>
      )}
    </div>
  );
};

export default FormTextInput;
