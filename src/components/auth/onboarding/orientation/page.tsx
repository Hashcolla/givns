import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import React, { useEffect } from "react";
import { OnboardingPageFormProps } from "../account-type/page";
import {
  onboardingSchema,
  purposeInputValues,
} from "@/schema/onboardingSchema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePurpose } from "@/actions/onboardingActions";
import { useOnboardingStore } from "@/stores/onboardingStore";

const purposeSchema = onboardingSchema.pick({ purpose: true });

export type PurposeFormValues = z.infer<typeof purposeSchema>;

const OrientationPage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  //
  const { control, watch, handleSubmit } = useForm<PurposeFormValues>({
    resolver: zodResolver(purposeSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);
  const sub = watch("purpose");

  useEffect(() => {
    onChangeValue?.();
  }, [sub, onChangeValue]);

  const onSubmit: SubmitHandler<PurposeFormValues> = async (data) => {
    const { purpose } = data;
    try {
      await updatePurpose(purpose);
      onSuccess?.();
    } catch (error: any) {
      onError?.(error.message);
    }
  };

  useEffect(() => {
    if (ref) {
      ref.current = () => {
        setLoading(true);
        handleSubmit(onSubmit, onError)();
      };
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
        What's your purpose?
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <div className="flex flex-col space-y-3">
        {purposeInputValues.map(({ value, label }, index: number) => (
          <GlowedRadioButton
            key={value}
            defaultChecked={index === 0 ? true : false}
            control={control}
            name="purpose"
            label={label}
            value={index === 0 ? "personal" : value}
          />
        ))}
      </div>
    </div>
  );
};

export default OrientationPage;
