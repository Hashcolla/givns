"use server";

import { postSchema } from "@/schema/postSchema";
import { PostType } from "@/types/mainTypes";
import { supabaseServer } from "@/utils/supabase/server";

export const createPost = async (formData: FormData) => {
  const client = await supabaseServer();
  const content = formData.get("content") as string;

  const values: PostType = {
    content,
    visibility: "anyone",
    images: null,
    hashtags: null,
    mentions: null,
    status: "pending",
    post_type: "donor", // Assuming default post type is 'donee'
  };

  const { error: parseError } = postSchema.safeParse(values);

  if (parseError) {
    return { error: parseError.errors };
  }

  const { error, data } = await client
    .from("posts")
    .insert(values)
    .select()
    .single();

  if (error) {
    console.log("Error creating post:", error);
  }

  return { data: data };
};

export const getPosts = async () => {
  const client = await supabaseServer();

  const { data, error } = await client
    .from("posts")
    .select("*, users(*)")
    .limit(3);
  if (error) {
    return { error: error.message, data: null };
  }

  if (data) {
    console.log(data);
  }

  console.log("Posts fetched successfully:", data);
  return { data: data, error: null };
};
