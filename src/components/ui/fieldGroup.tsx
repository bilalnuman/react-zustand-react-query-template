import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";

interface FieldGroupProps {
    label: string;
    id?: string;
    icon?: keyof typeof Icons;
    description?: string;
    children: React.ReactNode;
    isRequired?: boolean;
    errorMessage?: string;
    iconSize?: number;
    classNames?: {
        wrapper?: string;
        label?: string;
        description?: string;
        errorMessage?: string;
        icon?: string;

    }
}
const FieldGroup = ({ label, id, description, children, icon, isRequired, errorMessage, classNames, iconSize=16 }: FieldGroupProps) => {
    const Icon = Icons[icon as keyof typeof Icons];
    return (
        <div className={twMerge("flex flex-col",classNames?.wrapper)}>
            <label htmlFor={id} className={twMerge(`text-sm font-medium flex items-center gap-2 ${classNames?.label || ''}`)}>
                <span className="flex items-center gap-1">
                    {Icon && <Icon size={iconSize} className={twMerge("me-1", classNames?.icon)} />}
                    {label}
                    {isRequired && <sup className="text-red-500 text-base top-0">*</sup>}
                </span>
                {description && <p className={twMerge(`text-gray-500 text-xs ${classNames?.description || ''}`)}>{description}</p>}
            </label>
            <div className="flex-1">
                {children}
                {errorMessage && <p className={twMerge(`text-red-500 text-sm ${classNames?.errorMessage || ''}`)}>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default FieldGroup
