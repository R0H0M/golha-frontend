"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CmsPost } from "@/types/cms";
import { Announcement } from "@/types/announcement";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type TabType = "news" | "announcements" | "events" | "comments";
type ViewType = "list" | "create" | "edit";

// تعریف ساختار رویدادها
interface EventItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  date: string;
  location: string;
  image: string;
  is_published: boolean;
}

// تعریف ساختار دیدگاه‌ها
interface CommentItem {
  id: number;
  name: string;
  email: string;
  website?: string;
  comment: string;
  is_approved: boolean;
  article_title: string; // نام مقاله‌ای که کامنت روی آن ثبت شده
  created_at: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("news");
  const [activeView, setActiveView] = useState<ViewType>("list"); // کنترل سه حالت نمایش
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);
  
  // آیدی مطلبی که در حال ویرایش آن هستیم
  const [editingId, setEditingId] = useState<number | null>(null);

  // دیتای لیست‌های واکشی شده از بک‌بند
  const [newsList, setNewsList] = useState<CmsPost[]>([]);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([]);
  const [eventsList, setEventList] = useState<EventItem[]>([]);
  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);

  // استیت‌های سرچ زنده در جدول‌ها
  const [searchTerm, setSearchTerm] = useState("");

  // استیت‌های فرم لاگین
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginErrorLoading] = useState(false);

  // فرم‌های ورودی
  const [newsForm, setNewsForm] = useState({
    title: "", slug: "", excerpt: "", body: "", category: "توسعه",
    date: "", author: "مدیر فنی دهکده", authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    readingTime: "۳ دقیقه مطالعه", image: "", is_featured: false, is_published: true
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "", slug: "", excerpt: "", category: "عمومی",
    date: "", is_emergency: false, is_published: true
  });

  const [eventForm, setEventForm] = useState({
    title: "", slug: "", excerpt: "", body: "",
    date: "", location: "", image: "", is_published: true
  });

  // چک کردن لاگین بودن در بدو ورود
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setAuthToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // واکشی داده‌های لیست متناسب با تب فعال
  useEffect(() => {
    if (isLoggedIn) {
      fetchListData();
    }
  }, [isLoggedIn, activeTab]);

  // متد جامع دریافت اطلاعات لیست‌ها از بک‌بند
  const fetchListData = async () => {
    setLoading(true);
    let url = "";
    if (activeTab === "news") url = `${API_BASE}/api/v1/cms/articles/`;
    else if (activeTab === "announcements") url = `${API_BASE}/api/v1/cms/announcements/`;
    else if (activeTab === "events") url = `${API_BASE}/api/v1/cms/events/`;
    else if (activeTab === "comments") url = `${API_BASE}/api/v1/cms/admin/comments/`; // اندپوینت ادمین کامنت‌ها

    try {
      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (activeTab === "news") setNewsList(data);
        else if (activeTab === "announcements") setAnnouncementsList(data);
        else if (activeTab === "events") setEventList(data);
        else if (activeTab === "comments") setCommentsList(data);
      }
    } catch (err) {
      console.error("Error fetching list:", err);
    } finally {
      setLoading(false);
    }
  };

  // تولید هوشمند و خودکار اسلاگ (Slug) قفل‌شده
  const generateSlug = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9آ-ی\s]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleNewsTitleChange = (title: string) => {
    setNewsForm({ ...newsForm, title, slug: generateSlug(title) });
  };

  const handleAnnouncementTitleChange = (title: string) => {
    setAnnouncementForm({ ...announcementForm, title, slug: generateSlug(title) });
  };

  const handleEventTitleChange = (title: string) => {
    setEventForm({ ...eventForm, title, slug: generateSlug(title) });
  };

  // ==========================================
  // متد ارسال اطلاعات فرم (هم برای ثبت جدید و هم برای ویرایش)
  // ==========================================
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setLoading(true);

    let endpoint = "";
    let payload = {};
    const method = activeView === "edit" ? "PUT" : "POST";

    if (activeTab === "news") {
      endpoint = activeView === "edit" 
        ? `${API_BASE}/api/v1/cms/admin/articles/${editingId}/` 
        : `${API_BASE}/api/v1/cms/admin/articles/`;
      payload = newsForm;
    } else if (activeTab === "announcements") {
      endpoint = activeView === "edit" 
        ? `${API_BASE}/api/v1/cms/admin/announcements/${editingId}/` 
        : `${API_BASE}/api/v1/cms/admin/announcements/`;
      payload = announcementForm;
    } else if (activeTab === "events") {
      endpoint = activeView === "edit" 
        ? `${API_BASE}/api/v1/cms/admin/events/${editingId}/` 
        : `${API_BASE}/api/v1/cms/admin/events/`;
      payload = eventForm;
    }

    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMessage({ text: "🎉 اطلاعات با موفقیت در دیتابیس ثبت شد.", success: true });
        setActiveView("list");
        fetchListData(); // نوسازی زنده جدول اطلاعات
      } else {
        const errorData = await res.json().catch(() => ({}));
        setStatusMessage({ text: `❌ خطا در ثبت (کد: ${res.status}). پیغام: ${JSON.stringify(errorData)}`, success: false });
      }
    } catch (err) {
      setStatusMessage({ text: "❌ خطای ارتباط شبکه. مطمئن شوید سرور بک‌بند فعال است.", success: false });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // متد حذف اطلاعات از دیتابیس (DELETE)
  // ==========================================
  const handleDeleteItem = async (id: number) => {
    const confirmDelete = window.confirm("⚠️ آیا از حذف دائمی این ردیف اطلاعاتی از دیتابیس مطمئن هستید؟");
    if (!confirmDelete) return;

    let endpoint = "";
    if (activeTab === "news") endpoint = `${API_BASE}/api/v1/cms/admin/articles/${id}/`;
    else if (activeTab === "announcements") endpoint = `${API_BASE}/api/v1/cms/admin/announcements/${id}/`;
    else if (activeTab === "events") endpoint = `${API_BASE}/api/v1/cms/admin/events/${id}/`;
    else if (activeTab === "comments") endpoint = `${API_BASE}/api/v1/cms/admin/comments/${id}/`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${authToken}` },
      });

      if (res.ok) {
        setStatusMessage({ text: "🗑️ آیتم مورد نظر با موفقیت از دیتابیس حذف گردید.", success: true });
        fetchListData();
      } else {
        setStatusMessage({ text: `❌ خطا در حذف اطلاعات از دیتابیس (کد: ${res.status})`, success: false });
      }
    } catch (err) {
      setStatusMessage({ text: "❌ خطای ارتباط شبکه در حین عملیات حذف.", success: false });
    }
  };

  // ==========================================
  // متد تایید دیدگاه‌ها (is_approved = true)
  // ==========================================
  const handleApproveComment = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/cms/admin/comments/${id}/`, {
        method: "PATCH", // تغییر تکی فیلد تایید
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ is_approved: true }),
      });

      if (res.ok) {
        setStatusMessage({ text: "✅ دیدگاه مورد نظر با موفقیت تایید و روی سایت منتشر شد.", success: true });
        fetchListData();
      }
    } catch (err) {
      setStatusMessage({ text: "❌ خطا در برقراری ارتباط جهت تایید دیدگاه.", success: false });
    }
  };

  // لود کردن دیتای ردیف انتخابی درون فرم و سوئیچ به حالت ویرایش
  const handleEditClick = (item: any) => {
    setStatusMessage(null);
    setEditingId(item.id);
    setActiveView("edit");

    if (activeTab === "news") {
      setNewsForm({
        title: item.title, slug: item.slug, excerpt: item.excerpt, body: item.body,
        category: item.category, date: item.date, author: item.author,
        authorAvatar: item.authorAvatar, readingTime: item.readingTime,
        image: item.image, is_featured: item.is_featured, is_published: item.is_published
      });
    } else if (activeTab === "announcements") {
      setAnnouncementForm({
        title: item.title, slug: item.slug, excerpt: item.excerpt,
        category: item.category, date: item.date,
        is_emergency: item.is_emergency, is_published: item.is_published
      });
    } else if (activeTab === "events") {
      setEventForm({
        title: item.title, slug: item.slug, excerpt: item.excerpt, body: item.body,
        date: item.date, location: item.location, image: item.image, is_published: item.is_published
      });
    }
  };

  // متد لاگین
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginErrorLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.access || data.token;
        if (token) {
          localStorage.setItem("admin_token", token);
          setAuthToken(token);
          setIsLoggedIn(true);
        }
      } else {
        setLoginError(data.detail || "❌ اطلاعات کاربری نامعتبر است.");
      }
    } catch (err) {
      setLoginError("❌ عدم ارتباط با سرور دیتابیس بک‌بند.");
    } finally {
      setLoginErrorLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthToken("");
    setIsLoggedIn(false);
    setStatusMessage(null);
  };

  // ==========================================
  // گیت ورودی لاگین ادمین
  // ==========================================
  if (!isLoggedIn) {
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

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/60">نام کاربری ادمین</label>
              <input 
                type="text" 
                required
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="نام کاربری خود را وارد کنید"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-white focus:outline-none"
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

            <button type="submit" disabled={loginLoading} className="w-full bg-primary hover:bg-primary-hover disabled:bg-white/10 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
              {loginLoading ? "احراز هویت..." : "ورود به داشبورد مدیریت"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-neutral-dark font-sans flex flex-col antialiased">
      
      {/* هدر بالایی داشبورد ادمین */}
      <header className="bg-white border-b border-neutral-dark/10 py-6 px-8 md:px-16 flex items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-black text-primary">داشبورد جامع مدیریت دهکده گل‌ها</h1>
          <p className="text-xs text-neutral-dark/45 font-bold mt-1">سامانه متمرکز ثبت، ویرایش، حذف مطالب و تایید دیدگاه‌ها</p>
        </div>

        <button onClick={handleLogout} className="border border-accent-ochre/30 hover:bg-accent-ochre/10 text-accent-ochre text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-1.5">
          <span>خروج از پنل</span>
          <span>🚪</span>
        </button>
      </header>

      {/* بخش اصلی دو ستونه */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-16">
        
        {/* ستون راست: سایدبار ناوبری تب‌ها */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-6 border border-neutral-dark/10 shadow-sm space-y-2 h-fit">
          <span className="block text-[11px] font-black text-neutral-dark/40 mb-4 text-right">دپارتمان‌های فعال</span>
          
          <button onClick={() => { setActiveTab("news"); setActiveView("list"); setStatusMessage(null); }} className={`w-full text-right font-extrabold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeTab === "news" ? "bg-primary text-white shadow-md" : "text-neutral-dark/75 hover:bg-neutral-bg"}`}>
            <span>مدیریت اخبار</span>
            <span>📝</span>
          </button>

          <button onClick={() => { setActiveTab("announcements"); setActiveView("list"); setStatusMessage(null); }} className={`w-full text-right font-extrabold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeTab === "announcements" ? "bg-primary text-white shadow-md" : "text-neutral-dark/75 hover:bg-neutral-bg"}`}>
            <span>مدیریت اطلاعیه‌ها</span>
            <span>📢</span>
          </button>

          <button onClick={() => { setActiveTab("events"); setActiveView("list"); setStatusMessage(null); }} className={`w-full text-right font-extrabold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeTab === "events" ? "bg-primary text-white shadow-md" : "text-neutral-dark/75 hover:bg-neutral-bg"}`}>
            <span>مدیریت رویدادها</span>
            <span>📅</span>
          </button>

          <button onClick={() => { setActiveTab("comments"); setActiveView("list"); setStatusMessage(null); }} className={`w-full text-right font-extrabold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeTab === "comments" ? "bg-primary text-white shadow-md" : "text-neutral-dark/75 hover:bg-neutral-bg"}`}>
            <span>مدیریت دیدگاه‌ها</span>
            <span>💬</span>
          </button>
        </aside>

        {/* ستون چپ: منطقه رندر CRUD تعاملی */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 md:p-10 border border-neutral-dark/10 shadow-sm">
          
          {/* بنر پیام وضعیت‌ها */}
          {statusMessage && (
            <div className={`p-4 rounded-2xl mb-8 text-right text-xs md:text-sm font-bold border flex items-center gap-2.5 ${statusMessage.success ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-accent-ochre/10 text-accent-ochre border-accent-ochre/20"}`}>
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* حالت اول: لیست مطالب (List View) شامل جدول با قابلیت سرچ داینامیک */}
          {/* ========================================================================= */}
          {activeView === "list" && activeTab !== "comments" && (
            <div className="space-y-6 text-right">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-dark/10 pb-4">
                <h2 className="text-lg font-black text-neutral-dark">لیست مطالب منتشر شده</h2>
                <button onClick={() => setActiveView("create")} className="bg-secondary hover:bg-secondary-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer">
                  ➕ ثبت ردیف جدید
                </button>
              </div>

              {/* کادر فیلتر و سرچ زنده در جدول */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="جستجو در عناوین این بخش..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-bg/50 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
                />
              </div>

              {/* جدول واکشی شده از بک‌بند */}
              <div className="overflow-x-auto w-full border border-neutral-dark/10 rounded-2xl">
                <table className="w-full text-right text-xs md:text-sm">
                  <thead className="bg-neutral-bg text-neutral-dark/60 font-black border-b border-neutral-dark/10 select-none">
                    <tr>
                      <th className="p-4">عنوان ردیف</th>
                      <th className="p-4">دسته‌بندی / لوکیشن</th>
                      <th className="p-4">تاریخ انتشار</th>
                      <th className="p-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-dark/5 font-bold text-neutral-dark/85">
                    {/* فیلتر کردن ردیف‌ها به صورت زنده در حین تایپ سرچ‌بار */}
                    {activeTab === "news" && newsList.filter(item => item.title.includes(searchTerm)).map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-bg/20">
                        <td className="p-4 truncate max-w-xs">{item.title}</td>
                        <td className="p-4">{item.category}</td>
                        <td className="p-4">{item.date}</td>
                        <td className="p-4 flex items-center justify-center gap-2">
                          <button onClick={() => handleEditClick(item)} className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">ویرایش</button>
                          <button onClick={() => handleDeleteItem(item.id)} className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">حذف</button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === "announcements" && announcementsList.filter(item => item.title.includes(searchTerm)).map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-bg/20">
                        <td className="p-4 truncate max-w-xs">{item.title}</td>
                        <td className="p-4">{item.category}</td>
                        <td className="p-4">{item.date}</td>
                        <td className="p-4 flex items-center justify-center gap-2">
                          <button onClick={() => handleEditClick(item)} className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">ویرایش</button>
                          <button onClick={() => handleDeleteItem(item.id)} className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">حذف</button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === "events" && eventsList.filter(item => item.title.includes(searchTerm)).map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-bg/20">
                        <td className="p-4 truncate max-w-xs">{item.title}</td>
                        <td className="p-4">{item.location}</td>
                        <td className="p-4">{item.date}</td>
                        <td className="p-4 flex items-center justify-center gap-2">
                          <button onClick={() => handleEditClick(item)} className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">ویرایش</button>
                          <button onClick={() => handleDeleteItem(item.id)} className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* حالت دوم: فرم افزودن یا ویرایش (Create / Edit View) */}
          {/* ========================================================================= */}
          {(activeView === "create" || activeView === "edit") && (
            <form onSubmit={handleFormSubmit} className="space-y-6 text-right">
              <div className="flex items-center justify-between border-b border-neutral-dark/10 pb-4">
                <h2 className="text-lg font-black text-neutral-dark">
                  {activeView === "edit" ? "ویرایش و اصلاح اطلاعات" : "ثبت اطلاعات جدید در دیتابیس"}
                </h2>
                <button type="button" onClick={() => setActiveView("list")} className="border border-neutral-dark/20 text-neutral-dark/70 hover:bg-neutral-bg text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer">
                  ↩️ بازگشت به جدول
                </button>
              </div>

              {/* ۱. فرم مدیریت اخبار */}
              {activeTab === "news" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">عنوان خبر *</label>
                      <input type="text" required value={newsForm.title} onChange={(e) => handleNewsTitleChange(e.target.value)} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80 flex items-center gap-1">اسلاگ یکتا (تولید خودکار) 🔒</label>
                      <input type="text" readOnly value={newsForm.slug} placeholder="slug-automatically-generated" className="w-full bg-neutral-bg/10 border border-neutral-dark/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-dark/40 cursor-not-allowed text-left focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">دسته‌بندی</label>
                      <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none">
                        <option>توسعه</option>
                        <option>طراحی</option>
                        <option>کد نویسی</option>
                        <option>کسب و کار</option>
                        <option>مشاوره</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">زمان مطالعه</label>
                      <input type="text" value={newsForm.readingTime} onChange={(e) => setNewsForm({ ...newsForm, readingTime: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">تاریخ انتشار</label>
                      <input type="text" placeholder="مثال: ۱۴۰۲/۰۵/۱۰" value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">آدرس عکس هدر *</label>
                    <input type="text" required value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">خلاصه کوتاه خبر *</label>
                    <input type="text" required value={newsForm.excerpt} onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">متن کامل خبر (HTML مجاز است) *</label>
                    <textarea rows={6} required value={newsForm.body} onChange={(e) => setNewsForm({ ...newsForm, body: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none min-h-[150px]" />
                  </div>
                  <div className="flex items-center gap-6 pt-2 select-none">
                    <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
                      <input type="checkbox" checked={newsForm.is_featured} onChange={(e) => setNewsForm({ ...newsForm, is_featured: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary/30" />
                      قرارگیری به عنوان خبر برجسته/پرطرفدار
                    </label>
                    <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
                      <input type="checkbox" checked={newsForm.is_published} onChange={(e) => setNewsForm({ ...newsForm, is_published: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary/30" />
                      انتشار فوری خبر روی پورتال
                    </label>
                  </div>
                </div>
              )}

              {/* ۲. فرم مدیریت اطلاعیه‌ها */}
              {activeTab === "announcements" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">عنوان اطلاعیه *</label>
                      <input type="text" required value={announcementForm.title} onChange={(e) => handleAnnouncementTitleChange(e.target.value)} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80 flex items-center gap-1">اسلاگ یکتا (تولید خودکار) 🔒</label>
                      <input type="text" readOnly value={announcementForm.slug} placeholder="slug-automatically-generated" className="w-full bg-neutral-bg/10 border border-neutral-dark/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-dark/40 cursor-not-allowed text-left focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">دسته‌بندی اولویت</label>
                      <select value={announcementForm.category} onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value as any })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none">
                        <option>بحران</option>
                        <option>عمرانی</option>
                        <option>رویداد</option>
                        <option>عمومی</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">تاریخ ثبت</label>
                      <input type="text" placeholder="مثال: ۱۴۰۲/۰۵/۱۰" value={announcementForm.date} onChange={(e) => setAnnouncementForm({ ...announcementForm, date: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">خلاصه متن اطلاعیه *</label>
                    <textarea rows={4} required value={announcementForm.excerpt} onChange={(e) => setAnnouncementForm({ ...announcementForm, excerpt: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none min-h-[100px]" />
                  </div>
                  <div className="flex items-center gap-6 pt-2 select-none">
                    <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
                      <input type="checkbox" checked={announcementForm.is_emergency} onChange={(e) => setAnnouncementForm({ ...announcementForm, is_emergency: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary/30" />
                      تعیین به عنوان وضعیت بسیار فوری (نمایش در بالای هدر)
                    </label>
                    <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
                      <input type="checkbox" checked={announcementForm.is_published} onChange={(e) => setAnnouncementForm({ ...announcementForm, is_published: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary/30" />
                      انتشار فوری اطلاعیه روی پورتال
                    </label>
                  </div>
                </div>
              )}

              {/* ۳. فرم مدیریت رویدادها */}
              {activeTab === "events" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">عنوان رویداد *</label>
                      <input type="text" required value={eventForm.title} onChange={(e) => handleEventTitleChange(e.target.value)} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80 flex items-center gap-1">اسلاگ یکتا (تولید خودکار) 🔒</label>
                      <input type="text" readOnly value={eventForm.slug} placeholder="slug-automatically-generated" className="w-full bg-neutral-bg/10 border border-neutral-dark/10 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-dark/40 cursor-not-allowed text-left focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">مکان برگزاری رویداد *</label>
                      <input type="text" required value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">تاریخ و زمان برگزاری *</label>
                      <input type="text" required placeholder="مثال: جمعه ۱۰ مرداد ساعت ۱۸:۰۰" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">آدرس عکس کاور رویداد *</label>
                    <input type="text" required value={eventForm.image} onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">خلاصه کوتاه رویداد *</label>
                    <input type="text" required value={eventForm.excerpt} onChange={(e) => setEventForm({ ...eventForm, excerpt: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-dark/80">جزئیات کامل برنامه رویداد *</label>
                    <textarea rows={5} required value={eventForm.body} onChange={(e) => setEventForm({ ...eventForm, body: e.target.value })} className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none min-h-[120px]" />
                  </div>
                  <div className="pt-2 select-none">
                    <label className="flex items-center gap-2.5 text-xs font-extrabold text-neutral-dark cursor-pointer">
                      <input type="checkbox" checked={eventForm.is_published} onChange={(e) => setEventForm({ ...eventForm, is_published: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary/30" />
                      انتشار فوری رویداد روی پورتال
                    </label>
                  </div>
                </div>
              )}

              {/* دکمه ارسال نهایی فرم */}
              <div className="pt-6 border-t border-neutral-dark/10">
                <button type="submit" disabled={loading} className="w-full md:w-auto bg-primary hover:bg-primary-hover disabled:bg-neutral-dark/30 text-white font-bold text-xs md:text-sm py-4 px-10 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20">
                  {loading ? "در حال ارسال..." : "ذخیره و ثبت اطلاعات"}
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* حالت سوم: بخش ویژه دیدگاه‌ها (Comments Moderation View) */}
          {/* ========================================================================= */}
          {activeTab === "comments" && (
            <div className="space-y-6 text-right">
              <div className="border-b border-neutral-dark/10 pb-4">
                <h2 className="text-lg font-black text-neutral-dark">مدیریت و تایید دیدگاه‌های کاربران</h2>
                <p className="text-xs text-neutral-dark/45 font-bold mt-1">دیدگاه‌های کاربران روی خبرها باید قبل از تایید دستی ادمین در خروجی لود نشوند.</p>
              </div>

              {/* کادر سرچ کامنت‌ها */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="جستجو در نظرات کاربران بر اساس نام یا ایمیل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-bg/50 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none"
                />
              </div>

              <div className="overflow-x-auto w-full border border-neutral-dark/10 rounded-2xl">
                <table className="w-full text-right text-xs md:text-sm">
                  <thead className="bg-neutral-bg text-neutral-dark/60 font-black border-b border-neutral-dark/10 select-none">
                    <tr>
                      <th className="p-4">فرستنده</th>
                      <th className="p-4">دیدگاه</th>
                      <th className="p-4">متعلق به خبر</th>
                      <th className="p-4 text-center">وضعیت / عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-dark/5 font-bold text-neutral-dark/85">
                    {commentsList.filter(item => item.name.includes(searchTerm) || item.email.includes(searchTerm)).map((comment) => (
                      <tr key={comment.id} className="hover:bg-neutral-bg/20">
                        <td className="p-4">
                          <span className="block font-black text-neutral-dark">{comment.name}</span>
                          <span className="block text-[10px] text-neutral-dark/55 mt-0.5">{comment.email}</span>
                        </td>
                        <td className="p-4 max-w-sm truncate" title={comment.comment}>
                          {comment.comment}
                        </td>
                        <td className="p-4 text-xs text-neutral-dark/60 truncate max-w-xs">{comment.article_title}</td>
                        <td className="p-4 flex items-center justify-center gap-2">
                          {comment.is_approved ? (
                            <span className="bg-secondary/10 text-secondary text-[11px] font-black py-1.5 px-3 rounded-lg select-none">✓ تایید شده</span>
                          ) : (
                            <button onClick={() => handleApproveComment(comment.id)} className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">تایید دیدگاه</button>
                          )}
                          <button onClick={() => handleDeleteItem(comment.id)} className="bg-accent-ochre/10 hover:bg-accent-ochre/20 text-accent-ochre px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}