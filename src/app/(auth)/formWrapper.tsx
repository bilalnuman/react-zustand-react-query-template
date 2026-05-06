"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FormProvider, useForm, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form"

type FormProviderWrapperProps<T extends FieldValues> = {
    children: (methods: UseFormReturn<T>) => React.ReactNode
    onSubmit: (data: T) => void
    formOptions?: UseFormProps<T>
    className?: string
    title?: string
    footer?: React.ReactNode
    buttonText?: string
    description?: string,
    isLoading?: boolean
}

const FormProviderWrapper = <T extends FieldValues>({
    children,
    onSubmit,
    formOptions,
    title,
    description,
    buttonText,
    footer,
    isLoading
}: FormProviderWrapperProps<T>) => {

    const methods = useForm<T>({
        mode: "onSubmit",
        ...formOptions,
    })

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-lg flex flex-col items-center justify-center">
                    <Image src="/assets/logo.png" width={100} height={50} alt="logo" className='mb-6' />

                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-600">
                            {title || "Welcome Back"}
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            {description || "Login to your account"}
                        </p>
                    </div>

                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        {children(methods)}

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            {buttonText || "Submit"}
                        </Button>
                    </form>
                    {footer && <div className="mt-4">{footer}</div>}
                </div>
            </div>
        </FormProvider>
    )
}

export default FormProviderWrapper
