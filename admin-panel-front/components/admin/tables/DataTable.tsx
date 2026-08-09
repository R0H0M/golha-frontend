// components/admin/tables/DataTable.tsx
"use client";

import React from "react";
import { TabType, ViewType, EventItem, CmsItem } from "@/types/admin";
import { CmsPost } from "@/types/cms";
import { Announcement } from "@/types/announcement";

interface DataTableProps {
  activeTab: TabType;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setActiveView: (view: ViewType) => void;
  newsList: CmsPost[];
  announcementsList: Announcement[];
  eventsList: EventItem[];
  onEdit: (item: CmsItem) => void;
  onDelete: (id: number) => void;
}

export default function DataTable({
  activeTab,
  searchTerm,
  setSearchTerm,
  setActiveView,
  newsList,
  announcementsList,
  eventsList,
  onEdit,
  onDelete,
}: DataTableProps) {
  const filteredNews = newsList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAnnouncements = announcementsList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEvents = eventsList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-right">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-dark/10 pb-4">
        <h2 className="text-lg font-black text-neutral-dark">لیست مطالب منتشر شده</h2>
        <button
          onClick={() => setActiveView("create")}
          className="bg-secondary hover:bg-secondary-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer"
        >
          ➕ ثبت ردیف جدید
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="جستجو در عناوین این بخش..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-neutral-bg/50 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto w-full border border-neutral-dark/10 rounded-2xl">
        <table className="w-full text-right text-xs md:text-sm">
          <thead className="bg-neutral-bg text-neutral-dark/60 font-black border-b border-neutral-dark/10 select-none">
            <tr>
              <th className="p-4">عنوان ردیف</th>
              <th className="p-4">دسته‌بندی / لوکیشن</th>
              <th className="p-4">تاریخ</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-dark/5 font-bold text-neutral-dark/85">
            {activeTab === "news" &&
              filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-bg/20">
                  <td className="p-4 truncate max-w-xs">{item.title}</td>
                  <td className="p-4">{item.category || "-"}</td>
                  <td className="p-4">{item.created_at ? new Date(item.created_at).toLocaleDateString('fa-IR') : "-"}</td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

            {activeTab === "announcements" &&
              filteredAnnouncements.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-bg/20">
                  <td className="p-4 truncate max-w-xs">{item.title}</td>
                  <td className="p-4">{item.category || "-"}</td>
                  <td className="p-4">{item.created_at ? new Date(item.created_at).toLocaleDateString('fa-IR') : "-"}</td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

            {activeTab === "events" &&
              filteredEvents.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-bg/20">
                  <td className="p-4 truncate max-w-xs">{item.title}</td>
                  <td className="p-4">{item.location || "-"}</td>
                  <td className="p-4">{item.date_display || "-"}</td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}