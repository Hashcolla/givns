"use client";

import { InputHTMLAttributes } from "react";
import { Control } from "react-hook-form";

type GlowedRadioButtonProps = {
  label?: string;
  defaultChecked?: boolean;
  name: string;
  control?: Control<any>;
} & InputHTMLAttributes<HTMLInputElement>;

const GlowedRadioButton = ({
  label,
  name,
  control,
  ...inputProps
}: GlowedRadioButtonProps) => {
  return (
    <label className="group has-checked:border-primary/50 radio-btn cursor-pointer text-surface/50 relative flex h-13  items-center gap-3 rounded-lg border-2 px-2 transition-colors duration-500">
      <div className="group-has-checked:bg-primary/10 blur-md absolute -inset-3 rounded-lg transition-colors duration-500"></div>
      <input
        {...control?.register(name)}
        type="radio"
        name={name}
        className="accent-primary relative"
        {...inputProps}
      />
      <span className="relative">{label}</span>
    </label>
  );
};

export default GlowedRadioButton;
