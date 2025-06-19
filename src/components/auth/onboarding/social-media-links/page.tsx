"use client";

import { Button } from "@/components/ui/Button";
import FormTextInput from "@/components/ui/FormTextInput";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { OnboardingPageFormProps } from "../account-type/page";
import { useOnboardingStore } from "@/stores/onboardingStore";
import {
  finishOnboardingForm,
  updateSocialLinks,
} from "@/actions/onboardingActions";
import { useRouter } from "next/navigation";

const socialLinksSchema = onboardingSchema.pick({
  facebook: true,
  instagram: true,
  twitter: true,
  otherLinks: true,
});

export type SocialLinksFormValues = z.infer<typeof socialLinksSchema>;

const SocialMediaLinksPage = ({
  ref,
  onError,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { control, handleSubmit, watch } = useForm<SocialLinksFormValues>({
    resolver: zodResolver(socialLinksSchema),
  });

  const { setLoading } = useOnboardingStore((state) => state);

  const valueTypes = ["facebook", "instagram", "twitter"];

  const [linksFields, setLinksFields] = useState<typeof valueTypes>(valueTypes);

  const sub = watch(["facebook", "instagram", "twitter"]);

  const router = useRouter();

  useEffect(() => {
    onChangeValue?.();
  }, [sub]);

  const onSubmit: SubmitHandler<SocialLinksFormValues> = async (data) => {
    try {
      await updateSocialLinks(data);
      const { status } = await finishOnboardingForm();
      if (status === "success") {
        router.replace("/");
      }
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
      className={`min-w-[var(--register-form-width)] transition-all duration-300`}
    >
      <h1 className="text-foreground mt-20 text-2xl font-semibold">
        Social media links
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <div className="flex flex-col space-y-3">
        {linksFields.map((item, index) => (
          <FormTextInput
            key={index}
            name={
              index > valueTypes.length - 1
                ? `otherLinks.link-${index}`
                : valueTypes[index]
            }
            control={control}
            placeholder={item}
          />
        ))}

        <div className="mt-5 flex justify-end">
          <Button
            disabled={linksFields.length >= 5}
            onClick={() =>
              setLinksFields((prev) => [...prev, `link-${prev.length + 1}`])
            }
            size={"sm"}
            className="flex-center bg-input/50 text-foreground/60 px-2"
          >
            Add item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinksPage;
