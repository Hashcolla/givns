import { OnboardingPageFormProps } from "@/components/auth/onboarding/account-type/page";

export type OnboardingPagesType = {
  id: number;
  pageName: OnboardingPageType;
  page: React.ComponentType<OnboardingPageFormProps>;
};

export type OnboardingPageType =
  | "account-review"
  | "account-type"
  | "documents"
  | "organization-contact-details"
  | "organization-name"
  | "organization-type"
  | "orientation"
  | "owner-details"
  | "social-media-links"
  | "upload-logo"
  | "verification";
