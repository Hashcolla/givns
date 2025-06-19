import FormTextInput from "@/components/ui/FormTextInput";
import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { OnboardingPageFormProps } from "../account-type/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { z } from "zod";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { updateOrgName } from "@/actions/onboardingActions";

const organizationNameSchema = onboardingSchema.pick({ orgName: true });

export type OrganizationNameFormValues = z.infer<typeof organizationNameSchema>;

const OrganizationNamePage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { control, handleSubmit, watch } = useForm<OrganizationNameFormValues>({
    resolver: zodResolver(organizationNameSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);

  const sub = watch("orgName");

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<OrganizationNameFormValues> = async (data) => {
    try {
      await updateOrgName(data.orgName);
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
        What's your organization name?
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <FormTextInput
        control={control}
        name="orgName"
        placeholder="eg: UNESCO"
      />
    </div>
  );
};

export default OrganizationNamePage;
