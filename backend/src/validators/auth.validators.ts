import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Gym name must be at least 3 characters"),

    email: z.string().email(),

    mobile: z.string().min(10, "Mobile number should be 10 digits"),

    password: z.string().min(6, "Password must be at least 6 characters"),
});
