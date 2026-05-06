import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { twMerge } from "tailwind-merge";

const RadioGroup = React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={twMerge("grid gap-2", className)}
            {...props}
            ref={ref}
        />
    );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { label?: string }
>(({ className, label, id, ...props }, ref) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="relative flex items-center justify-center">
                <RadioGroupPrimitive.Item
                    ref={ref}
                    id={id}
                    className={twMerge(
                        "peer h-5 w-5 rounded-full border border-gray-300 bg-white ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-blue-600 transition-all duration-200 cursor-pointer flex items-center justify-center",
                        className
                    )}
                    {...props}
                >
                    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    </RadioGroupPrimitive.Indicator>
                </RadioGroupPrimitive.Item>
            </div>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700"
                >
                    {label}
                </label>
            )}
        </div>
    );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
