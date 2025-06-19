import AccountReviewPage from "@/components/auth/onboarding/account-review/page";
import AccountTypePage from "@/components/auth/onboarding/account-type/page";
import DocumentPage from "@/components/auth/onboarding/documents/page";
import OrganizationContactDetailsPage from "@/components/auth/onboarding/organization-contact-details/page";
import OrganizationNamePage from "@/components/auth/onboarding/organization-name/page";
import OrganizationTypePage from "@/components/auth/onboarding/organization-type/page";
import OrientationPage from "@/components/auth/onboarding/orientation/page";
import OrganizationOwnerDetailsPage from "@/components/auth/onboarding/owner-details/page";
import SocialMediaLinksPage from "@/components/auth/onboarding/social-media-links/page";
import OrganizationUploadLogoPage from "@/components/auth/onboarding/upload-logo/page";
import OrganizationVerificationPage from "@/components/auth/onboarding/verification/page";
import { OnboardingPagesType } from "@/types/onboardingTypes";
import { ReactNode } from "react";

export const onboardingPages: OnboardingPagesType[] = [
  {
    id: 1,
    pageName: "account-type",
    page: AccountTypePage,
  },
  {
    id: 2,
    pageName: "orientation",
    page: OrientationPage,
  },
  {
    id: 3,
    pageName: "organization-name",
    page: OrganizationNamePage,
  },
  {
    id: 4,
    pageName: "organization-type",
    page: OrganizationTypePage,
  },
  {
    id: 5,
    pageName: "organization-contact-details",
    page: OrganizationContactDetailsPage,
  },
  {
    id: 6,
    pageName: "owner-details", // previously "ownder-details", now corrected
    page: OrganizationOwnerDetailsPage,
  },
  {
    id: 7,
    pageName: "documents",
    page: DocumentPage,
  },
  {
    id: 8,
    pageName: "verification",
    page: OrganizationVerificationPage,
  },
  {
    id: 9,
    pageName: "upload-logo",
    page: OrganizationUploadLogoPage,
  },
  {
    id: 10,
    pageName: "social-media-links", // consider correcting to "social-media-links"
    page: SocialMediaLinksPage,
  },
];
