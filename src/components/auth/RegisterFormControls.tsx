import React from "react";
import { Button } from "../ui/Button";

type RegisterFormControlsProps = {
  prevLabel?: string;
  nextLabel?: string;
  onNext?: () => void;
  onPrev?: () => void;
  currentPage: number;
  numberOfPages: number;
  isNextDisabled?: boolean;
  isLoading?: boolean;
};

const RegisterFormControls = ({
  prevLabel,
  nextLabel,
  onNext,
  onPrev,
  isLoading,
  isNextDisabled,
  currentPage,
}: RegisterFormControlsProps) => {
  return (
    <div className="mt-30 flex justify-between">
      <Button
        disabled={currentPage === 0}
        onClick={onPrev}
        variant={"text"}
        size={"sm"}
        className="text-surface/50"
      >
        {prevLabel || "Back"}
      </Button>

      <Button
        disabled={isNextDisabled || isLoading}
        onClick={onNext}
        variant={"rounded"}
        size={"lg"}
        className="px-5 py-3 text-sm font-bold"
      >
        {isLoading ? "Loading..." : nextLabel || "Next"}
      </Button>
    </div>
  );
};

export default RegisterFormControls;
