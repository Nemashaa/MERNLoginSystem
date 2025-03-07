// App.jsx
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import './utils/axiosInterceptor';

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <AppRoutes />
    </>
  );
};

export default App;