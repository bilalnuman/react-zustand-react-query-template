import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    withCredentials: true
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => config,
    (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
        if (!error.response) {
            return Promise.reject({
                message: "Network error",
            });
        }

        const status = error.response.status;

        if (status === 401) {
            const isAuthRequest = 
                error.config?.url?.includes("/auth/login") || 
                error.config?.url?.includes("/auth/refresh") || 
                error.config?.url?.includes("/auth/logout");

            const hasToken = typeof window !== "undefined" && !!document.cookie.includes("accessToken");

            if (typeof window !== "undefined" && !isAuthRequest && hasToken) {
                apiClient.post("/auth/refresh").catch(() => {
                    // Refresh failed, clean up and redirect
                    if (!window.location.pathname.includes("/login")) {
                        window.location.href = "/login";
                    }
                });
            }
        }

        if (status === 403) {
            // Forbidden access
        }

        if (status >= 500) {
            // Server error
        }
        const errorData = error?.response?.data;

        let message = 'Something went wrong';

        if (errorData) {
            const { statusCode, timestamp, path, ...cleaned } = errorData;

            message = Object.values(cleaned)
                .flat()
                .join(', ');
        }

        return Promise.reject({
            message,
            status,
        });
    }
);

export default apiClient;