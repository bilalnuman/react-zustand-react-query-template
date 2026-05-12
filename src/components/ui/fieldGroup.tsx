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
const FieldGroup = ({
    label,
    id,
    description,
    children,
    icon,
    isRequired,
    errorMessage,
    classNames,
    iconSize = 16
}: FieldGroupProps) => {
    const Icon = icon ? Icons[icon] : null;
    return (
        <div className={twMerge("flex flex-col", classNames?.wrapper)}>
            <label htmlFor={id} className={twMerge("text-sm font-medium flex items-center gap-1", classNames?.label)} data-slot="form-lable" data-error={errorMessage?true:false}>
                {Icon && (<Icon size={iconSize} className={twMerge("me-1", classNames?.icon)} />)}
                {label}
                {isRequired && (<sup className="text-red-500 text-xs" aria-hidden="true">*</sup>)}
            </label>
            {description && (
                <p className={twMerge("text-gray-500 text-xs mt-0.5", classNames?.description)}>{description}</p>
            )}
            <div className="flex-1 mt-1">
                {children}
                {errorMessage && (<p role="alert" className={twMerge("text-red-500 text-sm mt-1", classNames?.errorMessage)}> {errorMessage}</p>)}
            </div>
        </div>
    )
}

export default FieldGroup
