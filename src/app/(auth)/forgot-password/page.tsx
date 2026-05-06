
"use client"
import { useRouter } from "next/navigation"
import FieldGroup from "@/components/ui/fieldGroup"
import { toast } from "sonner"
import Link from "next/link"
import FormProviderWrapper from "../formWrapper"

type ForgotPasswordForm = {
    email: string
}

const ForgotPasswordPage = () => {
    const router = useRouter()

    const onSubmit = async (data: ForgotPasswordForm) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
            const result = await res.json()
            if (res.ok) {
                toast.success("OTP sent to your email!")
                router.push(`/verify-otp?email=${data.email}`)
            } else {
                toast.error(result?.detail || "Something went wrong. Please try again.")
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.")
        }
    }

    return (
        <FormProviderWrapper<ForgotPasswordForm>
            onSubmit={onSubmit}
            formOptions={{
                defaultValues: {
                    email: "",
                }
            }}
            title="Forgot Password"
            description="No worries, we'll send you an email to reset your password."
            buttonText="Reset Password"
            footer={
                <Link href="/login" className="underline text-sm font-medium text-gray-400">
                    Back to Login
                </Link>
            }
        >
            {({ register, formState: { errors } }) => (
                <FieldGroup label="Email" id="email" errorMessage={errors.email?.message}>
                    <input
                        id="email"
                        className="Input"
                        placeholder="Enter Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                    />
                </FieldGroup>
            )}
        </FormProviderWrapper>
    )
}

export default ForgotPasswordPage