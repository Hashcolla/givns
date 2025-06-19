import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(5, "Write someting long!").max(1000),
  visibility: z.enum(["anyone", "community", "private"], {
    message: "Select a visibility option",
  }),
  images: z.union([z.array(z.string()), z.null()]).optional(),
  hashtags: z.union([z.array(z.string()), z.null()]).optional(),
  mentions: z.union([z.array(z.string()), z.null()]).optional(),
  status: z.enum(["pending", "approved", "rejected"]),
  post_type: z.enum(["donor", "donee"]).default("donor"),
});
