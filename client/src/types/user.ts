import { z } from "zod";

export const userSchema = z.object({
   name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    onboarded: z.boolean(),
})

export type UserType = z.infer<typeof userSchema>;