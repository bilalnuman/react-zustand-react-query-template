"use client"
import { Button } from '@/components/ui/button'
import FieldGroup from '@/components/ui/fieldGroup'
import Select from '@/components/ui/select'
import { useNewClosingFormStore } from '@/store/new-closing-form-store'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

const stepBar = ["Company", "Initial Payment", "Send Quote"]

type FormValues = {
  company_name: string
  industry_type: string,
  company_address: string,
  siret: string,
  customer_name: string,
  phone_number: string,
  email: string,
  number_of_agents: string

}
type OPTIONS = { label: string, value: string }
type PATTERN = { value: RegExp }

const companyFields: { name: keyof FormValues; label: string; isSelect?: boolean, placeholder?: string, options?: OPTIONS[], required?: boolean, pattern?: PATTERN }[] = [
  {
    name: "company_name",
    label: "Enter company name",
    required: true
  },
  {
    name: "industry_type",
    label: "Select industry type",
    options: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Node", value: "node" },
    ],
    required: true,
    isSelect: true,
  },
  {
    name: "company_address",
    label: "Company address",
    required: true
  },
  {
    name: "siret",
    label: "SIRET",
    placeholder: "Siret number",
    required: true,
    // pattern: {
    //   value: INVALIED_EMAILR_RULE,
    // },
  },
  {
    name: "customer_name",
    label: "Customer Name",
    required: true,
  },
  {
    name: "phone_number",
    label: "Phone number",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    required: true,
  },
]

const initialsPaymentFields: { name: keyof FormValues; label: string; isSelect?: boolean, placeholder?: string, options?: OPTIONS[], required?: boolean, pattern?: PATTERN }[] = [
  {
    name: "number_of_agents",
    label: "Number of Agents",
    required: true
  },
]

const Page = () => {
  const tForm = useTranslations("Form")
  const tCommon = useTranslations("Common")
  const [activeStepIndex, setActiveStepIndex] = useState(1)
  const setDraftFormData = useNewClosingFormStore((s) => s.setDraftFormData);
  const draftData = useNewClosingFormStore((s) => s.draftData);
  const [isInit, setIsInit] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    getValues,
    reset
  } = useForm<FormValues>()

  useEffect(() => {
    if (!isInit) {
      reset({
        ...draftData,
      })
    };
  }, [reset, draftData,activeStepIndex])

  useEffect(() => {
    return () => {
      setIsInit(false)
    }
  }, [])

  const handleDraft = () => {
    setIsInit(true)
    const currentValues = getValues()
    setDraftFormData(currentValues)
  }

  const onSubmit = handleSubmit(async (formData: FormValues) => {
    if (activeStepIndex !== 3) {
      setActiveStepIndex(activeStepIndex + 1)
      setIsInit(false)
      return
    }
    else {
      console.log(formData)
    }
  })

  return (
    <div>
      <div className="bg-gray-500 min-h-24 relative rounded-2xl flex justify-between items-center px-4 before:content-[''] before:bg-slate-300 before:top-[40%] before:w-[94%] before:absolute before:h-[1px] before:bg-black before:start-[3%]">
        {stepBar.map((step, index) => (
          <div key={step} className={twMerge("relative flex flex-col items-center text-dark-600 before:content-[''] before:block before:w-10 before:rounded-[10px] before:h-10 after:content-[''] after:block after:w-5 after:h-5 z-10 after:absolute after:top-[10px] after:rounded", activeStepIndex === index + 1 ? "before:bg-black after:bg-white" : "before:border before:border-slate-300 before:bg-gray-500 after:bg-slate-300")}>
            <span className='font-medium pt-1 text-sm'>{step}</span>
          </div>
        ))}
      </div>

      <h3 className='text-2xl font-bold'>Company Information</h3>

      <div>
        <form onSubmit={onSubmit} className="mb-6">
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded shadow">
            {activeStepIndex === 1 && companyFields.map((item) => (
              <FieldGroup
                id={item.name}
                label={item.label}
                errorMessage={errors[item.name]?.message as string}
                key={item.name}
              >
                {item?.isSelect ? (
                  <Controller
                    name={item.name}
                    control={control}
                    rules={{ required: item?.required ? tCommon("required") : undefined }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={item.label}
                        items={item?.options}
                      />
                    )}
                  />
                ) : (
                  <input
                    id={item.name}
                    className="Input"
                    // tForm("namePlaceholder")
                    placeholder={item?.placeholder || item.label}
                    {...register(item.name, { required: item?.required ? tCommon("required") : undefined, pattern: { value: item?.pattern?.value!, message: tCommon("invalidEmail") } })}
                  />
                )}
              </FieldGroup>
            ))}

            {activeStepIndex === 2 && initialsPaymentFields.map((item) => (
              <FieldGroup
                id={item.name}
                label={item.label}
                errorMessage={errors[item.name]?.message as string}
                key={item.name}
              >
                {item?.isSelect ? (
                  <Controller
                    name={item.name}
                    control={control}
                    rules={{ required: item?.required ? tCommon("required") : undefined }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={item.label}
                        items={item?.options}
                      />
                    )}
                  />
                ) : (
                  <input
                    id={item.name}
                    className="Input"
                    // tForm("namePlaceholder")
                    placeholder={item?.placeholder || item.label}
                    {...register(item.name, { required: item?.required ? tCommon("required") : undefined, pattern: { value: item?.pattern?.value!, message: tCommon("invalidEmail") } })}
                  />
                )}
              </FieldGroup>
            ))}

          </div>
          <div className='flex items-center justify-end gap-3'>
            {activeStepIndex !== 1 &&
              <Button variant='outline' size='lg' className="mt-4 px-4" onClick={() => setActiveStepIndex(activeStepIndex - 1)}>
                {tCommon("back")}
              </Button>
            }
            {activeStepIndex !== 3 &&
              <Button variant='outline' size='lg' className="mt-4 px-4" disabled={!isDirty || isInit} onClick={handleDraft}>
                {tCommon("draft")}
              </Button>
            }
            <Button type="submit" size='lg' className="mt-4 px-4" disabled={!isDirty}>
              {tCommon(activeStepIndex === 3 ? "submit" : "next")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page