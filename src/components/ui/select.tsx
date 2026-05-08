import { twMerge } from "tailwind-merge";
import { useRef, useEffect, memo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { UseSelectReturn, SelectItem, useSelect, UseSelectProps } from "@/hooks/useSelect";
import { Icons } from "./icons";

interface SelectProps extends UseSelectProps {
    onSelect?: (hook: UseSelectReturn) => void;
    placeholder?: string | React.ReactNode;
    classNames?: {
        trigger?: string;
        dropdown?: string;
        searchInput?: string;
        option?: string;
        groupLabel?: string;
        wrapper?: string;
        portal?: string;
        triggerContent?: string;
    };
}

const Select = ({ onSelect, placeholder = "Select...", classNames, ...props }: SelectProps) => {
    const hook = useSelect(props);
    const inputRef = useRef<HTMLInputElement>(null);
    const [highlightIndex, setHighlightIndex] = useState(0);

    const moveHighlight = (dir: "up" | "down") => {
        const length = hook.filtered.length;
        if (length === 0) return;
        setHighlightIndex((prev) => {
            if (dir === "down") return (prev + 1) % length;
            if (dir === "up") return prev === 0 ? length - 1 : prev - 1;
            return prev;
        });
    };

    const getHighlightedItem = () => hook.filtered[highlightIndex];

    useEffect(() => {
        if (hook.open) {
            setHighlightIndex(-1);
            if (hook.isSearchable && inputRef.current) {
                setTimeout(() => inputRef.current?.focus(), 0);
            }
        }
        onSelect?.(hook);
    }, [hook.open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!hook.open) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                moveHighlight("down");
                break;
            case "ArrowUp":
                e.preventDefault();
                moveHighlight("up");
                break;
            case "Enter":
                e.preventDefault();
                const item = getHighlightedItem();
                if (item) hook.select(item);
                break;
            case "Escape":
                e.preventDefault();
                hook.setOpen(false);
                break;
        }
    };

    const renderTriggerContent = () => {
        if (Array.isArray(hook.value)) {
            if (hook.value.length === 0) return placeholder;
            const selectedItems = hook.filtered.filter(i => (hook.value as string[]).includes(i.value));
            if (selectedItems.length <= 2) {
                return selectedItems.map(i => i.label).join(", ");
            }
            return `${selectedItems.length} selected`;
        }
        if (hook.value) {
            const selectedItem = hook.filtered.find(i => i.value === hook.value);
            return selectedItem?.label || placeholder;
        }
        return placeholder;
    };

    return (
        <Popover.Root open={hook.open} onOpenChange={hook.setOpen}>
            <div className={twMerge("relative min-w-64", classNames?.wrapper)}>
                <Popover.Trigger asChild>
                    <button
                        type="button"
                        role="combobox"
                        aria-expanded={hook.open}
                        className={twMerge(
                            "w-full flex items-center justify-between",
                            typeof placeholder === "string" ? "Input" : "",
                            classNames?.trigger
                        )}
                    >
                        <span className={twMerge("truncate", classNames?.triggerContent)}>
                            {renderTriggerContent()}
                        </span>
                        <span className="flex items-center gap-1">
                            {hook.isClearable && (Array.isArray(hook.value) ? hook.value.length > 0 : !!hook.value) && (
                                <button
                                    type="button"
                                    onClick={hook.clear}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Icons.closeCircle size={18} />
                                </button>
                            )}
                            {hook.isCaretIconVisible && (
                                <Icons.caretDown
                                    size={20}
                                    className={twMerge("transition-transform", hook.open && "rotate-180")}
                                />
                            )}
                        </span>

                    </button>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content
                        align="start"
                        sideOffset={4}
                        className={twMerge(
                            "z-[9999] bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                            classNames?.dropdown
                        )}
                        style={{ width: "var(--radix-popover-trigger-width)" }}
                        onKeyDown={handleKeyDown}
                    >
                        {hook.isSearchable && (
                            <div className="p-2 border-b border-gray-300 relative">
                                <input
                                    ref={inputRef}
                                    className={twMerge("Input h-10 text-sm", classNames?.searchInput)}
                                    placeholder="Search..."
                                    value={hook.search}
                                    onChange={(e) => hook.setSearch(e.target.value)}
                                />
                                {hook.search && (
                                    <button
                                        onClick={() => hook.setSearch("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <Icons.closeCircle />
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="max-h-60 overflow-auto py-1">
                            {Object.entries(hook.grouped).map(([group, items]) => (
                                <div key={group}>
                                    {group !== "default" && (
                                        <div className={twMerge(
                                            "px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50",
                                            classNames?.groupLabel
                                        )}>
                                            {group}
                                        </div>
                                    )}

                                    {items.map((item: SelectItem) => {
                                        const globalIndex = hook.filtered.findIndex(i => i.value === item.value);
                                        const isHighlighted = globalIndex === highlightIndex;
                                        const isSelected = hook.isSelected(item.value);

                                        return (
                                            <div
                                                key={item.value}
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() => hook.select(item)}
                                                onMouseEnter={() => setHighlightIndex(globalIndex)}
                                                onMouseLeave={() => setHighlightIndex(-1)}
                                                className={twMerge(
                                                    "px-4 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2",
                                                    isHighlighted ? "bg-blue-50 text-blue-700" : "text-gray-700",
                                                    isSelected && "bg-blue-100 font-medium text-blue-800",
                                                    item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                                                    classNames?.option
                                                )}
                                            >
                                                {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                                                <div className="flex items-center gap-2 justify-between w-full">
                                                    <span className="flex-1 truncate">{item.label}</span>
                                                    {isSelected && <Icons.circleCheck />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}

                            {hook.filtered.length === 0 && !hook.loading && (
                                <div className="px-4 py-8 text-center text-sm text-gray-500">
                                    No results found
                                </div>
                            )}

                            {hook.loading && (
                                <div className="p-3 border-t bg-gray-50 flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    Loading...
                                </div>
                            )}
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </div>
        </Popover.Root>
    );
};

export default memo(Select);