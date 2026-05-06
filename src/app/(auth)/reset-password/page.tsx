"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import FormProviderWrapper from "../formWrapper"
import FieldGroup from "@/components/ui/fieldGroup"
import { Suspense } from "react"

type ResetPasswordForm = {
    password: string
    confirmPassword: string
}

const ResetPasswordForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const otp = searchParams.get("otp")

    const onSubmit = async (data: ResetPasswordForm) => {
        if (!email || !otp) {
            toast.error("Missing information. Please start over from forgot password.")
            return
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp,
                        new_password: data.password
                    }),
                }
            )
            const result = await res.json()
            if (res.ok) {
                toast.success("Password reset successful! Please login with your new password.")
                router.push("/login")
            } else {
                toast.error(result?.detail || "Failed to reset password. Please try again.")
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.")
        }
    }

    return (
        <FormProviderWrapper<ResetPasswordForm>
            onSubmit={onSubmit}
            formOptions={{
                defaultValues: {
                    password: "",
                    confirmPassword: "",
                }
            }}
            title="Reset Password"
            description="Enter your new password below"
            buttonText="Reset Password"
        >
            {({ register, watch, formState: { errors } }) => {
                const password = watch("password");
                return (
                    <>
                        <FieldGroup label="New Password" id="password" errorMessage={errors.password?.message}>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                                id="password"
                                className="Input"
                                placeholder="Enter New Password"
                            />
                        </FieldGroup>

                        <FieldGroup label="Confirm Password" id="confirmPassword" errorMessage={errors.confirmPassword?.message}>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                                id="confirmPassword"
                                className="Input"
                                placeholder="Confirm New Password"
                            />
                        </FieldGroup>
                    </>
                )
            }}
        </FormProviderWrapper>
    )
}

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    )
}

export default ResetPasswordPage
