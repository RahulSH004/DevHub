"use client"
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { SignupSchema } from "@/app/_validators/auth.schema";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";


export default function SignUpform() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        root: ""
    })
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({ name: "", email: "", password: "", confirmPassword: "", root: "" });
        const validatedata = SignupSchema.safeParse(formData)
        if (!validatedata.success) {
            const fieldErrors = validatedata.error.flatten().fieldErrors;

            setErrors((prev) => ({
                ...prev,
                name: fieldErrors.name?.[0] || "",
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
                confirmPassword: fieldErrors.confirmPassword?.[0] || "",
            }))
            return;
        }
        setLoading(true);

        const { data, error } = await authClient.signUp.email({
            name: validatedata.data.name,
            email: validatedata.data.email,
            password: validatedata.data.password,
            callbackURL: "/"
        })
        if (error) {
            setErrors((prev) => ({ ...prev, root: error.message as string }));
            setLoading(false);
            return;
        }
        setLoading(false);
        if (data) {
            router.push("/")
        }
    }
    return (
        <>
            <div className="max-w-sm mx-auto mt-10 p-6 bg-white border rounded-xl shadow-sm">
                <div className="m-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-gray-500">Enter your email below to get started</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-5"
                >
                    {errors.root && (
                        <Alert variant={"destructive"}>
                            <AlertDescription>{errors.root}</AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name" className="text-left">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Rahul"
                        />
                        {errors.name && <span className="text-sm font-medium text-destructive text-left">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-left">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Rahul@gmail.com"
                        />
                        {errors.email && <span className="text-sm font-medium text-destructive text-left">{errors.email}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="password" className="text-left">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                placeholder="•••••••"
                            />
                            {errors.password && (
                                <span className="text-sm font-medium text-destructive text-left">{errors.password}</span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="confirmpassword" className="text-left">Confirm Password</Label>
                            <Input
                                id="confirmpassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <span className="text-sm font-medium text-destructive text-left">{errors.confirmPassword}</span>
                            )}
                        </div>

                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
                <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                        </div>
                </div>
                <div className="flex flex-col space-y-3 mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
                        className="w-full"
                    >
                        Continue with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    <p className="text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="underline underline-offset-4 font-medium">
                            SignIn
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}