"use client";

import * as React from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
  label?: string | undefined;
};

const DOMAINS: Array<{ label: string; hue: string }> = [
  { label: "Medicine", hue: "#F472B6" },
  { label: "Agriculture", hue: "#34D399" },
  { label: "Physics", hue: "#22D3EE" },
  { label: "Mathematics", hue: "#A78BFA" },
  { label: "Frontier Labs", hue: "#FBBF24" },
];

export function NeuralCanvas({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Adaptive density: 36 nodes on mobile, up to 140 on wide screens
      const count = Math.round(Math.min(140, Math.max(36, (w * h) / 14000)));

      nodes = Array.from({ length: count }, (_, i) => {
        const d = i < DOMAINS.length ? DOMAINS[i] : undefined;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: d ? 5.5 : 1.6 + Math.random() * 1.4,
          hue: d?.hue ?? "#8C97B2",
          label: d?.label,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const L = Math.min(160, Math.max(90, w / 8));

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;

        if (!reduce) {
          a.x += a.vx;
          a.y += a.vy;

          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;

          // Gentle pointer repulsion
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000 && d2 > 0) {
            const force = (1 - Math.sqrt(d2) / 126.5) * 0.08;
            a.x += (dx / Math.sqrt(d2)) * force * 15;
            a.y += (dy / Math.sqrt(d2)) * force * 15;
          }
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);

          if (d < L) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - d / L) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = a.hue;
        ctx.shadowColor = a.hue;
        ctx.shadowBlur = a.label ? 20 : 6;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw domain label
        if (a.label) {
          ctx.fillStyle = "rgba(232, 236, 245, 0.9)";
          ctx.font = "600 12px var(--font-jetbrains, monospace)";
          ctx.fillText(a.label, a.x + 12, a.y + 4);
        }
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(([e]) => {
      if (e) {
        visible = e.isIntersecting;
      }
    });
    const ro = new ResizeObserver(resize);

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    if (reduce) {
      draw();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
