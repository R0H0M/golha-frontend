// app/admin/page.tsx
"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCms } from "@/hooks/useAdminCms";

import LoginGateway from "@/components/admin/LoginGateway";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import DataTable from "@/components/admin/tables/DataTable";
import CommentsTable from "@/components/admin/tables/CommentsTable";
import NewsForm from "@/components/admin/forms/NewsForm";
import AnnouncementForm from "@/components/admin/forms/AnnouncementForm";
import EventForm from "@/components/admin/forms/EventForm";

export default function AdminDashboard() {
  const { isLoggedIn, authToken, loginError, loginLoading, login, logout } = useAuth();

  const {
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
  } = useAdminCms(authToken, isLoggedIn);

  // ۱. گیت ورودی لاگین
  if (!isLoggedIn) {
    return (
      <LoginGateway
        onLogin={login}
        loginError={loginError}
        loginLoading={loginLoading}
      />
    );
  }

  // ۲. داشبورد اصلی ادمین
  return (
    <div className="min-h-screen bg-[#f4f8fb] text-neutral-dark font-sans flex flex-col antialiased">
      {/* هدر بالایی */}
      <DashboardHeader onLogout={logout} />

      {/* بخش اصلی دو ستونه */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-16">
        {/* ستون راست: سایدبار ناوبری */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActiveView={setActiveView}
          clearStatusMessage={() => setStatusMessage(null)}
        />

        {/* ستون چپ: منطقه نمایش جداول یا فرم‌ها */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 md:p-10 border border-neutral-dark/10 shadow-sm">
          {/* پیام‌های وضعیت */}
          {statusMessage && (
            <div
              className={`p-4 rounded-2xl mb-8 text-right text-xs md:text-sm font-bold border flex items-center gap-2.5 ${
                statusMessage.success
                  ? "bg-secondary/10 text-secondary border-secondary/20"
                  : "bg-accent-ochre/10 text-accent-ochre border-accent-ochre/20"
              }`}
            >
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* حالت اول: جدول لیست مطالب */}
          {activeView === "list" && activeTab !== "comments" && (
            <DataTable
              activeTab={activeTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setActiveView={setActiveView}
              newsList={newsList}
              announcementsList={announcementsList}
              eventsList={eventsList}
              onEdit={handleEditClick}
              onDelete={handleDeleteItem}
            />
          )}

          {/* حالت دوم: فرم‌های ایجاد و ویرایش */}
          {(activeView === "create" || activeView === "edit") && (
            <>
              {activeTab === "news" && (
                <NewsForm
                  newsForm={newsForm}
                  setNewsForm={setNewsForm}
                  activeView={activeView}
                  setActiveView={setActiveView}
                  onSubmit={handleFormSubmit}
                  loading={loading}
                  generateSlug={generateSlug}
                />
              )}

              {activeTab === "announcements" && (
                <AnnouncementForm
                  announcementForm={announcementForm}
                  setAnnouncementForm={setAnnouncementForm}
                  activeView={activeView}
                  setActiveView={setActiveView}
                  onSubmit={handleFormSubmit}
                  loading={loading}
                  generateSlug={generateSlug}
                />
              )}

              {activeTab === "events" && (
                <EventForm
                  eventForm={eventForm}
                  setEventForm={setEventForm}
                  activeView={activeView}
                  setActiveView={setActiveView}
                  onSubmit={handleFormSubmit}
                  loading={loading}
                  generateSlug={generateSlug}
                />
              )}
            </>
          )}

          {/* حالت سوم: جدول دیدگاه‌ها */}
          {activeTab === "comments" && (
            <CommentsTable
              commentsList={commentsList}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onApprove={handleApproveComment}
              onDelete={handleDeleteItem}
            />
          )}
        </main>
      </div>
    </div>
  );
}