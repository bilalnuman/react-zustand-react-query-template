import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    withCredentials:true
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {

            if (config.headers) {
                const res = await axios.post("/api/get-token");
                config.headers.Authorization = `Bearer ${res.data.token}`;
            }
        } catch (error) {
            console.error("Error fetching token from cookie:", error);
        }

        return config;
    },
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
            if (typeof window !== "undefined" && error.config?.url !== "/auth/login") {
                window.location.href = "/login";
            }
        }

        if (status === 403) {
            console.error("Forbidden access");
        }

        if (status >= 500) {
            console.error("Server error");
        }
        const rawMessage =
            typeof error?.response?.data === "string"
                ? error.response.data
                : JSON.stringify(error?.response?.data);

        return Promise.reject({
            message: rawMessage.replace(/[{}\[\]"']/g, "") || "Something went wrong",
            status,
        });
    }
);

export default apiClient;