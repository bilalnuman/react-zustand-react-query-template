"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FormProvider, useForm, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"
import logo from "@/assets/logo.png"

type FormProviderWrapperProps<T extends FieldValues> = {
    children: (methods: UseFormReturn<T>) => React.ReactNode
    onSubmit: (data: T) => void
    formOptions?: UseFormProps<T>
    className?: string
    title?: string
    footer?: React.ReactNode
    buttonText?: string
    description?: string,
    isLoading?: boolean,
    titleClass?: string,
    subTitleClass?: string,
    butonClass?: string

}

const FormProviderWrapper = <T extends FieldValues>({
    children,
    onSubmit,
    formOptions,
    title,
    description,
    buttonText,
    footer,
    isLoading,
    className,
    subTitleClass,
    titleClass,
    butonClass
}: FormProviderWrapperProps<T>) => {
    const tAuth = useTranslations("Auth")
    const tCommon = useTranslations("Common")

    const methods = useForm<T>({
        mode: "onSubmit",
        ...formOptions,
    })

    return (
        <FormProvider {...methods}>
            <div className={twMerge("min-h-screen flex flex-col items-center justify-center", className)}>
                <div className="w-full max-w-lg flex flex-col items-center justify-center">
                    <Image src={logo}width={100} height={50} alt="logo" className='mb-6' />

                    <div className="text-center mb-6">
                        <h1 className={twMerge("text-4xl font-bold text-gray-600", titleClass)}>
                            {title || tAuth("welcomeBack")}
                        </h1>
                        <p className={twMerge("text-sm text-gray-400 mt-1", subTitleClass)}>
                            {description || tAuth("loginDescription")}
                        </p>
                    </div>

                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        {children(methods)}

                        <Button type="submit" isLoading={isLoading} className={twMerge("w-full",butonClass)}>
                            {buttonText || tCommon("submit")}
                        </Button>
                    </form>
                    {footer && <div className="mt-4">{footer}</div>}
                </div>
            </div>
        </FormProvider>
    )
}

export default FormProviderWrapper
