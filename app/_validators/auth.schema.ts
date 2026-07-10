import {z} from "zod";


export const SignupSchema = z.object({
    name: z.string().min(2, "Must at be 2 characters"),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmpassword: z.string(),
}).refine((data) => data.password === data.confirmpassword , {
    message: "Password Dosen't match",
    path: ["confirmpassword"]
})


export type SignupInput = z.infer<typeof SignupSchema>