"use client"
import { useRouter } from "next/navigation"
import { Controller } from "react-hook-form"
import FormProviderWrapper from "../formWrapper"
import Link from "next/link"
import FieldGroup from "@/components/ui/fieldGroup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"
import { INVALIED_EMAILR_RULE } from "@/constant.data/form-validation-roules"
import { useTranslations } from "next-intl"


type LoginForm = {
    email: string
    password: string
    role: "sales_rep" | "manager"
}


const LoginPage = () => {
    const t = useTranslations("Auth")
    const tCommon = useTranslations("Common")
    const router = useRouter()
    const { mutate: login, isPending } = useApiMutation({ url: "/auth/login", })
    const onSubmit = async (data: LoginForm) => {
        login(data, {
            onSuccess: (res: any) => {
                toast.success(res?.message, { id: "login-success" })
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
            title={t("welcomeBack")}
            description={t("loginDescription")}
            buttonText={t("login")}
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
                    <FieldGroup label={tCommon("email")} id="email" errorMessage={errors.email?.message}>
                        <input
                            {...register("email", {
                                required: tCommon("required"),
                                pattern: {
                                    value: INVALIED_EMAILR_RULE,
                                    message: tCommon("invalidEmail"),
                                },
                            })}
                            id="email"
                            className="Input"
                            placeholder={tCommon("emailPlaceholder")}
                        />
                    </FieldGroup>

                    <FieldGroup label={tCommon("password")} id="password" errorMessage={errors.password?.message}>
                        <input
                            type="password"
                            {...register("password", { required: tCommon("required") })}
                            id="password"
                            className="Input"
                            placeholder={tCommon("passwordPlaceholder")}
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
                                <span>{t("loginAs")}</span>
                                <div className="flex gap-10">
                                    <RadioGroupItem value="sales_rep" label={t("salesRep")} id="sales_rep" />
                                    <RadioGroupItem value="manager" label={t("manager")} id="manager" />
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
