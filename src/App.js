import React, { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Router from "./router";
import "./App.css";
import AxiosInterceptorProvider from "./interceptors/axiosInterceptorProvider";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { getCartDetails } from "./service/productAPI";
import { setCartCount } from "./redux/cartSlice"; // assume you have this action
import ToastContainer from "./comman/toster-message/ToastContainer";
import ScrollToTop from "./ScrollToTop";
import { LocalStorageKeys } from "./constants/localStorageKeys";
import * as localStorageService from "./service/localStorageService";
function AppContent() {
  const dispatch = useDispatch();
const navigate = useNavigate()
  useEffect(() => {
  console.log("🔍 Current URL:", window.location.href);

  const hash = window.location.hash;
  if (hash.includes("token=")) {
    const token = hash.split("token=")[1];
    console.log("✅ Token found:", token);

    if (token) {
      // Save token
      localStorageService.setValue(LocalStorageKeys.AuthToken, token);
      localStorageService.setValue(LocalStorageKeys.User, JSON.stringify({ provider: "Google" }));
      console.log("💾 Token saved to localStorage");

      // Remove hash from URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Optionally navigate to main page
      navigate("/home"); 
      console.log("➡️ Navigation complete");
    }
  } else {
    console.log("⚠️ No token found in hash.");
  }
}, []);
  const fetchCart = async () => {
    try {
      const response = await getCartDetails();
      const count = response.data.items.length;
      console.log("Cart items:", count);
      dispatch(setCartCount(count)); 
    } catch (err) {
      console.log(err || "something went wrong");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <ScrollToTop>
        <Router />
      </ScrollToTop>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AxiosInterceptorProvider>
          <AppContent />
          <ToastContainer />
        </AxiosInterceptorProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
