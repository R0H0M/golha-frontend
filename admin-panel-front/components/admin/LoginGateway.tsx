// components/admin/LoginGateway.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LoginGatewayProps {
  onLogin: (data: { phone: string; password: string }) => Promise<boolean>;
  loginError: string | null;
  loginLoading: boolean;
}

export default function LoginGateway({ onLogin, loginError, loginLoading }: LoginGatewayProps) {
  const [loginData, setLoginData] = useState({ phone: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(loginData);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 font-sans select-none antialiased">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1c1c1c] rounded-3xl p-8 border border-white/5 shadow-2xl text-right space-y-6"
      >
        <div className="text-center space-y-2">
          <span className="text-accent-ochre font-extrabold text-2xl">دهکده گل‌ها</span>
          <h2 className="text-lg font-bold text-white/90">ورود به پنل مدیریت دپارتمان‌ها</h2>
        </div>

        {loginError && (
          <div className="p-3 bg-accent-ochre/10 text-accent-ochre border border-accent-ochre/15 rounded-xl text-xs font-bold leading-relaxed">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/60">شماره تلفن ادمین</label>
            <input
              type="tel"
              required
              value={loginData.phone}
              onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
              placeholder="09123456789"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-white focus:outline-none text-left"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/60">رمز عبور امنیتی</label>
            <input
              type="password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-white focus:outline-none text-left"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-white/10 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loginLoading ? "احراز هویت..." : "ورود به داشبورد مدیریت"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}