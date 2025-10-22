import * as axiosService from "./axiosService";

export const addToWishlist = async (productId,payload) => {
  try {
    const response = await axiosService.Post(`/Wishlist`,payload);
    return response.data;
  } catch (err) {
    console.error("addToWishlist error:", err.response?.data || err.message);
    throw err;
  }
};

export const removeFromWishlists = async (productId) => {
  try {
    const response = await axiosService.Delete(`/Wishlist/${productId}`, {
      params: { productId }
    });
    return response.data;
  } catch (err) {
    console.error("removeFromWishlist error:", err.response?.data || err.message);
    throw err;
  }
};

export const getWishlist = async () => {
  try {
    const response = await axiosService.Get("/Wishlist"); 
    return response.data;
  } catch (err) {
    console.error("getWishlist error:", err.response?.data || err.message);
    throw err;
  }
};
