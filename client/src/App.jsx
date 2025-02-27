// 📌 App.jsx
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <AppRoutes />
    </UserContextProvider>
  );
};

export default App;
