import { useAuthStore } from "@/store/use-auth-store";

export const tokenService = {
    get: () => {
        if (typeof window === "undefined") return null;
        return useAuthStore.getState().accessToken;
    },

    set: (token: string) => {
        if (typeof window === "undefined") return;
        useAuthStore.getState().setToken(token);
    },

    remove: () => {
        if (typeof window === "undefined") return;
        useAuthStore.getState().setToken(null);
    },
};