import { useCallback, useEffect, useMemo, useState } from "react";

export type SelectItem = {
    label: string;
    value: string;
    disabled?: boolean;
    group?: string;
    icon?: React.ReactNode;
};
export type UseSelectReturn = ReturnType<typeof useSelect>;
export type UseSelectProps = {
    items?: SelectItem[];
    value?: string | string[];
    defaultValue?: string | string[];
    isMulti?: boolean;
    maxSelect?: number;
    isSearchable?: boolean;
    isCaretIconVisible?: boolean;
    isClearable?: boolean;
    isDbSearch?:boolean;
    onChange?: (val: any, hook: UseSelectReturn, item: any) => void;
    asyncLoad?: (query: string) => Promise<SelectItem[]>;
};

export const useSelect = ({
    items = [],
    value,
    defaultValue,
    isMulti = false,
    isSearchable = true,
    isCaretIconVisible = true,
    isClearable = false,
    isDbSearch=false,
    maxSelect,
    onChange,
    asyncLoad,
}: UseSelectProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SelectItem[]>(items);

    useEffect(() => {
        setData(items);
    }, [items]);

    const [internal, setInternal] = useState<string | string[]>(
        defaultValue ?? (isMulti ? [] : "")
    );

    const valueState = value ?? internal;

    // 🔥 Async search fallback
    useEffect(() => {
        if (!asyncLoad || !search) {
            if (!search) setData(items);
            return;
        }

        // Check if we have local matches first
        const hasLocalMatches = items.some(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );

        if (hasLocalMatches && !isDbSearch) return;

        const t = setTimeout(async () => {
            setLoading(true);
            const res = await asyncLoad(search);
            setData(res);
            setLoading(false);
        }, 300);

        return () => clearTimeout(t);
    }, [search, asyncLoad, items, isDbSearch]);

    // 🔍 Sync filter with fallback logic
    const filtered = useMemo(() => {
        const localMatches = items.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );

        // If isDbSearch is enabled, we merge local results with async data
        if (isDbSearch && search && asyncLoad) {
            // Use a Map to ensure unique values by 'value' key
            const merged = new Map();
            localMatches.forEach(item => merged.set(item.value, item));
            data.forEach(item => merged.set(item.value, item));
            return Array.from(merged.values());
        }

        // If we have local matches, prioritize them (original hybrid logic)
        if (localMatches.length > 0) return localMatches;

        // Otherwise, if we have a search query and no local matches, return the async data
        if (search && asyncLoad) return data;

        // Default to local matches (which will be empty if no search or no matches)
        return localMatches;
    }, [search, items, data, asyncLoad, isDbSearch]);

    // 📦 Grouping
    const grouped = useMemo(() => {
        const map: Record<string, SelectItem[]> = {};

        filtered.forEach((item) => {
            const key = item.group || "default";
            if (!map[key]) map[key] = [];
            map[key].push(item);
        });

        return map;
    }, [filtered]);

    // ✅ Selected check
    const isSelected = useCallback((val: string) => {
        return isMulti
            ? (valueState as string[]).includes(val)
            : valueState === val;
    }, [isMulti, valueState]);

    // 🎯 Select logic (single + multi + maxSelect)
    const select = useCallback((item: SelectItem) => {
        if (item.disabled) return;

        let newVal: any;
        let nextSelected: string | string[];
        if (isMulti) {
            let current = (valueState as string[]) || [];
            const exists = current.includes(item.value);

            if (exists) {
                current = current.filter((v) => v !== item.value);
            } else {
                if (maxSelect && current.length >= maxSelect) return;
                current = [...current, item.value];
            }

            setInternal(current);
            newVal = filtered.filter((i) => current.includes(i.value));
            nextSelected = current;
        } else {
            setInternal(item.value);
            newVal = item;
            nextSelected = item.value;
            setOpen(false);
        }

        if (onChange) {
            // We pass a partial mock of the hook or just the values to avoid circular dependency
            onChange(nextSelected, { value: nextSelected } as any, newVal);
        }
    }, [isMulti, valueState, maxSelect, filtered, onChange]);

    const clear = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        const nextSelected = isMulti ? [] : "";
        setInternal(nextSelected);
        if (onChange) {
            onChange(nextSelected, { value: nextSelected } as any, isMulti ? [] : null);
        }
    }, [isMulti, onChange]);

    const hook = useMemo(() => ({
        // state
        open,
        setOpen,
        search,
        setSearch,
        loading,
        isSearchable,
        isCaretIconVisible,
        isClearable,
        // data
        filtered,
        grouped,
        value: valueState,
        isMulti,
        // actions
        select,
        isSelected,
        setInternal,
        clear
    }), [
        open,
        search,
        loading,
        isSearchable,
        isCaretIconVisible,
        isClearable,
        filtered,
        grouped,
        valueState,
        isMulti,
        select,
        isSelected,
        clear
    ]);

    return hook;
};