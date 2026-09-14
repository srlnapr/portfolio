"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — ultra-minimal dot cursor.
 *
 * • Only rendered on pointer (non-touch) devices.
 * • Hides the native OS cursor via `cursor-none` on <body>.
 * • Two layers: a small sharp dot that tracks 1:1 and a subtle
 *   ring that follows with a soft lag for a premium feel.
 * • Uses `requestAnimationFrame` + lerp — no GSAP dependency.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Abort on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let mx = -100, my = -100; // raw mouse position
    let rx = -100, ry = -100; // ring (lagged) position

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const RING_EASE = 0.13; // lower = more lag

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Scale up ring on clickable elements
    const onMouseDown = () => {
      if (!ringRef.current) return;
      ringRef.current.style.transform = "translate(-50%,-50%) scale(0.7)";
    };
    const onMouseUp = () => {
      if (!ringRef.current) return;
      ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    const tick = () => {
      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.left = `${mx}px`;
        dot.style.top  = `${my}px`;
      }

      if (ring) {
        rx = lerp(rx, mx, RING_EASE);
        ry = lerp(ry, my, RING_EASE);
        ring.style.left = `${rx}px`;
        ring.style.top  = `${ry}px`;
      }

      raf = requestAnimationFrame(tick);
    };

    // Hide native cursor globally
    document.body.classList.add("cursor-none");

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onMouseDown);
    document.addEventListener("mouseup",    onMouseUp);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none");
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onMouseDown);
      document.removeEventListener("mouseup",    onMouseUp);
    };
  }, []);

  // Don't render anything on server / touch devices until pointer is detected
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Sharp center dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "#ec4899", // pink-500
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "left, top",
        }}
      />

      {/* Lagged soft ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(236,72,153,0.45)", // pink-500/45
          transform: "translate(-50%, -50%) scale(1)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.15s ease",
          willChange: "left, top, transform",
        }}
      />
    </>
  );
}
