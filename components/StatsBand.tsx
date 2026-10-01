"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 2400, suffix: "+", label: "Orders printed" },
  { value: 6, suffix: "", label: "Product categories" },
  { value: 48, suffix: "hr", label: "Fastest turnaround" },
  { value: 500, suffix: "+", label: "Businesses served" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-white sm:text-5xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <section className="bg-navy py-16">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
