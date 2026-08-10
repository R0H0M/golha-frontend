// hooks/useAuth.ts
"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8001/api/v1";

// همگام‌سازی با تغییرات localStorage مرورگر
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_token") || "";
  }
  return "";
};

const getServerSnapshot = () => "";

export function useAuth() {
  const storedToken = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [manualToken, setManualToken] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const authToken = manualToken || storedToken;
  const isLoggedIn = Boolean(authToken);

  // متد لاگین بر اساس phone و password
  const login = async (loginData: { phone: string; password: string }): Promise<boolean> => {
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        // دریافت توکن یا شماره تلفن به عنوان تایید ورود
        const token = data.access || data.token || data.phone;
        if (token) {
          localStorage.setItem("admin_token", token);
          setManualToken(token);
          return true;
        }
      } else {
        setLoginError(data.detail || data.message || "❌ اطلاعات کاربری نامعتبر است.");
      }
    } catch (err) {
      setLoginError("❌ عدم ارتباط با سرور دیتابیس بک‌بند.");
    } finally {
      setLoginLoading(false);
    }
    return false;
  };

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setManualToken("");
  }, []);

  return {
    isLoggedIn,
    authToken,
    loginError,
    loginLoading,
    login,
    logout,
    setLoginError,
  };
}