import * as axiosService from "./axiosService"; 

export const SubscribeNewsletter = async (payload) => {
    try {
        const response = await axiosService.Post("/newsletter", payload, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("SubscribeNewsletter error:", error);
        throw error;
    }
};