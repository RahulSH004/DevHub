"use client"
import { useState } from "react"
import { authClient } from "@/app/lib/auth-client"
import { SigninSchema } from "@/app/_validators/auth.schema"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "../ui/alert"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"


export default function SignInform() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        root: ""
    })
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false);

    async function handleGoogleSignIn() {
        setErrors((prev) => ({ ...prev, root: "" }));
        setGoogleLoading(true);
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
            if (error) {
                setErrors((prev) => ({ ...prev, root: error.message ?? "Google sign in failed" }));
                setGoogleLoading(false);
            }
        } catch {
            setErrors((prev) => ({ ...prev, root: "Google sign in failed" }));
            setGoogleLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (googleLoading) return;
        setErrors({ email: "", password: "", root: "" });

        const validationResult = SigninSchema.safeParse(formData);

        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors((prev) => ({
                ...prev,
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
            }));
            return;
        }
        setLoading(true);
        let succeeded = false;
        try {
            const { data, error } = await authClient.signIn.email({
                email: validationResult.data.email,
                password: validationResult.data.password,
            });

            if (error) {
                setErrors((prev) => ({ ...prev, root: error.message as string }));
                setLoading(false);
                return;
            }
            if (data) {
                succeeded = true;
                setLoading(true);
                // Redirect admin users to /admin, others to /
                const role = (data.user as any)?.role;
                if (role === "ADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
                return;
            }
        } catch {
            setErrors((prev) => ({ ...prev, root: "Something went wrong. Try again." }));
        } finally {
            if (!succeeded) setLoading(false);
        }
    }
    return (
        <>
            <div className="max-w-sm mx-auto mt-10 p-6 bg-card border border-border rounded-xl shadow-sm">
                <div className="m-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back!</h1>
                    <p className="text-sm text-muted-foreground mt-1">Enter your email to sign in to your account</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.root}</AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-left">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                        />
                        {errors.email && <span className="text-sm font-medium text-destructive text-left">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col space-y-2 mt-2">
                        <Label htmlFor="password" className="text-left">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-sm font-medium text-destructive text-left">{errors.password}</span>}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-muted-foreground bg-card">Or continue with</span>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading || googleLoading}
                        onClick={handleGoogleSignIn}
                        className="w-full"
                    >
                        {googleLoading ? "Redirecting..." : "Continue with Google"}
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    <p className="text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="underline underline-offset-4 font-medium text-foreground">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}