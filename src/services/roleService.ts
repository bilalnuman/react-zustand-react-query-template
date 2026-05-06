import { useAuthStore } from "@/store/use-auth-store";

const ROLE_KEY = "userRole";

export const roleService = {
    get: () => {
        if (typeof window === "undefined") return null;

        const storeRole = useAuthStore.getState().userRole;
        if (storeRole) return storeRole;

        const name = ROLE_KEY + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    },

    set: (role: string) => {
        if (typeof window === "undefined") return;
        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = ROLE_KEY + "=" + role + ";" + expires + ";path=/";
        useAuthStore.getState().setRole(role);
    },

    remove: () => {
        if (typeof window === "undefined") return;
        document.cookie = ROLE_KEY + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        useAuthStore.getState().setRole(null);
    },
};
