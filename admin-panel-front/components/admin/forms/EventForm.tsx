// components/admin/forms/EventForm.tsx
"use client";

import React from "react";
import { EventFormData, ViewType } from "@/types/admin";

interface EventFormProps {
  eventForm: EventFormData;
  setEventForm: React.Dispatch<React.SetStateAction<EventFormData>>;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  generateSlug: (title: string) => string;
}

export default function EventForm({
  eventForm,
  setEventForm,
  activeView,
  setActiveView,
  onSubmit,
  loading,
  generateSlug,
}: EventFormProps) {
  const handleTitleChange = (title: string) => {
    setEventForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
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
            <label className="text-xs font-extrabold text-neutral-dark/80">عنوان رویداد *</label>
            <input
              type="text"
              required
              value={eventForm.title}
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
              value={eventForm.slug}
              placeholder="slug-automatically-generated"
              className="w-full bg-neutral-bg/10 border border-neutral-dark/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-dark/40 cursor-not-allowed text-left focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">مکان برگزاری رویداد</label>
            <input
              type="text"
              value={eventForm.location}
              onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">تاریخ رویداد (نمایشی)</label>
            <input
              type="text"
              placeholder="مثال: جمعه ۱۰ مرداد ساعت ۱۸:۰۰"
              value={eventForm.date_display}
              onChange={(e) => setEventForm((prev) => ({ ...prev, date_display: e.target.value }))}
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* فیلد انتخاب تصویر کاور رویداد از کامپیوتر */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">تصویر کاور رویداد</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setEventForm((prev) => ({ ...prev, image: file }));
            }}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-2 text-xs focus:outline-none file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
          />
          {eventForm.image && (
            <div className="mt-1 text-[11px] text-neutral-dark/60">
              تصویر انتخاب شده:{" "}
              <span className="font-bold">
                {eventForm.image instanceof File ? eventForm.image.name : "تصویر در دیتابیس موجود است"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">خلاصه کوتاه رویداد *</label>
          <input
            type="text"
            required
            value={eventForm.summary}
            onChange={(e) => setEventForm((prev) => ({ ...prev, summary: e.target.value }))}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">جزئیات کامل برنامه رویداد</label>
          <textarea
            rows={5}
            value={eventForm.body}
            onChange={(e) => setEventForm((prev) => ({ ...prev, body: e.target.value }))}
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none min-h-[120px]"
          />
        </div>

        <div className="pt-2 select-none">
          <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
            <input
              type="checkbox"
              checked={eventForm.is_published}
              onChange={(e) => setEventForm((prev) => ({ ...prev, is_published: e.target.checked }))}
              className="w-4 h-4 rounded text-primary focus:ring-primary/30"
            />
            انتشار فوری رویداد روی پورتال
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