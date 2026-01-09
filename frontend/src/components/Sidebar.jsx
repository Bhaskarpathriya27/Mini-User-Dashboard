import { Home, TrendingUp, Star, Settings, X } from "lucide-react";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay on mobile */}
      <div
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          md:hidden
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 p-4
          bg-white dark:bg-[#0B0B0B]
          border-r border-gray-200 dark:border-white/5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">CryptoX</h2>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
          <SidebarItem icon={<TrendingUp size={18} />} label="Markets" />
          <SidebarItem icon={<Star size={18} />} label="Watchlist" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </div>
    </>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
        transition
        ${
          active
            ? "bg-gray-200 dark:bg-white/10 text-black dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
