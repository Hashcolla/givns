import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import {
  onboardingSchema,
  organizationTypeValues,
} from "@/schema/onboardingSchema";
import React, { useEffect } from "react";
import { z } from "zod";
import { OnboardingPageFormProps } from "../account-type/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { object } from "zod/v4-mini";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { updateOrgType } from "@/actions/onboardingActions";

const organizationTypeSchema = onboardingSchema.pick({ orgType: true });

export type OrganizationTypeFormValues = z.infer<typeof organizationTypeSchema>;

const OrganizationTypePage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { control, handleSubmit, watch } = useForm<OrganizationTypeFormValues>({
    resolver: zodResolver(organizationTypeSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);

  const valueType = "orgType";

  const sub = watch(valueType);

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<OrganizationTypeFormValues> = async (data) => {
    try {
      await updateOrgType(data.orgType);
      onSuccess?.();
    } catch (error: any) {
      console.log(error.message);
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
        What type of organization are you?
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <div className="flex flex-col space-y-3">
        {organizationTypeValues.map(({ value, label }, index: number) => (
          <GlowedRadioButton
            key={value}
            defaultChecked={index === 0 ? true : false}
            control={control}
            name={valueType}
            label={label}
            value={index === 0 ? "personal" : value}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationTypePage;
