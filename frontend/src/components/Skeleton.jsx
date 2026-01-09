export default function Skeleton({ rows = 8 }) {
  return (
    <div
      className="
        overflow-hidden rounded-xl
        bg-white dark:bg-[#0F0F0F]
        border border-gray-200 dark:border-white/5
        animate-pulse
      "
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="
            h-12 border-b last:border-b-0
            border-gray-200 dark:border-white/5
          "
        />
      ))}
    </div>
  );
}
