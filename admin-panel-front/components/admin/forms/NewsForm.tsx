// components/admin/forms/NewsForm.tsx
"use client";

import React from "react";
import { NewsFormData, ViewType } from "@/types/admin";

interface NewsFormProps {
  newsForm: NewsFormData;
  setNewsForm: React.Dispatch<React.SetStateAction<NewsFormData>>;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  generateSlug: (title: string) => string;
}

export default function NewsForm({
  newsForm,
  setNewsForm,
  activeView,
  setActiveView,
  onSubmit,
  loading,
  generateSlug,
}: NewsFormProps) {
  const handleTitleChange = (title: string) => {
    setNewsForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
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
            <label className="text-xs font-extrabold text-neutral-dark/80">عنوان خبر *</label>
            <input
              type="text"
              required
              value={newsForm.title}
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
              value={newsForm.slug}
              placeholder="slug-automatically-generated"
              className="w-full bg-neutral-bg/10 border border-neutral-dark/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-dark/40 cursor-not-allowed text-left focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">زمان مطالعه</label>
            <input
              type="text"
              value={newsForm.reading_time}
              onChange={(e) => setNewsForm((prev) => ({ ...prev, reading_time: e.target.value }))}
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">نویسنده</label>
            <input
              type="text"
              value={newsForm.author}
              onChange={(e) => setNewsForm((prev) => ({ ...prev, author: e.target.value }))}
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* فیلد انتخاب تصویر از روی کامپیوتر */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">تصویر اصلی خبر</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setNewsForm((prev) => ({ ...prev, image: file }));
            }}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-2 text-xs focus:outline-none file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
          />
          {newsForm.image && (
            <div className="mt-1 text-[11px] text-neutral-dark/60">
              تصویر انتخاب شده:{" "}
              <span className="font-bold">
                {newsForm.image instanceof File ? newsForm.image.name : "تصویر در دیتابیس موجود است"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">خلاصه کوتاه خبر *</label>
          <input
            type="text"
            required
            value={newsForm.summary}
            onChange={(e) => setNewsForm((prev) => ({ ...prev, summary: e.target.value }))}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">متن کامل خبر (HTML مجاز است) *</label>
          <textarea
            rows={6}
            required
            value={newsForm.body}
            onChange={(e) => setNewsForm((prev) => ({ ...prev, body: e.target.value }))}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none min-h-[150px]"
          />
        </div>

        <div className="flex items-center gap-6 pt-2 select-none">
          <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
            <input
              type="checkbox"
              checked={newsForm.is_featured}
              onChange={(e) => setNewsForm((prev) => ({ ...prev, is_featured: e.target.checked }))}
              className="w-4 h-4 rounded text-primary focus:ring-primary/30"
            />
            قرارگیری به عنوان خبر برجسته/پرطرفدار
          </label>
          <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
            <input
              type="checkbox"
              checked={newsForm.is_published}
              onChange={(e) => setNewsForm((prev) => ({ ...prev, is_published: e.target.checked }))}
              className="w-4 h-4 rounded text-primary focus:ring-primary/30"
            />
            انتشار فوری خبر روی پورتال
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