"use client"
import { useRouter } from "next/navigation"
import FieldGroup from "@/components/ui/fieldGroup"
import { toast } from "sonner"
import Link from "next/link"
import FormProviderWrapper from "../formWrapper"
import { useTranslations } from "next-intl"

type ForgotPasswordForm = {
    email: string
}

const ForgotPasswordPage = () => {
    const tAuth = useTranslations("Auth")
    const tCommon = useTranslations("Common")
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
                toast.success(tAuth("otpSent"))
                router.push(`/verify-otp?email=${data.email}`)
            } else {
                toast.error(result?.detail || tCommon("somethingWentWrong"))
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : tCommon("errorOccurred"))
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
            title={tAuth("forgotPassword")}
            description={tAuth("forgotPasswordDesc")}
            buttonText={tAuth("resetPassword")}
            footer={
                <Link href="/login" className="underline text-sm font-medium text-gray-400">
                    {tAuth("backToLogin")}
                </Link>
            }
        >
            {({ register, formState: { errors } }) => (
                <FieldGroup label={tCommon("email")} id="email" errorMessage={errors.email?.message}>
                    <input
                        id="email"
                        className="Input"
                        placeholder={tCommon("emailPlaceholder")}
                        {...register("email", {
                            required: tCommon("required"),
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: tAuth("invalidEmailFormat"),
                            },
                        })}
                    />
                </FieldGroup>
            )}
        </FormProviderWrapper>
    )
}

export default ForgotPasswordPage
