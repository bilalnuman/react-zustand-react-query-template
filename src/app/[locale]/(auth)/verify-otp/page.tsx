"use client"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import FormProviderWrapper from "../formWrapper"
import OTPInput from "@/components/ui/OTPInput"
import FieldGroup from "@/components/ui/fieldGroup"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useOtpTimer } from "@/hooks/useOtpTimer"
import { useApiQuery } from "@/hooks/use-api-query"
import { Icons } from "@/components/ui/icons"
import { tokenService } from "@/services/tokenService"
import { roleService } from "@/services/roleService"
import axios from "axios"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"

type OTPForm = {
  otp: string
}

interface OtpStatusResponse {
  expires_in_seconds: number;
}

const VerifyOtpPage = () => {
  const tAuth = useTranslations("Auth")
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail"))
  }, [])
  
  const { mutate: login, isPending } = useApiMutation({
    url: "/auth/verify-otp",
    clearPersistKeys: ["otp-status-data"]
  })
  const { data: otpData, isLoading } = useApiQuery<OtpStatusResponse>({
    url: "/auth/otp-status",
    params: { email },
    options: {
      enabled: !!email,
    },
  });
  const { minutes, seconds,isExpired } = useOtpTimer(otpData?.expires_in_seconds);

  const onSubmit = async (data: OTPForm) => {

    if (!email) {
      toast.error(tAuth("missingInfo"))
      return
    }
    login({
      otp: data.otp,
      email
    }, {
      onSuccess: async (data: any) => {
        localStorage.removeItem("userEmail")
        tokenService.set(data.access_token)

        try {
          await axios.post("/api/set-token-in-cookie", { token: data.access_token })
        } catch (error) {
          console.error("Failed to set cookie:", error)
        }

        toast.success(data?.message)
        const role = roleService.get()
        const dashboard = role === 'manager' ? '/manager' : '/sales'
        router.push(dashboard as any);
      }
    })
  }

  return (
    <FormProviderWrapper<OTPForm>
      onSubmit={onSubmit}
      formOptions={{
        defaultValues: {
          otp: "",
        }
      }}
      title={tAuth("checkConnection")}
      description={tAuth("codeSent")}
      buttonText={tAuth("verifyOtp")}
      isLoading={isPending}
    >
      {({ register }) => {
        register("otp", {
          required: tAuth("otpRequired"),
          minLength: {
            value: 6,
            message: tAuth("otpLength"),
          },
        });
        return (
          isLoading ? <Icons.loading size={34} className="mx-auto" /> :
            <div className="pb-5">
              <FieldGroup label={tAuth("enterOtp")}>
                <OTPInput
                  name="otp"
                  length={6}
                  type="alphanumeric"
                  
                />
              </FieldGroup>
              {!isExpired &&
                <div className="text-center pt-7 pb-2 text-gray-500">
                  {tAuth("remainingTime")} {minutes}:{seconds.toString().padStart(2, "0")}
                </div>}
            </div>
        )
      }}
    </FormProviderWrapper>
  )
}

export default VerifyOtpPage
