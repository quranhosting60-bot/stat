"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function OfferBanner() {
  const [isOfferDay, setIsOfferDay] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const day = new Date().getDay(); // 0 Sun ... 1 Mon, 2 Tue
    setIsOfferDay(day === 1 || day === 2);
  }, []);

  if (!isOfferDay) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-content px-6 pt-6"
    >
      <div className="flex items-center justify-center gap-2 rounded-pill bg-cyan/10 px-4 py-3 text-center text-sm font-medium text-cyan-deep">
        <span>⚡</span>
        {t("offer_banner")}
      </div>
    </motion.div>
  );
}
