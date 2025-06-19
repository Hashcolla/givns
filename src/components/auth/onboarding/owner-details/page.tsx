import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import FormTextInput from "@/components/ui/FormTextInput";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { OnboardingPageFormProps } from "../account-type/page";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { updateOwnderDetails } from "@/actions/onboardingActions";

const orgOwnerDetailsSchema = onboardingSchema.pick({
  ownerName: true,
  ownerEmail: true,
  ownerRole: true,
  ownerPhone: true,
});

export type OrgOwnerDetailsFormValues = z.infer<typeof orgOwnerDetailsSchema>;

const OrganizationOwnerDetailsPage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { control, handleSubmit, watch } = useForm<OrgOwnerDetailsFormValues>({
    resolver: zodResolver(orgOwnerDetailsSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);

  const valueTypes = [
    "ownerName",
    "ownerRole",
    "ownerEmail",
    "ownerPhone",
  ] as const;

  const sub = watch(valueTypes);

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<OrgOwnerDetailsFormValues> = async (data) => {
    try {
      await updateOwnderDetails(data);
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
        Owner's details
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <div className="flex flex-col space-y-3">
        <FormTextInput
          control={control}
          name={valueTypes[0]}
          placeholder="Full name"
        />
        <FormTextInput
          control={control}
          name={valueTypes[1]}
          placeholder="Job role"
        />
        <FormTextInput
          control={control}
          name={valueTypes[2]}
          placeholder="Email address"
        />
        <FormTextInput
          control={control}
          name={valueTypes[3]}
          placeholder="Phone number"
        />
      </div>
    </div>
  );
};

export default OrganizationOwnerDetailsPage;
