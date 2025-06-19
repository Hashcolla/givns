"use server";

import { editProfileSchema } from "@/schema/schema";
import { supabaseServer } from "@/utils/supabase/server";
import { getUserEmail } from "./authActions";

export const updateProfileDetails = async (
  prevState: unknown,
  formData: FormData,
) => {
  const name = formData.get("edit-name") as string;
  const bio = formData.get("edit-bio") as string;
  const username = formData.get("edit-username") as string;
  console.log(name, bio, username);

  if (!name && !bio && !username) {
    return { error: ["No changes made to the profile."], data: null };
  }

  const { error, success } = editProfileSchema.safeParse({
    name,
    bio,
    username,
  });

  if (error) {
    const errors = error.errors.map((err) => err.message);
    return { error: errors, data: null };
  }

  const availableInputs = {
    ...(name ? { full_name: name } : {}),
    ...(bio ? { bio } : {}),
    ...(username ? { username } : {}),
  };

  const email = await getUserEmail();

  const client = await supabaseServer();

  const { error: dbError } = await client
    .from("users")
    .update({ ...availableInputs })
    .eq("email", email);

  if (dbError) {
    return { error: [dbError.message], data: null };
  }

  return { error: null, data: "successfully updated profile" };
};

export const isThisMe = async (email: string) => {
  const myEmail = await getUserEmail();

  if (myEmail === email) {
    return true;
  }

  return false;
};

export const hasFilledOnboardingForm = async () => {
  const client = await supabaseServer();
  const email = await getUserEmail();

  const { error, data } = await client
    .from("users")
    .select("hasOnboardingFormFilled")
    .eq("email", email);

  if (error) {
    return { error: error.message, data: null };
  }
return { data: data && data[0]?.hasOnboardingFormFilled, error: null };
};
