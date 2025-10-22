import * as axiosService from "./axiosService"; 

export const getAddresses = async () => {
    try {
        const response = await axiosService.Get("/Auth/addresses");
        return response.data;
    } catch (error) {
        console.error("getAddresses error:", error);
        throw error;
    }
};

export const addAddress = async (payload) => {
    try {
        const response = await axiosService.Post("/Auth/addresses", payload);
        return response.data;
    } catch (error) {
        console.error("addAddress error:", error);
        throw error;
    }
};

export const updateAddress = async (addressId, payload) => {
    try {
        const response = await axiosService.Put(`/Auth/addresses/${addressId}`, payload);
        return response.data;
    } catch (error) {
        console.error("updateAddress error:", error);
        throw error;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const response = await axiosService.Delete(`/Auth/addresses/${addressId}`);
        return response.data;
    } catch (error) {
        console.error("deleteAddress error:", error);
        throw error;
    }
};

export const createReferral = async (payload) => {
    try {
        const response = await axiosService.Post("/Referral/create", payload);
        return response.data;
    } catch (error) {
        console.error("addAddress error:", error);
        throw error;
    }
};