"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const getUserEmail = async () => {
  const client = await supabaseServer();
  const {
    data: { user },
  } = await client.auth.getUser();

  return user?.email || null;
};

export const googleSign = async () => {
  const client = await supabaseServer();

  const { error, data } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SITE_URL}/api/auth/callback`,
    },
  });

  if (error) throw error;

  const url = data.url;

  redirect(url);
};

export const addUserToTable = async () => {
  const client = await supabaseServer();
  const email = await getUserEmail();

  const username = email?.split("@")[0] || "user_" + Date.now();

  const { data, error } = await client.auth.getUser();

  if (error) throw error;

  if (!data.user) {
    throw new Error("No user found");
  }

  const provider = data.user.app_metadata.provider;

  const { error: insertError } = await client
    .from("users")
    .insert({ provider, hasOnboardingFormFilled: false, username });

  if (insertError) {
    throw insertError;
  }
};

export const checkFormFilled = async () => {
  const client = await supabaseServer();

  const {
    data: { user },
  } = await client.auth.getUser();

  const { data, error } = await client
    .from("users")
    .select("hasOnboardingFormFilled")
    .eq("user_id", user?.id)
    .single();

  if (!error) {
    return data.hasOnboardingFormFilled as boolean;
  }

  throw error;
};

export const signOut = async () => {
  const client = await supabaseServer();

  const { error } = await client.auth.signOut();

  if (error) {
    return { state: "error" };
  }

  redirect("/");
};

export const getUser = async () => {
  const client = await supabaseServer();

  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (user) {
    return { user };
  }

  return { error: error };
};
