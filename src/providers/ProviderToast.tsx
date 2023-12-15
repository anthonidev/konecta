"use client";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ProviderToast() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      autoClose={4000}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
