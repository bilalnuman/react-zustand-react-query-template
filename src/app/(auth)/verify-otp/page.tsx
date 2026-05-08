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

type OTPForm = {
  otp: string
}

interface OtpStatusResponse {
  expires_in_seconds: number;
}

const VerifyOtpPage = () => {
  
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
      toast.error("Email is missing. Please try again from forgot password page.")
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
        window.location.href = dashboard;
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
      title="Check the connection activity"
      description="We have sent a code to your email:"
      buttonText="Verify OTP"
      isLoading={isPending}
    >
      {({ register }) => {
        register("otp", {
          required: "OTP is required",
          minLength: {
            value: 6,
            message: "OTP must be 6 characters",
          },
        });
        return (
          isLoading ? <Icons.loading size={34} className="mx-auto" /> :
            <div className="pb-5">
              <FieldGroup label="Enter the OTP code">
                <OTPInput
                  name="otp"
                  length={6}
                  type="alphanumeric"
                  
                />
              </FieldGroup>
              {!isExpired &&
                <div className="text-center pt-7 pb-2 text-gray-500">
                  Remaining Time {minutes}:{seconds.toString().padStart(2, "0")}
                </div>}
            </div>
        )
      }}
    </FormProviderWrapper>
  )
}

export default VerifyOtpPage
