"use client";

import { useEffect } from "react";
import type { ReferencePageName } from "@/components/reference-page";

export function ReferenceInteractions({ name }: { name: ReferencePageName }) {
  useEffect(() => {
    const scrollRegions = document.querySelectorAll<HTMLElement>("main [data-keyboard-scroll]");
    const scrollWithArrowKeys = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const region = event.currentTarget as HTMLElement;
      region.scrollLeft += event.key === "ArrowRight" ? 48 : -48;
      event.preventDefault();
    };
    scrollRegions.forEach((region) => region.addEventListener("keydown", scrollWithArrowKeys));

    let updateReadingProgress: (() => void) | undefined;
    if (name === "movie") {
      updateReadingProgress = () => {
        const documentElement = document.documentElement;
        const height = documentElement.scrollHeight - documentElement.clientHeight;
        const progress = document.getElementById("reading-progress");
        if (progress) progress.style.width = `${height > 0 ? (documentElement.scrollTop / height) * 100 : 0}%`;

        const sections = document.querySelectorAll("main section[id]");
        const links = document.querySelectorAll<HTMLAnchorElement>("#case-study-nav .toc-link");
        let currentSection = "";
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= 140) currentSection = section.id;
        });
        links.forEach((link) => {
          const active = link.hash.slice(1) === currentSection;
          link.classList.toggle("bg-accent-surface", active);
          link.classList.toggle("text-primary", active);
          link.classList.toggle("font-semibold", active);
          link.classList.toggle("text-text-secondary", !active);
        });
      };
      window.addEventListener("scroll", updateReadingProgress);
      updateReadingProgress();
    }

    return () => {
      scrollRegions.forEach((region) => region.removeEventListener("keydown", scrollWithArrowKeys));
      if (updateReadingProgress) window.removeEventListener("scroll", updateReadingProgress);
    };
  }, [name]);

  return null;
}
