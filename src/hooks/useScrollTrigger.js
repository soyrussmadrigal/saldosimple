"use client";

import { useState, useEffect } from "react";

export default function useScrollTrigger(triggerId) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [triggerId]);

  return isSticky;
}
