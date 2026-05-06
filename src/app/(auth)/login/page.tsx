"use client"
import { useRouter } from "next/navigation"
import { Controller } from "react-hook-form"
import FormProviderWrapper from "../formWrapper"
import Link from "next/link"
import FieldGroup from "@/components/ui/fieldGroup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"


type LoginForm = {
    email: string
    password: string
    role: "sale_rep" | "manager"
}


const LoginPage = () => {
    const router = useRouter()
    const { mutate: login, isPending } = useApiMutation({ url: "/auth/login",})
    const onSubmit = async (data: LoginForm) => {
        login(data, {
            onSuccess: (_data: any) => {
                toast.success(_data?.access_token, { id: "login-success" })
                localStorage.setItem("userEmail", data.email)
                router.push("/verify-otp")
            }
        })
    }

    return (

        <FormProviderWrapper<LoginForm>
            onSubmit={onSubmit}
            formOptions={{
                defaultValues: {
                    email: "",
                    password: "",
                    role: "manager"
                }
            }}
            title="Welcome Back"
            description="Login to your account"
            buttonText="Login"
            isLoading={isPending}
            footer={
                <p className="text-sm text-gray-400 whitespace-nowrap font-medium">
                    By clicking continue, you agree to our {" "}
                    <Link href="/signup" className="underline">
                        Terms of Service
                    </Link>
                    {" "}and {" "}
                    <Link href="/privacy" className="underline">
                        Privacy Policy
                    </Link>
                </p>
            }
        >
            {({ register, control, formState: { errors } }) => (
                <>
                    <FieldGroup label="Email" id="email" errorMessage={errors.email?.message}>
                        <input
                            {...register("email", { required: "Email is required" })}
                            id="email"
                            className="Input"
                            placeholder="Enter Email"
                        />
                    </FieldGroup>

                    <FieldGroup label="Password" id="password" errorMessage={errors.password?.message}>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            id="password"
                            className="Input"
                            placeholder="Enter Password"
                        />
                    </FieldGroup>

                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}

                            >
                                <span>Login as</span>
                                <div className="flex gap-10">
                                    <RadioGroupItem value="sale_rep" label="Sales Rep" id="sale_rep" />
                                    <RadioGroupItem value="manager" label="Manager" id="manager" />
                                </div>
                            </RadioGroup>
                        )}
                    />
                </>
            )}
        </FormProviderWrapper>
    )
}

export default LoginPage

