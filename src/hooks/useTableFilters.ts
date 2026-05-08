"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterValue = string | number | boolean | null | undefined;

type SetFilterOptions = {
    resetKeys?: string[];
    replace?: boolean;
    scroll?: boolean;
};

export const useTableFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // memoized parsed filters
    const filters = useMemo(
        () => Object.fromEntries(searchParams.entries()),
        [searchParams]
    );

    const setFilter = useCallback(
        (
            updates: Record<string, FilterValue>,
            options?: SetFilterOptions
        ) => {
            const current = new URLSearchParams(searchParams.toString());

            // remove selected keys
            options?.resetKeys?.forEach((key) => {
                current.delete(key);
            });

            // apply updates
            Object.entries(updates).forEach(([key, value]) => {
                if (
                    value === "" ||
                    value === null ||
                    value === undefined ||
                    value === false
                ) {
                    current.delete(key);
                } else {
                    current.set(key, String(value));
                }
            });

            const query = current.toString();
            const url = query ? `${pathname}?${query}` : pathname;

            if (options?.replace) {
                router.replace(url, {
                    scroll: options?.scroll,
                });
            } else {
                router.push(url, {
                    scroll: options?.scroll,
                });
            }
        },
        [pathname, router, searchParams]
    );

    const resetFilters = useCallback(() => {
        router.push(pathname);
    }, [pathname, router]);

    return {
        filters,
        setFilter,
        resetFilters,
    };
};