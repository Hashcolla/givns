import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import FormTextInput from "@/components/ui/FormTextInput";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { OnboardingPageFormProps } from "../account-type/page";
import { z } from "zod";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { updateContactDetails } from "@/actions/onboardingActions";

const OrganizationContactSchema = onboardingSchema.pick({
  orgEmail: true,
  orgLandNumber: true,
  orgWebsite: true,
  orgAddress: true,
});

export type OrganizationTypeFormValues = z.infer<
  typeof OrganizationContactSchema
>;

const OrganizationContactDetailsPage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { control, handleSubmit, watch } = useForm<OrganizationTypeFormValues>({
    resolver: zodResolver(OrganizationContactSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);

  const valueTypes = [
    "orgEmail",
    "orgLandNumber",
    "orgWebsite",
    "orgAddress",
  ] as const;

  const sub = watch(valueTypes);

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<OrganizationTypeFormValues> = async (data) => {
    try {
      await updateContactDetails(data);
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
        Contact information
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <div className="flex flex-col space-y-3">
        <FormTextInput
          name={valueTypes[0]}
          control={control}
          placeholder="Email Address"
        />
        <FormTextInput
          name={valueTypes[1]}
          control={control}
          placeholder="Land number"
        />
        <FormTextInput
          name={valueTypes[2]}
          control={control}
          placeholder="Website (optional)"
        />
        <FormTextInput
          name={valueTypes[3]}
          control={control}
          placeholder="Office address"
        />
      </div>
    </div>
  );
};

export default OrganizationContactDetailsPage;
