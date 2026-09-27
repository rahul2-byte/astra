"use client";

import { useEffect, useRef } from "react";
import { FormulaFragment } from "./effects/FormulaFragment";
import { LineChartGhost } from "./effects/LineChartGhost";
import { TelemetryTrace } from "./effects/TelemetryTrace";
import "./ambient.css";

type Kind = "formula" | "chart" | "telemetry";
type Floater = { el: HTMLDivElement; kind: Kind; x: number; y: number; width: number; height: number; maxX: number; vx: number; vy: number };
const events = Array.from({ length: 75 }, (_, id) => ({ id, kind: id % 7 === 0 ? "chart" : id % 5 === 0 ? "telemetry" : "formula" } as const));
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

export function AmbientMLBackground() {
  const elements = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    let items: Floater[] = [], frame = 0, timer = 0, last = 0;

    const initialize = () => {
      const width = window.innerWidth, height = window.innerHeight;
      const count = width >= 1200 ? 75 : width >= 950 ? 24 : width > 640 ? 12 : 8;
      items = [];
      elements.current.forEach((el) => { if (el) el.style.visibility = "hidden"; });

      const tryPlace = (el: HTMLDivElement, kind: Kind, rect: DOMRect): Floater | undefined => {
        if (rect.width + 16 >= width || rect.height + 16 >= height) return;
        for (let attempt = 0; attempt < 500; attempt++) {
          const x = 8 + Math.random() * (width - rect.width - 16);
          const y = 8 + Math.random() * (height - rect.height - 16);
          const clear = items.every((other) =>
            x + rect.width + 10 <= other.x || other.x + other.width + 10 <= x ||
            y + rect.height + 10 <= other.y || other.y + other.height + 10 <= y);
          if (clear) {
            const angle = Math.random() * Math.PI * 2;
            const speedRange = width <= 640 ? [8, 18] : width <= 1099 ? [12, 30] : [18, 42];
            const speed = randomBetween(speedRange[0], speedRange[1]);
            return { el, kind, x, y, width: rect.width, height: rect.height, maxX: width - rect.width - 8, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
          }
        }
      };

      for (let index = 0; index < count; index++) {
        const el = elements.current[index];
        if (!el) continue;
        const kind = events[index].kind;
        const sizeRange = kind === "formula"
          ? width <= 640 ? [9, 16] : width <= 1099 ? [10, 21] : [12, 26]
          : width <= 640 ? [40, 68] : width <= 1099 ? [48, 88] : [56, 112];
        let size = randomBetween(sizeRange[0], sizeRange[1]);
        el.style.setProperty("--ambient-random-size", `${size}px`);
        let rect = el.getBoundingClientRect();
        let placed = tryPlace(el, kind, rect);
        if (!placed && size > sizeRange[0]) {
          size = sizeRange[0];
          el.style.setProperty("--ambient-random-size", `${size}px`);
          rect = el.getBoundingClientRect();
          placed = tryPlace(el, kind, rect);
        }
        if (placed) { items.push(placed); el.style.visibility = "visible"; }
      }
      last = 0;
    };

    const draw = (time: number) => {
      if (document.hidden) { frame = 0; return; }
      const dt = last ? Math.min((time - last) / 1000, .04) : 0;
      last = time;
      for (const item of items) {
        item.x += item.vx * dt; item.y += item.vy * dt;
        if (item.x < 8 || item.x > item.maxX) { item.x = Math.max(8, Math.min(item.maxX, item.x)); item.vx *= -1; }
        if (item.y < 8 || item.y + item.height > window.innerHeight - 8) { item.y = Math.max(8, Math.min(window.innerHeight - item.height - 8, item.y)); item.vy *= -1; }
      }
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j];
        const dx = a.x + a.width / 2 - b.x - b.width / 2;
        const dy = a.y + a.height / 2 - b.y - b.height / 2;
        const overlapX = (a.width + b.width) / 2 + 6 - Math.abs(dx);
        const overlapY = (a.height + b.height) / 2 + 6 - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;
        if (overlapX < overlapY) {
          const direction = Math.sign(dx) || (a.vx >= b.vx ? 1 : -1);
          a.x += direction * overlapX / 2; b.x -= direction * overlapX / 2;
          if ((a.vx - b.vx) * direction < 0) [a.vx, b.vx] = [b.vx, a.vx];
        } else {
          const direction = Math.sign(dy) || (a.vy >= b.vy ? 1 : -1);
          a.y += direction * overlapY / 2; b.y -= direction * overlapY / 2;
          if ((a.vy - b.vy) * direction < 0) [a.vy, b.vy] = [b.vy, a.vy];
        }
      }
      for (const item of items) item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      timer = window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 1000 / 30 - 16);
    };
    const start = () => { if (!document.hidden && !frame) frame = requestAnimationFrame(draw); };
    const stop = () => { if (frame) cancelAnimationFrame(frame); if (timer) clearTimeout(timer); frame = 0; timer = 0; };
    const onVisibility = () => { if (document.hidden) stop(); else { last = 0; start(); } };
    initialize(); start();
    window.addEventListener("resize", initialize); document.addEventListener("visibilitychange", onVisibility);
    return () => { stop(); window.removeEventListener("resize", initialize); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <div className="ambient-background" aria-hidden="true"><div className="ambient-events">
    {events.map(({ id, kind }) => <div className={`ambient-event ambient-event--${kind}`} key={id} ref={(el) => { elements.current[id] = el; }}>
      {kind === "formula" ? <FormulaFragment index={id} /> : kind === "chart" ? <LineChartGhost index={id} /> : <TelemetryTrace index={id} />}
    </div>)}
  </div></div>;
}
