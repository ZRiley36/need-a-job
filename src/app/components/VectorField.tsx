"use client";

import { useEffect, useRef } from "react";

const SPACING = 11;
const ARROW_LEN = 8;
const MAX_DPR = 1.5;
const BUCKETS = 10;
const EASING = 0.2;

type VectorFieldProps = {
  /** Optional text rendered into the field as a mask (e.g. a name). */
  text?: string;
  /** Vertical position of the text, as a fraction of height (0 = top, 1 = bottom). */
  textYRatio?: number;
  className?: string;
};

export function VectorField({
  text,
  textYRatio = 0.5,
  className = "absolute inset-0 w-full h-full block",
}: VectorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const accentRgb =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim() || "194, 65, 12";

    let width = 0;
    let height = 0;
    let mask: Uint8Array | null = null;
    let textMinX = 0;
    let textMaxX = 0;
    let textMinY = 0;
    let textMaxY = 0;

    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    // Pre-allocated segment buffers, one per alpha bucket.
    // Each segment is 4 floats (x1, y1, x2, y2).
    let segments: Float32Array[] = [];
    const counts: Uint32Array = new Uint32Array(BUCKETS);

    const buildMask = () => {
      if (!text) {
        mask = null;
        return;
      }
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      const fontSize = Math.min(width * 0.13, height * 0.42);
      offCtx.fillStyle = "white";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `800 ${fontSize}px Geist, ui-sans-serif, system-ui, sans-serif`;
      offCtx.fillText(text, width / 2, height * textYRatio);

      const img = offCtx.getImageData(0, 0, width, height);
      const out = new Uint8Array(width * height);
      let minX = width;
      let maxX = 0;
      let minY = height;
      let maxY = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4 + 3;
          if (img.data[i] > 32) {
            out[y * width + x] = 1;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      mask = out;
      textMinX = minX;
      textMaxX = maxX;
      textMinY = minY;
      textMaxY = maxY;
    };

    const allocBuffers = () => {
      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      const cells = cols * rows;
      // Worst case: all cells land in one bucket. Size each buffer to cells * 4.
      segments = Array.from({ length: BUCKETS }, () => new Float32Array(cells * 4));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cursorX = width / 2;
      cursorY = height / 2;
      targetX = cursorX;
      targetY = cursorY;
      buildMask();
      allocBuffers();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      targetX = width / 2;
      targetY = height / 2;
    };

    let rafId = 0;
    const tick = () => {
      cursorX += (targetX - cursorX) * EASING;
      cursorY += (targetY - cursorY) * EASING;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineWidth = 1.1;

      const cx = cursorX;
      const cy = cursorY;
      const diag = Math.sqrt(width * width + height * height);
      const half = ARROW_LEN / 2;
      const invFalloff = 1 / (diag * 0.6);

      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      const offsetX = (width - cols * SPACING) / 2 + SPACING / 2;
      const offsetY = (height - rows * SPACING) / 2 + SPACING / 2;

      // Reset counts; reuse segment buffers.
      for (let i = 0; i < BUCKETS; i++) counts[i] = 0;

      for (let row = 0; row < rows; row++) {
        const y = offsetY + row * SPACING;
        const my = y | 0;
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * SPACING;
          const mx = x | 0;

          const dx = cx - x;
          const dy = cy - y;
          let angle = Math.atan2(dy, dx);

          const inText =
            mask !== null &&
            mx >= textMinX - 1 &&
            mx <= textMaxX + 1 &&
            my >= textMinY - 1 &&
            my <= textMaxY + 1 &&
            mask[my * width + mx] === 1;

          if (inText) angle += Math.PI / 2;

          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = 1 - Math.min(1, dist * invFalloff);
          const alpha = inText
            ? 0.55 + proximity * 0.35
            : 0.2 + proximity * 0.35;
          const len = half * (inText ? 1.05 : 0.85 + proximity * 0.35);

          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          // Quantize alpha into a bucket index in [0, BUCKETS-1].
          // alpha range across both branches: [0.2, 0.9].
          let b = Math.floor((alpha - 0.2) * (BUCKETS / 0.7));
          if (b < 0) b = 0;
          else if (b >= BUCKETS) b = BUCKETS - 1;

          const buf = segments[b];
          const i = counts[b];
          buf[i] = x - cos * len;
          buf[i + 1] = y - sin * len;
          buf[i + 2] = x + cos * len;
          buf[i + 3] = y + sin * len;
          counts[b] = i + 4;
        }
      }

      // One stroke per non-empty bucket.
      for (let b = 0; b < BUCKETS; b++) {
        const n = counts[b];
        if (n === 0) continue;
        const bucketAlpha = 0.2 + ((b + 0.5) / BUCKETS) * 0.7;
        ctx.strokeStyle = `rgba(${accentRgb}, ${bucketAlpha.toFixed(3)})`;
        ctx.beginPath();
        const buf = segments[b];
        for (let i = 0; i < n; i += 4) {
          ctx.moveTo(buf[i], buf[i + 1]);
          ctx.lineTo(buf[i + 2], buf[i + 3]);
        }
        ctx.stroke();
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [text, textYRatio]);

  return <canvas ref={canvasRef} className={className} />;
}
