import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";


type ButtonVariant =
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";

type ButtonSize =
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";

type IconPosition = "start" | "end";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;

    isLoading?: boolean;
    loadingText?: string;

    icon?: React.ReactNode;
    iconPosition?: IconPosition;
}

const variantClasses: Record<ButtonVariant, string> = {
    default:
        "bg-dark-900 text-white hover:bg-dark-900/90",

    outline:
        "border border-gray-300 bg-background hover:bg-muted hover:text-foreground",

    secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",

    ghost:
        "hover:bg-muted hover:text-foreground",

    destructive:
        "bg-destructive text-white hover:bg-destructive/90",

    link:
        "h-auto p-0 text-primary underline-offset-4 hover:underline",
};
const sizeClasses: Record<ButtonSize, string> = {
    default:
        "h-11 px-4 gap-2",

    xs:
        "h-6 rounded-md px-2 text-xs gap-1 [&_svg]:size-3",

    sm:
        "h-8 rounded-md px-3 text-sm gap-1.5 [&_svg]:size-4",

    lg:
        "h-12 rounded-xl px-6 text-base gap-2 [&_svg]:size-5",

    icon:
        "size-11",

    "icon-xs":
        "size-6 rounded-md [&_svg]:size-3",

    "icon-sm":
        "size-8 rounded-md [&_svg]:size-4",

    "icon-lg":
        "size-12 rounded-xl [&_svg]:size-5",
};
const baseClasses = `
inline-flex
items-center
justify-center
shrink-0
relative

rounded-lg
font-medium
whitespace-nowrap

select-none
cursor-pointer

outline-none

transition-colors
transition-transform
motion-reduce:transition-none

focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring/50

disabled:pointer-events-none
disabled:opacity-50

active:scale-[0.98]

[&_svg]:pointer-events-none
[&_svg]:shrink-0
`;


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,

            variant = "default",
            size = "default",

            type = "button",

            isLoading = false,
            loadingText,

            icon,
            iconPosition = "start",

            disabled,
            children,

            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        if (process.env.NODE_ENV !== "production") {
            const isIconOnly = size.includes("icon") && !children;

            if (isIconOnly && !props["aria-label"]) {
                console.warn(
                    "[Button]: Icon-only buttons must include an aria-label."
                );
            }
        }

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={isLoading}
                data-variant={variant}
                data-size={size}
                className={twMerge(
                    baseClasses,
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <span
                        className="absolute inset-0 flex items-center justify-center"
                        aria-live="polite"
                    >
                        <Icons.spinner
                            aria-hidden="true"
                            className="animate-spin"
                            size={18}
                        />
                    </span>
                )}
                <span
                    className={twMerge(
                        "inline-flex items-center justify-center gap-2",
                        isLoading && "opacity-0"
                    )}
                >
                    {icon && iconPosition === "start" && (
                        <span
                            aria-hidden="true"
                            className="inline-flex shrink-0"
                        >
                            {icon}
                        </span>
                    )}

                    <span>
                        {isLoading ? loadingText ?? children : children}
                    </span>

                    {icon && iconPosition === "end" && (
                        <span
                            aria-hidden="true"
                            className="inline-flex shrink-0"
                        >
                            {icon}
                        </span>
                    )}
                </span>
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type {
    ButtonVariant,
    ButtonSize,
};