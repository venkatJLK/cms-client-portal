import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const callApiWithAuth = async (
    method: "get" | "post" | "patch" | "put" | "delete",
    endpoint: string,
    token: string,
    data?: any
) => {
    try {
        const response = await api.request({
            method,
            url: endpoint,
            headers: {
                Authorization: `Bearer ${token}`,
                ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
            },
            data,
        });

        return response.data;
    } catch (error: any) {
        const detail = error?.response?.data?.detail;

        let cleanedError = "Something went wrong";

        if (typeof detail === "string") {
            const parts = detail.split("::");
            cleanedError = parts.length > 1 ? parts.slice(1).join("::") : detail;
        }

        throw new Error(cleanedError);
    }
};
