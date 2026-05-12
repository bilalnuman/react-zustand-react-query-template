import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    leftIcon?: keyof typeof Icons;
    rightIcon?: keyof typeof Icons;
    iconSize?: number;
    wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            error,
            leftIcon,
            rightIcon,
            iconSize = 18,
            wrapperClassName,
            disabled,
            ...props
        },
        ref
    ) => {
        const LeftIcon = leftIcon ? Icons[leftIcon] : null;
        const RightIcon = rightIcon ? Icons[rightIcon] : null;

        return (
            <div className={twMerge("relative w-full group", wrapperClassName)}>
                {LeftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-900 pointer-events-none">
                        <LeftIcon size={iconSize} />
                    </div>
                )}
                <input
                    type={type}
                    disabled={disabled}
                    className={twMerge(
                        "bg-transparent w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300 focus:ring-3 focus:ring-gray-200",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        // Icon padding
                        leftIcon && "pl-10",
                        rightIcon && "pr-10",
                        // Error state
                        error && "border-destructive focus-visible:ring-destructive/40",
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? "true" : "false"}
                    {...props}
                />
                {RightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-900 pointer-events-none">
                        <RightIcon size={iconSize} />
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };