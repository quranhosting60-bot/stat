"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getChatReply } from "@/lib/chatbot";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  products?: Product[];
  quickReplies?: string[];
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `m${idCounter}`;
}

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "Hi! I can tell you about any product, suggest what fits your job, and point you to pricing. What are you printing?",
  quickReplies: ["Business cards", "Banners", "Packaging", "Apparel"],
};

function MiniProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const photo = product.photo ?? category?.photo;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="focus-ring group flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5 transition-colors hover:bg-mist"
    >
      {photo && (
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-mist">
          <Image src={photo} alt={product.name} fill sizes="48px" className="object-cover" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy">{product.name}</p>
        <p className="text-xs text-navy/50">
          SAR {product.basePrice.toLocaleString()} · {product.unit}
        </p>
      </div>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="flex-shrink-0 text-navy/30 transition-transform group-hover:translate-x-0.5"
      >
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: nextId(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const reply = getChatReply(trimmed);
      setMessages((m) => [
        ...m,
        { id: nextId(), role: "bot", text: reply.text, products: reply.products, quickReplies: reply.quickReplies },
      ]);
      setTyping(false);
    }, 450);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-pill bg-cyan text-white shadow-[0_8px_24px_rgba(23,171,221,0.45)]"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-40 right-6 z-50 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_60px_rgba(11,42,64,0.25)]"
          >
            <div className="flex items-center gap-3 border-b border-line bg-navy px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-pill bg-cyan/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#17ABDD" strokeWidth="2">
                  <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                </svg>
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white">Smart Printing Assistant</p>
                <p className="text-xs text-white/50">Product info &amp; recommendations</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div className={`max-w-[85%] ${m.role === "user" ? "" : "w-full"}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user" ? "bg-navy text-white" : "bg-mist text-navy/80"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.products && m.products.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {m.products.map((p) => (
                          <MiniProductCard key={p.slug} product={p} />
                        ))}
                      </div>
                    )}
                    {m.quickReplies && m.quickReplies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.quickReplies.map((q) => (
                          <button
                            key={q}
                            onClick={() => send(q)}
                            className="focus-ring rounded-pill border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors hover:bg-mist"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-mist px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-pill bg-navy/40"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a product…"
                className="focus-ring w-full rounded-pill border border-line px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="focus-ring flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-pill bg-cyan text-white transition-colors hover:bg-cyan-deep"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
