import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";
import React from "react";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    className?: string;
    label?: string;
}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    ({ className, label, id, ...props }, ref) => {
        const generatedId = React.useId();
        const checkboxId = id ?? generatedId;
        return (<div className="flex items-center space-x-2">
            <CheckboxPrimitive.Root
                ref={ref}
                id={id}
                className={twMerge(
                    "peer h-5 w-5 shrink-0 rounded-md border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white transition-all duration-200 cursor-pointer",
                    className
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                    <Icons.check size={14} aria-hidden="true" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            {label && (
                <label
                    htmlFor={checkboxId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700"
                >
                    {label}
                </label>
            )}
        </div>)
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;