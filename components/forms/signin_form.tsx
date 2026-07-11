"use client"
import { useState } from "react"
import { authClient } from "@/app/lib/auth-client"
import { SigninSchema } from "@/app/_validators/auth.schema"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "../ui/alert"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


export default function SignInform(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        root: ""
    })
    const [loading , setLoading] = useState(false)

    function handleChange (e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name] : value }))
    }

    async function handleSubmit (e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
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

    const { data, error } = await authClient.signIn.email({
        email: validationResult.data.email,
        password: validationResult.data.password,
      });
  
      if (error) {
        setErrors((prev) => ({ ...prev, root: error.message as string }));
        setLoading(false);
        return;
      }
      setLoading(true);
      if(data){
        router.push("/")
      }
    }
    return(
        <form onSubmit={handleSubmit}>
            {errors.root && (
            <Alert variant="destructive">
                <AlertDescription>{errors.root}</AlertDescription>
            </Alert>
            )}
            <div>
                <Label htmlFor="email" className="text-left">Email</Label>
                <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Rahul@gmail.com"
                />
                {errors.email && <span className="text-sm font-medium text-destructive text-left">{errors.email}</span>}
            </div>
            <div>
                <Label htmlFor="password" className="text-left">Password</Label>
                <Input 
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=""
                />
                {errors.password && <span className="text-sm font-medium text-destructive text-left">{errors.password}</span>}
            </div>
            <Button 
                type="submit" 
                disabled={loading} 
                className="mt-4 w-full"
            >
                {loading ? "Signing in..." : "Sign In"}
            </Button>
        </form>
    )
}