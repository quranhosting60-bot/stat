export default function CornerBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-pill transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
        dark ? "bg-white text-navy" : "bg-navy text-white"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
