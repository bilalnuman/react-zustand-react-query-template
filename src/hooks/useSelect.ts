import { useEffect, useMemo, useState } from "react";

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
    onChange?: (hook: UseSelectReturn, val: any) => void;
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
    maxSelect,
    onChange,
    asyncLoad,
}: UseSelectProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SelectItem[]>(items);
    const [internal, setInternal] = useState<string | string[]>(
        defaultValue ?? (isMulti ? [] : "")
    );

    const selected = value ?? internal;

    // 🔥 Async search
    useEffect(() => {
        if (!asyncLoad) return;

        const t = setTimeout(async () => {
            setLoading(true);
            const res = await asyncLoad(search);
            setData(res);
            setLoading(false);
        }, 300);

        return () => clearTimeout(t);
    }, [search, asyncLoad]);

    // 🔍 Sync filter fallback
    const filtered = useMemo(() => {
        if (asyncLoad) return data;

        return data.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, data, asyncLoad]);

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
    const isSelected = (val: string) => {
        return isMulti
            ? (selected as string[]).includes(val)
            : selected === val;
    };

    // 🎯 Select logic (single + multi + maxSelect)
    const select = (item: SelectItem) => {
        if (item.disabled) return;

        let newVal: any;
        let nextSelected: string | string[];
        if (isMulti) {
            let current = (selected as string[]) || [];
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
            onChange({ ...hook, selected: nextSelected }, newVal);
        }
    };

    const clear = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const nextSelected = isMulti ? [] : "";
        setInternal(nextSelected);
        if (onChange) {
            onChange({ ...hook, selected: nextSelected }, isMulti ? [] : null,);
        }
    };

    const hook = {
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
        selected,
        isMulti,
        // actions
        select,
        isSelected,
        setInternal,
        clear
    };

    return hook;
};