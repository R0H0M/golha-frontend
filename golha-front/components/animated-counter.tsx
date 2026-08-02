"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ target, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  // این هوک بررسی می‌کند که آیا آیکون یا عدد وارد پورت نمایش (Viewport) کاربر شده است یا خیر.
  // مقدار once: true باعث می‌شود انیمیشن فقط یک‌بار هنگام اسکرول اول اجرا شود تا حواس کاربر پرت نشود.
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // اگر کاربر هنوز به بخش آمار اسکرول نکرده باشد، انیمیشن شروع نمی‌شود
    if (!isInView) return;

    // شروع انیمیشن نرم شمارش تا عدد هدف
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    });
    
    return () => controls.stop();
  }, [target, isInView]);

  return (
    // رفرنس ref را به تگ متصل می‌کنیم تا وضعیت اسکرول آن سنجیده شود
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}