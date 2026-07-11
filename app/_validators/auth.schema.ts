import {z} from "zod";


export const SignupSchema = z.object({
    name: z.string().trim().min(2, "Must at be 2 characters").max(25,"Name is too long..."),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters.").max(50,"Password is too long..."),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword , {
    message: "Password Dosen't match",
    path: ["confirmpassword"]
})

export const SigninSchema = z.object({
    email: z.email("Please enter the vaild email address"),
    password: z.string().min(1, "password must not be empty").max(50)
})

export type SigninSchema = z.infer<typeof SigninSchema>
export type SignupInput = z.infer<typeof SignupSchema>