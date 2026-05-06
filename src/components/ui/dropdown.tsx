import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface DropdownItem {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    className?: string;
    disabled?: boolean;
    variant?: "default" | "danger";
}

interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: "start" | "center" | "end";
    sideOffset?: number;
    className?: string;
    closeOnSelect?: boolean;
    onClick?: (item: DropdownItem) => void;
}

const Dropdown = ({ trigger, items, onClick, align = "end", sideOffset = 8, className, closeOnSelect = true }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const navigate = useRouter().push;

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild >
                {trigger}
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    align={align}
                    sideOffset={sideOffset}
                    className={twMerge(
                        "z-50 min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100",
                        className
                    )}
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (item?.href) navigate(item.href);
                                const { icon, ...rest } = item;
                                onClick?.(rest);
                                if (closeOnSelect) setOpen(false);
                            }}
                            disabled={item.disabled}
                            className={twMerge(
                                "w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-left cursor-pointer",
                                item.variant === "danger" ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50",
                                item.disabled && "opacity-50 cursor-not-allowed",
                                item.className
                            )}
                        >
                            {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                            <span className="flex-1 truncate">{item.label}</span>
                        </button>
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default Dropdown;
