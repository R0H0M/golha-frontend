// components/admin/DashboardSidebar.tsx
"use client";

import React from "react";
import { TabType, ViewType } from "@/types/admin";

interface DashboardSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  setActiveView: (view: ViewType) => void;
  clearStatusMessage: () => void;
}

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  setActiveView,
  clearStatusMessage,
}: DashboardSidebarProps) {
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setActiveView("list");
    clearStatusMessage();
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "news", label: "مدیریت اخبار", icon: "📝" },
    { id: "announcements", label: "مدیریت اطلاعیه‌ها", icon: "📢" },
    { id: "events", label: "مدیریت رویدادها", icon: "📅" },
    { id: "comments", label: "مدیریت دیدگاه‌ها", icon: "💬" },
  ];

  return (
    <aside className="lg:col-span-3 bg-white rounded-3xl p-6 border border-neutral-dark/10 shadow-sm space-y-2 h-fit">
      <span className="block text-[11px] font-black text-neutral-dark/40 mb-4 text-right">دپارتمان‌های فعال</span>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`w-full text-right font-extrabold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
            activeTab === tab.id
              ? "bg-primary text-white shadow-md"
              : "text-neutral-dark/75 hover:bg-neutral-bg"
          }`}
        >
          <span>{tab.label}</span>
          <span>{tab.icon}</span>
        </button>
      ))}
    </aside>
  );
}