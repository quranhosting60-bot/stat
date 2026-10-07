"use client";

import { useCallback, useEffect, useState } from "react";
import { thumbOf } from "@/lib/images";

/**
 * Large product picture. Click / tap it to open the full-size picture in a
 * full-screen viewer (Esc, ✕, or a click on the dark area closes it; click the
 * picture again to zoom in and scroll around it).
 */
export default function ProductGallery({
  images,
  alt,
  luxe = false,
}: {
  images: string[];
  alt: string;
  luxe?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const many = images.length > 1;

  const close = useCallback(() => {
    setOpen(false);
    setZoom(false);
  }, []);
  const step = useCallback(
    (d: number) => {
      setZoom(false);
      setIndex((i) => (i + d + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (many && e.key === "ArrowRight") step(1);
      if (many && e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, many, close, step]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open full picture of ${alt}`}
        className={`foil-frame group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-3xl bg-mist ${
          luxe ? "border-2 border-[#c9a45c]/70 shadow-[0_0_0_6px_rgba(201,164,92,0.12)]" : "border border-line"
        }`}
      >
        <picture>
          {/* phones get the small file; desktop gets the full-size one */}
          <source media="(max-width: 767px)" srcSet={thumbOf(images[index])} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt={alt}
            width={1536}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </picture>
        {luxe && <span className="foil-sheen" aria-hidden />}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-pill bg-navy/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tap to enlarge
        </span>
      </button>

      {many && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show picture ${i + 1}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 ${
                i === index ? "border-cyan" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbOf(src)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — full picture`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="focus-ring absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-pill bg-white/15 text-white backdrop-blur hover:bg-white/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {many && (
            <>
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(d);
                  }}
                  aria-label={d === 1 ? "Next picture" : "Previous picture"}
                  className={`focus-ring absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-pill bg-white/15 text-white backdrop-blur hover:bg-white/25 ${
                    d === 1 ? "right-3 sm:right-6" : "left-3 sm:left-6"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={d === 1 ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </>
          )}

          <div
            className={`max-h-full max-w-full ${zoom ? "overflow-auto" : "overflow-hidden"}`}
            style={{ width: "100vw", height: "100dvh" }}
          >
            <div
              className={`flex min-h-full min-w-full items-center justify-center p-3 sm:p-8 ${zoom ? "w-[220vw] sm:w-[160vw]" : ""}`}
              onClick={(e) => {
                if (e.target === e.currentTarget && !zoom) close();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[index]}
                alt={alt}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => !z);
                }}
                className={`rounded-xl shadow-2xl ${
                  zoom ? "w-full cursor-zoom-out" : "max-h-[88dvh] max-w-full cursor-zoom-in object-contain"
                }`}
              />
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-white/70">
            {alt}
            {many ? ` · ${index + 1}/${images.length}` : ""} · tap picture to zoom
          </p>
        </div>
      )}
    </>
  );
}
