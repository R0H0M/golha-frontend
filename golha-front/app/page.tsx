import HeroSection from "@/components/hero-section";
import AroundCity from "@/components/around-city";
import ServicesResources from "@/components/services-resources";
// ایمپورت بنتو گرید جدید معرفی و آمارها
import VillageIntroduction from "@/components/village-introduction";
import TeamMembers from "@/components/team-members";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ۱. بخش هیرو */}
      <HeroSection />

      {/* ۲. پیرامون دهکده (رویدادها/مطالب تعاملی) */}
      <AroundCity />

      {/* ۳. خدمات و منابع دهکده (کسب‌وکارهای جاری) */}
      <ServicesResources />

      {/* ۴. معرفی دهکده و آمارها (در قالب بنتو گرید نامتقارن) */}
      <VillageIntroduction />

      <TeamMembers />

      {/* بخش اعضای تیم دهکده در فاز بعدی قرار خواهد گرفت */}
      {/* <TeamDirectory /> */}
    </div>
  );
}