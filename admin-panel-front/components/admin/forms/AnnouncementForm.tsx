// components/admin/forms/AnnouncementForm.tsx
"use client";

import React from "react";
import { AnnouncementFormData, ViewType } from "@/types/admin";

interface AnnouncementFormProps {
  announcementForm: AnnouncementFormData;
  setAnnouncementForm: React.Dispatch<React.SetStateAction<AnnouncementFormData>>;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  generateSlug: (title: string) => string;
}

export default function AnnouncementForm({
  announcementForm,
  setAnnouncementForm,
  activeView,
  setActiveView,
  onSubmit,
  loading,
  generateSlug,
}: AnnouncementFormProps) {
  const handleTitleChange = (title: string) => {
    setAnnouncementForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-right">
      <div className="flex items-center justify-between border-b border-neutral-dark/10 pb-4">
        <h2 className="text-lg font-black text-neutral-dark">
          {activeView === "edit" ? "ویرایش و اصلاح اطلاعات" : "ثبت اطلاعات جدید در دیتابیس"}
        </h2>
        <button
          type="button"
          onClick={() => setActiveView("list")}
          className="border border-neutral-dark/20 text-neutral-dark/70 hover:bg-neutral-bg text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer"
        >
          ↩️ بازگشت به جدول
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">عنوان اطلاعیه *</label>
            <input
              type="text"
              required
              value={announcementForm.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80 flex items-center gap-1">
              اسلاگ یکتا (تولید خودکار) 🔒
            </label>
            <input
              type="text"
              readOnly
              value={announcementForm.slug}
              placeholder="slug-automatically-generated"
              className="w-full bg-neutral-bg/10 border border-neutral-dark/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-dark/40 cursor-not-allowed text-left focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">دسته‌بندی اولویت</label>
          <select
            value={announcementForm.category}
            onChange={(e) => setAnnouncementForm((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
          >
            <option value="بحران">بحران</option>
            <option value="عمرانی">عمرانی</option>
            <option value="رویداد">رویداد</option>
            <option value="عمومی">عمومی</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">خلاصه متن اطلاعیه *</label>
          <textarea
            rows={4}
            required
            value={announcementForm.summary}
            onChange={(e) => setAnnouncementForm((prev) => ({ ...prev, summary: e.target.value }))}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none min-h-[100px]"
          />
        </div>

        <div className="flex items-center gap-6 pt-2 select-none">
          <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
            <input
              type="checkbox"
              checked={announcementForm.is_emergency}
              onChange={(e) => setAnnouncementForm((prev) => ({ ...prev, is_emergency: e.target.checked }))}
              className="w-4 h-4 rounded text-primary focus:ring-primary/30"
            />
            تعیین به عنوان وضعیت بسیار فوری (نمایش در بالای هدر)
          </label>
          <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
            <input
              type="checkbox"
              checked={announcementForm.is_published}
              onChange={(e) => setAnnouncementForm((prev) => ({ ...prev, is_published: e.target.checked }))}
              className="w-4 h-4 rounded text-primary focus:ring-primary/30"
            />
            انتشار فوری اطلاعیه روی پورتال
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-neutral-dark/10">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-primary hover:bg-primary-hover disabled:bg-neutral-dark/30 text-white font-bold text-xs md:text-sm py-4 px-10 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
        >
          {loading ? "در حال ارسال..." : "ذخیره و ثبت اطلاعات"}
        </button>
      </div>
    </form>
  );
}