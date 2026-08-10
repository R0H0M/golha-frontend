// hooks/useAdminCms.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TabType,
  ViewType,
  EventItem,
  CommentItem,
  NewsFormData,
  AnnouncementFormData,
  EventFormData,
  StatusMessage,
  CmsItem,
} from "@/types/admin";
import { CmsPost } from "@/types/cms";
import { Announcement } from "@/types/announcement";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8001/api/v1";

const initialNewsForm: NewsFormData = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  category: "توسعه",
  author: "مدیر سیستم",
  author_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  reading_time: "۳ دقیقه مطالعه",
  image: null,
  is_featured: false,
  is_published: true,
};

const initialAnnouncementForm: AnnouncementFormData = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  category: "عمومی",
  is_emergency: false,
  is_published: true,
};

const initialEventForm: EventFormData = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  date_display: "",
  location: "",
  image: null,
  is_published: true,
};

export function useAdminCms(authToken: string, isLoggedIn: boolean) {
  const [activeTab, setActiveTab] = useState<TabType>("news");
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [newsList, setNewsList] = useState<CmsPost[]>([]);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([]);
  const [eventsList, setEventList] = useState<EventItem[]>([]);
  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);

  const [newsForm, setNewsForm] = useState<NewsFormData>(initialNewsForm);
  const [announcementForm, setAnnouncementForm] = useState<AnnouncementFormData>(initialAnnouncementForm);
  const [eventForm, setEventForm] = useState<EventFormData>(initialEventForm);

  const fetchListData = useCallback(async () => {
    if (!authToken) return;
    queueMicrotask(() => setLoading(true));

    let url = "";
    if (activeTab === "news") url = `${API_BASE}/cms/articles/`;
    else if (activeTab === "announcements") url = `${API_BASE}/cms/announcements/`;
    else if (activeTab === "events") url = `${API_BASE}/cms/events/`;
    else if (activeTab === "comments") url = `${API_BASE}/cms/admin/comments/`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
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
  }, [activeTab, authToken]);

  useEffect(() => {
    let isSubscribed = true;

    if (isLoggedIn && authToken) {
      const loadData = async () => {
        queueMicrotask(() => {
          if (isSubscribed) setLoading(true);
        });

        let url = "";
        if (activeTab === "news") url = `${API_BASE}/cms/articles/`;
        else if (activeTab === "announcements") url = `${API_BASE}/cms/announcements/`;
        else if (activeTab === "events") url = `${API_BASE}/cms/events/`;
        else if (activeTab === "comments") url = `${API_BASE}/cms/admin/comments/`;

        try {
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          if (res.ok && isSubscribed) {
            const data = await res.json();
            if (activeTab === "news") setNewsList(data);
            else if (activeTab === "announcements") setAnnouncementsList(data);
            else if (activeTab === "events") setEventList(data);
            else if (activeTab === "comments") setCommentsList(data);
          }
        } catch (err) {
          console.error("Error fetching list:", err);
        } finally {
          if (isSubscribed) setLoading(false);
        }
      };

      loadData();
    }

    return () => {
      isSubscribed = false;
    };
  }, [isLoggedIn, activeTab, authToken]);

  const generateSlug = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9آ-ی\s]/g, "")
      .replace(/\s+/g, "-");
  };

  const resetForms = () => {
    setNewsForm(initialNewsForm);
    setAnnouncementForm(initialAnnouncementForm);
    setEventForm(initialEventForm);
    setEditingId(null);
  };

  // ثبت و ویرایش فرم‌ها (پشتیبانی از FormData برای آپلود فایل)
  // بخشی از فایل hooks/useAdminCms.ts

const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatusMessage(null);
  setLoading(true);

  let endpoint = "";
  // ✅ تغییر متد ویرایش از PUT به PATCH
  const method = activeView === "edit" ? "PATCH" : "POST";
  let bodyData: BodyInit;
  let isMultipart = false;

  if (activeTab === "news") {
    endpoint =
      activeView === "edit"
        ? `${API_BASE}/cms/admin/articles/${editingId}/`
        : `${API_BASE}/cms/admin/articles/`;

    const formData = new FormData();
    Object.entries(newsForm).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "image") {
          if (value instanceof File) {
            formData.append("image", value);
          }
        } else {
          formData.append(key, String(value));
        }
      }
    });
    bodyData = formData;
    isMultipart = true;
  } else if (activeTab === "events") {
    endpoint =
      activeView === "edit"
        ? `${API_BASE}/cms/admin/events/${editingId}/`
        : `${API_BASE}/cms/admin/events/`;

    const formData = new FormData();
    Object.entries(eventForm).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "image") {
          if (value instanceof File) {
            formData.append("image", value);
          }
        } else {
          formData.append(key, String(value));
        }
      }
    });
    bodyData = formData;
    isMultipart = true;
  } else {
    endpoint =
      activeView === "edit"
        ? `${API_BASE}/cms/admin/announcements/${editingId}/`
        : `${API_BASE}/cms/admin/announcements/`;
    bodyData = JSON.stringify(announcementForm);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authToken}`,
  };
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(endpoint, {
      method: method, // ✅ اکنون در حالت ویرایش PATCH فرستاده می‌شود
      headers: headers,
      body: bodyData,
    });

    if (res.ok) {
      setStatusMessage({ text: "🎉 اطلاعات با موفقیت در دیتابیس ثبت شد.", success: true });
      setActiveView("list");
      resetForms();
      fetchListData();
    } else {
      const errorData = await res.json().catch(() => ({}));
      setStatusMessage({
        text: `❌ خطا در ثبت (کد: ${res.status}). پیغام: ${JSON.stringify(errorData)}`,
        success: false,
      });
    }
  } catch (err) {
    setStatusMessage({
      text: "❌ خطای ارتباط شبکه. مطمئن شوید سرور بک‌بند فعال است.",
      success: false,
    });
  } finally {
    setLoading(false);
  }
};

  const handleDeleteItem = async (id: number) => {
    const confirmDelete = window.confirm("⚠️ آیا از حذف دائمی این ردیف اطلاعاتی از دیتابیس مطمئن هستید؟");
    if (!confirmDelete) return;

    let endpoint = "";
    if (activeTab === "news") endpoint = `${API_BASE}/cms/admin/articles/${id}/`;
    else if (activeTab === "announcements") endpoint = `${API_BASE}/cms/admin/announcements/${id}/`;
    else if (activeTab === "events") endpoint = `${API_BASE}/cms/admin/events/${id}/`;
    else if (activeTab === "comments") endpoint = `${API_BASE}/cms/admin/comments/${id}/`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
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

  const handleApproveComment = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/cms/admin/comments/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
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

  const handleEditClick = (item: CmsItem) => {
    setStatusMessage(null);
    setEditingId(item.id);
    setActiveView("edit");

    if (activeTab === "news") {
      const newsItem = item as CmsPost;
      setNewsForm({
        title: newsItem.title || "",
        slug: newsItem.slug || "",
        summary: newsItem.summary || "",
        body: newsItem.body || "",
        category: newsItem.category || "توسعه",
        author: newsItem.author || "مدیر سیستم",
        author_avatar: newsItem.author_avatar || "",
        reading_time: newsItem.reading_time || "۳ دقیقه مطالعه",
        image: newsItem.image || null,
        is_featured: !!newsItem.is_featured,
        is_published: !!newsItem.is_published,
      });
    } else if (activeTab === "announcements") {
      const announcementItem = item as Announcement;
      setAnnouncementForm({
        title: announcementItem.title || "",
        slug: announcementItem.slug || "",
        summary: announcementItem.summary || "",
        content: announcementItem.content || "",
        category: announcementItem.category || "عمومی",
        is_emergency: !!announcementItem.is_emergency,
        is_published: !!announcementItem.is_published,
      });
    } else if (activeTab === "events") {
      const eventItem = item as EventItem;
      setEventForm({
        title: eventItem.title || "",
        slug: eventItem.slug || "",
        summary: eventItem.summary || "",
        body: eventItem.body || "",
        date_display: eventItem.date_display || "",
        location: eventItem.location || "",
        image: eventItem.image || null,
        is_published: !!eventItem.is_published,
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    activeView,
    setActiveView,
    loading,
    statusMessage,
    setStatusMessage,
    searchTerm,
    setSearchTerm,
    newsList,
    announcementsList,
    eventsList,
    commentsList,
    newsForm,
    setNewsForm,
    announcementForm,
    setAnnouncementForm,
    eventForm,
    setEventForm,
    handleFormSubmit,
    handleDeleteItem,
    handleApproveComment,
    handleEditClick,
    generateSlug,
    resetForms,
  };
}