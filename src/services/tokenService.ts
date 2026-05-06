import { useAuthStore } from "@/store/use-auth-store";

const ACCESS_TOKEN_KEY = "accessToken";

export const tokenService = {
    get: () => {
        if (typeof window === "undefined") return null;
        return useAuthStore.getState().accessToken;
    },

    set: (token: string) => {
        if (typeof window === "undefined") return;
        // localStorage.setItem(ACCESS_TOKEN_KEY, token);
        useAuthStore.getState().setToken(token);
    },

    remove: () => {
        if (typeof window === "undefined") return;
        useAuthStore.getState().setToken(null);
    },
};