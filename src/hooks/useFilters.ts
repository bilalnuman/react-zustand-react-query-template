"use client";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
type FilterValue = string | number | boolean | null | undefined;
type SetFilterOptions = {
    resetKeys?: string[];
    replace?: boolean;
    scroll?: boolean;
};

export const useFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
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
            options?.resetKeys?.forEach((key) => {
                current.delete(key);
            });
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