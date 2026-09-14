import { CategorySlug } from "@/data/categories";

export default function CategoryIcon({
  slug,
  className = "",
}: {
  slug: CategorySlug;
  className?: string;
}) {
  const common = { className, viewBox: "0 0 120 120", xmlns: "http://www.w3.org/2000/svg" };

  switch (slug) {
    case "business-stationery":
      return (
        <svg {...common}>
          <rect x="24" y="52" width="72" height="42" rx="6" fill="#0B2A40" opacity="0.12" />
          <rect x="18" y="42" width="72" height="42" rx="6" fill="#E9F6FB" stroke="#0B2A40" strokeWidth="2" />
          <rect x="30" y="54" width="20" height="20" rx="3" fill="#17ABDD" />
          <line x1="58" y1="56" x2="80" y2="56" stroke="#0B2A40" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="64" x2="74" y2="64" stroke="#0B2A40" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "marketing-print":
      return (
        <svg {...common}>
          <rect x="30" y="20" width="52" height="72" rx="4" fill="#E9F6FB" stroke="#0B2A40" strokeWidth="2" />
          <path d="M30 20 L82 20 L82 40 L60 40 Z" fill="#17ABDD" opacity="0.9" />
          <line x1="40" y1="54" x2="72" y2="54" stroke="#0B2A40" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="40" y1="64" x2="72" y2="64" stroke="#0B2A40" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="40" y1="74" x2="58" y2="74" stroke="#0B2A40" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "large-format":
      return (
        <svg {...common}>
          <rect x="46" y="14" width="10" height="92" rx="3" fill="#0B2A40" />
          <path d="M46 20 L96 26 L96 88 L46 96 Z" fill="#E9F6FB" stroke="#0B2A40" strokeWidth="2" />
          <circle cx="70" cy="58" r="14" fill="#17ABDD" opacity="0.85" />
        </svg>
      );
    case "packaging-labels":
      return (
        <svg {...common}>
          <path d="M22 44 L60 30 L98 44 L60 58 Z" fill="#17ABDD" opacity="0.9" />
          <path d="M22 44 L60 58 L60 96 L22 82 Z" fill="#0B2A40" opacity="0.9" />
          <path d="M98 44 L60 58 L60 96 L98 82 Z" fill="#0B2A40" opacity="0.65" />
        </svg>
      );
    case "promotional-gifts":
      return (
        <svg {...common}>
          <path
            d="M38 40 h30 a4 4 0 0 1 4 4 v30 a14 14 0 0 1 -14 14 h-10 a14 14 0 0 1 -14 -14 v-30 a4 4 0 0 1 4 -4 z"
            fill="#E9F6FB"
            stroke="#0B2A40"
            strokeWidth="2"
          />
          <path d="M72 50 h8 a8 8 0 0 1 0 16 h-8" fill="none" stroke="#0B2A40" strokeWidth="2" />
          <rect x="38" y="40" width="34" height="8" fill="#17ABDD" />
        </svg>
      );
    case "branded-apparel":
      return (
        <svg {...common}>
          <path
            d="M45 24 L60 32 L75 24 L94 34 L86 50 L78 46 V96 H42 V46 L34 50 L26 34 Z"
            fill="#E9F6FB"
            stroke="#0B2A40"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="42" r="6" fill="#17ABDD" />
        </svg>
      );
    default:
      return null;
  }
}
