import React, { forwardRef, useState } from "react";
import PhoneInputLib from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import { isValidPhoneNumber } from "libphonenumber-js";

type PhoneInputProps = {
    value?: string;
    onChange?: (value?: string) => void;
    label?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    defaultCountry?: Country;
    allowedCountries?: Country[];
    validateOnBlur?: boolean;
    onValidate?: (isValid: boolean, value?: string) => void;
};

const formatCountryLabel = (country: Country) => {
    return `${country} (+${getCountryCallingCode(country)})`;
};

const CustomInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
    const { errorMessage, internalError, ...rest } = props;
    return (
        <input
            {...rest}
            ref={ref}
            className="flex-1 outline-none text-sm"
            aria-invalid={!!(errorMessage || internalError)}
            aria-describedby={errorMessage || internalError ? "phone-error" : undefined}
        />
    );
});

CustomInput.displayName = "CustomInput";

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    (
        {
            value,
            onChange,
            label = "Phone Number",
            errorMessage,
            required = false,
            disabled = false,
            placeholder = "Enter phone number",
            defaultCountry = "PK",
            allowedCountries,
        },
        ref
    ) => {
        const countries = allowedCountries || getCountries();
        const [internalError, setInternalError] = useState<string | undefined>();

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const val = e.target.value;
            const isValid = isValidPhoneNumber(val);
            if (!isValid) {
                setInternalError("Invalid phone number");
            } else {
                setInternalError(undefined);
            }
        };

        return (
            <div className="flex flex-col gap-1 w-full">
                {/* Label (Accessible) */}
                <label
                    htmlFor="phone-input"
                    className="text-sm font-medium text-gray-700"
                >
                    {label} {required && <span aria-label="required">*</span>}
                </label>

                <PhoneInputLib
                    id="phone-input"
                    international
                    defaultCountry={defaultCountry}
                    countries={countries}
                    value={value}
                    onChange={onChange!}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 Input"
                    inputComponent={CustomInput}
                    onBlur={handleBlur}
                    error={errorMessage}
                    internalError={internalError}
                />

                {(errorMessage || internalError) && (
                    <span
                        id="phone-error"
                        role="alert"
                        className="text-xs text-red-500"
                    >
                        {errorMessage || internalError}
                    </span>
                )}
            </div>
        );
    }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;