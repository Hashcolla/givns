import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import Bio from "@/components/ui/Bio";
import React, { useEffect } from "react";
import { UploadDocument } from "../documents/page";
import { OnboardingPageFormProps } from "../account-type/page";
import { SubmitHandler } from "react-hook-form";
import { useOnboardingStore } from "@/stores/onboardingStore";

const OrganizationVerificationPage = ({
  ref,
  onError,
  onSuccess,
  onChangeValue,
}: OnboardingPageFormProps) => {
  const { setLoading } = useOnboardingStore((state) => state);

  const onSubmit = async () => {
    onSuccess?.();
  };

  useEffect(() => {
    if (ref) {
      ref.current = () => {
        setLoading(true);
        onSubmit();
      };
    }

    return () => {
      if (ref) ref.current = null;
    };
  }, [ref, onSubmit, onError]);

  return (
    <div
      className={`transition-all min-w-[var(--register-form-width)] duration-300`}
    >
      <h1 className="text-foreground mt-20 text-2xl font-semibold">
        Verification
      </h1>
      <Bio>Upload organization certificate or proof of registration</Bio>
      <div className="mt-10"></div>
      <h2>Upload Images</h2>
      <UploadDocument />
    </div>
  );
};

export default OrganizationVerificationPage;
