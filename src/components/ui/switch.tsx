import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { twMerge } from "tailwind-merge";

const Switch = React.forwardRef<
    React.ComponentRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
        label?: string;
    }
>(({ className, label, id, ...props }, ref) => (
    <div className="flex items-center space-x-2">
        <SwitchPrimitives.Root
            className={twMerge(
                "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=unchecked]:bg-gray-200",
                className
            )}
            {...props}
            ref={ref}
            id={id}
        >
            <SwitchPrimitives.Thumb
                className={twMerge(
                    "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
                )}
            />
        </SwitchPrimitives.Root>
        {label && (
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700"
            >
                {label}
            </label>
        )}
    </div>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
