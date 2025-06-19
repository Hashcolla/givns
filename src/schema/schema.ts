import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .regex(/^\d{10}$/, { message: "Invalid Phone number!" });

export const urlSchema = z.union([z.string().url(), z.literal("")]).optional();

export const editProfileSchema = z.object({
  name: z
    .union([
      z
        .string()
        .min(5, { message: "Name must be at least 5 characters long!" }),
      z.literal(""),
      z.null(),
    ])
    .optional(),
  bio: z
    .union([
      z
        .string()
        .max(150, { message: "Name must be at least 5 characters long!" }),
      z.literal(""),
      z.null(),
    ])
    .optional(),
  username: z.union([z.string().min(5), z.literal(""), z.null()]).optional(),
});
