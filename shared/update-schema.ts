import { z } from "zod";

export const updateProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits")
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;