// components/admin/DashboardHeader.tsx
"use client";

import React from "react";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export default function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-dark/10 py-6 px-8 md:px-16 flex items-center justify-between gap-4">
      <div className="text-right">
        <h1 className="text-xl md:text-2xl font-black text-primary">داشبورد جامع مدیریت دهکده گل‌ها</h1>
        <p className="text-xs text-neutral-dark/45 font-bold mt-1">سامانه متمرکز ثبت، ویرایش، حذف مطالب و تایید دیدگاه‌ها</p>
      </div>

      <button
        onClick={onLogout}
        className="border border-accent-ochre/30 hover:bg-accent-ochre/10 text-accent-ochre text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
      >
        <span>خروج از پنل</span>
        <span>🚪</span>
      </button>
    </header>
  );
}