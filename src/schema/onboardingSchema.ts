import { phoneNumberSchema, urlSchema } from "@/schema/schema";
import { z } from "zod";

export const purposeInputValues = [
  { value: "I want to donate", label: "I want to donate" },
  {
    value: "I need help and want to recieve donations",
    label: "I need help and want to recieve donations",
  },
  {
    value: "I want to recieve donations and help others",
    label: "I want to recieve donations and help others",
  },
];

export const organizationTypeValues = [
  {
    value: "education",
    label: "Education",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "disaster-relief",
    label: "Disaster relief",
  },
  {
    value: "animal-welfware",
    label: "Animal welfware",
  },
  {
    value: "environmental",
    label: "Environmental",
  },
];

export const docTypeVlaues = [
  {
    value: "nic",
    label: "National Identity",
  },
  {
    value: "passport",
    label: "Passport",
  },
  {
    value: "license",
    label: "Driving License",
  },
];

export const onboardingSchema = z.object({
  accountType: z
    .enum(["personal", "organization"])
    .refine((val) => !!val, { message: "Please select an item!" }),
  purpose: z
    .string({ required_error: "Please select anything" })
    .refine(
      (val) => purposeInputValues.map((input) => input.value).includes(val),
      { message: "Please select a valid purpose!" }
    ),
  orgName: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  orgType: z
    .string()
    .refine(
      (val) => organizationTypeValues.map((value) => value.value).includes(val),
      { message: "Please select a valid organization type!" }
    ),
  orgEmail: z.string().email(),
  orgLandNumber: phoneNumberSchema,
  orgWebsite: urlSchema,
  orgAddress: z.string().min(3).max(100),
  ownerName: z.string().min(3).max(50),
  ownerRole: z.string().min(3).max(50),
  ownerEmail: z.string().email(),
  ownerPhone: phoneNumberSchema,
  docType: z
    .string()
    .refine((val) => docTypeVlaues.map((value) => value.value).includes(val)),
  facebook: z.string().url({ message: "Invalid Facebook URL!" }),
  instagram: z.string().url({ message: "Invalid Instagram URL!" }),
  twitter: urlSchema,
  otherLinks: z.record(z.string(), urlSchema).optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
