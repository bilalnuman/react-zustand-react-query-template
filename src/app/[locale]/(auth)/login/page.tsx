"use client"
import { useRouter, Link } from "@/i18n/routing"
import { Controller } from "react-hook-form"
import FormProviderWrapper from "../formWrapper"
import FieldGroup from "@/components/ui/fieldGroup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { INVALIED_EMAILR_RULE } from "@/constant.data/form-validation-roules"
import { useTranslations } from "next-intl"
import bgImage from "@/assets/login1.jpeg"
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
            onSuccess: () => {
                localStorage.setItem("userEmail", data.email)
                router.push("/")
            }
        })
    }

    return (
        <div className="flex  justify-center items-center login-form text-white">
            <div className="relative flex-2 min-h-screen"
                style={{
                    backgroundImage: `url(${bgImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
            </div>
            <div className="flex-1 px-8"
            >
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
                    titleClass="text-white"
                    subTitleClass="text-white"
                    butonClass="h-12 mt-3 login-button "
                    footer={
                        <p className="text-sm text-gray-300 whitespace-nowrap font-medium">
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
                                    className="Input h-12"
                                    placeholder={tCommon("emailPlaceholder")}
                                />
                            </FieldGroup>

                            <FieldGroup label={tCommon("password")} id="password" errorMessage={errors.password?.message}>
                                <input
                                    type="password"
                                    {...register("password", { required: tCommon("required") })}
                                    id="password"
                                    className="Input h-12"
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
                                            <RadioGroupItem value="sales_rep" label={t("salesRep")} id="sales_rep" labelClass="text-white" className="bg-transparent"/>
                                            <RadioGroupItem value="manager" label={t("manager")} id="manager" labelClass="text-white"  className="bg-transparent"/>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                        </>
                    )}
                </FormProviderWrapper>
            </div>
        </div>
    )
}

export default LoginPage
