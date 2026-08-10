"use client";

import React, { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.176.114.121:8001/api/v1";

interface CommentFormProps {
  slug: string;
}

export default function CommentForm({ slug }: CommentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setLoading(true);

    const encodedSlug = encodeURIComponent(slug);
    const endpoint = `${API_BASE}/cms/articles/${encodedSlug}/comments/`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website || "",
          comment: formData.comment,
        }),
      });

      if (res.status === 201 || res.ok) {
        setStatusMessage({
          text: "🎉 دیدگاه شما با موفقیت ثبت شد و پس از بررسی و تایید مدیریت روی سایت قرار خواهد گرفت.",
          success: true,
        });
        setFormData({ name: "", email: "", website: "", comment: "" });
      } else {
        await res.json().catch(() => ({}));
        setStatusMessage({
          text: `❌ خطا در ثبت دیدگاه (کد وضعیت: ${res.status}). لطفاً ورودی‌ها را بررسی کنید.`,
          success: false,
        });
      }
    } catch (err) {
      setStatusMessage({
        text: "❌ خطای شبکه. امکان برقراری ارتباط با سرور دیتابیس برای ثبت دیدگاه وجود ندارد.",
        success: false,
      });
    } finally { // تصحیح کلمه کلیدی finally در این خط
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm mt-12 text-right space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-black text-neutral-dark border-r-4 border-primary pr-3 leading-none">
          ارسال دیدگاه
        </h3>
        <p className="text-[11px] md:text-xs font-semibold text-neutral-dark/45 mt-3">
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند *
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs md:text-sm font-bold border ${
            statusMessage.success
              ? "bg-secondary/10 text-secondary border-secondary/20"
              : "bg-accent-ochre/10 text-accent-ochre border-accent-ochre/20"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">نام *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="نام خود را وارد کنید"
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-neutral-dark/80">ایمیل *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@example.com"
              className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-left"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">آدرس وب‌سایت (اختیاری)</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://example.com"
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-left"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-neutral-dark/80">دیدگاه شما *</label>
          <textarea
            required
            rows={5}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="دیدگاه خود را اینجا وارد کنید..."
            className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all min-h-[120px]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-hover disabled:bg-neutral-dark/30 text-white text-xs md:text-sm font-bold py-3.5 px-8 rounded-xl transition-all cursor-pointer flex items-center gap-2 self-start shadow-sm"
        >
          {loading ? (
            <>
              <span>در حال ثبت دیدگاه...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              <span>ارسال دیدگاه</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}