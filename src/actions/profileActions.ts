import { supabaseServer } from "@/utils/supabase/server";

export const checkProfileExists = async (username: string) => {
  const client = await supabaseServer();

  const { error, data } = await client
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (error) {
    console.log("Error :", error);
    return { error: error?.message };
  }

  return { data, error: null };
};
