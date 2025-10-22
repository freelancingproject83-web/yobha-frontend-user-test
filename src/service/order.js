import * as axiosService from "./axiosService";

export const getOrders = async () => {
  try {
    const response = await axiosService.Get("/orders"); 
    return response.data;
  } catch (err) {
    console.error("Fetching orders failed:", err.response?.data || err.message);
    throw err;
  }
};

export const CreateOrder = async (payload) => {
    try {
        const response = await axiosService.Post("/orders", payload);
        return response.data;
    } catch (error) {
        console.error("CreateOrder error:", error);
        throw error;
    }
};