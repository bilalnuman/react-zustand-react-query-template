"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { useApiQuery } from "@/hooks/use-api-query";
import Loading from "../ui/loading";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setUser = useAuthStore((s) => s.setUser);
    const { data, isLoading, isError } = useApiQuery<any>({
        url: "/auth/me",
        options: { retry: false },
        persistKey: "user-me"
    });
    useEffect(() => {
        if (data) {
            setUser(data);
        }

        if (isError) {
            setUser(null);
        }
    }, [data, isError, setUser]);

    return isLoading ? <Loading /> : children;
}