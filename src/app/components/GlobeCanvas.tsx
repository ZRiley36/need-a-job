"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const MAX_DPR = 1.5;
const AUTO_SPEED = 0.004; // idle auto-rotation (radians / frame)
const DRAG_SENS = 0.005; // radians of rotation per pixel dragged
const INERTIA_DECAY = 0.92; // how fast a fling slows down
const THETA_MIN = -0.7;
const THETA_MAX = 0.7;

/** A few markers so the globe reads as a lived-in map, not just texture. */
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
  { location: [40.7128, -74.006], size: 0.05 }, // New York
  { location: [51.5074, -0.1278], size: 0.045 }, // London
  { location: [35.6762, 139.6503], size: 0.045 }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
  { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
];

/**
 * Rotating dotted globe (cobe) tinted to the site's rust accent, used as the
 * hero background — now click-and-drag to spin, with fling inertia that decays
 * back into the idle auto-rotation.
 *
 * cobe 2.x has no internal render loop and the world map is an async texture,
 * so we drive our own rAF loop calling `globe.update()` every frame (that both
 * animates it and re-renders once the texture loads). The canvas is kept a fixed
 * CSS square (== pixel buffer / dpr) so the globe stays circular.
 */
export function GlobeCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Match the animation to the CSS accent, same as VectorField does.
    const accentRaw =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim() || "194, 87, 46";
    const accent = accentRaw.split(",").map((n) => Number(n.trim()) / 255) as [
      number,
      number,
      number,
    ];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);

    let size = 0;
    let sizeDirty = true;

    // Square globe sized to the smaller viewport axis so it always fits, then
    // clamped. CSS size and pixel buffer stay in sync via devicePixelRatio.
    const measure = () => {
      size = Math.max(
        300,
        Math.min(Math.min(window.innerWidth, window.innerHeight) * 0.8, 620),
      );
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      sizeDirty = true;
    };
    measure();
    window.addEventListener("resize", measure);

    // Rotation state. `phi` = horizontal angle, `theta` = tilt.
    let phi = 0;
    let theta = 0.2;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velPhi = 0; // horizontal fling velocity (radians / frame)

    const onPointerDown = (e: PointerEvent) => {
      // Mouse/pen drag only — leave touch to scroll the page normally.
      if (e.pointerType === "touch") return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velPhi = 0;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      phi += dx * DRAG_SENS;
      theta = Math.max(THETA_MIN, Math.min(THETA_MAX, theta + dy * DRAG_SENS));
      velPhi = dx * DRAG_SENS; // carry the last motion into a fling
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [0.55, 0.28, 0.18], // rust land dots, bright enough on #0a0a0a
      markerColor: accent, // bright rust city markers
      glowColor: [accent[0] * 0.4, accent[1] * 0.4, accent[2] * 0.4],
      markers: MARKERS,
    });

    let raf = 0;
    let faded = false;
    const frame = () => {
      if (!dragging) {
        // Apply fling inertia, then decay it; idle auto-rotation continues.
        phi += velPhi;
        velPhi *= INERTIA_DECAY;
        if (Math.abs(velPhi) < 0.0001) velPhi = 0;
        if (!reduce.matches) phi += AUTO_SPEED;
      }

      const state: Parameters<typeof globe.update>[0] = { phi, theta };
      if (sizeDirty) {
        state.width = size * dpr;
        state.height = size * dpr;
        sizeDirty = false;
      }
      globe.update(state);

      // Reveal only after the first real frame is drawn (avoids the blank flash).
      if (!faded) {
        faded = true;
        canvas.style.opacity = "1";
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", measure);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-auto block max-w-none cursor-grab opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
}
