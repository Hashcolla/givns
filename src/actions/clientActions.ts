import { getFilePath } from "@/lib/utils";
import { supabaseClient } from "@/utils/supabase/client";
import { getUserEmail } from "./authActions";

export const uploadImageToBucket = async (file: File, bucket: string) => {
  const client = await supabaseClient();

  const fileName = file.name;
  const filePath = getFilePath(fileName, bucket);

  if (!filePath) {
    return { error: "File path is invalid", data: null };
  }

  const { error } = await client.storage.from("givns").upload(filePath, file);

  if (error) {
    return { error: error.message, data: null };
  }

  const { data } = await client.storage.from("givns").getPublicUrl(filePath);

  const publicUrl = data.publicUrl;

  if (!publicUrl) {
    return { error: "Failed to get public URL", data: null };
  }

  return { data: publicUrl, error: null };
};

export const updateImageInDB = async (
  imageUrl: string,
  table: string,
  fieldName: string,
  eqField?: string | null,
  eqValue?: string | null,
) => {
  const client = await supabaseClient();
  const email = await getUserEmail();

  const { error } = await client
    .from(table)
    .update({ [fieldName]: imageUrl })
    .eq(eqField || "email", eqValue || email); // Assuming you want to update the first record

  if (error) {
    return { error: error.message, data: null };
  }

  return { data: "Image updated successfully", error: null };
};
