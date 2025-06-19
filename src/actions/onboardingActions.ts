"use server";

import { OrganizationTypeFormValues } from "@/components/auth/onboarding/organization-contact-details/page";
import { OrgOwnerDetailsFormValues } from "@/components/auth/onboarding/owner-details/page";
import { SocialLinksFormValues } from "@/components/auth/onboarding/social-media-links/page";
import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const submitAccountType = async (data: string) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error: accError } = await client
    .from("users")
    .update({ account_type: data })
    .eq("email", user?.email);

  if (accError) throw new Error(accError?.message);

  if (data === "organization") {
    try {
      await addOrgToDBAndUser();
    } catch (error: any) {
      throw error;
    }
  }
};

export const updatePurpose = async (purpose: string) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("users")
    .update({ purpose })
    .eq("email", user?.email);

  if (error) throw error;
};

export const addOrgToDBAndUser = async () => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error: orgError, data } = await client
    .from("organization")
    .upsert({ user_id: user?.id }, { onConflict: "user_id" })
    .select("org_id")
    .single();

  const { error: userError } = await client
    .from("users")
    .update({ org_id: data?.org_id })
    .eq("email", user?.email);

  if (userError) throw userError?.message;
  if (orgError) throw orgError?.message;
};

export const updateOrgName = async (orgName: string) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("organization")
    .update({ org_name: orgName })
    .eq("email", user?.email);

  if (error) throw error;
};

export const updateOrgType = async (data: string) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("organization")
    .update({ org_type: data })
    .eq("email", user?.email);

  if (error) throw error;
};

export const updateContactDetails = async (
  data: OrganizationTypeFormValues,
) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("organization")
    .update({
      org_email: data.orgEmail,
      org_phone: data.orgLandNumber,
      org_website: data.orgWebsite,
      org_address: data.orgAddress,
    })
    .eq("email", user?.email);

  if (error) throw error;
};

export const updateOwnderDetails = async (data: OrgOwnerDetailsFormValues) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("organization")
    .update({
      owner_email: data.ownerEmail,
      owner_phone: data.ownerPhone,
      owner_role: data.ownerRole,
      owner_name: data.ownerName,
    })
    .eq("email", user?.email);

  if (error) throw error;
};

export const updateDocType = async (data: string) => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("organization")
    .update({ doc_type: [data] })
    .eq("email", user?.email);

  if (error) throw error;
};

export const updateSocialLinks = async (data: SocialLinksFormValues) => {
  const client = await supabaseServer();

  console.log("data.otherLinks", data.otherLinks);

  const otherLinks = Object.values(data.otherLinks ?? {}).map((link) => link);

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("organization")
    .update({
      instagram: data.instagram,
      facebook: data.facebook,
      twitter: data.twitter,
      other_links: otherLinks,
    })
    .eq("email", user?.email);

  if (error) throw error;
};

export const finishOnboardingForm = async () => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { error } = await client
    .from("users")
    .update({ hasOnboardingFormFilled: true })
    .eq("email", user?.email);

  if (error) throw error;

  return { status: "success" };
};
