import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    withCredentials: true
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // try {

        //     if (config.headers) {
        //         const res = await axios.post("/api/get-token");
        //         config.headers.Authorization = `Bearer ${res.data.token}`;
        //     }
        // } catch (error) {
        //     // Error fetching token
        // }

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