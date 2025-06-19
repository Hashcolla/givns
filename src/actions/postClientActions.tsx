import { getFilePath } from "@/lib/utils";
import { supabaseClient } from "@/utils/supabase/client";

const getStorage = async () => {
  const client = await supabaseClient();
  return client.storage;
};

const getUserEmail = async () => {
  const client = await supabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return user?.email || null;
};
export const uploadPostImages = async (
  files: File[],
  id: string | number | null,
) => {
  //
  if (files.length === 0) return { error: null, data: null };

  const storage = await getStorage();
  const client = await supabaseClient();

  const imageUrls: string[] = [];

  for (const file of files) {
    //initialize file path
    const fileName = file.name;
    const filePath = getFilePath(fileName, "posts");

    //upload file to storage
    const { error } = await storage.from("post-images").upload(filePath, file);

    if (error) {
      console.log(error.message);
      return { error: error.message, data: null };
    }

    //get public url;
    const { data } = await storage.from("post-images").getPublicUrl(filePath);
    const poublicUrl = data.publicUrl;

    console.log(poublicUrl);
    imageUrls.push(poublicUrl);
  }

  if (imageUrls.length > 0) {
    //exisiting images optional
    // const getImagesUrl = await client
    //   .from("posts")
    //   .select("images")
    //   .eq("id", id)
    //   .single();

    // if (getImagesUrl.data?.images) {
    //   const existingImages = getImagesUrl.data.images as string[];
    //   imageUrls.push(...existingImages);
    // }

    //update post with images urls
    const { error: postError, status } = await client
      .from("posts")
      .update({
        images: imageUrls,
      })
      .eq("id", id);

    if (postError) {
      console.log("post eerr", postError.message);
      return { error: postError.message };
    }
  }

  return {};
};
