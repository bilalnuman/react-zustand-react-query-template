import React, { forwardRef, useState, useMemo } from "react";
import PhoneInputLib from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountries } from "react-phone-number-input/input";
import { isValidPhoneNumber } from "libphonenumber-js";
import Select from "./select";
import { Input } from "./input";
import FieldGroup from "./fieldGroup";

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
    name?: string;
};

/**
 * Custom Country Select component using the project's Select component
 */
const CountrySelect = ({ value, onChange, options, disabled }: any) => {
    console.log(options)
    const items = useMemo(() => 
        options.map((opt: { value: Country; label: string }) => ({
            label: opt.label,
            value: opt.value || "",
            icon: opt.value ? (
                <img 
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${opt.value}.svg`} 
                    alt="" 
                    className="w-6 h-5 rounded-sm object-cover" 
                />
            ) : null
        })), [options]
    );

    return (
        <Select
            items={items}
            value={value}
            onChange={(val) => onChange(val)}
            // disabled={disabled}
            isPhone={true}
            isSearchable
            isCaretIconVisible
            classNames={{
                trigger: "!border-0 !shadow-none !ring-0 !pe-2 !ps-3 min-w-0 bg-transparent focus:!ring-0 mt-0",
                wrapper: "min-w-0 w-auto",
                dropdown: "min-w-[300px]",
                triggerContent:"text-lg"
            }}
            placeholder=""
        />
    );
};

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
            name,
        },
        ref
    ) => {
        const countries = allowedCountries || getCountries();
        const [internalError, setInternalError] = useState<string | undefined>();

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (val && !isValidPhoneNumber(val)) {
                setInternalError("Invalid phone number");
            } else {
                setInternalError(undefined);
            }
        };

        const error = errorMessage || internalError;

        return (
            <FieldGroup
                label={label}
                isRequired={required}
                errorMessage={error}
                id={name}
            >
                <div className="relative">
                    <PhoneInputLib
                        id={name}
                        international
                        defaultCountry={defaultCountry}
                        countries={countries}
                        value={value}
                        onChange={onChange!}
                        disabled={disabled}
                        placeholder={placeholder}
                        className="bg-transparent w-full border border-gray-300 rounded-lg focus:outline-none transition-all duration-300 focus:ring-3 focus:ring-gray-200"
                        countrySelectComponent={CountrySelect}
                        inputComponent={Input}
                        onBlur={handleBlur}
                        error={!!error}
                        numberInputProps={{
                            className: "border-0 focus:ring-0 rounded-none h-9 mt-0",
                            wrapperClassName: "flex-1"
                        }}
                    />
                </div>
            </FieldGroup>
        );
    }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
