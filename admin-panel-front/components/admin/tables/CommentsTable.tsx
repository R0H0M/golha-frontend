// components/admin/tables/CommentsTable.tsx
"use client";

import React from "react";
import { CommentItem } from "@/types/admin";

interface CommentsTableProps {
  commentsList: CommentItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CommentsTable({
  commentsList,
  searchTerm,
  setSearchTerm,
  onApprove,
  onDelete,
}: CommentsTableProps) {
  const filteredComments = commentsList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-right">
      <div className="border-b border-neutral-dark/10 pb-4">
        <h2 className="text-lg font-black text-neutral-dark">مدیریت و تایید دیدگاه‌های کاربران</h2>
        <p className="text-xs text-neutral-dark/45 font-bold mt-1">
          دیدگاه‌های کاربران روی خبرها باید قبل از تایید دستی ادمین در خروجی لود نشوند.
        </p>
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
            {filteredComments.map((comment) => (
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
                    <span className="bg-secondary/10 text-secondary text-[11px] font-black py-1.5 px-3 rounded-lg select-none">
                      ✓ تایید شده
                    </span>
                  ) : (
                    <button
                      onClick={() => onApprove(comment.id)}
                      className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      تایید دیدگاه
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(comment.id)}
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