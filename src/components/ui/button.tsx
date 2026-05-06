import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
type IconPosition = "start" | "end";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    loadingText?: string;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
}

// ─── Variant classes ──────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
    default:
        "bg-dark-900 hover:bg-dark-900/80 text-white",
    outline:
        "border border-border bg-background border-gray-300 hover:opacity-70 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
    secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
    ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
    destructive:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
    link: "text-primary underline-offset-4 hover:underline",
};

// ─── Size classes ─────────────────────────────────────────────────────────────

const sizeClasses: Record<ButtonSize, string> = {
    default: "h-11 gap-1.5 px-2.5",
    xs: "h-6 gap-1 rounded-[10px] px-2 text-xs [&_svg]:size-3",
    sm: "h-7 gap-1 rounded-[12px] px-2.5 text-[0.8rem] [&_svg]:size-3.5",
    lg: "h-9 gap-1.5 px-2.5",
    "icon": "size-8",
    "icon-xs": "size-6 rounded-[10px] [&_svg]:size-3",
    "icon-sm": "size-7 rounded-[12px]",
    "icon-lg": "size-9",
};

// ─── Base classes ─────────────────────────────────────────────────────────────

const baseClasses =
    "inline-flex shrink-0 items-center justify-center rounded-lg border cursor-pointer relative border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none " +
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 " +
    "active:translate-y-px " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4";


// ─── Component ────────────────────────────────────────────────────────────────

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

        return (
            <button
                ref={ref}
                type={type}
                data-variant={variant}
                data-size={size}
                disabled={isDisabled}
                aria-busy={isLoading}
                className={twMerge(
                    baseClasses,
                    variantClasses[variant],
                    sizeClasses[size],
                    className,
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        {loadingText ?? children}
                        <Icons.spinner className="absolute end-3" size={26}/>
                    </>
                ) : (
                    <>
                        {icon && iconPosition === "start" && (
                            <span className="shrink-0 [&_svg]:size-4">{icon}</span>
                        )}
                        {children}
                        {icon && iconPosition === "end" && (
                            <span className="shrink-0 [&_svg]:size-4">{icon}</span>
                        )}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };