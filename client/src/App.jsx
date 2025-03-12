// App.jsx
import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './utils/axiosInterceptor'; // Ensure the interceptor is imported
import useAuthStore from './store/authStore';

const queryClient = new QueryClient();

const App = () => {
  const { checkAuth, refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshAccessToken();
      await checkAuth();
    };
    initializeAuth();
  }, [checkAuth, refreshAccessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;