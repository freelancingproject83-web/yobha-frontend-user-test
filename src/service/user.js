import * as axiosService from "./axiosService";

export const updateUserName = async (payload) => {
  try {
    const response = await axiosService.Patch("/auth/name", payload);
    return response.data;
  } catch (error) {
    console.error("updateUserName error:", error);
    throw error;
  }
};
