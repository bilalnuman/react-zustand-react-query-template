"use client";

import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type OTPInputProps = {
    name: string;
    length?: number;
    type?: "number" | "alphanumeric";
    className?:string
};

const getRegex = (type: "number" | "alphanumeric") => {
    return type === "number" ? /^\d?$/ : /^[a-zA-Z0-9]?$/;
};

const OTPInput: React.FC<OTPInputProps> = ({
    name,
    length = 6,
    type = "number",
    className
}) => {
    const { setValue, watch, formState: { errors } } = useFormContext();
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const value = watch(name) || "";
    const valueArray = value.split("").concat(Array(length).fill("")).slice(0, length);

    const regex = getRegex(type);

    const handleChange = (val: string, index: number) => {
        if (!regex.test(val)) return;

        const newOtp = [...valueArray];
        newOtp[index] = val.toUpperCase();

        const joined = newOtp.join("").trim();

        setValue(name, joined, { shouldValidate: true });

        if (val && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !valueArray[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasteData = e.clipboardData.getData("text").slice(0, length);

        if (!/^[a-zA-Z0-9]+$/.test(pasteData)) return;

        const newOtp = pasteData.toUpperCase();
        setValue(name, newOtp, { shouldValidate: true });

        inputsRef.current[pasteData.length - 1]?.focus();
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2" onPaste={handlePaste}>
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            if (el) inputsRef.current[index] = el;
                        }}
                        
                        type="text"
                        maxLength={1}
                        value={valueArray[index] || ""}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={twMerge("h-18 text-center Input text-xl",className)}
                    />
                ))}
            </div>

            {errors[name] && (
                <p className="text-red-500 text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
};

export default OTPInput;