"use client";

import { submitAccountType } from "@/actions/onboardingActions";
import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { RefObject, useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const accountTypeScehma = onboardingSchema.pick({ accountType: true });

export type AccountTypeFormValues = z.infer<typeof accountTypeScehma>;

export type OnboardingPageFormProps = {
  ref?: RefObject<(() => void) | null>;
  onError?: (error: FieldErrors) => void;
  onSuccess?: () => void;
  onChangeValue?: () => void;
};

const AccountTypePage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { control, handleSubmit, watch, formState } =
    useForm<AccountTypeFormValues>({
      resolver: zodResolver(accountTypeScehma),
    });

  const sub = watch("accountType");

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<AccountTypeFormValues> = async (data) => {
    const accType = data.accountType;

    try {
      const res = submitAccountType(accType);
      if (onSuccess) onSuccess();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (ref) {
      ref.current = handleSubmit(onSubmit, onError);
    }

    return () => {
      if (ref) ref.current = null;
    };
  }, [ref, onSubmit, onError, handleSubmit]);

  return (
    <div
      className={`transition-all min-w-[var(--register-form-width)] duration-300`}
    >
      <h1 className="text-foreground mt-20 text-2xl font-semibold">
        You are signing up as?
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <form className="flex flex-col space-y-3">
        <GlowedRadioButton
          control={control}
          name="accountType"
          label="Personal"
          value="personal"
          defaultChecked
        />
        <GlowedRadioButton
          control={control}
          name="accountType"
          label="Organization"
          value="organization"
        />
      </form>
    </div>
  );
};

export default AccountTypePage;
