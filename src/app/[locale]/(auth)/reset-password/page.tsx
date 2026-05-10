"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import FormProviderWrapper from "../formWrapper"
import FieldGroup from "@/components/ui/fieldGroup"
import { Suspense } from "react"
import { useTranslations } from "next-intl"

type ResetPasswordForm = {
    password: string
    confirmPassword: string
}

const ResetPasswordForm = () => {
    const tAuth = useTranslations("Auth")
    const tCommon = useTranslations("Common")
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const otp = searchParams.get("otp")

    const onSubmit = async (data: ResetPasswordForm) => {
        if (!email || !otp) {
            toast.error(tAuth("missingInfo"))
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
                toast.success(tAuth("resetSuccessful"))
                router.push("/login")
            } else {
                toast.error(result?.detail || tAuth("resetFailed"))
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : tCommon("errorOccurred"))
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
            title={tAuth("resetPassword")}
            description={tAuth("resetPasswordDesc")}
            buttonText={tAuth("resetPassword")}
        >
            {({ register, watch, formState: { errors } }) => {
                const password = watch("password");
                return (
                    <>
                        <FieldGroup label={tAuth("newPassword")} id="password" errorMessage={errors.password?.message}>
                            <input
                                type="password"
                                {...register("password", {
                                    required: tCommon("required"),
                                    minLength: {
                                        value: 8,
                                        message: tAuth("passwordMinLength")
                                    }
                                })}
                                id="password"
                                className="Input"
                                placeholder={tAuth("newPassword")}
                            />
                        </FieldGroup>

                        <FieldGroup label={tAuth("confirmPassword")} id="confirmPassword" errorMessage={errors.confirmPassword?.message}>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: tCommon("required"),
                                    validate: (value) => value === password || tAuth("passwordsDoNotMatch")
                                })}
                                id="confirmPassword"
                                className="Input"
                                placeholder={tAuth("confirmPassword")}
                            />
                        </FieldGroup>
                    </>
                )
            }}
        </FormProviderWrapper>
    )
}

const ResetPasswordPage = () => {
    const tCommon = useTranslations("Common")
    return (
        <Suspense fallback={<div>{tCommon("loading")}</div>}>
            <ResetPasswordForm />
        </Suspense>
    )
}

export default ResetPasswordPage
